import {PRODUCTS_FETCH_, PRODUCTS_LIST_, PRODUCTS_SORT_} from "./types";
import sortBy                                            from 'lodash/sortBy';
import {ProductItem_}                                    from "../components/classes";

export default {
  state: {
    list: [],
    sort: 'new',
    slides: []
  },
  getters: {
    [PRODUCTS_LIST_]: ({list, sort}) => sortBy(list.map(ProductItem_), [o => {
      switch (sort) {
        case 'new':
          return -(o.id*1);
        case 'name':
          return o._title.vi.toLowerCase();
        case 'sale':
          return -o.sale;
        case 'pricelow':
          return -o.priceRaw;
        case 'pricehigh':
          return o.priceRaw;
        default:
          return o.id;
      }
    }]),
  },
  mutations: {
    [PRODUCTS_FETCH_]: (state, data) => {
      const {list, slides} = data;
      state.list = list;
      state.slides = (Object.keys(slides).length === 0) ? [] : slides.list;
    },
    [PRODUCTS_SORT_]: (state, type) => state.sort = type
  },
};
