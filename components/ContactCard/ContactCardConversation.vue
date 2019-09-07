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
  watch: {
    conversation(value) {
      this.user = value.participants[1];
    }
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>