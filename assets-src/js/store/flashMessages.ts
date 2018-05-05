import {
  FLASH_ACTION_POP_MESSAGE,
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_MUTATION_POP_MESSAGE,
  FLASH_MUTATION_PUSH_MESSAGE,
  FlashMessageContext,
  RootState,
} from "./types";
import sortBy from 'lodash/sortBy';
import {Module} from "vuex";

//region Typing
export interface FlashMessage {
  label: string,
  context: FlashMessageContext,
  message: string
}

interface FlashState {
  messages: Array<FlashMessage>
}

//endregion

const module: Module<FlashState, RootState> = {
  state: () => ({
    messages: [],
  }),
  // getters: {},
  mutations: ({
    [FLASH_MUTATION_PUSH_MESSAGE](state, message: FlashMessage) {
      state.messages.push(message);
      state.messages = sortBy(state.messages, ['label']);
    },
    [FLASH_MUTATION_POP_MESSAGE](state, ...message: Array<FlashMessage>) {

    },
  }),
  actions: ({
    [FLASH_ACTION_PUSH_MESSAGE]({commit}, message: FlashMessage) {
      commit(FLASH_MUTATION_PUSH_MESSAGE, message);
    },
    [FLASH_ACTION_POP_MESSAGE]({commit, state}, label) {
      //get last messages with label from state
      const filtered = '';
    },
  }),
};

export default module;
