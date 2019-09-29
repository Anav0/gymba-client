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
      <transition>
        <router-link
          v-if="user.fullname"
          class="navbar__user-wrapper btn btn--raw"
          tag="button"
          to="/chat/0"
        >
          <fa-icon class="navbar__user-icon" icon="user" />
          <span class="navbar__user-fullname">{{user.fullname}}</span>
        </router-link>
      </transition>
    </div>
    <transition>
      <router-link
        v-if="user.fullname"
        class="navbar__user-wrapper--mobile btn btn--raw"
        tag="button"
        to="/chat-mobile/0"
      >
        <fa-icon class="navbar__user-icon" icon="user" />
      </router-link>
    </transition>
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
  display: flex;
  width: 100%;
  z-index: 1;
  padding: 50px 20px;
  justify-content: space-between;

  @media (min-width: $lg) {
    padding: 50px;
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
    width: 400px;
    @media (min-width: $sm) {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    @media (min-width: $md) {
      width: 500px;
    }
    @media (min-width: $lg) {
      width: 600px;
    }
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

    &--mobile {
      display: flex;

      @media (min-width: $sm) {
        display: none;
      }
    }
  }
  &__user-icon {
    font-size: $icon-size-large;
    margin-right: 20px;
  }
  &__user-fullname {
    font-size: $font-size-larger;
  }
}
</style>