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
      <potential-contact
        v-for="viewmodel in filteredViewModels"
        :key="viewmodel.user.username"
        :user="viewmodel.user"
        :isLoading="viewmodel.isLoading"
      >
        <button
          class="btn capitalize"
          v-if="selectedTab===1 && !viewmodel.isLoading"
          @click="processInvitation(viewmodel)"
          :class="{'btn--outline': !viewmodel.invitationId, 'btn--default': viewmodel.invitationId}"
        >{{!viewmodel.invitationId ? 'invite' : 'cancel'}}</button>
        <div class="contact-card__icons" v-if="selectedTab===2">
          <fa-icon
            class="contact-card__icon--invite"
            icon="times"
            @click="rejectInvitation(viewmodel)"
          />
          <fa-icon
            class="contact-card__icon--invite"
            icon="check"
            @click="acceptInvitation(viewmodel)"
          />
        </div>
        <div v-if="selectedTab===0" class="contact-card__info">
          <span class="contact-card__send-date">{{'09:00'}}</span>
          <div class="contact-card__new-message">{{5}}</div>
        </div>
      </potential-contact>
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
      v-if="viewmodels.length === 0 && !isLoading"
    >{{$t('contact-card-no-result')}}</h4>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import PotentialContact from "../PotentialContact";
import GSelect from "../GSelect";
import api from "../../api";
import { SpringSpinner } from "epic-spinners";

export default {
  components: {
    Avatar,
    PotentialContact,
    GSelect,
    SpringSpinner
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
      default: "viewmodels"
    },
    suggestedUsers: {
      type: Array,
      required: true
    },
    viewmodels: {
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
    async rejectInvitation(viewmodel) {
      try {
        viewmodel.isLoading = true;
        await api.invite.rejectInvitation(viewmodel.invitationId);
        this.$emit("reload-invitations");
      } catch (err) {
        console.error(err);
      } finally {
        viewmodel.isLoading = false;
      }
    },
    async acceptInvitation(viewmodel) {
      try {
        viewmodel.isLoading = true;
        await api.invite.acceptInvitation(viewmodel.invitationId);
        this.$emit("reload-invitations");
      } catch (err) {
        console.error(err);
      } finally {
        viewmodel.isLoading = false;
      }
    },
    processInvitation(viewmodel) {
      if (viewmodel.invitationId) this.cancelInvitation(viewmodel);
      else this.sendInvitation(viewmodel);
    },
    async sendInvitation(viewmodel) {
      viewmodel.isLoading = true;
      try {
        const response = await api.invite.postInvitation(viewmodel.user._id);
        viewmodel.invitationId = response.data._id;
      } catch (err) {
        console.error(err);
      } finally {
        viewmodel.isLoading = false;
      }
    },
    async cancelInvitation(viewmodel) {
      viewmodel.isLoading = true;
      try {
        await api.invite.cancelInvitation(viewmodel.invitationId);
        viewmodel.invitationId = null;
      } catch (err) {
        console.error(err);
      } finally {
        viewmodel.isLoading = false;
      }
    },
    search(phrase) {
      phrase = phrase.toLowerCase().trim();
      if (!phrase) return (this.filteredViewModels = this.viewmodels);
      this.filteredViewModels = this.viewmodels.filter(
        contact =>
          contact.user.fullname.toLowerCase().includes(phrase) ||
          contact.user.desc.toLowerCase().includes(phrase)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-card {
  background: $LinearGradient;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 25px 25px 0px 0px;
  width: 100%;
  height: 100%;
  color: $contact-card-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 15px;
  position: relative;

  .avatar {
    width: 48px;
    height: 48px;
  }
  &__search {
    width: 100%;
    margin-top: 30px;
  }

  &__icon--invite:hover {
    color: $AccentColor2;
    transition: color $transition-duration-quick ease-in-out;
  }
  &__icon--invite {
    font-size: $icon-size-extra-medium;
    margin-left: 20px;
    cursor: pointer;
  }
  &__icon {
    font-size: $icon-size-medium;
    margin-left: 15px;
    width: 20px;
  }
  &__toolbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__suggestion {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
    span {
      margin-top: 5px;
    }
  }
  &__center {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 25%;
    bottom: 0;
  }
  &__suggestions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    width: 100%;
  }
  &__header {
    white-space: nowrap;
  }
  &__viewmodels {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    .potential-contact:first-of-type {
      margin-top: 40px;
    }
    .potential-contact {
      margin-bottom: 40px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  &__new-message {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: $AccentColor2;
    font-weight: 700;
    width: 20px;
    height: 20px;
    padding: 5px;
  }
  &__icons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .g-select {
      position: absolute;
      margin-top: 10px;
      right: 0;
      top: 10;
    }
  }
  &__select-wrapper {
    position: relative;
  }
  &__suggestions {
    margin-top: 30px;
  }
}
</style>