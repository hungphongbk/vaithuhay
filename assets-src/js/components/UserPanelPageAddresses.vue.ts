import Vue from 'vue';
import Component from 'vue-class-component';
import {namespace, State} from "vuex-class";
import {CustomerAddress, CustomerAddressState} from "../store/customer.address";
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';

const ModuleState = namespace('address', State);

interface AddressExtended extends CustomerAddress {
  fullAddress: string
}

@Component({
  data: () => ({
    faCheckCircle,
  }),
})
export default class UserPanelPageAddresses extends Vue {
  @ModuleState((state: CustomerAddressState) => state.list) _address: Array<CustomerAddress>;

  get address(): Array<AddressExtended> {
    return this._address.map(item => ({
      ...item,
      fullAddress: ((): string => [item.address1, item.district, item.province].join(', '))(),
    }));
  }
}

export {default as PageAddressesIcon} from '@fortawesome/fontawesome-free-regular/faAddressCard';
