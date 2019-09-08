<template>
  <div class="chat-friend-profile">
    <div v-if="!isLoading" class="chat-friend-profile__image-wrapper">
      <h3 class="chat-friend-profile__fullname">{{user.fullname}}</h3>
      <img class="chat-friend-profile__avatar" src="https://source.unsplash.com/random/" />
    </div>
    <!-- <avatar v-if="!user.avatarUrl" :initials="user.fullname | getInitials" /> -->
    <div v-if="!isLoading" class="chat-friend-profile__content">
      <blockquote>{{user.desc}}</blockquote>
      <div class="chat-friend-profile__stats">
        <conversation-stat
          icon="envelope"
          :text="`${$i18n.t('chat-friend-profile-you-exchanged')} ${exchangedMessages.length} ${$i18n.t('chat-friend-profile-exchanged-messages')}`"
        />
        <conversation-stat
          icon="keyboard"
          :text="`${$i18n.t('chat-friend-profile-you-exchanged')} ${numberOfWordsExchanged} ${$i18n.t('chat-friend-profile-exchanged-words')}`"
        />
        <conversation-stat
          icon="heart"
          v-if="isFriend"
          :text="`${$i18n.t('chat-friend-profile-friends-for')} ${friendsFor} ${$i18n.t('chat-friend-profile-days')}`"
        />
      </div>
      <div class="chat-friend-profile__actions">
        <text-icon
          :icon="inviteStatus.icon"
          :text="$i18n.t(`chat-friend-profile-${inviteStatus.i18n}`)"
          @click.native="invite"
          :isLoading="isInviting"
        />
        <text-icon
          class="disable"
          :icon="isBlocked ? 'lock-open' : 'ban'"
          :text="$i18n.t(`chat-friend-profile-${isBlocked ? 'unblock' : 'block'}`)"
        />
        <text-icon
          class="disable"
          :icon="isMuted ? 'comment' : 'comment-slash'"
          :text="$i18n.t(`chat-friend-profile-${isMuted ? 'unmute' : 'mute'}`)"
        />
      </div>
    </div>
    <spring-spinner
      v-if="isLoading"
      class="center"
      :animation-duration="1000"
      :size="50"
      color="#fcd87d"
    />
  </div>
</template>

<script>
import api from "../../api";
import Avatar from "../Avatars/Avatar";
import TextIcon from "../TextIcon";
import ConversationStat from "../ConversationStat";
import { SpringSpinner } from "epic-spinners";

export default {
  components: {
    Avatar,
    TextIcon,
    ConversationStat,
    SpringSpinner
  },
  async mounted() {
    try {
      await this.fillUser();
      await this.fillExchangedMessages();
      await this.fillWords();
      await this.fillisInvited();
      await this.fillIsFriend();
      await this.fillInvitationId();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  },

  data() {
    return {
      user: {},
      isLoading: true,
      isInviting: false,
      isInvited: false,
      isFriend: false,
      invitationId: null,
      exchangedMessages: [],
      numberOfWordsExchanged: 0
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    inviteStatus() {
      if (this.isFriend) return { i18n: "friend", icon: "heart-broken" };
      if (this.isInvited) return { i18n: "uninvite", icon: "eraser" };
      else return { i18n: "invite", icon: "heart" };
    },
    isMuted() {
      return false;
    },
    isBlocked() {
      return false;
    },
    friendsFor() {
      return "N";
    }
  },
  methods: {
    async invite() {
      if (this.isFriend) return await this.removeFriend();
      if (!this.isInvited) await this.sendInvite();
      else await this.cancelInvite();
    },
    async cancelInvite() {
      try {
        this.isInviting = true;
        await api.invite.rejectInvitation(this.invitationId);
        this.isInvited = false;
        this.invitationId = null;
      } catch (err) {
        console.error(err);
      } finally {
        this.isInviting = false;
      }
    },
    async sendInvite() {
      try {
        this.isInviting = true;
        const response = await api.invite.postInvitation(this.user._id);
        this.invitationId = response.data._id;
        this.isInvited = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.isInviting = false;
      }
    },
    async removeFriend() {
      try {
        this.isInviting = true;
        await api.user.removeFriend(this.user._id);
      } catch (err) {
        console.error(err);
      } finally {
        this.isInviting = false;
      }
    },
    async fillIsFriend() {
      return new Promise(async (resolve, reject) => {
        try {
          const user = this.$store.getters["auth/user"];
          if (user.friends.includes(this.user._id)) this.isFriend = true;
          resolve();
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    async fillisInvited() {
      return new Promise(async (resolve, reject) => {
        try {
          const user = this.$store.getters["auth/user"];

          let response = await api.invite.getSendInvitations("");
          if (response.data.some(invite => invite.target == this.user._id)) {
            this.isInvited = true;
            return resolve();
          }

          response = await api.invite.getRecivedInvitations("");
          if (response.data.some(invite => invite.sender == this.user._id)) {
            this.isInvited = true;
            return resolve();
          }

          this.isInvited = false;
          resolve();
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    async fillUser() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await api.users.getUser(this.id);
          this.user = response.data;
          //TODO: delete this
          this.user.avatarUrl = "";
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    async fillExchangedMessages() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await api.conversation.getConversationByParticipantId(
            this.user._id,
            2
          );
          if (!response.data || response.data.length === 0) return resolve();
          if (response.data.length > 1)
            throw new Error("There is more results than one");
          this.exchangedMessages = response.data[0].messages;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    async fillWords() {
      return new Promise(async (resolve, reject) => {
        try {
          //TODO: fill this function
          resolve(0);
        } catch (err) {
          reject(err);
        }
      });
    },
    async fillInvitationId() {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await api.invite.getInviteInvolving(this.user._id);
          this.invitationId = response.data._id;
          resolve();
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-friend-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: $LinearGradient;
  height: 100%;
  width: 100%;
  color: $White;
  position: relative;

  &__spinner {
    position: absolute;
    top: 0;
    left: 0;
  }
  &__image-wrapper {
    position: relative;
    width: 100%;
    min-height: 290px;
    img {
      box-shadow: $box-shadow-button-user-image;
    }
  }
  blockquote {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__content {
    padding: 0px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  &__fullname {
    position: absolute;
    bottom: 5%;
    width: 100%;
    right: 0;
    left: 0;
    text-align: center;
  }
  &__actions,
  &__stats,
  blockquote {
    margin-top: 20px;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }
  &__stats {
    display: flex;
    flex-direction: column;
    width: 100%;

    .conversation-stat {
      margin-bottom: 20px;
    }
  }
  &__avatar {
    width: 100%;
    height: 100%;
    border-radius: 0 0 75px 0;
    object-fit: cover;
  }

  .avatar {
    width: 96px;
    height: 96px;
  }
}
</style>