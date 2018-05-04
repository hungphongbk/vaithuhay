import Vue from 'vue';
import Vuex from 'vuex';
import categories from './categories';
import cart from './cart';
import promo from './promo';
import customer from './customer';
import extend from 'lodash/extend';

const $ = jQuery;

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    customer,
    categories,
    cart,
    promo
  }
});

if (vth) {
  const obj = extend({}, vth, {
    customer: {
      id: null,
      name: '',
      isLoggingIn: false,
      form: false,
      loyalty: {},
      favorites: []
    }
  });
  store.replaceState(obj);
}
export default store;
