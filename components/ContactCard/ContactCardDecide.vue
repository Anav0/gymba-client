<template>
  <potential-contact @wasClicked="$emit('wasClicked')" :user="user" :isLoading="isLoading">
    <div class="contact-card__icons">
      <fa-icon class="contact-card__icon--invite" icon="times" @click="rejectInvitation" />
      <fa-icon class="contact-card__icon--invite" icon="check" @click="acceptInvitation" />
    </div>
  </potential-contact>
</template>

<script>
import PotentialContact from "../PotentialContact";
import api from "../../api";

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
    user: {
      type: Object,
      required: true
    },
    invitationId: {
      type: String,
      required: true
    }
  },
  methods: {
    async rejectInvitation() {
      try {
        this.isLoading = true;
        await api.invite.rejectInvitation(this.invitationId);
        this.$emit("reloadInvitations");
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async acceptInvitation() {
      try {
        this.isLoading = true;
        await api.invite.acceptInvitation(this.invitationId);
        this.$emit("reloadInvitations");
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>