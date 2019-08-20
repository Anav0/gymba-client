<template>
  <div class="avatar">
    <div class="avatar__wrapper">
      <img class="avatar__image" v-if="avatarUrl" :src="avatarUrl" :alt="alt" />
      <h4 v-else class="avatar__initials">{{initials}}</h4>
      <transition v-if="isOnline && !icon" name="fade">
        <div class="avatar__active-indicator avatar__active-indicator--online"></div>
      </transition>
      <transition v-if="icon && !isOnline" name="fade">
        <fa-icon class="avatar__active-indicator" :icon="icon"></fa-icon>
      </transition>
    </div>
    <span v-if="text" class="avatar__text capitalize">{{text}}</span>
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
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &__wrapper,
  &__image {
    border-radius: 50%;
  }
  &__wrapper {
    border-radius: 50%;
    position: relative;
    width: 48px;
    height: 48px;
    background-color: $AccentColor2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__initials {
    color: $avatars-initials;
  }
  &__image {
    width: 100%;
    height: 100%;
  }
  &__image:empty {
    background-color: $LightGray;
    color: transparent;
  }
  &__text {
    margin-top: 5px;
    color: $avatars-text-color;
    text-align: center;
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