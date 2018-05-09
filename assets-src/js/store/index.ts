import Vue                       from 'vue';
import Vuex, {StoreOptions}      from 'vuex';
import categories                from './categories';
import cart                      from './cart';
import promo                     from './promo';
import customer                  from './customer';
import flash, {FlashMessagesApi} from './flashMessages';
import {RootState}               from './types';

Vue.use(Vuex);
const options: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    customer,
    categories,
    cart,
    promo,
    flash,
  },
}
  , store = new Vuex.Store<RootState>(options);
// polyfill(store);

export default store;

export const FlashMessagesAPI = FlashMessagesApi(store);
