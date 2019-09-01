<template>
  <div class="text-icon">
    <fa-icon class="text-icon__icon" :icon="icon"></fa-icon>
    <span class="capitalize">{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "times"
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.text-icon:hover {
  -webkit-animation: jello-horizontal 0.6s both;
  animation: jello-horizontal 0.6s both;
  animation-delay: 0s;
}
.text-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &__icon {
    font-size: $icon-size-extra-medium;
    margin-bottom: 5px;
  }
}
</style>