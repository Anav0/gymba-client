<template>
  <div class="navbar">
    <logo></logo>
    <img class="navbar__menu" src="../assets/icons/menu-cut.svg" />
  </div>
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
  display: flex;
  justify-content: space-between;
}
</style>