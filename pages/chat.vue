<template>
  <div class="chat">
    <fa-icon
      v-if="this.$route.path !== '/chat'"
      class="chat__go-back-arrow"
      icon="angle-left"
      @click="$router.go(-1)"
    />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.chat {
  position: relative;

  &__go-back-arrow {
    font-size: $icon-size-extra-large;
    color: $chat-go-back-arrow;
    z-index: 1;
    cursor: pointer;
    position: fixed;
    left: 0;
    top: 0;
    margin-top: 30px;
    margin-left: 30px;
  }
}
</style>