<template>
  <div class="contact-card">
    <div class="contact-card__toolbar">
      <h4 class="contact-card__header">{{ header }}</h4>
      <div class="contact-card__toolbar">
        <div class="contact-card__select-wrapper">
          <fa-icon
            class="contact-card__icon"
            icon="sort-amount-up-alt"
            @click="isFiltering = !isFiltering"
          />
          <g-select
            v-if="isFiltering"
            :options="sortingOptions"
            :selected-option-index.sync="selectedSortingOptionIndex"
            icon="angle-down"
            placeholder="Filter by..."
            @clickOutside="isFiltering = !isFiltering"
            @selectionChanged="sort"
          />
        </div>

        <fa-icon
          class="contact-card__icon"
          :icon="isSearching ? 'times' : 'search'"
          @click="toggleSearch"
        />
      </div>
    </div>
    <ul
      v-if="!isLoading && suggestedUsers.length > 0"
      v-show="!isSearching"
      class="contact-card__suggestions"
    >
      <li
        v-for="(user, i) in suggestedUsers"
        :key="`contact-card-${user._id}`"
        class="contact-card__suggestion"
        @click="showUserProfile(user._id)"
      >
        <avatar
          :avatar-url="user.avatarUrl"
          :initials="user.fullname | getInitials"
          :userId="user._id"
        />
        <span>{{ user.fullname | getFirstname }}</span>
      </li>
    </ul>
    <input
      v-show="isSearching"
      ref="contactCardInput"
      v-model="searchPhrase"
      class="contact-card__search"
      :placeholder="$i18n.t('contact-card-search')"
      @input="search($event.target.value)"
    />

    <ul v-if="!isLoading" class="contact-card__viewmodels">
      <template v-if="selectedTab === 0">
        <contact-card-conversation
          v-for="conversation in filteredConversations"
          :key="`contact-card-conversation-${conversation._id}`"
          :conversation="conversation"
          @click.native="showConversation(conversation)"
        />
      </template>
      <template v-if="selectedTab === 1">
        <contact-card-invitation
          v-for="viewmodel in filteredViewModels"
          :key="'contact-card-invitation' + viewmodel.user._id"
          :invitation-id="viewmodel.invitationId"
          :user="viewmodel.user"
          @wasClicked="showUserProfile(viewmodel.user._id)"
          @invitationStatusChanged="id => (viewmodel.invitationId = id)"
        />
      </template>
      <template v-if="selectedTab === 2">
        <contact-card-decide
          v-for="viewmodel in filteredViewModels"
          :key="'contact-card-decide' + viewmodel.user._id"
          :user="viewmodel.user"
          :invitation-id="viewmodel.invitationId"
          @wasClicked="showUserProfile(viewmodel.user._id)"
          @invitationStatusChanged="id => (viewmodel.invitationId = id)"
        />
      </template>
    </ul>
    <spring-spinner
      v-else
      class="center"
      :animation-duration="1000"
      :size="50"
      color="#fcd87d"
    />
    <h4
      v-if="
        filteredViewModels.length === 0 &&
          filteredConversations.length === 0 &&
          !isLoading
      "
      class="center"
    >
      {{ $t("contact-card-no-result") }}
    </h4>
  </div>
</template>

<script>
import { SpringSpinner } from "epic-spinners";
import Avatar from "../Avatars/Avatar";
import GSelect from "../misc/GSelect";
import ContactCardDecide from "./ContactCardDecide";
import ContactCardInvitation from "./ContactCardInvitation";
import ContactCardConversation from "./ContactCardConversation";
import eventHandler from "../../src/eventHandler";

export default {
  components: {
    Avatar,
    GSelect,
    SpringSpinner,
    ContactCardDecide,
    ContactCardInvitation,
    ContactCardConversation
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    selectedTab: {
      type: Number,
      required: true
    },
    header: {
      type: String,
      default: "contact"
    },
    suggestedUsers: {
      type: Array,
      required: true
    },
    viewmodels: {
      type: Array,
      required: true
    },
    conversations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchPhrase: "",
      selectedSortingOptionIndex: 0,
      sortingOptions: [
        { name: "Name", data: "fullname" },
        { name: "Bio", data: "desc" }
      ],
      isSearching: false,
      isFiltering: false,
      filteredViewModels: [],
      filteredConversations: []
    };
  },
  watch: {
    viewmodels(value) {
      this.filteredViewModels = value;
    },
    conversations(value) {
      this.filteredConversations = value;
    },
    isSearching(value) {
      this.filteredViewModels = this.viewmodels;
      if (value) this.$nextTick(() => this.$refs.contactCardInput.focus());
    }
  },
  mounted() {
    eventHandler.$on("new-invitation", invitation => {
      if (!invitation._id || !invitation.sender) return;
      const vm = this.viewmodels.find(
        viewmodel => viewmodel.user._id == invitation.sender
      );
      if (vm) vm.invitationId = invitation._id;
    });
  },
  methods: {
    toggleSearch() {
      this.isSearching = !this.isSearching;
      this.searchPhrase = "";
      this.filteredViewModels = this.viewmodels;
      this.filteredConversations = this.conversations;
    },
    showConversation(conversation) {
      this.$store.dispatch("conversation/setActiveConversation", conversation);

      if (window.innerWidth < 400)
        this.$router.push({ name: "chatConversationMobile" });
    },
    showUserProfile(id) {
      if (window.innerWidth < 400)
        return this.$router.push({ name: "chatFriendMobile", params: { id } });
      return this.$router.push({ name: "chatFriend", params: { id } });
    },
    sort(selected) {
      this.filteredViewModels.sort(
        (a, b) => a.user[selected.data] > b.user[selected.data]
      );
    },
    search(phrase) {
      phrase = phrase.toLowerCase().trim();

      if (this.selectedTab === 0) return this.searchConversations(phrase);

      return this.searchViewModels(phrase);
    },
    searchConversations(phrase) {
      // TODO: make this search work
      if (!phrase) return (this.filteredConversations = this.conversations);
      this.filteredConversations = this.conversations.filter(conversation =>
        conversation.participants.includes(
          user =>
            user.fullname.toLowerCase().includes(phrase) ||
            user.desc.toLowerCase().includes(phrase)
        )
      );
    },
    searchViewModels(phrase) {
      if (!phrase) return (this.filteredViewModels = this.viewmodels);
      this.filteredViewModels = this.viewmodels.filter(
        viewmodel =>
          viewmodel.user.fullname.toLowerCase().includes(phrase) ||
          viewmodel.user.desc.toLowerCase().includes(phrase)
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
