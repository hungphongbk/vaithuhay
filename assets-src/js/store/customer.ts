import {
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_CONTEXT_SUCCESS,
  USER_FAVORITES_,
  USER_IS_LOGGED_IN_,
  USER_IS_LOGGING_IN_,
  USER_LOGGED_IN_,
  USER_LOGIN_,
  USER_LOGIN_FAILED_,
  USER_LOGIN_FORM_SHOW_,
  USER_LOYALTY_,
  USER_TOGGLE_FAVORITE,
} from "./types";
import Vue from 'vue';
import {ProductFavoriteAPI} from "./api";
import {ModalManager} from "../plugins";
import {SYSTEM_MODAL_CANCEL, SYSTEM_MODAL_OK} from "../types";
import {FlashMessage} from "./flashMessages";

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
    },
    favorites: []
  },
  getters: {
    [USER_LOGGED_IN_]: (state) => typeof state.id !== 'undefined' && state.id !== null,
    [USER_LOGIN_FORM_SHOW_]: (state) => state.form,
    [USER_LOYALTY_]: (state) => state.loyalty,
    [USER_FAVORITES_]: (state) => state.favorites
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
        state[key] = value[key];
      }
    },
    [USER_FAVORITES_](state, favorites) {
      //state.favorites = state.favorites.splice(0, state.favorites.length, ...favorites);
      Vue.set(state, 'favorites', favorites);
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
    async [USER_FAVORITES_]({commit}) {
      commit(USER_FAVORITES_, await ProductFavoriteAPI.fetchAll());
    },
    async [USER_TOGGLE_FAVORITE]({dispatch}, {id, title}) {
      const rs = await ModalManager("Xác nhận", "Bạn có muốn xóa sản phẩm này ra khỏi danh sách yêu thích?", [
        {label: "Bỏ qua", type: SYSTEM_MODAL_CANCEL},
        {label: "OK", type: SYSTEM_MODAL_OK, isPrimary: true}
      ]);
      if (rs === SYSTEM_MODAL_OK) {
        await ProductFavoriteAPI.toggle(id);
        dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
          label: 'product/favorite',
          context: FLASH_CONTEXT_SUCCESS,
          message: `Sản phẩm ${title} đã được xóa khỏi danh sách yêu thích thành công`,
        }, {root: true});
        dispatch(USER_FAVORITES_);
      }
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

        //preload user data
        await Promise.all([
          dispatch(USER_FAVORITES_)
        ]);
      } else {
        commit(USER_LOGIN_FAILED_);
      }
    }
  }
};
