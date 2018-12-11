import { PROMO_LIST_ } from "./types";
import i18n from "../plugins/i18n";

export default {
  state: {
    list: []
  },
  getters: {
    [PROMO_LIST_]: ({ list }) =>
      list.map(item => ({
        ...item,
        get img$() {
          return item.img[i18n.locale];
        }
      }))
  }
};
