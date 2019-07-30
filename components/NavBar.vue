<template>
  <nav class="navbar">
    <logo></logo>
    <div class="navbar__menu--mobile">
      <img src="../assets/icons/menu-cut.svg" />
    </div>
    <div class="navbar__menu--desktop">
      <router-link tag="button" to="/features" class="btn btn--raw">{{$t('navbar-features')}}</router-link>
      <router-link tag="button" to="/contact" class="btn btn--raw">{{$t('navbar-contact')}}</router-link>
      <router-link tag="button" to="/sign-in" class="btn btn--outline">{{$t('sign-in')}}</router-link>
      <router-link tag="button" to="/sign-up" class="btn btn--default">{{$t('sign-up')}}</router-link>
    </div>
  </nav>
</template>

<script>
import Logo from "./Logo";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;

  .btn {
    text-transform: capitalize;
  }
  .btn--default {
    background-color: $White;
    color: $AccentColor1;
  }
  .btn--outline {
    color: $White;
    border-color: $White;
  }
  &__menu--desktop {
    display: none;
  }
  &__menu--mobile {
    display: flex;
  }
  &__menu--mobile,
  &__menu--desktop {
    align-items: center;
    justify-content: flex-end;
  }
  @media (min-width: $sm) {
    .navbar {
      &__menu--mobile {
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
}
</style>