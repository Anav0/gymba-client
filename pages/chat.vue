<template>
  <div class="chat">
    <fa-icon
      v-if="this.$route.path !== '/chat'"
      class="chat__go-back-arrow"
      icon="angle-left"
      @click="$router.go(-1)"
    />
    <chat-side-nav />
    <router-view />
    <conversation />
    <chat-user-profile />
  </div>
</template>

<script>
import ChatSideNav from "../components/chat/ChatSideNav";
import conversation from "../components/chat/conversation";
import ChatFriendProfile from "../components/chat/ChatFriendProfile";
import ChatUserProfile from "../components/chat/ChatUserProfile";
export default {
  components: {
    conversation,
    ChatSideNav,
    ChatFriendProfile,
    ChatUserProfile
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