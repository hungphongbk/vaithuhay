import {Module} from "vuex";
import {
  CUSTOMER_ADDRESS_ACTION_DELETE,
  CUSTOMER_ADDRESS_ACTION_UPDATE,
  CUSTOMER_ADDRESS_MUTATION_DELETE,
  CUSTOMER_ADDRESS_MUTATION_UPDATE,
  FLASH_ACTION_PUSH_MESSAGE,
  FLASH_CONTEXT_SUCCESS,
  RootState,
} from '@/store/types';
import {CustomerAPI} from '@/store/api';
import {ModalManager} from '../plugins';
import {SYSTEM_MODAL_CANCEL, SYSTEM_MODAL_OK} from "@/types";
import {FlashMessage} from "./flashMessages";

//region Typing
export interface CustomerAddress {
  default?: Boolean
  id: Number | String
  first_name: String,
  last_name: String

  address1: String
  city: String
  country: String
  country_code: String
  province: String
  province_code: String
  district: String
  district_code: String
  ward: String
  ward_code: String
  phone: String
}

export interface CustomerAddressState {
  list: Array<CustomerAddress>
}

declare module 'js/store/customer' {
  interface CustomerState {
    address?: CustomerAddressState
  }
}
//endregion

const module: Module<CustomerAddressState, RootState> = {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    [CUSTOMER_ADDRESS_MUTATION_DELETE](state, id) {
      const index = state.list.findIndex(address => address.id === id);
      state.list.splice(index, 1);
    },
    [CUSTOMER_ADDRESS_MUTATION_UPDATE](state, address: CustomerAddress) {
      const index = state.list.findIndex(i => i.id === address.id);
      state.list.splice(index, 1, address);
    },
  },
  actions: {
    async [CUSTOMER_ADDRESS_ACTION_DELETE]({commit, dispatch}, {id, first_name, last_name}: CustomerAddress) {
      const rs = await ModalManager("Xác nhận", "Bạn có muốn xóa địa chỉ này ra khỏi danh sách?", [
        {label: "Bỏ qua", type: SYSTEM_MODAL_CANCEL},
        {label: "OK", type: SYSTEM_MODAL_OK, isPrimary: true},
      ]);
      if (rs === SYSTEM_MODAL_OK) {
        await CustomerAPI.address.delete(id);
        commit(CUSTOMER_ADDRESS_MUTATION_DELETE, id);

        //message
        dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
          label: 'user/address',
          context: FLASH_CONTEXT_SUCCESS,
          message: `Địa chỉ của "${first_name} ${last_name}" đã được xóa khỏi danh sách`,
        }, {root: true});
      }
    },
    async [CUSTOMER_ADDRESS_ACTION_UPDATE]({commit, dispatch}, address: CustomerAddress) {
      await CustomerAPI.address.update(address);
      commit(CUSTOMER_ADDRESS_MUTATION_UPDATE, address);

      dispatch(FLASH_ACTION_PUSH_MESSAGE, <FlashMessage>{
        label: 'user/address',
        context: FLASH_CONTEXT_SUCCESS,
        message: `Địa chỉ của "${address.first_name} ${address.last_name}" đã được cập nhật thành công`,
      }, {root: true});
    },
  },
};

export default module;
