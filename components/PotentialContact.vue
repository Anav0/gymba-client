<template>
  <div class="potential-contact">
    <avatar
      @click="$emit('wasClicked')"
      class="potential-contact__avatar"
      :avatarUrl="user.avatarUrl"
      :initials="user.fullname | getInitials"
      :userId="user._id"
    />
    <div @click="$emit('wasClicked')" class="potential-contact__middle">
      <span class="potential-contact__fullname bold ellipsis">{{
        user.fullname
      }}</span>
      <p v-if="user.desc" class="potential-contact__desc ellipsis">
        {{ user.desc }}
      </p>
    </div>
    <div class="potential-contact__spinner-wrapper">
      <slot v-if="!isLoading" />
      <spring-spinner
        class="potential-contact__spinner"
        v-else
        :animation-duration="1000"
        :size="40"
        color="#fcd87d"
      />
    </div>
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
  props: {
    isLoading: { type: Boolean, default: false },
    user: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.potential-contact:hover {
  //TODO: Add a nice animation
}
.potential-contact {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 48px;
  cursor: pointer;

  &__avatar {
    min-width: 48px;
    min-height: 48px;
    margin-right: 10px;
  }
  &__middle {
    width: 200px;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
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

    @media (min-width: $sm) {
      color: $MainFontColor;
    }
  }
  &__spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 100%;
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
