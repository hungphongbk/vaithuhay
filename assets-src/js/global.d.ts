import "vue-i18n/types/index";
import Vue, {ComponentOptions} from "vue";
import {Store} from "vuex";
import {RootState} from 'js/store/types'

declare var vth: any;

interface I18nObject<T> {
  en: T,
  vi: T
}

// declare module "vue/types/vue" {
//   interface Vue {
//     $store?: Store<RootState>;
//   }
// }
