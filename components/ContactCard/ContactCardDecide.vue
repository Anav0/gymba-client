<template>
  <potential-contact
    @wasClicked="$emit('wasClicked')"
    :user="user"
    :isLoading="isLoading"
  >
    <div class="contact-card__icons">
      <fa-icon
        class="contact-card__icon--invite"
        icon="times"
        @click="rejectInvitation"
      />
      <fa-icon
        class="contact-card__icon--invite"
        icon="check"
        @click="acceptInvitation"
      />
    </div>
  </potential-contact>
</template>

<script>
import PotentialContact from "../PotentialContact";
import api from "../../api";
import eventHandler from "../../src/eventHandler";

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
        const { data: invitation } = await api.invite.rejectInvitation(
          this.invitationId
        );
        eventHandler.$emit("invitation-rejected", invitation);
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      } finally {
        this.isLoading = false;
      }
    },
    async acceptInvitation() {
      try {
        this.isLoading = true;
        const { data: invitation } = await api.invite.acceptInvitation(
          this.invitationId
        );
        eventHandler.$emit("invitation-accepted", invitation);
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
