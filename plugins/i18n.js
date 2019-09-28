import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../assets/lang/en.json';
import pl from '../assets/lang/pl.json';

// Tell Vue to use our plugin
Vue.use(VueI18n);

// Set the i18n instance on app
// This way we can use it globally in our components through this.$i18n
export default new VueI18n({
  // Set the initial locale

  locale: localStorage.locale ? JSON.parse(localStorage.locale).code : navigator.language,

  // Set the fallback locale in case the current locale can't be found
  fallbackLocale: 'en',

  // Associate each locale to a content file
  messages: {
    en,
    pl,
  },
});
