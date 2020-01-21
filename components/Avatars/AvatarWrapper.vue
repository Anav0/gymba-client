<template>
  <div class="avatar-wrapper">
    <avatar
      class="avatar-wrapper__avatar"
      :avatarUrl="avatarUrl"
      :icon="icon"
      :alt="alt"
      :initials="initials"
      :text="text"
      :userId="userId"
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
    },
    userId: {
      type: String
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
