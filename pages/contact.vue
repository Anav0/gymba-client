<template>
  <div class="contact landing-page-section">
    <h2>{{$t('contact-header')}}</h2>
    <div class="contact__card card">
      <contact-form class="contact__form"></contact-form>
    </div>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm";

export default {
  components: {
    ContactForm
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;

  &__form {
    @media (max-width: $sm) {
      padding: 0px;
    }
  }

  &__card {
    height: 350px;
    width: 550px;
    max-width: 100%;
    max-height: 100%;

    @media (max-width: $sm) {
      box-shadow: none;
      border: none;
      background: transparent;
    }
  }
}
</style>