<template>
  <div id="app">
    <div v-if="!isChat" class="background" :class="dynamicBackground" />
    <navbar v-if="!isChat" />
    <transition name="fade">
      <router-view class="app-content" />
    </transition>
    <!-- <div class="credits">
      <h4>{{$t('made-with')}}</h4>
      <fa-icon class="credits__icon" icon="tint" />
      <h4>{{$t('by-me')}}</h4>
    </div>-->
  </div>
</template>
<script>
import navbar from "../components/NavBar";
import api from "../api";

export default {
  components: {
    navbar
  },
  data() {
    return {
      fillRoutes: ["noPage"]
    };
  },
  computed: {
    isChat() {
      return this.$route.matched.some(route => route.path.includes("/chat"));
    },
    dynamicBackground() {
      return this.fillRoutes.includes(this.$route.name)
        ? "background--fill"
        : "";
    }
  },
  async mounted() {
    try {
      await this.getLoggedUser();
    } catch (error) {
      //TODO: Maybe not show this error
      console.error(error);
    }
  },
  methods: {
    getLoggedUser() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await api.user.getAuthUser();
          if (response.data) {
            await this.$store.dispatch("auth/login", response.data);
          }
          resolve(response.data);
        } catch (err) {
          reject(err);
        }
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.background {
  position: absolute;
  width: 100%;
  height: 150%;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  overflow: hidden;
  background-image: url("../assets/images/mobile-background.svg");
  background-size: 100% auto;
  background-repeat: no-repeat;

  @media (min-width: $sm) {
    background-image: url("../assets/images/desktop-background.svg");
  }

  &--fill {
    background-image: $LinearGradient;
  }
}

.app-content {
  width: 100%;
}
.credits {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: $font-weight-regular;
  margin-bottom: 50px;

  &__icon {
    color: $Alert;
    margin: 0px 10px;
  }

  @media (max-width: $sm) {
    margin: 20px;
    * {
      font-size: $font-size-regular;
    }
  }
}
</style>
