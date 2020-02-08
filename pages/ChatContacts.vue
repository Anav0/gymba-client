<template>
  <div class="chat-contacts">
    <avatar-wrapper
      :avatar-url="loggedUser.avatarUrl"
      class="chat-contacts__avatar-wrapper"
      :initials="loggedUser.fullname | getInitials"
      @click.native="goToUserProfile"
      :userId="loggedUser._id"
    >
      <h4>{{ loggedUser.fullname.split(" ")[0] }}</h4>
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
    loggedUser() {
      return this.$store.getters["auth/user"];
    }
  },
  watch: {
    $route(to) {
      if (to.params.tab) {
        this.clearData();
        this.switchTabs(+to.params.tab);
      }
    }
  },
  mounted() {
    if (this.$route.params.tab) this.switchTabs(+this.$route.params.tab);
    else this.switchTabs(0);

    eventHandler.$on("new-invitation", this.loadDataForTab);
    eventHandler.$on("someone-accepted-invitation", this.loadDataForTab);
    eventHandler.$on("invitation-accepted", this.loadDataForTab);
    eventHandler.$on("someone-rejected-invitation", this.loadDataForTab);
    eventHandler.$on("invitation-rejected", this.loadDataForTab);
  },
  methods: {
    loadDataForTab() {
      this.clearData();
      this.switchTabs(+this.$route.params.tab);
    },
    goToUserProfile() {
      if (window.innerWidth < 480)
        return this.$router.push({ name: "chatProfileMobile" });

      return this.$router.push({ name: "chatProfile" });
    },
    clearData() {
      this.friends = [];
      this.conversations = [];
      this.suggestions = [];
    },
    async loadConversations() {
      try {
        this.isLoading = true;
        this.clearData();
        const response = await api.conversation.getAllConversations(
          "participants"
        );
        this.conversations = response.data;
        this.isLoading = false;
      } catch (error) {
        this.$toasted.show("Error while loading conversations list");
      }
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
