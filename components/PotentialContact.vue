<template>
  <div class="potential-contact">
    <avatar class="potential-contact__avatar" :initials="user.fullname | getInitials" />
    <div>
      <span class="potential-contact__fullname bold">{{user.fullname}}</span>
      <p class="potential-contact__desc">{{user.desc}}</p>
    </div>
    <button
      class="btn capitalize"
      v-if="!isLoading"
      @click="takeAction"
      :class="{'btn--outline': !user.invitationId, 'btn--default': user.invitationId}"
    >{{!user.invitationId ? 'invite' : 'cancel'}}</button>
    <spring-spinner
      class="potential-contact__spinner"
      v-else
      :animation-duration="1000"
      :size="40"
      color="#fcd87d"
    />
  </div>
</template>

<script>
import avatar from "./Avatars/Avatar";
import { SpringSpinner } from "epic-spinners";
import api from "../api";

export default {
  components: {
    avatar,
    SpringSpinner
  },
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    user: { type: Object, required: true }
  },
  methods: {
    takeAction() {
      if (this.user.invitationId) this.cancelInvitation();
      else this.sendInvitation();
    },
    async sendInvitation() {
      this.isLoading = true;
      try {
        const response = await api.user.postInvitation(this.user._id);
        this.user.invitationId = response.data._id;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async cancelInvitation() {
      this.isLoading = true;
      try {
        await api.user.cancelInvitation(this.user.invitationId);
        this.user.invitationId = undefined;
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
.potential-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__avatar {
    min-width: 48px;
    min-height: 48px;
    margin-right: 10px;
  }
  &__desc {
    margin-top: 10px;
  }
  &__fullname {
    font-size: $font-size-extra-regular;
  }
  .btn {
    color: $White;
    font-size: $font-size-regular;
  }

  .btn,
  &__spinner {
    width: 95px;
    height: 48px;
    margin-left: 10px;
  }

  .btn--default {
    background-color: $AccentColor2;
  }

  .btn--outline {
    border-color: $AccentColor2;
  }
}
</style>