///<reference path="../global.d.ts"/>
import {
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_CONTEXT_SUCCESS,
  PRODUCT_ACTION_FAVORITE_FETCH_,
  PRODUCT_ACTION_FAVORITE_TOGGLE_,
  PRODUCT_MUTATION_FAVORITE_ADD_,
  PRODUCT_MUTATION_FAVORITE_REMOVE_,
  RootState,
  USER_FAVORITES_,
} from "./types";

import auth, {authWithoutWarning} from '../plugins/auth';
import {ProductFavoriteAPI} from "./api";
import {FlashMessage} from "./flashMessages";
import {Module} from "vuex";

export interface ProductState {
  current: {
    id: number | string,
    _title?: I18nObject<string>,
    description?: {
      desc: I18nObject<string>
    }
  },
  favorite: boolean
}

const module: Module<ProductState, RootState> = {
  state() {
    return {
      current: {
        id: 0,
        _title: null,
      },
      favorite: false,
    };
  },
  mutations: {
    [PRODUCT_MUTATION_FAVORITE_ADD_](state) {
      state.favorite = true;
    },
    [PRODUCT_MUTATION_FAVORITE_REMOVE_](state) {
      state.favorite = false;
    },
  },
  actions: {
    [PRODUCT_ACTION_FAVORITE_FETCH_]({commit, state}) {
      authWithoutWarning.wrap(async () => {
        const {value} = await ProductFavoriteAPI.fetch(state.current.id);
        const mutation = value ? PRODUCT_MUTATION_FAVORITE_ADD_ : PRODUCT_MUTATION_FAVORITE_REMOVE_;
        commit(mutation);
      })();
    },
    [PRODUCT_ACTION_FAVORITE_TOGGLE_]({commit, dispatch, state}) {
      auth.wrap(async () => {
        const {behavior} = await ProductFavoriteAPI.toggle(state.current.id);
        const mutation = behavior === 'add' ? PRODUCT_MUTATION_FAVORITE_ADD_ : PRODUCT_MUTATION_FAVORITE_REMOVE_;
        commit(mutation);
        await Promise.all([
          dispatch(USER_FAVORITES_),
          dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
            label: 'product/favorite',
            context: FLASH_CONTEXT_SUCCESS,
            message: `Sản phẩm ${state.current._title.vi} đã được thêm vào danh sách yêu thích thành công`,
          }, {root: true}),
        ]);
      })();
    },
  },
};

export default module;
