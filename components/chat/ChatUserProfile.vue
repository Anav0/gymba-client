<template>
  <div class="chat-user-profile">
    <h3 class="chat-user-profile__header">{{$t('chat-user-profile-header')}}</h3>

    <div class="chat-user-profile__avatar">
      <avatar alt="user's profile picture" :initials="user.fullname | getInitials" />
      <h4>{{user.fullname}}</h4>
    </div>
    <div class="chat-user-profile__infos">
      <span>{{$t('chat-user-profile-joined')}}:</span>
      <span>{{new Date(user.creationDate).toLocaleDateString(isoLanguage,dateDisplayOption)}}</span>
      <span>{{$t('chat-user-profile-username')}}:</span>
      <span>{{user.username}}</span>
      <span>{{$t('chat-user-profile-email')}}:</span>
      <span>{{user.email}}</span>
      <span v-if="user.bio">{{$t('chat-user-profile-bio')}}:</span>
      <p v-if="user.bio">{{user.desc}}</p>
    </div>
    <div class="chat-user-profile__icons">
      <fa-icon class="chat-user-profile__icon" icon="trash" @click="deleteAccount" />
      <fa-icon class="chat-user-profile__icon" icon="sign-out-alt" @click="logout" />
    </div>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import api from "../../api";

export default {
  components: {
    Avatar
  },
  data() {
    return {
      dateDisplayOption: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
    isoLanguage() {
      //TODO: Add language iso code when translation is ready
      return "en-US";
    }
  },
  methods: {
    async logout() {
      try {
        await api.auth.logout();
        this.$store.dispatch("auth/logout");
        this.$router.push("/sign-in");
      } catch (err) {
        console.error(err);
      }
    },
    async deleteAccount() {
      try {
        await api.user.deleteAccount();
        await this.logout();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-user-profile {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background: $LinearGradient;
  width: 100%;
  height: 100%;
  color: $user-profile-color;
  padding: 30px 20px;

  @media (min-width: $md) {
    background: $White;
    color: $MainFontColor;
  }

  &__icons {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    justify-content: space-between;
    padding: 20px 40px;
  }

  &__icon {
    font-size: $icon-size-large;
    cursor: pointer;
  }
  &__icon:hover {
    color: $AccentColor2;
  }
  &__header {
    margin-bottom: 20px;
  }

  &__avatar {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: auto;

    h4 {
      margin-top: 10px;
    }
    .avatar {
      font-size: $font-size-h2;
      font-weight: $font-weight-bold;
      width: 110px;
      height: 110px;
    }
  }

  &__infos {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    max-height: 100%;
    grid-gap: 20px;
    overflow: auto;
    margin-bottom: 75px;
  }
}
</style>