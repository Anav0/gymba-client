<template>
  <potential-contact @wasClicked="$emit('wasClicked')" :user="user" :isLoading="isLoading">
    <button
      class="btn capitalize"
      @click="processInvitation"
      :class="{'btn--outline': !invitationId, 'btn--default': invitationId}"
    >{{!invitationId ? 'invite' : 'cancel'}}</button>
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
      if (this.invitationId) this.cancelInvitation();
      else this.sendInvitation();
    },
    async sendInvitation() {
      this.isLoading = true;
      try {
        const response = await api.invite.postInvitation(this.user._id);
        this.$emit("invitationSend", response.data._id);
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async cancelInvitation() {
      this.isLoading = true;
      try {
        await api.invite.cancelInvitation(this.invitationId);
        this.$emit("invitationSend", null);
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