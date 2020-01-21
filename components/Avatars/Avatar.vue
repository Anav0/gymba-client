<template>
  <div class="avatar">
    <img class="avatar__image" v-if="avatarUrl" :src="avatarUrl" :alt="alt" />
    <h4 v-else class="avatar__initials">{{ initials }}</h4>
    <transition name="fade">
      <div
        v-if="isOnline && !icon"
        class="avatar__active-indicator avatar__active-indicator--online"
      ></div>
    </transition>
    <transition name="fade">
      <fa-icon
        v-if="icon"
        class="avatar__active-indicator"
        :icon="icon"
      ></fa-icon>
    </transition>
  </div>
</template>

<script>
import eventHandler from "../../src/eventHandler";
import api from "../../api";
export default {
  data() {
    return {
      isOnline: false
    };
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
    userId: {
      type: String
    }
  },
  watch: {
    async userId(value) {
      this.updateIsOnlineStatus();
    }
  },
  methods: {
    async updateIsOnlineStatus() {
      if (!this.userId) return;
      const { data: activity } = await api.activity.getActivityByUserId(
        this.userId
      );
      if (activity) this.isOnline = activity.isOnline;
    }
  },
  mounted() {
    this.updateIsOnlineStatus();
  },
  created() {
    eventHandler.$on("user-disconnected", userId => {
      if (!this.userId || !userId) return;
      if (this.userId != userId) return;
      this.isOnline = false;
    });
    eventHandler.$on("user-connected", userId => {
      if (this.userId != userId) return;
      this.isOnline = true;
    });
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
  width: 48px;
  height: 48px;

  &__initials {
    font-size: inherit;
  }
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &__image:empty {
    background-color: $LightGray;
    color: transparent;
  }

  &__active-indicator {
    position: absolute;
    width: 25%;
    height: 25%;
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
