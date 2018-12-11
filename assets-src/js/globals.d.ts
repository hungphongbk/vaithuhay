declare global {
  const SERVER_URL: string;
  const FIREBASE_API_KEY: string;

  interface I18nObject<T> {
    en: T;
    vi: T;
  }
}

import "vue-i18n/types/index";
import { Store } from "vuex";
import { RootState } from "js/store/types";

declare module "vue/types/vue" {
  interface Vue {
    $vthStore?: Store<RootState>;
    $style: {
      [key: string]: string;
    };
  }
}
