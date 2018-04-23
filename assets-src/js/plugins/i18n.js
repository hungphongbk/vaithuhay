import Vue from 'vue'
import I18n from 'vue-i18n'

Vue.use(I18n);

let locale = Vue.cookie.get('lang');
if (!locale) {
  locale = 'vi';
  Vue.cookie.set('lang', 'vi');
}

const i18n = new I18n({locale});

export default i18n;
