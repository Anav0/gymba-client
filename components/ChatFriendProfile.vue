<template>
  <div class="chat-friend-profile">
    <div class="chat-friend-profile__image-wrapper">
      <h3 class="chat-friend-profile__fullname">{{user.fullname}}</h3>
      <img class="chat-friend-profile__avatar" src="https://source.unsplash.com/random/" />
    </div>
    <!-- <avatar v-if="!user.avatarUrl" :initials="user.fullname | getInitials" /> -->
    <div class="chat-friend-profile__content">
      <blockquote>{{user.desc}}</blockquote>
      <div class="chat-friend-profile__stats">
        <conversation-stat
          icon="envelope"
          v-if="exchangedMessages.length > 0"
          :text="`${$i18n.t('chat-friend-profile-you-exchanged')} ${exchangedMessages.length} ${$i18n.t('chat-friend-profile-exchanged-messages')}`"
        />
        <conversation-stat
          icon="keyboard"
          v-if="exchangedMessages.length > 0"
          :text="`${$i18n.t('chat-friend-profile-you-exchanged')} ${numberOfWordsExchanged} ${$i18n.t('chat-friend-profile-exchange-words')}`"
        />
        <conversation-stat
          icon="heart"
          v-if="isFriend"
          :text="`${$i18n.t('chat-friend-profile-friends-for')} ${friendsFor} ${$i18n.t('chat-friend-profile-days')}`"
        />
      </div>
      <div class="chat-friend-profile__actions">
        <text-icon
          :icon="isFriend ? 'heart-broken' : 'heart'"
          :text="$i18n.t(`chat-friend-profile-${isFriend ? 'unfriend' : 'invite'}`)"
        />
        <text-icon
          :icon="isBlocked ? 'lock-open' : 'ban'"
          :text="$i18n.t(`chat-friend-profile-${isBlocked ? 'unblock' : 'block'}`)"
        />
        <text-icon
          :icon="isMuted ? 'comment' : 'comment-slash'"
          :text="$i18n.t(`chat-friend-profile-${isMuted ? 'unmute' : 'mute'}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Avatar from "./Avatars/Avatar";
import TextIcon from "./TextIcon";
import ConversationStat from "./ConversationStat";

export default {
  components: {
    Avatar,
    TextIcon,
    ConversationStat
  },
  async mounted() {
    try {
      await this.fillUser();
      await this.fillExchangedMessages();
      await this.fillWords();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
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
          if (!response.data) return;
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
    }
  },
  data() {
    return {
      user: {},
      isLoading: true,
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
    isMuted() {
      return false;
    },
    isBlocked() {
      return false;
    },
    friendsFor() {
      return 10;
    },
    isFriend() {
      const user = this.$store.getters["auth/user"];
      return user.friends.includes(this.user._id);
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

  blockquote {
    width: 100%;
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    min-height: 290px;
    img {
      box-shadow: $box-shadow-button-user-image;
    }
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