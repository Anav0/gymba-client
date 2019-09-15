<template>
  <div class="chat-message">
    <avatar-wrapper
      class="chat-message__sender-avatar"
      :initials="sender.fullname | getInitials"
      :avatarUrl="sender.avatarUrl"
      :text="sender.fullname"
      v-if="sender"
    >
      <span class="chat-message__send-time">09:00</span>
    </avatar-wrapper>
    <div
      class="chat-message__bubble"
      :class="sender ? 'chat-message__bubble--received' : 'chat-message__bubble--send'"
    >
      <slot></slot>
      <div
        v-if="seenStatus"
        :class="`chat-message__seen-indicator chat-message__seen-indicator--${seenStatus}`"
      ></div>
    </div>
  </div>
</template>

<script>
import AvatarWrapper from "../Avatars/AvatarWrapper";

export default {
  components: {
    AvatarWrapper
  },
  props: {
    sender: {
      type: Object,
      default: {}
    },
    seenStatus: {
      type: String,
      validator: val => ["send", "seen", "recived"].includes(val)
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-message {
  display: flex;
  align-items: baseline;
  justify-content: center;

  .avatar-wrapper {
    flex-direction: column;
  }
  &__bubble {
    position: relative;
    background: $White;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 25px;
    margin-left: 50px;

    &--send {
      background: $AccentColor1;
    }
    &--received {
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

    &--seen {
      display: none;
    }
    &--send {
      background-color: transparent;
      border-color: $MainFontColorLight;
    }
    &--recived {
      background-color: $LightGray;
    }
  }
  &__sender-avatar {
  }

  &__send-time {
    margin-top: 10px;
  }
}
</style>