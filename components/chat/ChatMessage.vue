<template>
  <div class="chat-message">
    <avatar-wrapper
      class="chat-message__sender-avatar"
      :initials="sender.fullname | getInitials"
      :avatarUrl="sender.avatarUrl"
      :text="sender.fullname"
      v-if="user._id!==sender._id"
    >
      <span class="chat-message__send-time">{{ formatedDate }}</span>
    </avatar-wrapper>
    <div
      class="chat-message__bubble"
      :class="user._id!==sender._id ? 'chat-message__bubble--received' : 'chat-message__bubble--send'"
    >
      <slot></slot>
      <div
        v-if="seenStatus"
        :class="`chat-message__seen-indicator chat-message__seen-indicator--${seenStatus}`"
      ></div>
      <div
        v-if="seenStatus=='received'"
        class="chat-message__seen-indicator chat-message__seen-indicator--received"
      >
        <img v-if="user.avatarUrl" :src="user.avatarUrl" />
        <span v-else>{{user.fullname | getInitials}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarWrapper from "../Avatars/AvatarWrapper";
import moment from "moment";

export default {
  components: {
    AvatarWrapper
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
      if (diff < 24) return sendDate.format("HH:mm");
      else if (diff / 24 < 7) return sendDate.format("dddd HH:mm");
      else return sendDate.format("HH:mm DD MMM 'YY");
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-message {
  display: grid;
  grid-template-columns: 125px auto;
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
    margin-left: 50px;
    height: auto;
    grid-column: 2/3;

    &--send {
      background: $AccentColor2;
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
    .avatar .avatar-wrapper__avatar {
      width: 36px !important;
      height: 36px !important;
    }
  }

  &__send-time {
    margin-top: 10px;
  }
}
</style>