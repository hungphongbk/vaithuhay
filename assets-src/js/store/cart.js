import {CART_ADD_, CART_COUNT_, CART_FETCH_, CART_HAS_PRODUCT_, CART_LIST_, CART_REMOVE_, CART_TOTAL_} from "./types";
import {CartItem} from "../components/classes";
import {SYSTEM_CART_OPEN} from "@/types";
import {Event} from "@/components";

const $ = jQuery,
  {list: listUrl, add: addUrl, change: changeUrl} = vth.links.cart;

export default {
  state: {
    items: [],
    count: 0,
    price: 0
  },
  getters: {
    [CART_LIST_]: (state) => state.items.map(i => new CartItem(i)),
    [CART_COUNT_]: ({count}) => count,
    [CART_TOTAL_]: ({price}) => price
  },
  mutations: {
    [CART_FETCH_]: (state, {items, item_count: count, total_price: price}) => {
      state.items = items;
      state.count = count;
      state.price = price;
    },
    [CART_HAS_PRODUCT_]: ({items}, id) => {
      // if (process.env.NODE_ENV === 'development') {
      console.log('[store/cart] Checking cart has product with id=' + id);
      // }
      const found = items.find(item => item.product_id * 1 === id * 1);
      console.log(typeof found);
      return typeof found !== 'undefined';
    }
  },
  actions: {
    async [CART_FETCH_]({commit}) {
      const data = await $.getJSON(listUrl);
      commit(CART_FETCH_, data);
    },
    async [CART_ADD_]({dispatch}, {id, quantity = 1}) {
      console.log('[store/cart] Add product with variant id=' + id);
      try {
        await $.ajax({
          url: addUrl,
          type: 'post',
          dataType: 'json',
          data: {id, quantity}
        });
        await dispatch(CART_FETCH_);
        Event.$emit(SYSTEM_CART_OPEN);
      } catch (e) {

      }
    },
    async [CART_REMOVE_]({commit}, {id, quantity = 0}) {
      try {
        const data = await $.ajax({
          url: changeUrl,
          type: 'post',
          dataType: 'json',
          data: {quantity, id}
        });
        commit(CART_FETCH_, data);
      } catch (e) {

      }
    }
  }
};

if (module.hot) {

}
