<template>
  <div class="g-select">
    <div @click="isExpanded = !isExpanded" class="g-select__selection card">
      <span>{{selected}}</span>
      <fa-icon class="g-select__caret" :icon="icon" />
    </div>
    <transition v-if="isExpanded" name="fade">
      <div class="g-select__options card">
        <ul>
          <li
            class="g-select__option"
            v-for="(option,i) in options"
            @click="selectItem(i)"
            :key="option"
          >{{option}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  mounted() {
    this.selected = this.placeholder;
  },
  methods: {
    selectItem(i) {
      this.selected = this.options[i];
      this.$emit("selectionChanged", this.selected);
      this.isExpanded = false;
    }
  },
  data() {
    return {
      isExpanded: false,
      selected: ""
    };
  },
  props: {
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
  z-index: 100;

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