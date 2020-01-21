<template>
  <div class="chat-side-nav">
    <avatar
      @click.native="goToUserProfile"
      :avatarUrl="user.avatarUrl"
      :initials="user.fullname | getInitials"
      icon="cog"
      :userId="user._id"
    />
    <ul class="chat-side-nav__icon-container">
      <router-link v-for="link in navLinks" :key="link.icon" :to="link.route">
        <fa-icon class="chat-side-nav__icon" :icon="link.icon"></fa-icon>
      </router-link>
    </ul>
    <fa-icon
      @click="logout"
      class="chat-side-nav__icon"
      icon="sign-out-alt"
    ></fa-icon>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import api from "../../api";
import eventHandler from "../../src/eventHandler";

export default {
  components: {
    Avatar
  },
  data() {
    return {
      navLinks: [
        { icon: "comment-alt", route: "/chat/0" },
        { icon: "user-friends", route: "/chat/1" },
        { icon: "envelope-open-text", route: "/chat/2" }
      ]
    };
  },
  methods: {
    goToUserProfile() {
      if (window.innerWidth < 480)
        return this.$router.push({ name: "chatProfileMobile" });

      return this.$router.push({ name: "chatProfile" });
    },
    async logout() {
      try {
        await api.auth.logout();
        eventHandler.$emit("user-logout", this.user);
        this.$store.dispatch("auth/logout");
        this.$router.push("/sign-in");
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-side-nav {
  background-image: $LinearGradient;
  color: $White;
  width: 100%;
  height: 100%;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .router-link-active {
    color: $AccentColor2;
  }
  a {
    color: $White;
  }

  .avatar {
    min-width: 48px;
    min-height: 48px;
    color: $White;
    cursor: pointer;
  }
  &__icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-top: 50px;
  }
  &__icon:hover {
    color: $AccentColor2;
  }
  a:not(:first-child) {
    margin-top: 30px;
  }
  &__icon {
    font-size: $icon-size-extra-medium;
    cursor: pointer;
    transition: color $transition-duration-quick ease-in-out;
  }
}
</style>
