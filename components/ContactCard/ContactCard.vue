<template>
  <div class="contact-card">
    <div class="contact-card__toolbar">
      <h4 class="contact-card__header">{{header}}</h4>
      <div class="contact-card__toolbar">
        <div class="contact-card__select-wrapper">
          <fa-icon
            class="contact-card__icon"
            icon="sort-amount-up-alt"
            @click="isFiltering=!isFiltering"
          ></fa-icon>
          <transition v-if="isFiltering" name="fade">
            <g-select
              :options="[{name: 'Name', data: 'fullname'},{name: 'Bio', data: 'desc'}]"
              icon="angle-down"
              placeholder="Filter by..."
              @selectionChanged="sort"
            />
          </transition>
        </div>

        <fa-icon
          class="contact-card__icon"
          :icon="isSearching ?  'times' : 'search'"
          @click="toggleSearch"
        ></fa-icon>
      </div>
    </div>
    <ul
      v-if="!isLoading && suggestedUsers.length > 0"
      v-show="!isSearching"
      class="contact-card__suggestions"
    >
      <li
        class="contact-card__suggestion"
        v-for="(user, i) in suggestedUsers"
        :key="`contact-card-${user._id}`"
        @click="showUserProfile(user._id)"
      >
        <avatar
          :avatarUrl="i % 3 === 0 ? 'https://source.unsplash.com/random' : null"
          :initials="user.fullname | getInitials"
          :isOnline="i % 2 === 0 ? true : false"
        />
        <span>{{user.fullname | getFirstname}}</span>
      </li>
    </ul>
    <input
      v-show="isSearching"
      ref="contactCardInput"
      class="contact-card__search"
      v-model="searchPhrase"
      @input="search($event.target.value)"
      :placeholder="$i18n.t('contact-card-search')"
    />

    <ul v-if="!isLoading " class="contact-card__viewmodels">
      <template v-if="selectedTab===0">
        <contact-card-conversation
          v-for="conversation in filteredConversations"
          :key="`contact-card-conversation-${conversation._id}`"
          :conversation="conversation"
        />
      </template>
      <template v-if="selectedTab===1">
        <contact-card-invitation
          v-for="viewmodel in filteredViewModels"
          :key="'contact-card-invitation'+viewmodel.user._id"
          @wasClicked="showUserProfile(viewmodel.user._id)"
          :invitationId="viewmodel.invitationId"
          :user="viewmodel.user"
          @invitationSend="(id)=>viewmodel.invitationId = id"
        />
      </template>
      <template v-if="selectedTab===2">
        <contact-card-decide
          v-for="viewmodel in filteredViewModels"
          @wasClicked="showUserProfile(viewmodel.user._id)"
          :key="'contact-card-decide'+viewmodel.user._id"
          :user="viewmodel.user"
          :invitationId="viewmodel.invitationId"
          @invitationSend="(id)=>viewmodel.invitationId = id"
          @reloadInvitations="$emit('reloadInvitations')"
        />
      </template>
    </ul>
    <spring-spinner v-else class="center" :animation-duration="1000" :size="50" color="#fcd87d" />
    <h4
      class="center"
      v-if="filteredViewModels.length === 0 && filteredConversations.length === 0 && !isLoading"
    >{{$t('contact-card-no-result')}}</h4>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import GSelect from "../GSelect";
import api from "../../api";
import { SpringSpinner } from "epic-spinners";
import ContactCardDecide from "./ContactCardDecide";
import ContactCardInvitation from "./ContactCardInvitation";
import ContactCardConversation from "./ContactCardConversation";

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
  methods: {
    toggleSearch() {
      this.isSearching = !this.isSearching;
      this.searchPhrase = "";
      this.filteredViewModels = this.viewmodels;
      this.filteredConversations = this.conversations;
    },
    showUserProfile(id) {
      this.$router.push({ name: "chatFriend", params: { id } });
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
      //TODO: make this search work
      if (!phrase) return (this.filteredConversations = this.conversations);
      this.filteredConversations = this.conversations.filter(conversation => {
        return conversation.participants.includes(
          user =>
            user.fullname.toLowerCase().includes(phrase) ||
            user.desc.toLowerCase().includes(phrase)
        );
      });
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

<style lang="scss" scoped>
</style>