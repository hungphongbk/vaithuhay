import {
  FLASH_ACTION_POP_MESSAGE,
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_CONTEXT_ERROR,
  FLASH_CONTEXT_SUCCESS,
  FLASH_MUTATION_POP_MESSAGE,
  FLASH_MUTATION_PUSH_MESSAGE,
  FlashMessageContext,
  RootState
} from "./types";
import sortBy from "lodash/sortBy";
import filter from "lodash/filter";
import remove from "lodash/remove";
import { Module, Store } from "vuex";
import objectHash from "object-hash";

//region Typing
export interface FlashMessage {
  id?: string;
  label: string;
  context: FlashMessageContext;
  message: string;
}

interface FlashState {
  messages: Array<FlashMessage>;
}

//endregion

const module: Module<FlashState, RootState> = {
  state: () => ({
    messages: []
  }),
  // getters: {},
  mutations: {
    [FLASH_MUTATION_PUSH_MESSAGE](state, message: FlashMessage) {
      if (!message.id) message.id = objectHash(message);
      state.messages.push(message);
      state.messages = sortBy(state.messages, ["label"]);
    },
    [FLASH_MUTATION_POP_MESSAGE](state, messages: Array<FlashMessage>) {
      const ids = messages.map(m => m.id);
      remove(state.messages, ({ id }) => ids.indexOf(id) >= 0);
    }
  },
  actions: {
    [FLASH_ACTION_PUSH_MESSAGE]({ commit }, message: FlashMessage) {
      commit(FLASH_MUTATION_PUSH_MESSAGE, message);
    },
    [FLASH_ACTION_POP_MESSAGE]({ commit, state }, label) {
      //get last messages with label from state
      const filtered = filter(state.messages, { label }) as Array<FlashMessage>;
      //commit to remove them out of state
      if (filtered.length > 0) commit(FLASH_MUTATION_POP_MESSAGE, filtered);

      return filtered;
    }
  }
};

export default module;

type PromiseHandler = () => void | Promise<any>;
export const FlashMessagesApi = ({ dispatch }: Store<RootState>) => ({
  /**
   *
   * @param {string} label Label của thông báo
   * @param {PromiseHandler} fn Hàm thực thi chính Fn
   * @param {string} successMessage Nếu Fn thành công, sẽ hiện ra thông báo thành công màu xanh lá với message này
   * @param {string} errMessage Nếu Fn có lỗi, sẽ hiện ra thông báo lỗi màu đỏ với message này
   * @returns {Promise<void>}
   */
  async pushSuccessWithErrHandler(
    label: string,
    fn: PromiseHandler,
    successMessage: string,
    errMessage: string = "Có lỗi xảy ra. Hãy thử lại!"
  ) {
    try {
      await fn();
      // noinspection JSIgnoredPromiseFromCall
      dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
        label,
        context: FLASH_CONTEXT_SUCCESS,
        message: successMessage
      });
    } catch (e) {
      // noinspection JSIgnoredPromiseFromCall
      dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
        label,
        context: FLASH_CONTEXT_ERROR,
        message: errMessage
      });
    }
  }
});
