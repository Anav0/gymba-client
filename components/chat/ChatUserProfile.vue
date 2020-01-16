<template>
  <div class="chat-user-profile">
    <h3 class="chat-user-profile__header">
      {{ $t("chat-user-profile-header") }}
    </h3>
    <div class="chat-user-profile__avatar">
      <avatar
        alt="user's profile picture"
        :avatar-url="user.avatarUrl"
        :initials="user.fullname | getInitials"
      />
      <h4>{{ user.fullname }}</h4>
    </div>
    <div class="chat-user-profile__infos">
      <span>{{ $t("chat-user-profile-joined") }}:</span>
      <span>{{ formattedCreationDate }}</span>
      <span>{{ $t("chat-user-profile-username") }}:</span>
      <span>{{ user.username }}</span>
      <span>{{ $t("chat-user-profile-email") }}:</span>
      <span>{{ user.email }}</span>
      <span v-if="user.bio">{{ $t("chat-user-profile-bio") }}:</span>
      <p v-if="user.bio">{{ user.desc }}</p>
    </div>

    <p @click="saveSettings" v-if="settingsSaveError">
      {{ settingsSaveError }}
    </p>
    <p @click="LoadSettings" v-if="settingsLoadError">
      {{ settingsLoadError }}
    </p>
    <spring-spinner
      v-if="isLoadingSettings"
      class="chat-user-profile__spinner"
      :animation-duration="1000"
      :size="50"
      color="#fcd87d"
    />
    <div
      v-if="!isLoadingSettings && !settingsLoadError && !settingsSaveError"
      class="chat-user-profile__settings"
    >
      <label>
        <input
          type="checkbox"
          name="isEnterLeaveIndicatorVisible"
          v-model="settings.isEnterLeaveIndicatorVisible"
        />
        {{ $i18n.t("settings-show-enter-leave-indicator") }}
      </label>

      <g-select
        border
        class="chat-user-profile__lang-switcher"
        :options="locales"
        :selectedOptionIndex="selectedLangIndex"
        @selectionChanged="switchLang"
      />
    </div>
    <div class="chat-user-profile__icons">
      <fa-icon
        class="chat-user-profile__icon disable"
        icon="trash"
        @click="deleteAccount"
      />
      <fa-icon
        class="chat-user-profile__icon"
        icon="sign-out-alt"
        @click="logout"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Avatar from "../Avatars/Avatar";
import api from "../../api";
import GSelect from "../misc/GSelect";
import eventHandler from "../../src/eventHandler";
import { SpringSpinner } from "epic-spinners";

export default {
  components: {
    Avatar,
    GSelect,
    SpringSpinner
  },
  data() {
    return {
      isLoadingSettings: true,
      settingsSaveError: "",
      settingsLoadError: ""
    };
  },
  async created() {
    await this.LoadSettings();
  },
  watch: {
    settings: {
      async handler(value) {
        await this.saveSettings();
      },
      deep: true
    }
  },
  computed: {
    selectedLangIndex() {
      return this.locales.findIndex(
        locale => locale.code === this.settings.locale.code
      );
    },
    locales() {
      return this.$store.getters["settings/locales"];
    },
    settings() {
      return this.$store.getters["settings/settings"];
    },
    formattedCreationDate() {
      return moment(this.user.creationDate).format("DD MMMM YYYY");
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    saveSettings() {
      return new Promise((resolve, reject) => {
        try {
          this.isLoadingSettings = true;
          this.$store.dispatch("settings/saveSettings", this.settings);
          resolve();
        } catch (error) {
          reject(error);
          console.error(error);
          this.settingsSaveError = this.$i18n.t("settings-save-generic-error");
        } finally {
          this.isLoadingSettings = false;
        }
      });
    },
    LoadSettings() {
      return new Promise((resolve, reject) => {
        try {
          this.isLoadingSettings = true;
          this.$store.dispatch("settings/loadSettings");
          resolve(this.settings);
        } catch (error) {
          reject(error);
          console.error(error);
          this.settingsLoadError = this.$i18n.t("settings-load-generic-error");
        } finally {
          this.isLoadingSettings = false;
        }
      });
    },
    async switchLang(locale) {
      this.$root.$i18n.locale = locale.code;
      let settings = this.settings;
      settings.locale = locale;
      this.$store.dispatch("settings/saveSettings", settings);
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
    padding: 30px 10%;
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
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(4, auto);
    grid-gap: 20px 30px;
    max-height: 100%;
    width: 100%;
    span {
      place-self: center start;
    }
  }
  &__settings {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-height: 25%;
  }
}
</style>
