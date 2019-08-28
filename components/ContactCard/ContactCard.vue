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
              :options="['fullname','desc']"
              icon="angle-down"
              placeholder="Filter by..."
              @selectionChanged="sort"
            />
          </transition>
        </div>

        <fa-icon
          class="contact-card__icon"
          :icon="isSearching ?  'times' : 'search'"
          @click="isSearching=!isSearching"
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
      @input="search($event.target.value)"
      :placeholder="$i18n.t('contact-card-search')"
    />

    <ul v-if="!isLoading " class="contact-card__viewmodels">
      <template v-if="selectedTab===0">
        <contact-card-conversation
          v-for="conversation in conversations"
          :key="conversation._id"
          :conversation="conversation"
        />
      </template>
      <template v-if="selectedTab===1">
        <contact-card-invitation
          v-for="viewmodel in filteredViewModels"
          :key="viewmodel.user._id"
          :invitationId="viewmodel.invitationId"
          :user="viewmodel.user"
          @invitationSend="(id)=>viewmodel.invitationId = id"
        />
      </template>
      <template v-if="selectedTab===2">
        <contact-card-decide
          v-for="viewmodel in filteredViewModels"
          :key="viewmodel.user._id"
          :user="viewmodel.user"
          :invitationId="viewmodel.invitationId"
          @invitationSend="(id)=>viewmodel.invitationId = id"
          @reloadInvitations="$emit('reloadInvitations')"
        />
      </template>
    </ul>
    <spring-spinner
      v-else
      class="contact-card__center"
      :animation-duration="1000"
      :size="50"
      color="#fcd87d"
    />
    <h4
      class="contact-card__center"
      v-if="viewmodels.length === 0 && conversations.length === 0 && !isLoading"
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
      isSearching: false,
      isFiltering: false,
      filteredViewModels: []
    };
  },
  watch: {
    viewmodels(value) {
      this.filteredViewModels = value;
    },
    isSearching(value) {
      this.filteredViewModels = this.viewmodels;
      if (value) this.$nextTick(() => this.$refs.contactCardInput.focus());
    }
  },
  methods: {
    sort(selected) {
      this.filteredViewModels.sort(
        (a, b) => a.user[selected] > b.user[selected]
      );
    },
    search(phrase) {
      phrase = phrase.toLowerCase().trim();
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