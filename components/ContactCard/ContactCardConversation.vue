<template>
  <potential-contact :user="user" :isLoading="isLoading">
    <div class="contact-card__info">
      <span class="contact-card__send-date">{{'09:00'}}</span>
      <div class="contact-card__new-message">{{5}}</div>
    </div>
  </potential-contact>
</template>

<script>
import PotentialContact from "../PotentialContact";
import conversation from "../../api/conversation";
//TODO: make :user binding better
export default {
  components: {
    PotentialContact
  },
  data() {
    return {
      isLoading: false,
      user: {}
    };
  },
  mounted() {
    this.fillUserVM(this.conversation);
  },
  watch: {
    conversation(value) {
      this.fillUserVM(value);
    }
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  methods: {
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