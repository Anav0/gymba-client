<template>
  <div class="logo">
    <img class="logo__icon" src="../assets/icons/logo.svg" />
    <h2 class="logo__text">{{$t('app-name')}}</h2>
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
  }

  &__icon {
    width: 100%;
    height: 100%;
    margin-right: 5px;
  }
}
</style>