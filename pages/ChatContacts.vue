<template>
  <div class="chat-contacts">
    <avatar-wrapper
      avatarUrl="https://source.unsplash.com/random"
      class="chat-contacts__avatar-wrapper"
      :initials="initials"
    >
      <h4>{{name}}</h4>
    </avatar-wrapper>
    <tab-switcher class="chat-contacts__tab-switcher" @tab-switched="switchTabs" :tabs="tabs" />
    <contact-card
      :contacts="friends"
      :suggestedUsers="suggesstions"
      :header="contactCardHeader"
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
  mounted() {},
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
      contactCardHeader: "",
      tabs: [
        { name: "contacts", isActive: false },
        { name: "find new friends", isActive: false },
        { name: "groups", isActive: false }
      ],
      friends: [],
      suggesstions: []
    };
  },
  methods: {
    loadFriends() {
      this.friends = [];
      const friedsIds = this.$store.getters["auth/user"].friends;
      friedsIds.forEach(id => {
        const friend = api.users.getUser(id);
        this.friends.push(friend);
      });
    },
    async suggestFriends() {
      this.suggesstions = [];
    },
    async loadPotentialFriends() {
      try {
        this.friends = [];
        const response = await api.user.getSendInvitations("target");
        response.data.forEach(invitation => {
          invitation.target.invitationId = invitation._id;
          this.friends.push(invitation.target);
        });
      } catch (err) {
        console.error(err);
      }
    },
    async suggestPotentialFriends() {
      this.clearSuggestions();
      const response = await api.user.getSuggestedContacts();
      this.suggesstions = response.data;
      this.friends.push(...this.suggesstions);
    },
    loadInvites() {
      this.friends = [];
    },
    clearSuggestions() {
      this.suggesstions = [];
    },
    switchTabs(i) {
      this.activeTab = i;
      switch (this.activeTab) {
        default:
        case 0:
          this.contactCardHeader = "Favorite contacts";
          this.loadFriends();
          this.suggestFriends();
          break;
        case 1:
          this.contactCardHeader = "Users you might know";
          this.loadPotentialFriends();
          this.suggestPotentialFriends();
          break;
        case 2:
          this.contactCardHeader = "Groups";
          this.loadInvites();
          this.clearSuggestions();
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