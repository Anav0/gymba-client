<template>
  <div class="modal">
    <div class="modal__content card" v-on-clickaway="close">
      <section class="modal__header">
        <slot name="header"></slot>
      </section>
      <section class="modal__body">
        <slot name="body"></slot>
      </section>
      <section class="modal__footer">
        <slot name="footer"></slot>
      </section>
      <fa-icon icon="times" @click="close" class="modal__close-icon" />
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(black, 0.5);
  z-index: 10;
  &__close-icon:hover {
    color: $AccentColor1;
  }
  &__close-icon {
    color: $LightGray;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: $icon-size-extra-medium;
    cursor: pointer;
    transition: color $transition-duration-quick ease-in-out;
  }
  &__content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  &__header {
    width: 100%;
  }
  &__body {
    width: 100%;
    min-height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  &__footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > * {
      margin: 0 !important;
    }
  }
}
</style>