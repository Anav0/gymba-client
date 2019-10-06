<template>
  <section class="greeting landing-page-section">
    <div class="greeting__content">
      <h1 class="greeting__marketing">{{$t('greeting-marketing-pitch')}}</h1>
      <div v-if="!user.fullname" class="greeting__buttons">
        <router-link tag="button" to="/sign-up" class="btn btn--default">{{$t('sign-up')}}</router-link>
        <router-link tag="button" to="/sign-in" class="btn btn--outline">{{$t('sign-in')}}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style lang="scss" scoped>
.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  &__user-wrapper {
    color: $AccentColor2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__user-icon {
    font-size: $icon-size-large;
  }
  &__user-fullname {
    font-size: $font-size-larger;
  }
  @media (min-width: $md) and (max-width: $lg) {
    margin-bottom: 350px;
  }

  @media (min-width: $lg) {
    min-height: 100vh;
  }

  @media (min-width: $sm) and (max-width: $md) {
    justify-content: flex-start;
    margin-bottom: 150px;
  }
  @media (max-width: $sm) {
    min-height: 100vh;
  }
  &__content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    > :first-child {
      margin-bottom: 100px;
    }

    @media (min-width: $sm) {
      justify-content: flex-start;
    }
  }
  .btn {
    text-transform: capitalize;
  }

  .btn--outline {
    color: $AccentColor1;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    * {
      margin-bottom: 25px;
    }
    @media (min-width: $sm) {
      display: none;
    }
  }
  &__marketing {
    color: $White;
    text-align: center;
    max-width: 600px;

    @media (max-width: $sm) {
      font-size: $font-size-h2;
      color: $AccentColor1;
    }
  }
}
</style>