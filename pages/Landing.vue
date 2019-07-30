<template>
  <div class="landing">
    <h3 class="landing__marketing">{{$t('landing-marketing-pitch')}}</h3>
    <div class="landing__buttons">
      <button class="btn btn--default">{{$t('sign-up')}}</button>
      <button class="btn btn--outline">{{$t('sign-in')}}</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media (min-width: $sm) {
    .landing__buttons {
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
  }
}
</style>