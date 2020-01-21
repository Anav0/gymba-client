<template>
  <div
    class="verification"
    :class="{
      'verification--success': !hasErrors,
      'verification--failed': hasErrors && !isLoading
    }"
  >
    <spring-spinner
      v-if="isLoading"
      class="center"
      :animation-duration="1000"
      :size="150"
      color="#fff"
    />
    <div v-else>
      <div class="verification__icon-header">
        <h1 class="verification__success-header capitalize">
          {{
            `${$t(`verification-${hasErrors ? "failed" : "success"}-header`)}`
          }}
        </h1>
        <fa-icon
          class="verification__check-circle"
          :icon="hasErrors ? 'times' : 'check'"
        ></fa-icon>
      </div>
      <p class="verification__verification-info" v-if="!hasErrors">
        {{ $t("verification-success-desc") }}
      </p>
      <ul class="error-list" v-else>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { SpringSpinner } from "epic-spinners";
export default {
  components: {
    SpringSpinner
  },
  data() {
    return {
      errors: [],
      isLoading: true
    };
  },
  async mounted() {
    try {
      await api.auth.verifyAccount(
        this.$route.params.id,
        this.$route.params.token
      );
    } catch (errors) {
      console.log(errors);
      this.errors = errors;
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length !== 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 20px;
  max-width: 450px;
  min-height: 650px;
  text-align: center;
  border-radius: 10px;
  transform: translateY(40px);
  font-size: $font-size-larger;
  &--success {
    background-color: $NeonGreen;
  }
  &--failed {
    background-color: $HarshAlert;
  }
  .error-list {
    color: $White;
  }
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

  &__verification-info {
    color: $White;
  }
  &__check-circle {
    font-size: 250px;
    color: $White;
    margin-top: 2rem;
  }
  &__success-header {
    color: $White;
  }
  &__success-btn {
    color: $White;
    border-color: $White;
    background: transparent;
    box-shadow: none;
  }
}
</style>
