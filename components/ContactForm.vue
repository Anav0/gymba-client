<template>
  <form class="contact-form">
    <h3>{{ $t("contact-form-header") }}</h3>
    <input
      v-model.trim="message.sender"
      required
      type="email"
      :placeholder="$i18n.t('contact-form-from-placeholder')"
    />
    <textarea
      v-model.trim="message.content"
      required
      :placeholder="$i18n.t('contact-form-message-placeholder')"
    />
    <div class="contact-form__transitions">
      <transition name="fade">
        <button v-if="!isLoading" class="btn btn--default" @click="submit">
          {{ $t("contact-form-btn") }}
        </button>
      </transition>
      <transition name="fade">
        <flower-spinner
          v-if="isLoading"
          class="contact-form__spinner"
          :animation-duration="1500"
          :size="60"
          color="#fa8072"
        />
      </transition>
    </div>
  </form>
</template>

<script>
import { FlowerSpinner } from "epic-spinners";
import api from "../api";

export default {
  components: {
    FlowerSpinner
  },
  data() {
    return {
      isLoading: false,
      message: {
        sender: "",
        content: ""
      }
    };
  },
  methods: {
    async submit() {
      try {
        this.isLoading = true;
        if (!this.message.sender || !this.message.content) return;
        await api.opinion.postOpinion(this.message);
        this.message.sender = "";
        this.message.content = "";
        this.$toasted.show(this.$i18n.t("successfull-submit"), {
          className: "info-toast"
        });
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

<style lang="scss" scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  text-align: center;

  &__transitions {
    position: relative;
    width: 100%;
    height: 50px;
  }

  &__spinner,
  .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  * {
    width: 100%;
    margin: 5px 0;
  }

  textarea {
    height: 70px;
    max-width: 100%;
  }
}
</style>
