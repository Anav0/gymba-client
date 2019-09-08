<template>
  <ul class="tab-switcher">
    <router-link
      class="btn btn--raw capitalize"
      v-for="(tab,i) in tabs"
      :key="tab"
      :to="`/chat/${i}`"
    >{{tab}}</router-link>
  </ul>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-switcher {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  a {
    color: $MainFontColor;
  }
  .router-link-active {
    color: $AccentColor1;
  }
  .btn {
    margin: 0 5px;
  }
  .btn:hover {
    color: $AccentColor1;
  }
}
</style>