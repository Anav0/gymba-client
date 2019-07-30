<template>
  <div id="app">
    <navbar></navbar>
    <router-view class="app-content" />
  </div>
</template>
<script>
import navbar from "../components/NavBar";

export default {
  components: {
    navbar
  }
};
</script>

<style lang="scss">
#app {
  background: $LinearGradient;
  width: 100%;
  height: 100%;
  padding: 50px;

  @media (max-width: $xsm) {
    padding: 20px 30px;
  }
}
.app-content {
  width: 100%;
  height: 100%;
}
</style>
