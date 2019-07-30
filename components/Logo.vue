<template>
  <div class="logo">
    <img class="logo__icon" src="../assets/icons/logo.svg" />
    <h2 class="logo__text">Gymba</h2>
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
    color: white;
  }

  &__icon {
    margin-right: 5px;
    width: 35px;
  }
}
</style>