<template>
  <div class="chat">
    <fa-icon
      v-if="isBackArrowVisible"
      class="chat__go-back-arrow"
      :class="{'chat__go-back-arrow--accent': $route.name==='chatConversationMobile'}"
      icon="angle-left"
      @click="$router.go(-1)"
    />
    <chat-side-nav class="chat-side-nav--desktop" />
    <router-view />
    <router-view name="conversation" />
  </div>
</template>
<script>
import ChatSideNav from "../components/chat/ChatSideNav";
import api from "../api";

export default {
  components: {
    ChatSideNav
  },
  computed: {
    isBackArrowVisible() {
      return (
        this.$route.name != "chatContacts" &&
        this.$route.name != "chatContactsMobile"
      );
    }
  },
  async mounted() {
    try {
      const {
        data: lastConversation
      } = await api.conversation.getLastConversation();
      this.$store.dispatch(
        "conversation/setActiveConversation",
        lastConversation
      );
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  position: relative;
  display: grid;
  grid-template-columns: 75px 2fr 7fr;
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
    @media (min-width: $sm) {
      display: none;
    }
    &--accent {
      color: $AccentColor2;
    }
    font-size: $icon-size-extra-large;
    color: $chat-go-back-arrow;
    z-index: 1;
    cursor: pointer;
    position: fixed;
    left: 25px;
    top: 20px;
  }
}
</style>