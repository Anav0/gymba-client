<template>
  <div class="bars">
    <div class="bars__bar bars__bar--long"></div>
    <div class="bars__bar bars__bar" :class="{'bars__bar--long': isCrossed}"></div>
    <div class="bars__bar bars__bar--long"></div>
  </div>
</template>

<script>
export default {
  props: {
    isCrossed: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.bars {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  z-index: 1;
  min-height: 20px;
  max-height: 100%;

  &__bar {
    height: 2px;
    width: 20px;

    max-height: 100%;
    background-color: $White;
    transition: transform 0.2s ease-in-out;

    &--long {
      transform: scaleX(1.5);
      transform-origin: left;
    }
  }
}
</style>