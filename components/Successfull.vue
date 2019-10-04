<template>
  <div class="successfull">
    <div class="successfull__icon-header">
      <fa-icon class="successfull__check-circle" icon="check-circle"></fa-icon>
      <h1 class="successfull__success-header capitalize">{{`${$t('successfull-success')}!`}}</h1>
    </div>
    <p class="successfull__verification-info" v-if="errors.length===0">{{$t('successfull-info')}}</p>
    <ul class="error-list" v-else>
      <li v-for="error in errors" :key="error">{{error}}</li>
    </ul>
    <div class="successfull__transitions">
      <transition name="fade">
        <div v-if="!isLoading" class="successfull__buttons">
          <router-link
            tag="button"
            to="sign-in"
            class="successfull__success-btn btn btn--outline capitalize"
          >{{$t('sign-in')}}</router-link>
          <button
            @click="resendVerificationEmail"
            class="btn btn--raw capitalize"
          >{{$t('successfull-resend')}}</button>
        </div>
      </transition>
      <transition name="fade">
        <flower-spinner v-if="isLoading" :animation-duration="1500" :size="60" color="#fa8072" />
      </transition>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { FlowerSpinner } from "epic-spinners";
export default {
  components: {
    FlowerSpinner
  },

  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      errors: []
    };
  },
  methods: {
    async resendVerificationEmail() {
      try {
        this.isLoading = true;
        await api.auth.resendVerificationEmail(this.userId);
        this.$toasted.show(this.$i18n.t("resend-link-success"), {
          className: "info-toast"
        });
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
        this.errors = err.response.data.errors;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.successfull {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  min-height: 560px;
  text-align: center;

  &__icon-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__transitions {
    position: relative;
    width: 100%;
    height: 75px;
  }
  .flower-spinner,
  &__buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn--raw {
      color: $LightGray;
      margin-top: 10px;
    }
  }
  &__verification-info {
    color: $Alert;
    font-size: $font-size-extra-regular;
  }
  &__check-circle {
    font-size: 144px;
    color: $NeonGreen;
  }
  &__success-header {
    color: $NeonGreen;
    margin-top: 10px;
  }
  &__success-btn {
    color: $NeonGreen;
    border-color: $NeonGreen;
    background: transparent;
    box-shadow: none;
  }
}
</style>