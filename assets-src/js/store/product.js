import {
  PRODUCT_ACTION_FAVORITE_TOGGLE_,
  PRODUCT_MUTATION_FAVORITE_ADD_,
  PRODUCT_MUTATION_FAVORITE_REMOVE_
} from "@/store/types";

import auth from '@/plugins/auth';
import http from "@/plugins/http";

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
    [PRODUCT_ACTION_FAVORITE_TOGGLE_]({commit, dispatch, state}) {
      auth.wrap(async () => {
        const {behavior} = await http.post(SERVER_URL + 'products/' + state.current.id + '/favorite', {}, true);
        const mutation = behavior === 'add' ? PRODUCT_MUTATION_FAVORITE_ADD_ : PRODUCT_MUTATION_FAVORITE_REMOVE_;
        commit(mutation);
      });
    }
  }
};
