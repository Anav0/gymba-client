<template>
  <nav class="navbar">
    <logo class="navbar__logo"></logo>
    <div class="navbar__menu--desktop">
      <router-link tag="button" to="/#features" class="btn btn--raw">{{$t('navbar-features')}}</router-link>
      <router-link tag="button" to="/#contact" class="btn btn--raw">{{$t('navbar-contact')}}</router-link>
      <router-link
        v-if="!user.fullname"
        tag="button"
        to="/sign-in"
        class="btn btn--outline"
      >{{$t('sign-in')}}</router-link>
      <router-link
        v-if="!user.fullname"
        tag="button"
        to="/sign-up"
        class="btn btn--long"
      >{{$t('sign-up')}}</router-link>
      <transition v-if="user.fullname">
        <router-link class="navbar__user-wrapper btn btn--raw" tag="button" to="/chat/0/profile">
          <fa-icon class="navbar__user-icon" icon="user" />
          <span class="navbar__user-fullname">{{user.fullname}}</span>
        </router-link>
      </transition>
    </div>
  </nav>
</template>

<script>
import Logo from "./Logo";

export default {
  components: {
    Logo
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  z-index: 1;
  padding: 50px;

  @media (max-width: $xsm) {
    padding: 20px 30px;
  }

  .btn {
    text-transform: capitalize;
  }

  .slide-in {
    transform: translateY(0);
  }
  &__logo {
    width: 35px;
  }
  &__bars-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;

    @media (min-width: $sm) {
      display: none;
    }
  }
  &__menu--desktop {
    display: none;
    align-items: center;
    justify-content: flex-end;

    .btn--long {
      background-color: $White;
      color: $AccentColor1;
    }
    .btn--outline {
      color: $White;
      border-color: $White;
    }
  }
  &__user-wrapper {
    color: $White;
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
  @media (min-width: $sm+100px) {
    &__menu--desktop {
      * {
        margin: 0 10px;
      }
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>