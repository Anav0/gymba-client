<template>
  <div class="contact-card">
    <div class="contact-card__toolbar">
      <h4>{{header}}</h4>
      <div>
        <fa-icon class="contact-card__icon" icon="sort-amount-up-alt"></fa-icon>
        <fa-icon
          class="contact-card__icon"
          :icon="isSearching ?  'times' : 'search'"
          @click="isSearching=!isSearching"
        ></fa-icon>
      </div>
    </div>
    <ul v-show="!isSearching" class="contact-card__suggestions">
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
      placeholder="Search contacts..."
    />
    <ul class="contact-card__contacts">
      <potential-contact
        v-for="contact in filteredContacts"
        :key="contact.username"
        :user="contact"
      />
    </ul>
  </div>
</template>

<script>
import Avatar from "../Avatars/Avatar";
import PotentialContact from "../PotentialContact";

export default {
  components: {
    Avatar,
    PotentialContact
  },
  methods: {
    search(phrase) {
      phrase = phrase.toLowerCase().trim();
      if (!phrase) return (this.filteredContacts = this.contacts);
      this.filteredContacts = this.contacts.filter(
        contact =>
          contact.fullname.toLowerCase().includes(phrase) ||
          contact.desc.toLowerCase().includes(phrase)
      );
    }
  },
  watch: {
    contacts(value) {
      this.filteredContacts = value;
    },
    isSearching(value) {
      this.filteredContacts = this.contacts;
      if (value) this.$nextTick(() => this.$refs.contactCardInput.focus());
    }
  },
  data() {
    return {
      isSearching: false,
      filteredContacts: []
    };
  },
  props: {
    header: {
      type: String,
      default: "Contacts"
    },
    suggestedUsers: {
      type: Array,
      required: true
    },
    contacts: {
      type: Array,
      required: true
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
  .avatar {
    width: 48px;
    height: 48px;
  }
  &__search {
    width: 100%;
    margin-top: 30px;
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
    span {
      margin-top: 5px;
    }
  }
  &__suggestions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: auto;
    width: 100%;
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    .potential-contact {
      margin-bottom: 30px;
    }
  }

  &__contacts,
  &__suggestions {
    margin-top: 30px;
  }
}
</style>