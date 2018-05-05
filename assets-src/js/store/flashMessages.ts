import {
  FLASH_ACTION_POP_MESSAGE,
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_MUTATION_POP_MESSAGE,
  FLASH_MUTATION_PUSH_MESSAGE,
  FlashMessageContext,
  RootState,
} from "./types";
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import remove from 'lodash/remove';
import {Module} from "vuex";
import objectHash from 'object-hash';

//region Typing
export interface FlashMessage {
  id?: string,
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
  mutations: {
    [FLASH_MUTATION_PUSH_MESSAGE](state, message: FlashMessage) {
      if (!message.id)
        message.id = objectHash(message);
      state.messages.push(message);
      state.messages = sortBy(state.messages, ['label']);
    },
    [FLASH_MUTATION_POP_MESSAGE](state, messages: Array<FlashMessage>) {
      const ids = messages.map(m => m.id);
      remove(state.messages, ({id}) => ids.indexOf(id) >= 0);
    },
  },
  actions: {
    [FLASH_ACTION_PUSH_MESSAGE]({commit}, message: FlashMessage) {
      commit(FLASH_MUTATION_PUSH_MESSAGE, message);
    },
    [FLASH_ACTION_POP_MESSAGE]({commit, state}, label) {
      //get last messages with label from state
      const filtered = filter(state.messages, {label}) as Array<FlashMessage>;
      //commit to remove them out of state
      if (filtered.length > 0)
        commit(FLASH_MUTATION_POP_MESSAGE, filtered);

      return filtered;
    },
  },
};

export default module;
