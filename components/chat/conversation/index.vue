<template>
  <div class="conversation">
    <div class="conversation__placeholder" v-if="!conversation._id">
      <fa-icon class="conversation__placeholder-icon" icon="comment-alt"></fa-icon>
      <h3>No conversation selected</h3>
    </div>
    <div v-else class="conversation__content">
      <transition v-if="isTyping" name="slide">
        <div class="conversation__typing-bubble jello-horizontal">{{typer.fullname | getFirstname}}</div>
      </transition>
      <div class="conversation__upper" @click="showUserProfile(target._id)">
        <avatar-wrapper :initials="target.fullname | getInitials" :avatarURL="target.avatarURL">
          <h4 class="conversation__target-name">{{target.fullname}}</h4>
        </avatar-wrapper>
      </div>
      <div ref="chatMessages" class="conversation__messages">
        <chat-message
          v-for="message in messages"
          :class="isSendByUser(message) ? 'conversation__message--send' : 'conversation__message--recived'"
          :sender="message.sender"
          :seenStatus="message.status"
          :sendDate="message.sendDate"
          :key="message._id"
        >
          <p>{{message.content}}</p>
        </chat-message>
      </div>
      <div @click="showInfo">
        <div class="conversation__input-box" :class="{'disabled': !isFriend}">
          <input
            v-model.trim="message"
            @keyup="stopedTyping"
            @keydown="typing"
            @keyup.enter="sendMessage"
            placeholder="Type your messsage..."
          />
          <fa-icon class="conversation__action-icon" icon="smile" />
          <fa-icon class="conversation__action-icon" icon="paperclip" />
          <fa-icon @click="sendMessage" class="conversation__action-icon" icon="paper-plane" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarWrapper from "../../Avatars/AvatarWrapper";
import ChatMessage from "../../chat/ChatMessage";
import api from "../../../api";
import io from "socket.io-client";
import { debounce } from "debounce";

export default {
  components: {
    AvatarWrapper,
    ChatMessage
  },
  data() {
    return {
      target: {},
      message: "",
      messages: [],
      isTyping: false,
      typer: {},
      chat: {}
    };
  },
  async mounted() {
    this.chat = io(`${process.env.VUE_APP_API_URL}/chat`);

    this.chat.on("new message", async message => {
      await new Promise(resolve => {
        this.messages.push(message);
        resolve();
      });
      this.scrollToBottom();
    });

    this.chat.on("failed to send message", async message => {
      //display error message
    });

    this.chat.on("user join room", message => {});

    this.chat.on("user is typing", user => {
      this.isTyping = true;
      this.typer = user;
    });

    this.chat.on("user stoped typing", user => {
      this.isTyping = false;
    });
  },

  computed: {
    isFriend() {
      return this.user.friends.includes(this.target._id);
    },
    conversation() {
      return this.$store.getters["conversation/activeConversation"];
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  watch: {
    async conversation(conversation) {
      await new Promise(async resolve => {
        this.fillTarget();
        this.chat.emit("join", {
          roomId: conversation.roomId,
          username: this.user.fullname
        });
        const {
          data: messages
        } = await api.conversation.getConversationMessages(conversation._id);
        this.messages = messages;
        resolve();
      });

      this.scrollToBottom();
    }
  },
  methods: {
    showInfo() {
      if (this.isFriend) return;

      this.$toasted.show(
        `To talk to ${
          this.target.fullname.split(" ")[0]
        }, thay need to be your friend`,
        {
          className: "info-toast"
        }
      );
    },
    showUserProfile(id) {
      this.$router.push({ name: "chatFriend", params: { id } });
    },
    stopedTyping: debounce(function() {
      this.chat.emit("stoped typing", {
        user: {
          fullname: this.user.fullname,
          _id: this.user._id
        },
        roomId: this.conversation.roomId
      });
    }, 500),
    typing: debounce(
      function() {
        this.chat.emit("is typing", {
          user: {
            fullname: this.user.fullname,
            _id: this.user._id
          },
          roomId: this.conversation.roomId
        });
      },
      500,
      true
    ),
    scrollToBottom() {
      this.$refs.chatMessages.scroll({
        top: this.$refs.chatMessages.scrollHeight,
        behavior: "smooth"
      });
    },
    sendMessage() {
      if (!this.message) return;

      this.chat.emit("private message", {
        roomId: this.conversation.roomId,
        userId: this.user._id,
        conversationId: this.conversation._id,
        message: this.message
      });

      this.message = "";
    },
    fillTarget() {
      if (!this.conversation) return;
      this.target = this.conversation.participants.find(
        participant => participant._id !== this.user._id
      );
    },
    isSendByUser(message) {
      return this.user._id === message.sender._id;
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  &__content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background-color: $WhiteSmoke;
    position: relative;
    overflow: hidden;
  }
  &__placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__placeholder-icon {
    font-size: $icon-size-extra-large;
    margin-right: 20px;
  }
  &__typing-bubble {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 90px;
    right: 50%;
    width: 60px;
    height: 40px;
    border-radius: 8px;
    background-color: $White;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    animation-iteration-count: infinite;
    animation-duration: 1s;
  }
  &__upper {
    background-color: $White;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__messages {
    display: grid;
    grid-row-gap: 10px;
    grid-auto-rows: auto;
    grid-template-rows: repeat(20, auto);
    overflow: auto;
    padding: 0 50px;
    .chat-message {
      margin: 10px;
    }
  }
  &__message {
    display: flex;

    &--send {
      justify-content: flex-end;
    }
    &--recived {
      justify-content: flex-start;
    }
  }
  &__target-name {
    margin-left: 10px;
    cursor: pointer;
  }
  &__action-icon:hover {
    color: $AccentColor2;
    -webkit-animation: jello-horizontal 0.6s both;
    animation: jello-horizontal 0.6s both;
  }
  &__action-icon {
    font-size: $icon-size-medium;
    cursor: pointer;
    transition: color $transition-duration-quick ease-in-out;
  }
  &__input-box {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr repeat(3, 20px);
    padding: 10px;
    grid-column-gap: 20px;
    align-items: center;
    background-color: $White;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    min-height: 70px;

    input {
      border: none;
      height: 100%;
      width: 100%;
    }
  }
}
</style>