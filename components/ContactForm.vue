<template>
  <form class="contact-form">
    <h3>{{$t('contact-form-header')}}</h3>
    <input
      required
      type="email"
      :placeholder="$i18n.t('contact-form-from-placeholder')"
      v-model="message.sender"
    />
    <textarea
      required
      :placeholder="$i18n.t('contact-form-message-placeholder')"
      v-model="message.content"
    />
    <button @click="submit" class="btn btn--default">{{$t('contact-form-btn')}}</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: {
        sender: "",
        content: ""
      }
    };
  },
  methods: {
    submit() {
      alert("awdawd");
      //TODO: send message to server
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
  overflow: hidden;
  padding: 0px 60px;
  text-align: center;

  * {
    width: 100%;
  }

  textarea {
    height: 70px;
    max-width: 100%;
  }
}
</style>