<template>
  <div class="logo" href="/">
    <img class="logo__icon" src="../assets/icons/logo.svg" />
    <router-link tag="h2" to="/" class="logo__text">{{$t('app-name')}}</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  &__text {
    color: $White;
    cursor: pointer;
  }

  &__icon {
    width: 100%;
    height: 100%;
    margin-right: 5px;
  }
}
</style>