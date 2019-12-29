<template>
  <div class="chat-message">
    <avatar
      class="chat-message__sender-avatar"
      alt="message sender profile picture"
      :avatarUrl="sender.avatarUrl"
      :initials="sender.fullname | getInitials"
      v-if="user._id !== sender._id"
    />
    <div
      class="chat-message__bubble"
      @click="isSendDateVisible = !isSendDateVisible"
      :class="
        user._id !== sender._id
          ? 'chat-message__bubble--received'
          : 'chat-message__bubble--send'
      "
    >
      <slot></slot>
      <div
        v-if="seenStatus"
        :class="
          `chat-message__seen-indicator chat-message__seen-indicator--${seenStatus}`
        "
      ></div>
      <div
        v-if="seenStatus == 'received'"
        class="chat-message__seen-indicator chat-message__seen-indicator--received"
      >
        <img v-if="user.avatarUrl" :src="user.avatarUrl" />
        <span v-else>{{ user.fullname | getInitials }}</span>
      </div>
    </div>
    <transition name="fade">
      <span
        v-if="isSendDateVisible"
        class="chat-message__send-time"
        :class="
          user._id !== sender._id
            ? 'chat-message__send-time'
            : 'chat-message__send-time--send'
        "
        >{{ formatedDate }}</span
      >
    </transition>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import moment from "moment";

export default {
  components: {
    Avatar
  },
  data() {
    return {
      isSendDateVisible: false
    };
  },
  props: {
    sender: {
      type: Object,
      default: {}
    },
    sendDate: {
      type: String,
      default: ""
    },
    seenStatus: {
      type: String,
      validator: val => ["send", "delivered", "received"].includes(val)
    }
  },
  computed: {
    formatedDate() {
      const sendDate = moment(this.sendDate);
      const today = moment();
      const diff = today.diff(sendDate, "hours");
      if (diff < 12) return sendDate.format("HH:mm");
      else if (diff / 24 < 7) return sendDate.format("dddd HH:mm");
      else return sendDate.format("HH:mm DD MMM 'YY");
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style lang="scss">
.chat-message {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  width: 100%;

  .avatar-wrapper {
    flex-direction: column;
  }
  &__bubble {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $White;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 15px;
    height: auto;
    place-self: center start;
    align-self: end;
    grid-column: 2/3;
    grid-row: 1/2;
    max-width: 100%;
    @media (min-width: $sm) {
      max-width: 50%;
    }
    &--send {
      background: $AccentColor2;
      place-self: end;
    }
  }
  &__seen-indicator {
    position: absolute;
    bottom: -10px;
    right: 0px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #f5f5f5;

    &--send {
      background-color: transparent;
      border-color: $MainFontColorLight;
    }
    &--delivered {
      background-color: $LightGray;
      border-color: $WhiteSmoke;
    }
    &--received {
      background-color: $AccentColor2;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span {
        font-size: 8px !important;
      }
    }
  }
  &__sender-avatar {
    width: 25px !important;
    height: 25px !important;
    font-size: 10px;
    grid-column: 1/2;
    grid-row: 1/2;
    place-self: end center;
    margin-right: 10px;

    @media (min-width: $lg) {
      width: 35px !important;
      height: 35px !important;
      font-size: 14px;
      margin-right: 15px;
    }
  }

  &__send-time {
    margin-top: 10px;
    margin-left: 5px;
    grid-column: 2/3;
    grid-row: 2/3;
    place-self: start;
    &--send {
      place-self: end;
    }
  }
}
</style>
