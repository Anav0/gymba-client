<template>
  <div class="chat-contacts">
    <avatar-wrapper
      :avatar-url="avatarUrl"
      class="chat-contacts__avatar-wrapper"
      :initials="fullname | getInitials"
      @click.native="goToUserProfile"
    >
      <h4>{{ name }}</h4>
    </avatar-wrapper>
    <tab-switcher
      class="chat-contacts__tab-switcher"
      :tabs="tabs"
      @tab-switched="switchTabs"
    />
    <contact-card
      :viewmodels="friends"
      :conversations="conversations"
      :suggested-users="suggestions"
      :header="contactCardHeader"
      :selected-tab="activeTab"
      :is-loading="isLoading"
      class="chat-contacts__contact-card"
    />
  </div>
</template>

<script>
import AvatarWrapper from "../components/Avatars/AvatarWrapper";
import TabSwitcher from "../components/TabSwiitcher";
import ContactCard from "../components/ContactCard/ContactCard";
import api from "../api";
import eventHandler from "../src/eventHandler";

export default {
  components: {
    AvatarWrapper,
    TabSwitcher,
    ContactCard
  },
  created() {
    eventHandler.$on("invitation-accepted", () => {
      this.loadInvites();
      this.loadConversations();
    });

    eventHandler.$on("invitation-rejected", () => {
      this.loadInvites();
    });
  },
  data() {
    return {
      activeTab: 0,
      isLoading: true,
      contactCardHeader: "",
      tabs: [
        this.$i18n.t("chat-tab-contact"),
        this.$i18n.t("chat-tab-new-friends"),
        this.$i18n.t("chat-tab-invites")
      ],
      friends: [],
      conversations: [],
      suggestions: []
    };
  },
  computed: {
    name() {
      return this.$store.getters["auth/user"].fullname.split(" ")[0];
    },
    fullname() {
      return this.$store.getters["auth/user"].fullname;
    },
    avatarUrl() {
      return this.$store.getters["auth/user"].avatarUrl;
    }
  },
  watch: {
    $route(to) {
      if (to.params.tab) this.switchTabs(+to.params.tab);
    }
  },
  mounted() {
    if (this.$route.params.tab) this.switchTabs(+this.$route.params.tab);
    else this.switchTabs(0);
  },
  methods: {
    goToUserProfile() {
      console.log(window.innerWidth);
      if (window.innerWidth < 480)
        return this.$router.push({ name: "chatProfileMobile" });

      return this.$router.push({ name: "chatProfile" });
    },
    clearData() {
      this.friends = [];
      this.conversations = [];
      this.suggestions = [];
    },
    loadConversations() {
      this.isLoading = true;
      this.clearData();
      const conversationIds = this.$store.getters["auth/user"].conversations;

      conversationIds.forEach(async id => {
        const response = await api.conversation.getConversation(id);
        this.conversations.push(response.data);
      });
      this.isLoading = false;
    },
    async loadPotentialFriends() {
      try {
        this.isLoading = true;
        this.clearData();
        let response = await api.invite.getSendInvitations("target");
        response.data.forEach(invitation => {
          this.friends.push({
            isLoading: false,
            invitationId: invitation._id,
            user: invitation.target
          });
        });
        response = await api.user.getSuggestedContacts();
        this.suggestions = response.data;
        response.data.forEach(user => {
          this.friends.push({
            isLoading: false,
            invitationId: null,
            user
          });
        });
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      } finally {
        this.isLoading = false;
      }
    },
    async loadInvites() {
      try {
        this.isLoading = true;
        this.clearData();
        const response = await api.invite.getRecivedInvitations("sender");
        response.data.forEach(invitation => {
          this.friends.push({
            isLoading: false,
            invitationId: invitation._id,
            user: invitation.sender
          });
        });
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      } finally {
        this.isLoading = false;
      }
    },
    switchTabs(i) {
      this.activeTab = i;
      switch (this.activeTab) {
        default:
        case 0:
          this.contactCardHeader = this.$i18n.t(
            "contacts-conversations-header"
          );
          this.loadConversations();
          break;
        case 1:
          this.contactCardHeader = this.$i18n.t("contacts-friends-header");
          this.loadPotentialFriends();
          break;
        case 2:
          this.contactCardHeader = this.$i18n.t("contacts-invites-header");
          this.loadInvites();
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-contacts {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  @media (min-width: $md) {
    padding-top: 20px;
    min-width: 328px;
  }
  &__avatar-wrapper {
    cursor: pointer;
    max-width: 100%;
    width: 125px;
    margin: 20px;
    @media (min-width: $md) {
      display: none;
    }
  }
  &__tab-switcher {
    @media (min-width: $md) {
      display: none;
    }
    margin: 30px 0;
  }
  &__contact-card {
    height: 100%;
  }
}
</style>
