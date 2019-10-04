<template>
  <div class="g-select" :class="{'g-select--border': border}" v-on-clickaway="close">
    <div @click="isExpanded = !isExpanded" class="g-select__selection card">
      <span>{{options[selectedOptionIndex].name}}</span>
      <fa-icon class="g-select__caret" :icon="icon" />
    </div>
    <transition name="fade">
      <div v-if="isExpanded" class="g-select__options card">
        <ul>
          <li
            class="g-select__option"
            v-for="(option,i) in options"
            :key="option.name+option.data"
            @click="selectItem(i)"
          >{{option.name}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  methods: {
    close() {
      this.$emit("clickOutside");
    },
    selectItem(i) {
      this.$emit("update:selectedOptionIndex", i);
      this.$emit("selectionChanged", this.options[i]);
      this.isExpanded = false;
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    selectedOptionIndex: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: "caret-down"
    },
    placeholder: {
      type: String,
      default: "Select item"
    },
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.g-select {
  color: $select-color;
  position: relative;
  cursor: pointer;
  z-index: 9;

  &:hover {
    .g-select__caret {
      color: $AccentColor1 !important;
    }
  }

  &--border {
    * {
      box-shadow: none;
      border-width: 1px;
    }
  }

  &__selection {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__caret {
    font-size: $icon-size-medium;
    margin-left: 10px;
    transition: color $transition-duration-quick ease-in-out;
  }
  &__option:hover {
    color: $AccentColor1;
  }
  &__option {
    padding: 10px 0;
    cursor: pointer;
  }
  &__options {
    ul,
    ol {
      list-style-type: none;
    }
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>