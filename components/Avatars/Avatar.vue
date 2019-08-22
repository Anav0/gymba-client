<template>
  <div class="avatar">
    <img class="avatar__image" v-if="avatarUrl" :src="avatarUrl" :alt="alt" />
    <h4 v-else class="avatar__initials">{{initials}}</h4>
    <transition v-if="isOnline && !icon" name="fade">
      <div class="avatar__active-indicator avatar__active-indicator--online"></div>
    </transition>
    <transition v-if="icon && !isOnline" name="fade">
      <fa-icon class="avatar__active-indicator" :icon="icon"></fa-icon>
    </transition>
  </div>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  display: flex;
  border-radius: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $AccentColor2;
  &__initials {
    font-size: inherit;
  }
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__image:empty {
    background-color: $LightGray;
    color: transparent;
  }

  &__active-indicator {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 75%;
    right: 0%;
    top: 68.75%;
    bottom: 6.25%;
    border-radius: 50%;

    &--online {
      background: $avatars-active-indication-background;
      border: 1px solid $avatars-active-indication-border;
    }
  }
}
</style>