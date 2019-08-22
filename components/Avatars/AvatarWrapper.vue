<template>
  <div class="avatar-wrapper">
    <avatar
      class="avatar-wrapper__avatar"
      :isOnline="isOnline"
      :avatarUrl="avatarUrl"
      :icon="icon"
      :alt="alt"
      :initials="initials"
      :text="text"
    />
    <slot></slot>
  </div>
</template>

<script>
import Avatar from "./Avatar";

export default {
  components: {
    Avatar
  },
  props: {
    isOnline: {
      type: Boolean,
      default: false
    },
    avatarUrl: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: "user's avatar"
    },
    initials: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &__avatar {
    width: 48px;
    height: 48px;
  }
}
</style>