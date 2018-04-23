import i18n from '../plugins/i18n'
import {CATEGORIES_LIST_, CATEGORIES_ALL_, CATEGORY_ONSALE_} from "./types"

const trans = list => list
  .map(cat => ({
    ...cat,
    get title() {
      return i18n.locale === 'vi' ? cat._title.vi : cat._title.en.translated;
    },
    get isHidden() {
      return cat.settings.enable === "false";
    }
  }))
  .filter(cat => !cat.isHidden);

export default {
  state: {
    list: [],
  },
  getters: {
    [CATEGORIES_LIST_]: ({list}) => trans(list),
    [CATEGORIES_ALL_]: ({list}) => trans(list).find(({url}) => /tatcasanpham/.test(url))
  }
}
