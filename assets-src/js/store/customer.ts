import {
  RootState,
  USER_ACTION_UPDATE,
  USER_FAVORITES_,
  USER_GETTER_CURRENT_PAGE,
  USER_IS_LOGGED_IN_,
  USER_IS_LOGGING_IN_,
  USER_LOGGED_IN_,
  USER_LOGIN_FAILED_,
  USER_LOGIN_FORM_SHOW_,
  USER_LOYALTY_,
  USER_MUTATION_INIT_PAGES,
  USER_MUTATION_LOGIN_,
  USER_MUTATION_NAVIGATE_PAGE,
  USER_MUTATION_UPDATE,
  USER_TOGGLE_FAVORITE,
}                                             from "js/store/types";
import {CustomerAPI, ProductFavoriteAPI}      from "./api";
import {ModalManager}                         from "../plugins";
import {SYSTEM_MODAL_CANCEL, SYSTEM_MODAL_OK} from "@/types";
import address                                from './customer.address';
import {Module}                               from "vuex";
import {FlashMessagesAPI}                     from "@/store/index";

//region Typing
export interface CustomerState {
  id: number | string
  name: string
  email: string
  gender: number
  birthday: string
  form: boolean
  isLoggingIn: boolean
  pages: {
    list: Array<any>,
    current: number
  }
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
    gender: null,
    birthday: '',
    form: false,
    isLoggingIn: false,
    pages: {
      list: [],
      current: -1,
    },
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
    [USER_GETTER_CURRENT_PAGE]: (state) => state.pages.list[state.pages.current],
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
    [USER_MUTATION_LOGIN_](state, value) {
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
    [USER_MUTATION_INIT_PAGES](state, pages: Array<any>) {
      state.pages.list = pages;
    },
    [USER_MUTATION_NAVIGATE_PAGE](state, id: number) {
      state.pages.current = id;
    },
  },
  actions: {
    async fetch({state}, email = null) {
      try {
        const _user = JSON.parse(await $.get('/account/?view=json'));
        return await CustomerAPI.login(email ? email : _user.email);
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
        // noinspection JSIgnoredPromiseFromCall
        FlashMessagesAPI.pushSuccessWithErrHandler(
          'product/information',
          async () => {
            await ProductFavoriteAPI.toggle(id);
            dispatch(USER_FAVORITES_);
          },
          `Sản phẩm ${title} đã được xóa khỏi danh sách yêu thích thành công`,
          'Có lỗi xảy ra. Hãy thử lại');
      }
    },
    async [USER_MUTATION_LOGIN_]({commit, dispatch}, form = null) {
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
        commit(USER_MUTATION_LOGIN_, customer);

        //preload user data
        await Promise.all([
          dispatch(USER_FAVORITES_),
        ]);
      } else {
        commit(USER_LOGIN_FAILED_);
      }
    },
    async [USER_ACTION_UPDATE]({commit, dispatch}, body = {}) {
      // noinspection JSIgnoredPromiseFromCall
      FlashMessagesAPI.pushSuccessWithErrHandler(
        'user/information',
        async () => {
          await CustomerAPI.update(body);
          const customer = await dispatch('fetch');
          commit(USER_MUTATION_LOGIN_, customer);
        },
        `Bạn đã cập nhật thông tin người dùng thành công`,
        'Có lỗi xảy ra. Hãy thử lại');
    },
  },
  modules: {
    address,
  },
};


export default module;
