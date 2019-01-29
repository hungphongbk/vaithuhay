import { Store } from "vuex";
import {ensureResponsiveAvailable} from "@/utils/ensureResponsiveAvailable";

export default ({ $mq }, store: Store) => {
  store.registerModule("mq", {
    namespaced: true,
    state: () => $mq
  });
  ensureResponsiveAvailable.mark()
};
