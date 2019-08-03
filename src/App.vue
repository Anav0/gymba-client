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
  width: 100%;
  height: 100%;
  padding: 50px;
  background-image: url("../assets/images/background-wave.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 150%;

  @media (max-width: $xsm) {
    padding: 20px 30px;
  }
}
.app-content {
  width: 100%;
  height: 100%;
}
</style>
