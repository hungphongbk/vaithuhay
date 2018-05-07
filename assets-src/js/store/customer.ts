import {
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_CONTEXT_SUCCESS,
  RootState,
  USER_ACTION_UPDATE,
  USER_FAVORITES_,
  USER_IS_LOGGED_IN_,
  USER_IS_LOGGING_IN_,
  USER_LOGGED_IN_,
  USER_LOGIN_,
  USER_LOGIN_FAILED_,
  USER_LOGIN_FORM_SHOW_,
  USER_LOYALTY_,
  USER_MUTATION_UPDATE,
  USER_TOGGLE_FAVORITE,
} from "js/store/types";
import {CustomerAPI, ProductFavoriteAPI} from "./api";
import {ModalManager} from "../plugins";
import {SYSTEM_MODAL_CANCEL, SYSTEM_MODAL_OK} from "../types";
import {FlashMessage} from "./flashMessages";
import address from './customer.address';
import {Module} from "vuex";

//region Typing
export interface CustomerState {
  id: number | string
  name: string
  email: string
  form: boolean
  isLoggingIn: boolean
  loyalty: {
    point: number
    balance: number
  }
  favorites: Array<any>
}

declare module 'js/store/types' {
  interface RootState {
    customer: CustomerState
  }
}
//endregion

const $ = jQuery;

const module: Module<CustomerState, RootState> = {
  state: () => ({
    id: null,
    name: '',
    email: '',
    form: false,
    isLoggingIn: false,
    loyalty: {
      point: 0,
      balance: 0,
    },
    favorites: [],
  }),
  getters: {
    [USER_LOGGED_IN_]: (state) => typeof state.id !== 'undefined' && state.id !== null,
    [USER_LOGIN_FORM_SHOW_]: (state) => state.form,
    [USER_LOYALTY_]: (state) => state.loyalty,
    [USER_FAVORITES_]: (state) => state.favorites,
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
      for (const key of Object.keys(state)) if (value.hasOwnProperty(key)) {
        state[key] = value[key];
      }
    },
    [USER_FAVORITES_](state, favorites) {
      state.favorites = favorites;
    },
    [USER_MUTATION_UPDATE](state) {

    },
  },
  actions: {
    async fetch({state}, email = null) {
      try {
        const _user = JSON.parse(await $.get('/account/?view=json')),
          user = await CustomerAPI.login(email ? email : _user.email);
        return user;
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
        {label: "OK", type: SYSTEM_MODAL_OK, isPrimary: true},
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
          data: $(form).serialize(),
        });
      const customer = await dispatch('fetch', form ? form.customer_email : null);
      if (customer) {
        commit(USER_IS_LOGGED_IN_);
        commit(USER_LOGIN_, customer);

        //preload user data
        await Promise.all([
          dispatch(USER_FAVORITES_),
        ]);
      } else {
        commit(USER_LOGIN_FAILED_);
      }
    },
    async [USER_ACTION_UPDATE]({commit, dispatch}, body = {}) {
      await CustomerAPI.update(body);
      const customer = await dispatch('fetch');
      commit(USER_LOGIN_, customer);
      await dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
        label: 'user/information',
        context: FLASH_CONTEXT_SUCCESS,
        message: `Bạn đã cập nhật thông tin người dùng thành công`,
      }, {root: true});
    },
  },
  modules: {
    address,
  },
};


export default module;
