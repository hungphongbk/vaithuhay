import './responsive';
import './animateCss';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import VueLocalStorage from 'vue-localstorage';
import VueLazyload from 'vue-lazyload';
import {delay} from '../components/helpers';
import './observe-visibility';
import {detect} from 'detect-browser';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import './cookie';
import i18n from './i18n';
import Sticky from 'vue-sticky-directive';
import VueScroll from 'vue-scroll';
//
// import 'vue-carousel'


// Vue.use(VeeValidate);
Vue.use(AsyncComputed);
Vue.use(VueLocalStorage, {
  name: 'ls'
});
Vue.use(VueLazyload, {});
Vue.filter('vnd', function (value) {
  return Math.round(value / 100).toLocaleString("vi-VN") + '₫';
});
Vue.filter('percentage', value => Math.round(value * 100) + '%');
Vue.filter('i18n', value => value[i18n.locale]);

Vue.directive('anim', async (el) => {
  const $children = el.children;
  await delay(2000);
  for (const child of $children) {
    await delay(250);
    $(child).addClass('anim')
      .removeClass('before');
  }
});

const browser = detect();
Object.defineProperty(Vue.prototype, '$browser', {
  get() {
    if (browser) return browser.name;
    return '';
  }
});

export const tooltip = (el, {value, modifiers = {top: true}}) => $(el).tooltip({
  placement: (() => {
    let pos = null;
    ['top', 'bottom', 'left', 'right'].forEach(p => {
      if (modifiers[p]) pos = p;
    });
    return pos;
  })(),
  title: value
});


vth.links.url = (url, json = true) => vth.links.home + (url[0] === '/' ? url : ('/' + url));

window.fbAsyncInit = function () {
  window.FB.init({
    appId: '246837025841849',
    version: 'v2.10' // or v2.1, v2.2, v2.3, ...
  });
};

Vue.component('fa-icon', FontAwesomeIcon);
export {default as ModalManager} from './ModalManager';

Vue.use(Sticky);
Vue.use(VueScroll);
