import Vue from 'vue';
import Vuex from 'vuex';
import categories from './categories';
import cart from './cart';
import promo from './promo';
import product from './product';
import extend from 'lodash/extend';
import {USER_LOGGED_IN_, USER_LOGIN_, USER_LOGIN_FORM_SHOW_} from "./types";
import {USER_IS_LOGGED_IN_, USER_IS_LOGGING_IN_} from "@/store/types";

const $ = jQuery;

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    customer: {
      id: null,
      form: false,
      isLoggingIn: false,
    }
  },
  getters: {
    [USER_LOGGED_IN_]: ({customer}) => typeof customer.id !== 'undefined' && customer.id !== null,
    [USER_LOGIN_FORM_SHOW_]: ({customer}) => customer.form
  },
  mutations: {
    [USER_IS_LOGGING_IN_](state) {
      state.customer.isLoggingIn = true;
    },
    [USER_IS_LOGGED_IN_](state) {
      state.customer.isLoggingIn = false;
    },
    [USER_LOGIN_FORM_SHOW_]({customer}, value) {
      if (typeof value === 'undefined')
        customer.form = !customer.form;
      else customer.form = value;
    },
    [USER_LOGIN_](state, value) {
      state.customer = Object.assign({}, state.customer, value);
    }
  },
  actions: {
    [USER_LOGIN_FORM_SHOW_]({commit}) {
      commit(USER_LOGIN_FORM_SHOW_);
    },
    async [USER_LOGIN_]({commit}, form) {
      await $.ajax({
        type: "POST",
        url: "/account/login",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $(form).serialize()
      });
      const customer = JSON.parse(await $.get('/account/?view=json'));
      commit(USER_IS_LOGGED_IN_);
      commit(USER_LOGIN_, customer);
    }
  },
  modules: {
    product,
    categories,
    cart,
    promo
  }
});

if (vth) {
  store.replaceState(extend({}, vth, {
    customer: {
      isLoggingIn: false
    }
  }));
}
export default store;
