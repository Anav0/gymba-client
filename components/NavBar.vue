<template>
  <nav class="navbar">
    <logo></logo>
    <div class="navbar__bars-wrapper">
      <menu-bar :isCrossed="isMobileMenuVisible" @click.native="toggleMobileMenu"></menu-bar>
    </div>
    <div class="navbar__menu--desktop">
      <router-link tag="button" to="/features" class="btn btn--raw">{{$t('navbar-features')}}</router-link>
      <router-link tag="button" to="/contact" class="btn btn--raw">{{$t('navbar-contact')}}</router-link>
      <router-link tag="button" to="/sign-in" class="btn btn--outline">{{$t('sign-in')}}</router-link>
      <router-link tag="button" to="/sign-up" class="btn btn--long">{{$t('sign-up')}}</router-link>
    </div>
    <div class="navbar__menu--mobile" :class="{'slide-in': isMobileMenuVisible}"></div>
  </nav>
</template>

<script>
import Logo from "./Logo";
import MenuBar from "./MenuBar";

export default {
  components: {
    Logo,
    MenuBar
  },
  data() {
    return {
      isMobileMenuVisible: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  .btn {
    text-transform: capitalize;
  }
  .btn--long {
    background-color: $White;
    color: $AccentColor1;
  }
  .btn--outline {
    color: $White;
    border-color: $White;
  }

  .slide-in {
    transform: translateY(0);
  }
  &__bars-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
  }
  &__menu--desktop {
    display: none;
    align-items: center;
    justify-content: flex-end;
  }
  &__menu--mobile {
    background-color: red;
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    transition: transform 0.5s ease-in-out;
    transform: translateY(100vh);
  }

  @media (min-width: $sm) {
    &__menu--mobile,
    &__bars {
      display: none;
    }
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