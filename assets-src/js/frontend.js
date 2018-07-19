/**
 * Created by hungphongbk on 5/6/17.
 */
import Vue from "vue";
import "../sass/frontend.scss";
import '@/plugins';
import i18n from '@/plugins/i18n';
import store from '@/store/index';
// import '@/plugins/socket'
import * as components from '@/components';
import '@/pages';
import App from './App.vue';
import mq from './store/mq';
import polyfill from './store/polyfill';
import {SYSTEM_ON_SCROLL, SYSTEM_ON_SCROLL_RESET} from "@/types";
// import router from './router'
// import {sync} from 'vuex-router-sync'

// sync(store, router)

const uniqId_ = {
  props: {
    uniqId_: {
      default() {
        if (typeof this === 'undefined') return '';
        return (this.$options._scopeId || 'vth-id') + '-' + this._uid;
      },
    },
  },
};
Vue.mixin(uniqId_);
// Vue.prototype.$dev = process.env.NODE_ENV !== 'production';
//Vue.prototype.$isExperiment = window.o.isExperiment;
window.vm = new Vue({
  el: '#app',
  // router,
  store,
  i18n,
  render: h => h(App),
  mq: {
    phone: '(max-width: 767px)',
    tablet: '(max-width: 991px)',
    desktop: '(min-width: 1199px)'
  },
  data: {
    system: {
      scrollThreshold: 160,
      scrollTop: 0,
      scrollDirection: 'down',
      scrollChange: 0
    }
  },
  mounted() {
    components.Event.$on(SYSTEM_ON_SCROLL, value => {
      this.system.scrollDirection = (value > this.system.scrollTop) ? 'down' : 'up';
      const diff = value - this.system.scrollTop;
      this.system.scrollTop = value;

      //update scrollChange
      let scrollChange = this.system.scrollChange;
      scrollChange += diff;
      if (scrollChange > this.system.scrollThreshold)
        scrollChange = this.system.scrollThreshold;
      if (scrollChange < 0) scrollChange = 0;
      this.system.scrollChange = scrollChange;
    });
    components.Event.$on(SYSTEM_ON_SCROLL_RESET, () => {
      this.system.scrollChange = 0;
    });
  }
});
polyfill(store);
mq(vm, store);
