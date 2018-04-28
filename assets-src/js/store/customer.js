import {
  USER_IS_LOGGED_IN_,
  USER_IS_LOGGING_IN_,
  USER_LOGGED_IN_,
  USER_LOGIN_,
  USER_LOGIN_FAILED_,
  USER_LOGIN_FORM_SHOW_,
  USER_LOYALTY_
} from "@/store/types";

const $ = jQuery;

export default {
  state: {
    id: null,
    name: '',
    form: false,
    isLoggingIn: false,
    loyalty: {
      point: 0,
      balance: 0
    }
  },
  getters: {
    [USER_LOGGED_IN_]: (state) => typeof state.id !== 'undefined' && state.id !== null,
    [USER_LOGIN_FORM_SHOW_]: (state) => state.form,
    [USER_LOYALTY_]: (state) => state.loyalty
  },
  mutations: {
    [USER_LOGIN_FAILED_](state) {
    },
    [USER_IS_LOGGING_IN_](state) {
      state.isLoggingIn = true;
    },
    [USER_IS_LOGGED_IN_](state) {
      state.isLoggingIn = false;
    },
    [USER_LOGIN_FORM_SHOW_](state, value) {
      if (typeof value === 'undefined')
        state.form = !state.form;
      else state.form = value;
    },
    [USER_LOGIN_](state, value) {
      // state = Object.assign({}, state, value);
      for (const key of Object.keys(state)) if (typeof key === 'string') {
        console.log(key);
        state[key] = value[key];
      }
    }
  },
  actions: {
    async fetch() {
      try {
        return JSON.parse(await $.get('/account/?view=json'));
      } catch (e) {
        //login failed
        return null;
      }
    },
    [USER_LOGIN_FORM_SHOW_]({commit}) {
      commit(USER_LOGIN_FORM_SHOW_);
    },
    async [USER_LOGIN_]({commit, dispatch}, form = null) {
      if (form)
        await $.ajax({
          type: "POST",
          url: "/account/login",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $(form).serialize()
        });
      const customer = await dispatch('fetch');
      if (customer) {
        commit(USER_IS_LOGGED_IN_);
        commit(USER_LOGIN_, customer);
      } else {
        commit(USER_LOGIN_FAILED_);
      }
    }
  }
};
