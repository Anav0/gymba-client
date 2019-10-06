<template>
  <div class="chat-user-profile">
    <h3 class="chat-user-profile__header">{{$t('chat-user-profile-header')}}</h3>
    <div class="chat-user-profile__avatar">
      <avatar
        alt="user's profile picture"
        :avatarUrl="user.avatarUrl"
        :initials="user.fullname | getInitials"
      />
      <h4>{{user.fullname}}</h4>
    </div>
    <div class="chat-user-profile__infos">
      <span>{{$t('chat-user-profile-joined')}}:</span>
      <span>{{formattedCreationDate}}</span>
      <span>{{$t('chat-user-profile-username')}}:</span>
      <span>{{user.username}}</span>
      <span>{{$t('chat-user-profile-email')}}:</span>
      <span>{{user.email}}</span>
      <span v-if="user.bio">{{$t('chat-user-profile-bio')}}:</span>
      <p v-if="user.bio">{{user.desc}}</p>
    </div>
    <g-select
      border
      class="chat-user-profile__lang-switcher"
      @selectionChanged="switchLang"
      :options="locales"
      :selectedOptionIndex="selectedLangIndex"
    />
    <div class="chat-user-profile__icons">
      <fa-icon class="chat-user-profile__icon" icon="trash" @click="deleteAccount" />
      <fa-icon class="chat-user-profile__icon" icon="sign-out-alt" @click="logout" />
    </div>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import api from "../../api";
import moment from "moment";
import GSelect from "../GSelect";

export default {
  components: {
    Avatar,
    GSelect
  },
  data() {
    return {
      selectedLangIndex: 0,
      locales: [
        { code: "pl", iso: "pl-PL", name: "Polski" },
        { code: "en", iso: "en-US", name: "English" }
      ]
    };
  },
  computed: {
    formattedCreationDate() {
      return moment(this.user.creationDate).format("DD MMMM YYYY");
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    switchLang(locale) {
      this.$root.$i18n.locale = locale.code;
      localStorage.locale = JSON.stringify(locale);
      this.selectedLangIndex = this.locales.findIndex(lang => lang == locale);
    },
    async logout() {
      try {
        await api.auth.logout();
        this.$store.dispatch("auth/logout");
        this.$router.push("/sign-in");
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      }
    },
    async deleteAccount() {
      try {
        await api.user.deleteAccount();
        await this.logout();
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      }
    }
  },
  mounted() {
    const selectedLocaleCode = this.$root.$i18n.locale;
    this.selectedLangIndex = this.locales.findIndex(
      locale => locale.code == selectedLocaleCode
    );
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
  &__lang-switcher {
    align-self: flex-start;
  }
  &__flag:hover {
    transform: scale(1.1);
  }
  &__flag {
    width: 96px;
    height: 96px;
    padding: 10px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
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
    grid-template-rows: repeat(4, auto);
    grid-gap: 50px;
    width: 100%;
    max-height: 100%;
    overflow: auto;
  }
}
</style>