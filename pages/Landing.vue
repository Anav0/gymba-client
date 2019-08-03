<template>
  <div>
    <section class="greeting website-page">
      <h1 class="greeting__marketing">{{$t('greeting-marketing-pitch')}}</h1>
      <div class="greeting__buttons">
        <router-link tag="button" to="/sign-up" class="btn btn--default">{{$t('sign-up')}}</router-link>
        <router-link tag="button" to="/sign-in" class="btn btn--outline">{{$t('sign-in')}}</router-link>
      </div>
    </section>
    <features id="features" />
    <contact id="contact" />
  </div>
</template>

<script>
import features from "./features";
import contact from "./contact";

export default {
  components: {
    features,
    contact
  }
};
</script>

<style lang="scss" scoped>
.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 50px;

  @media (min-width: $sm) {
    justify-content: flex-start;
  }

  @media (min-width: $sm) {
    .greeting__buttons {
      display: none;
    }
  }

  .btn {
    text-transform: capitalize;
  }
  .btn--default {
    background-color: $White;
    color: $AccentColor1;
  }
  .btn--outline {
    color: $White;
    border-color: $White;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    * {
      margin-bottom: 25px;
    }
  }
  &__marketing {
    color: $White;
    text-align: center;
    max-width: 600px;

    @media (max-width: $sm) {
      max-width: 100%;
      font-size: $font-size-h3;
      margin-top: 0px;
    }
    @media (min-width: $sm) {
      justify-content: flex-start;
      margin-top: 150px;
    }
  }
}
</style>