<template>
  <div id="app">
    <navbar></navbar>
    <router-view class="app-content" />
    <div class="credits">
      <h4>{{$t('made-with')}}</h4>
      <font-awesome-icon class="credits__icon" icon="tint" />
      <h4>{{$t('by-me')}}</h4>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
.credits {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: $font-weight-regular;
  padding-bottom: 50px;
  &__icon {
    color: $Alert;
    margin: 0px 10px;
  }
}
</style>
