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
        this.$emit("invitationSend", response.data._id);
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
        await api.invite.rejectInvitation(this.invitationId);
        this.$emit("invitationSend", null);
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
