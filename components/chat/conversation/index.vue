<template>
  <div class="conversation">
    <div class="conversation__upper">
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
    <div class="conversation__input-box">
      <input v-model.trim="message" @keyup.enter="sendMessage" placeholder="Type your messsage..." />
      <fa-icon class="conversation__action-icon" icon="smile" />
      <fa-icon class="conversation__action-icon" icon="paperclip" />
      <fa-icon @click="sendMessage" class="conversation__action-icon" icon="paper-plane" />
    </div>
  </div>
</template>

<script>
import AvatarWrapper from "../../Avatars/AvatarWrapper";
import ChatMessage from "../../chat/ChatMessage";
import api from "../../../api";
import io from "socket.io-client";

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
      console.error("Failed to send message", message);
    });

    this.chat.on("user join room", message => {});
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
  computed: {
    conversation() {
      return this.$store.getters["conversation/activeConversation"];
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
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
  width: 100%;
  height: 100%;
  background-color: $WhiteSmoke;
  position: relative;
  overflow: hidden;

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
    overflow: auto;
    margin-bottom: 80px;
    max-height: 84vh;
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
    position: absolute;
    bottom: 0;
    left: 0;
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