<template>
  <div class="chat">
    <fa-icon
      v-if="this.$route.name != 'chatContacts'"
      class="chat__go-back-arrow"
      icon="angle-left"
      @click="$router.go(-1)"
    />
    <chat-side-nav class="chat-side-nav--desktop" />
    <router-view />
    <conversation class="conversation--desktop" />
    <router-view name="rightSidePanel" />
  </div>
</template>
<script>
import ChatSideNav from "../components/chat/ChatSideNav";
import conversation from "../components/chat/conversation";
export default {
  components: {
    conversation,
    ChatSideNav
  }
};
</script>

<style lang="scss" scoped>
.chat {
  position: relative;
  display: grid;
  grid-template-columns: 75px 2fr 5fr 2fr;
  width: 100%;
  height: 100%;
  @media (max-width: $md) {
    grid-template-columns: 100%;
    .chat-side-nav--desktop,
    .conversation--desktop,
    .chat-friend-profile--desktop,
    .chat-user-profile--desktop {
      display: none;
    }
  }
  &__go-back-arrow {
    @media (min-width: $md) {
      display: none;
    }
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