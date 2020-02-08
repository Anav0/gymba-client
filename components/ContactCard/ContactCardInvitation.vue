<template>
  <potential-contact
    @wasClicked="$emit('wasClicked')"
    :user="user"
    :isLoading="isLoading"
  >
    <button
      class="btn capitalize"
      @click="processInvitation"
      :class="{ 'btn--outline': !invitationId, 'btn--default': invitationId }"
    >
      {{
        $i18n.t(`chat-friend-profile-${invitationId ? "uninvite" : "invite"}`)
      }}
    </button>
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
      default: null
    }
  },

  methods: {
    processInvitation() {
      if (this.invitationId) this.rejectInvitation();
      else this.sendInvitation();
    },
    async sendInvitation() {
      this.isLoading = true;
      try {
        const response = await api.invite.postInvitation(this.user._id);
        this.$emit("invitationStatusChanged", response.data._id);
        eventHandler.$emit("invitation-sent", response.data);
      } catch (err) {
        this.$toasted.show(err.message, {
          className: "error-toast"
        });
      } finally {
        this.isLoading = false;
      }
    },
    async rejectInvitation() {
      this.isLoading = true;
      try {
        const { data: invitation } = await api.invite.rejectInvitation(
          this.invitationId
        );
        this.$emit("invitationStatusChanged", null);
        eventHandler.$emit("invitation-rejected", invitation);
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
