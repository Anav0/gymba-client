<template>
  <div class="conversation">
    <div class="conversation__upper">
      <avatar-wrapper :initials="target.fullname | getInitials" :avatarURL="target.avatarURL">
        <h4 class="conversation__target-name">{{target.fullname}}</h4>
      </avatar-wrapper>
    </div>
  </div>
</template>

<script>
import AvatarWrapper from "../../Avatars/AvatarWrapper";
export default {
  components: {
    AvatarWrapper
  },
  computed: {
    target() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation {
  width: 100%;
  height: 100%;
  background-color: $WhiteSmoke;

  &__upper {
    background-color: $White;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__target-name {
    margin-left: 10px;
  }
}
</style>