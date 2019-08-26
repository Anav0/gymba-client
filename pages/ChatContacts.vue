<template>
  <div class="chat-contacts">
    <avatar-wrapper
      avatarUrl="https://source.unsplash.com/random/96x96"
      class="chat-contacts__avatar-wrapper"
      :initials="initials"
    >
      <router-link tag="h4" to="/chat/profile">{{name}}</router-link>
    </avatar-wrapper>
    <tab-switcher class="chat-contacts__tab-switcher" @tab-switched="switchTabs" :tabs="tabs" />
    <contact-card
      :viewmodels="friends"
      :suggestedUsers="suggesstions"
      :header="contactCardHeader"
      :selectedTab="activeTab"
      @reload-invitations="loadInvites"
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
      activeTab: 0,
      isLoading: true,
      contactCardHeader: "",
      tabs: [
        { name: this.$i18n.t("chat-tab-contact"), isActive: false },
        { name: this.$i18n.t("chat-tab-new-friends"), isActive: false },
        { name: this.$i18n.t("chat-tab-invites"), isActive: false }
      ],
      friends: [],
      suggesstions: []
    };
  },
  methods: {
    loadFriends() {
      this.isLoading = true;

      this.friends = [];
      this.suggesstions = [];
      const friedsIds = this.$store.getters["auth/user"].friends;
      friedsIds.forEach(async id => {
        const response = await api.users.getUser(id);
        this.friends.push({
          isLoading: false,
          user: response.data
        });
      });
      this.isLoading = false;
    },
    async loadPotentialFriends() {
      try {
        this.isLoading = true;

        this.friends = [];
        this.suggesstions = [];
        let response = await api.invite.getSendInvitations("target");
        response.data.forEach(invitation => {
          this.friends.push({
            isLoading: false,
            invitationId: invitation._id,
            user: invitation.target
          });
        });
        response = await api.user.getSuggestedContacts();
        this.suggesstions = response.data;
        response.data.forEach(user => {
          this.friends.push({
            isLoading: false,
            invitationId: null,
            user
          });
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async loadInvites() {
      try {
        this.isLoading = true;
        this.friends = [];
        this.suggesstions = [];
        const response = await api.invite.getRecivedInvitations("sender");
        response.data.forEach(invitation => {
          this.friends.push({
            isLoading: false,
            invitationId: invitation._id,
            user: invitation.sender
          });
        });
      } catch (err) {
        console.error(err);
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
          this.loadFriends();
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
  max-height: 100%;

  &__avatar-wrapper {
    cursor: pointer;
    max-width: 100%;
    width: 125px;
    margin: 20px;
  }
  &__tab-switcher {
    margin: 30px 0;
  }
  &__contact-card {
    min-height: 100vh;
  }
}
</style>