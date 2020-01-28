<template>
  <div class="tooltip" @mouseover="startCouting" @mouseleave="stopCouting">
    <slot></slot>
    <div
      class="tooltip__tip"
      :class="{
        'tooltip__tip--bottom': direction == 'bottom' && showTip,
        'tooltip__tip--top': direction == 'top' && showTip,
        'tooltip__tip--left': direction == 'left' && showTip,
        'tooltip__tip--right': direction == 'right' && showTip
      }"
    >
      {{ tip }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      require: true
    },
    direction: {
      type: String,
      default: "bottom"
    },
    showAfter: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showTip: true,
      timeoutId: null
    };
  },
  methods: {
    startCouting() {
      this.timeoutId = setTimeout(() => {
        this.showTip = true;
        console.log("awdadwdaw");
        clearTimeout(this.timeoutId);
      }, this.showAfter);
    },
    stopCouting() {
      clearTimeout(this.timeoutId);
      this.showTip = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;

  &__tip {
    position: absolute;
    font-size: 0.95rem;
    text-align: center;
    background: $White;
    padding: 5px 5px;
    min-width: 50px;
    border-radius: 10px;
    opacity: 0;
    color: $MainFontColor;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-in-out;
    z-index: 5;

    &--bottom {
      opacity: 1;
      top: auto;
      transform: translate(-50%, 0);
    }
    &--top {
      opacity: 1;
    }
    &--left {
      opacity: 1;
    }
    &--right {
      opacity: 1;
    }
  }
}
</style>
