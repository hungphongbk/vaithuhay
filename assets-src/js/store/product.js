import {
  PRODUCT_ACTION_FAVORITE_FETCH_,
  PRODUCT_ACTION_FAVORITE_TOGGLE_,
  PRODUCT_MUTATION_FAVORITE_ADD_,
  PRODUCT_MUTATION_FAVORITE_REMOVE_,
  USER_FAVORITES_
} from "@/store/types";

import auth, {authWithoutWarning} from '@/plugins/auth';
import {ProductFavoriteAPI} from "@/store/api";

export default {
  state() {
    return {
      current: {
        id: 0
      },
      favorite: false
    };
  },
  mutations: {
    [PRODUCT_MUTATION_FAVORITE_ADD_](state) {
      state.favorite = true;
    },
    [PRODUCT_MUTATION_FAVORITE_REMOVE_](state) {
      state.favorite = false;
    }
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
        await dispatch(USER_FAVORITES_);
      })();
    }
  }
};
