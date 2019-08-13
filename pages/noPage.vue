<template>
  <div class="no-page landing-page-section">
    <div class="no-page__wrapper">
      <h2 class="no-page__header">{{$t('no-page-why')}}</h2>
      <span class="no-page__desc">{{$t('no-page-desc')}}</span>
      <span class="no-page__404">404</span>
    </div>
    <router-link to="/" tag="button" class="btn btn--outline">{{$t('no-page-take-me-home')}}</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.no-page {
  color: $WhiteSmoke;
  text-align: center;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .btn--outline {
    color: $WhiteSmoke;
    border-color: $WhiteSmoke;
    width: auto;
    height: auto;
    padding: 20px 30px;

    @media (min-width: $sm) {
      padding: 28px 40px;
    }
  }
  &__header {
    margin-bottom: 20px;
    @media (min-width: $sm) {
      font-size: $font-size-h1;
    }
  }

  &__desc {
    font-size: $font-size-larger;
    @media (min-width: $sm) {
      font-size: $font-size-h3;
    }
  }
  &__wrapper {
    position: relative;
  }
  &__404 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 175px;
    opacity: 0.5;
    color: $Alert;
    mix-blend-mode: hard-light;

    @media (min-width: $sm) {
      font-size: 500px;
    }
  }
}
</style>