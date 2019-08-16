<template>
  <div class="chat-contacts">
    <avatar-wrapper class="chat-contacts__avatar-wrapper" :initials="initials">
      <h4>{{name}}</h4>
    </avatar-wrapper>
    <tab-switcher
      class="chat-contacts__tab-switcher"
      @tabs-switched="activeTab = tabs[i]"
      :tabs="tabs"
    />
  </div>
</template>

<script>
import AvatarWrapper from "../components/Avatars/AvatarWrapper";
import TabSwitcher from "../components/TabSwiitcher";

export default {
  components: {
    AvatarWrapper,
    TabSwitcher
  },
  computed: {
    name() {
      return this.$store.getters["auth/user"].fullname.split(" ")[0];
    },
    initials() {
      const split = this.$store.getters["auth/user"].fullname.split(" ");
      return `${split[0][0]}${split[split.length - 1][0]}`;
    }
  },
  data() {
    return {
      activeTab: null,
      tabs: [
        { name: "contacts", isActive: false },
        { name: "find new friends", isActive: false },
        { name: "groups", isActive: false }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.chat-contacts {
  &__avatar-wrapper {
    max-width: 100%;
    width: 125px;
    margin: 20px;
  }
  &__tab-switcher {
    margin: 30px 0;
  }
}
</style>