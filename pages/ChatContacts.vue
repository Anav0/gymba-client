<template>
  <div class="chat-contacts">
    <avatar-wrapper
      avatarUrl="https://source.unsplash.com/random/96x96"
      class="chat-contacts__avatar-wrapper"
      :initials="fullname | getInitials"
    >
      <router-link tag="h4" :to="`/chat/${activeTab}/profile`">{{name}}</router-link>
    </avatar-wrapper>
    <tab-switcher class="chat-contacts__tab-switcher" @tab-switched="switchTabs" :tabs="tabs" />
    <contact-card
      :viewmodels="friends"
      :conversations="conversations"
      :suggestedUsers="suggestions"
      :header="contactCardHeader"
      :selectedTab="activeTab"
      @reloadInvitations="loadInvites"
      :isLoading="isLoading"
      class="chat-contacts__contact-card"
    ></contact-card>
  </div>
</template>

<script>
import AvatarWrapper from "../components/Avatars/AvatarWrapper";
import TabSwitcher from "../components/TabSwiitcher";
import ContactCard from "../components/ContactCard/ContactCard";
import api from "../api";

export default {
  components: {
    AvatarWrapper,
    TabSwitcher,
    ContactCard
  },
  mounted() {
    if (this.$route.params.tab) this.switchTabs(+this.$route.params.tab);
    else this.switchTabs(0);
  },
  computed: {
    name() {
      return this.$store.getters["auth/user"].fullname.split(" ")[0];
    },
    fullname() {
      return this.$store.getters["auth/user"].fullname;
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.tab) this.switchTabs(+to.params.tab);
    }
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
  methods: {
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
          this.contactCardHeader = "Favorite contacts";
          this.loadConversations();
          break;
        case 1:
          this.contactCardHeader = "Users you might know";
          this.loadPotentialFriends();
          break;
        case 2:
          this.contactCardHeader = "Recived invitations";
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