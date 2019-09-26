<template>
  <potential-contact :user="user" :isLoading="isLoading">
    <div class="contact-card__info">
      <span class="contact-card__send-date">{{lastMessageRecivedAt}}</span>
      <div
        class="contact-card__new-message"
        v-if="unreadMessages.length>0"
      >{{unreadMessages.length}}</div>
    </div>
  </potential-contact>
</template>

<script>
import PotentialContact from "../PotentialContact";
import api from "../../api";
import moment from "moment";
//TODO: make :user binding better
export default {
  components: {
    PotentialContact
  },
  data() {
    return {
      isLoading: false,
      unreadMessages: [],
      user: {}
    };
  },
  async mounted() {
    this.fillUserVM(this.conversation);
    this.fillUnreadMessages();
  },
  watch: {
    conversation(value) {
      this.fillUserVM(value);
      this.fillUnreadMessages();
    }
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  computed: {
    lastMessageRecivedAt() {
      const lastUnreadMessage = this.unreadMessages.pop();
      if (lastUnreadMessage)
        return moment(lastUnreadMessage.sendDate).format("HH:mm");

      return "";
    }
  },
  methods: {
    //TODO: this does not returns proper number of unread messages
    async fillUnreadMessages() {
      try {
        const {
          data: unreadMessages
        } = await api.conversation.getUnreadMessages(this.conversation._id);
        this.unreadMessages = unreadMessages;
      } catch (error) {
        console.error(error);
      }
    },
    fillUserVM(value) {
      const currentuser = this.$store.getters["auth/user"];
      this.user = value.participants.find(
        participant => participant._id !== currentuser._id
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>