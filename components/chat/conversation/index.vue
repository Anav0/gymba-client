<template>
  <div class="conversation">
    <div class="conversation__upper">
      <avatar-wrapper :initials="target.fullname | getInitials" :avatarURL="target.avatarURL">
        <h4 class="conversation__target-name">{{target.fullname}}</h4>
      </avatar-wrapper>
    </div>
    <div class="conversation__messages">
      <chat-message
        v-for="(message,i) in conversation.messages"
        :class="isSendByUser(message) ? 'conversation__message--send' : 'conversation__message--recived'"
        :style="{'grid-row': i}"
        :sender="message.sender"
        :seenStatus="message.status"
        :key="message._id"
      >
        <p>{{message.content}}</p>
      </chat-message>
    </div>
    <div class="conversation__input-box">
      <input placeholder="Type your messsage..." />
      <fa-icon class="conversation__action-icon" icon="smile" />
      <fa-icon class="conversation__action-icon" icon="paperclip" />
      <fa-icon class="conversation__action-icon" icon="paper-plane" />
    </div>
  </div>
</template>

<script>
import AvatarWrapper from "../../Avatars/AvatarWrapper";
import ChatMessage from "../../chat/ChatMessage";

export default {
  components: {
    AvatarWrapper,
    ChatMessage
  },
  data() {
    return {
      target: {}
    };
  },
  watch: {
    conversation() {
      this.fillTarget();
    }
  },
  computed: {
    conversation() {
      return this.$store.getters["conversation/activeConversation"];
    },
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    fillTarget() {
      if (!this.conversation) return;
      this.target = this.conversation.participants.find(
        participant => participant._id !== this.user._id
      );
    },
    isSendByUser(message) {
      return this.user._id === message.sender._id;
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation {
  width: 100%;
  height: 100%;
  background-color: $WhiteSmoke;
  position: relative;
  overflow: hidden;
  &__upper {
    background-color: $White;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__messages {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 50px;
    grid-auto-rows: 1fr;
    overflow: auto;
    margin-bottom: 80px;
    max-height: 84vh;
    .chat-message {
      margin: 10px;
    }
  }
  &__message {
    &--send {
      place-self: center;
    }
    &--recived {
      grid-column: 2/3;
      place-self: center;
    }
  }
  &__target-name {
    margin-left: 10px;
  }
  &__action-icon:hover {
    color: $AccentColor2;
    -webkit-animation: jello-horizontal 0.6s both;
    animation: jello-horizontal 0.6s both;
  }
  &__action-icon {
    font-size: $icon-size-medium;
    cursor: pointer;
    transition: color $transition-duration-quick ease-in-out;
  }
  &__input-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr repeat(3, 20px);
    padding: 10px;
    grid-column-gap: 20px;
    align-items: center;
    background-color: $White;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    min-height: 70px;

    input {
      border: none;
      height: 100%;
      width: 100%;
    }
  }
}
</style>