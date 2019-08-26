<template>
  <ul class="tab-switcher">
    <button
      class="btn btn--raw capitalize"
      v-for="(tab,i) in tabs"
      :class="{'active': tab.isActive}"
      :key="tab.name"
      @click="activateButton(i)"
    >{{tab.name}}</button>
  </ul>
</template>

<script>
export default {
  mounted() {
    if (!this.tabs.some(tab => tab.isActive)) this.activateButton(0);
  },
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    activateButton(i) {
      this.tabs.map(tab => (tab.isActive = false));
      this.tabs[i].isActive = true;
      this.$emit("tab-switched", i);
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-switcher {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .btn {
    margin: 0 5px;
  }
  .btn:hover {
    color: $AccentColor1;
  }
  * {
    color: $MainFontColor;
  }
}
</style>