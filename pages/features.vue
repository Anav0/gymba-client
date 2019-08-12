<template>
  <div class="features landing-page-section">
    <article class="features__feature">
      <img class="features__image" src="../assets/images/people.png" />
      <section>
        <h2 class="features__header">{{$t('features-one-header')}}</h2>
        <p>
          {{$t('features-one-desc-1')}}
          <span class="hightlight">{{$t('ai')}}</span>
          {{$t('features-one-desc-2')}}
        </p>
      </section>
    </article>
    <article class="features__feature">
      <section>
        <h2 class="features__header">{{$t('features-two-header')}}</h2>
        <p>
          {{$t('features-two-desc')}}
          <span class="hightlight">{{$t('personality-friendly-name')}}</span>
          , {{$t('features-two-throught')}}
          <span
            class="hightlight"
          >{{$t('personality-conspiracy-name')}}</span>
          , {{$t('features-two-racist-intro')}}
          <span
            class="hightlight"
          >{{$t('personality-racist-name')}}</span>
        </p>
      </section>
      <div>
        <img class="features__image" src="../assets/images/avatar-men-1.png" />
        <img class="features__image" src="../assets/images/avatar-men-2.png" />
        <img class="features__image" src="../assets/images/avatar-women-1.png" />
      </div>
    </article>
    <article class="features__feature">
      <img class="features__image" src="../assets/icons/logo.svg" />
      <section>
        <h2 class="features__header">{{$t('features-three-header')}}</h2>
        <p>
          {{$t('features-three-desc-1')}}
          <span class="hightlight">{{$t('one-men')}}</span>
          .
          {{$t('features-three-desc-2')}}
          <router-link to="#contact">{{$t('contact')}}</router-link>
          {{$t('features-three-desc-3')}}
        </p>
      </section>
    </article>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.features {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &__header {
    margin-bottom: 20px;
    font-size: $font-size-h2;
  }

  &__feature {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $md) {
      width: 75%;
      justify-content: space-evenly;
      margin-top: 10rem;
    }
    section {
      max-width: 350px;
      align-self: center;

      p,
      span,
      a {
        font-size: $font-size-larger;
      }
    }
  }

  &__image {
    @media (max-width: $md) {
      display: none;
    }
  }
}
</style>