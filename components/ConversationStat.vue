<template>
  <div class="conversation-stat">
    <fa-icon class="conversation-stat__icon" :icon="icon" />
    <h4>{{text}}</h4>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation-stat {
  display: flex;
  align-items: center;
  width: 100%;

  &__icon {
    font-size: $icon-size-large;
    margin-right: 15px;
  }
}
</style>