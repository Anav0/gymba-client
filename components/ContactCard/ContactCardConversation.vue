<template>
  <potential-contact :user="conversation.participants[0]" :isLoading="isLoading">
    <div class="contact-card__info">
      <span class="contact-card__send-date">{{'09:00'}}</span>
      <div class="contact-card__new-message">{{5}}</div>
    </div>
  </potential-contact>
</template>

<script>
import PotentialContact from "../PotentialContact";
//TODO: make :user binding better
export default {
  components: {
    PotentialContact
  },
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>