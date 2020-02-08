<template>
  <div class="conversation">
    <div v-if="!conversation._id" class="conversation__placeholder">
      <fa-icon class="conversation__placeholder-icon" icon="comment-alt" />
      <h3>{{ $i18n.t("no-conversation-selected") }}</h3>
    </div>
    <div v-else class="conversation__content">
      <transition name="slide">
        <div
          v-if="isTyping"
          class="conversation__typing-bubble jello-horizontal"
        >
          {{ typer.fullname | getFirstname }}
        </div>
      </transition>
      <div class="conversation__upper" @click="showUserProfile(target._id)">
        <avatar-wrapper
          :initials="target.fullname | getInitials"
          :avatar-url="target.avatarUrl"
          :userId="target._id"
        >
          <h4 class="conversation__target-name">
            {{ target.fullname }}
          </h4>
        </avatar-wrapper>
      </div>
      <div
        ref="chatMessages"
        :class="{ dimmed: isLoading }"
        class="conversation__messages"
        v-on:scroll="onScroll"
      >
        <chat-message
          v-for="(message, i) in messages"
          :key="message._id"
          :class="
            isSendByUser(message)
              ? 'conversation__message--send'
              : 'conversation__message--recived'
          "
          :sender="message.sender"
          :seen-status="message.status"
          :send-date="message.sendDate"
          :showMessageAvatar="shouldShowAvatar(message, i)"
        >
          <p>{{ message.content }}</p>
        </chat-message>
      </div>
      <spring-spinner
        v-if="isLoading"
        class="center conversation__spinner"
        :animation-duration="1000"
        :size="64"
        color="#fcd87d"
      />
      <div @click="showInfo">
        <div class="conversation__input-box" :class="{ disabled: !isFriend }">
          <input
            v-model.trim="message"
            placeholder="Type your message..."
            @keyup="stopedTyping"
            @keydown="typing"
            @keyup.enter="sendMessage"
          />
          <fa-icon
            class="conversation__action-icon disable"
            icon="smile"
            @click="isEmojiPickerVisible = !isEmojiPickerVisible"
          />
          <fa-icon class="conversation__action-icon disable" icon="paperclip" />
          <fa-icon
            class="conversation__action-icon"
            icon="paper-plane"
            @click="sendMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { debounce } from "debounce";
import { SpringSpinner } from "epic-spinners";
import AvatarWrapper from "../../Avatars/AvatarWrapper";
import ChatMessage from "../../chat/ChatMessage";
import api from "../../../api";
import eventHandler from "../../../src/eventHandler";
export default {
  components: {
    AvatarWrapper,
    ChatMessage,
    SpringSpinner
  },
  data() {
    return {
      target: {},
      message: "",
      messages: [],
      isLoading: true,
      isTyping: false,
      numberOfMessages: 15,
      startFrom: 0,
      typer: {},
      chat: {}
    };
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
    },
    settings() {
      return this.$store.getters["settings/settings"];
    }
  },
  watch: {
    async conversation() {
      await this.init();
    }
  },
  async mounted() {
    this.chat = io(`${process.env.VUE_APP_API_URL}/chat`, {
      query: this.user
    });

    this.chat.on("user login", userId => {
      eventHandler.$emit("user-connected", userId);
    });

    this.chat.on("user logout", userId => {
      eventHandler.$emit("user-disconnected", userId);
    });

    this.chat.on("friend removed", friendId => {
      eventHandler.$emit("participant-removed-friend");
    });

    this.chat.on("new invitation", data => {
      eventHandler.$emit("new-invitation", data);
    });

    eventHandler.$on("friend-removed", friend => {
      this.chat.emit("friend removed", {
        user: friend,
        roomId: this.conversation.roomId
      });
    });

    eventHandler.$on("invitation-sent", invitation => {
      this.chat.emit("invitation sent", invitation);
    });

    eventHandler.$on("user-logout", user => {
      this.chat.disconnect();
      if (this.settings.isEnterLeaveIndicatorVisible)
        this.chat.emit("user left", {
          roomId: this.conversation.roomId,
          user: this.user
        });
    });

    this.chat.on("new message", async message => {
      await new Promise(resolve => {
        this.messages.push(message);
        this.startFrom++;
        resolve();
      });
      this.scrollToBottom();
    });

    this.chat.on("failed to send message", async data => {
      for (const error of data.errors) {
        this.$toasted.show(error, {
          className: "error-toast"
        });
      }
    });

    this.chat.on("user join room", fullname => {
      if (this.settings.isEnterLeaveIndicatorVisible)
        this.$toasted.show(`${fullname} ${this.$i18n.t("chat-user-joined")}`, {
          className: "info-toast"
        });
    });

    this.chat.on("user left room", fullname => {
      if (this.settings.isEnterLeaveIndicatorVisible)
        this.$toasted.show(`${fullname} ${this.$i18n.t("chat-user-left")}`, {
          className: "info-toast"
        });
    });

    this.chat.on("user is typing", user => {
      this.isTyping = true;
      this.typer = user;
    });

    this.chat.on("user stoped typing", user => {
      this.isTyping = false;
    });

    if (window.innerWidth < 400) await this.init();
  },
  methods: {
    shouldShowAvatar(message, index) {
      const prevMessage = this.messages[index + 1];
      if (!prevMessage) return true;
      if (prevMessage.sender._id == message.sender._id) return false;
      return true;
    },
    async onScroll(event) {
      const distanceToTop = event.target.scrollTop;
      if (distanceToTop > 0 || this.isLoading) return;

      const oldHeight = this.$refs.chatMessages.scrollHeight;
      const lastElement = this.$refs.chatMessages.childNodes[0];
      await this.fetchAdditionalMessages();
      const newHeight = this.$refs.chatMessages.scrollHeight;

      this.$refs.chatMessages.scroll({
        top: newHeight - oldHeight,
        behavior: "auto"
      });
    },
    init() {
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true;
          this.numberOfMessages = 15;
          this.startFrom = 0;
          this.messages = [];
          this.fillTarget();
          if (!this.conversation._id) {
            this.isLoading = false;
            return resolve();
          }
          await this.fetchAdditionalMessages();
          this.chat.emit("join", {
            roomId: this.conversation.roomId,
            user: this.user
          });
          this.isLoading = false;
          this.scrollToBottom();
          resolve();
        } catch (error) {
          this.isLoading = false;
          reject(error);
        }
      });
    },
    fetchAdditionalMessages() {
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true;

          const { data: messages } = await api.conversation.getRangeOfMessages(
            this.conversation._id,
            this.numberOfMessages,
            this.startFrom
          );

          if (messages.length > 0) {
            this.startFrom += this.numberOfMessages;
            this.messages.push(...messages);
            this.messages.sort((a, b) => (a.sendDate < b.sendDate ? -1 : 1));
          }

          this.isLoading = false;
          resolve();
        } catch (error) {
          this.isLoading = false;
          this.$toasted.show(this.$i18n.t("message-featch-failed"), {
            className: "error-toast"
          });
          reject();
        }
      });
    },
    showInfo() {
      if (this.isFriend) return;

      this.$toasted.show(
        `${this.$i18n.t("to-talk-to")} ${
          this.target.fullname.split(" ")[0]
        }, ${this.$i18n.t("they-need-to")}`,
        {
          className: "info-toast"
        }
      );
    },
    showUserProfile(id) {
      if (window.innerWidth < 400)
        return this.$router.push({ name: "chatFriendMobile", params: { id } });

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

      if (this.target.isBot) {
        this.chat.emit("bot message", {
          roomId: this.conversation.roomId,
          userId: this.user._id,
          botId: this.target._id,
          conversationId: this.conversation._id,
          message: this.message
        });
      } else {
        this.chat.emit("private message", {
          roomId: this.conversation.roomId,
          userId: this.user._id,
          conversationId: this.conversation._id,
          message: this.message
        });
      }

      this.message = "";
    },
    fillTarget() {
      if (!this.conversation._id) return;
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
.conversation-wrapper {
  position: relative;
}
.conversation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  &__spinner {
    z-index: 2;
  }
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
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 90px;
    left: 20px;
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
    @media (min-width: $lg) {
      padding: 0 75px;
    }
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
    z-index: 2;
    input {
      border: none;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
