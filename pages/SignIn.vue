`<template>
  <div class="sign-in landing-page-section">
    <div class="card">
      <transition name="slide">
        <form class="sign-in__form">
          <h1 class="sign-in__title capitalize">{{$t('sign-in')}}</h1>
          <input
            max="250"
            :placeholder="$i18n.t('sign-in-username')"
            required
            name="username"
            v-model.trim="credentials.username"
          />
          <input
            max="250"
            type="password"
            :placeholder="$i18n.t('sign-in-password')"
            required
            name="password"
            v-model.trim="credentials.password"
          />
          <ul class="error-list">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>
          <div class="sign-in__buttons" v-if="!isLoading">
            <button class="btn btn--default capitalize" @click="login">{{$t('sign-in')}}</button>
            <button class="btn btn--raw">{{$t('sign-in-forget')}}</button>
          </div>
          <flower-spinner :animation-duration="1500" :size="60" color="#fa8072" v-else />
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { FlowerSpinner } from "epic-spinners";

export default {
  components: { FlowerSpinner },
  data() {
    return {
      isLoading: false,
      errors: [],
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.credentials.username || !this.credentials.password)
        return this.errors.push("Username and password are both required");

      try {
        this.isLoading = true;
        const response = await api.user.login(this.credentials);
        this.$store.dispatch("auth/login", response.data.user);
        this.$router.push("/chat");

        this.isLoading = false;
      } catch (err) {
        this.errors = err.response.data.errors;
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: $xsm) {
    margin-top: 5rem;
  }
  .btn--raw {
    color: $MainFontColor;
    font-size: $font-size-small;
  }
  .card {
    width: 400px;

    @media (max-width: $xsm) {
      border: none;
      background: transparent;
      box-shadow: none;
      width: 100%;
      padding: 0;
    }
  }

  &__title {
    color: $AccentColor1;
    margin-bottom: 50px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;

    button:first-child {
      margin-bottom: 10px;
    }
  }

  .error-list,
  &__buttons {
    margin: 10px 0;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;

    input,
    textarea {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>