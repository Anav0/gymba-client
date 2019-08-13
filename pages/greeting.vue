<template>
  <section class="greeting landing-page-section">
    <div class="greeting__content">
      <h1 class="greeting__marketing">{{$t('greeting-marketing-pitch')}}</h1>
      <div class="greeting__buttons">
        <router-link tag="button" to="/sign-up" class="btn btn--default">{{$t('sign-up')}}</router-link>
        <router-link tag="button" to="/sign-in" class="btn btn--outline">{{$t('sign-in')}}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: $md) and (max-width: $lg) {
    margin-bottom: 350px;
  }

  @media (min-width: $lg) {
    min-height: 100vh;
  }

  @media (min-width: $sm) and (max-width: $md) {
    justify-content: flex-start;
    margin-bottom: 150px;
  }
  @media (max-width: $sm) {
    min-height: 100vh;
  }
  &__content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    @media (min-width: $sm) {
      justify-content: flex-start;
    }
  }
  .btn {
    text-transform: capitalize;
  }

  .btn--outline {
    color: $AccentColor1;
  }

  &__buttons {
    display: none;
    @media (max-width: $sm) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      * {
        margin-bottom: 25px;
      }
    }
  }
  &__marketing {
    color: $White;
    text-align: center;
    max-width: 600px;

    @media (max-width: $sm) {
      font-size: $font-size-h2;
      color: $AccentColor1;
    }
  }
}
</style>