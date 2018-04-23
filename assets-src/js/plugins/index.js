import './responsive'
import './animateCss'
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import VueCookie from 'vue-cookie'
import VueLocalStorage from 'vue-localstorage'
import VueLazyload from 'vue-lazyload'
import {delay} from '../components/helpers'
import './observe-visibility'
import {detect} from 'detect-browser'
//
// import 'vue-carousel'


// Vue.use(VeeValidate);
Vue.use(AsyncComputed);
Vue.use(VueLocalStorage);
Vue.use(VueLazyload, {});
Vue.filter('vnd', function (value) {
  return Math.round(value / 100).toLocaleString("vi-VN") + '₫';
});
Vue.use(VueCookie);

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
})

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


vth.links.url = (url, json = true) => vth.links.home + (url[0] === '/' ? url : ('/' + url))
