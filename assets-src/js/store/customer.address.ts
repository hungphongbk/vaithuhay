import {Module} from "vuex";
import {RootState} from 'js/store/types';

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
}

interface CustomerAddressState {
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
  state(){
    return {
      list: [],
    }
  },
};

export default module;
