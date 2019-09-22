`<template>
  <div class="sign-up landing-page-section">
    <div class="card">
      <transition v-if="!isSuccessfull" name="slide">
        <form class="sign-up__form">
          <h1 class="sign-up__title capitalize">{{$t('sign-up')}}</h1>
          <input
            max="250"
            :placeholder="$i18n.t('sign-up-fullname')"
            required
            name="fullname"
            v-model.trim="user.fullname"
          />
          <input
            max="250"
            :placeholder="$i18n.t('sign-up-username')"
            required
            name="username"
            v-model.trim="user.username"
          />
          <input
            max="250"
            :placeholder="$i18n.t('sign-up-email')"
            required
            type="email"
            name="email"
            v-model.trim="user.email"
          />
          <input
            max="16"
            :placeholder="$i18n.t('sign-up-password')"
            required
            type="password"
            name="password"
            v-model.trim="user.password"
          />
          <input
            max="16"
            :placeholder="$i18n.t('sign-up-confirm-password')"
            required
            name="confirmPassword"
            type="password"
            v-model.trim="user.confirmPassword"
          />
          <textarea
            max="250"
            name="desc"
            :placeholder="$i18n.t('sign-up-bio')"
            v-model="user.desc"
          />
          <ul class="error-list">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>
          <button
            class="btn btn--default capitalize"
            v-if="!isLoading"
            @click.stop.prevent="submit"
          >{{$t('sign-up-submit')}}</button>
          <flower-spinner :animation-duration="1500" :size="60" color="#fa8072" v-else />
        </form>
      </transition>
      <transition v-else name="slide">
        <successfull :userId="createdUserId" class="sign-up__form" style="transition-delay: 0.3s;" />
      </transition>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { FlowerSpinner } from "epic-spinners";
import Successfull from "../components/Successfull";
import { setInterval } from "timers";

export default {
  components: { FlowerSpinner, Successfull },
  data() {
    return {
      isLoading: false,
      isSuccessfull: false,
      errors: [],
      rules: {
        username: [
          v =>
            (v.length <= 20 && v.length >= 6) ||
            "Username needs to be between 6 and 20 characters"
        ],
        fullname: [v => v.length <= 250 || "Fullname is 250 max"],
        email: [v => v.length <= 250 || "Email is 250 max"],
        password: [
          v =>
            (v.length <= 20 && v.length >= 6) ||
            "Password needs to be between 6 and 20 characters"
        ],
        confirmPassword: [
          v => !!v || "You have to confirm your password",
          v => v === this.user.password || "Passwords are not the same"
        ]
      },
      createdUserId: "",
      user: {
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        desc: ""
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/loginStatus"];
    }
  },
  watch: {
    isLoggedIn(isLoggedIn) {
      if (isLoggedIn)
        this.$router.push({ name: "chatContacts", params: { tab: 0 } });
    }
  },
  mounted() {
    if (this.isLoggedIn)
      this.$router.push({ name: "chatContacts", params: { tab: 0 } });
  },
  methods: {
    async submit() {
      try {
        this.isLoading = true;
        this.errors = [];
        let isValid = true;

        for (let x in this.user) {
          let rules = this.rules[x];

          if (rules)
            rules.forEach(rule => {
              let result = rule(this.user[x]);
              if (result !== true) {
                isValid = false;
                this.errors.push(result);
              }
            });
        }
        if (isValid) {
          const response = await api.user.postUser(this.user);
          this.createdUserId = response.data._id;
          this.isSuccessfull = true;
        }
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
        const errors = err.response.data.errors;
        for (let error in errors) {
          this.errors.push(errors[error].message);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-up {
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

  .error-list,
  .btn--default {
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