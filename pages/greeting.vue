<template>
  <section class="greeting website-page">
    <h1 class="greeting__marketing">{{$t('greeting-marketing-pitch')}}</h1>
    <div class="greeting__buttons">
      <router-link tag="button" to="/sign-up" class="btn btn--default">{{$t('sign-up')}}</router-link>
      <router-link tag="button" to="/sign-in" class="btn btn--outline">{{$t('sign-in')}}</router-link>
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
  margin: 50px 0;

  @media (min-width: $lg) {
    margin: 150px 0;
  }

  @media (min-width: $sm) {
    justify-content: flex-start;
    .greeting__buttons {
      display: none;
    }
  }

  .btn {
    text-transform: capitalize;
  }

  .btn--outline {
    color: $AccentColor1;
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
      font-size: $font-size-h2;
      color: $AccentColor1;
    }
  }
}
</style>