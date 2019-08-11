<template>
  <div class="landing">
    <greeting id="greeting" />
    <features id="features" />
    <contact id="contact" />
  </div>
</template>

<script>
import features from "./features";
import contact from "./contact";
import greeting from "./greeting";

export default {
  components: {
    features,
    contact,
    greeting
  }
};
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
}
</style>