import Vue from 'vue';
import Component from 'vue-class-component';
import {Action, namespace, State} from "vuex-class";
import {CustomerAddress, CustomerAddressState} from "@/store/customer.address";
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faEdit from '@fortawesome/fontawesome-free-regular/faEdit';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import faSave from '@fortawesome/fontawesome-free-regular/faSave';
import {FlashMessageHub} from './index';
import {CUSTOMER_ADDRESS_ACTION_DELETE, CUSTOMER_ADDRESS_ACTION_UPDATE} from "@/store/types";
import omit from 'lodash/omit';

const ModuleState = namespace('address', State),
  ModuleAction = namespace('address', Action);

interface AddressExtended extends CustomerAddress {
  fullName: string
  fullAddress: string
  isEditMode: boolean
}

class Address implements AddressExtended {
  //region Typing
  default?: Boolean;
  id: Number | string;
  first_name: string;
  last_name: string;

  address1: string;
  city: string;
  country: string;
  country_code: string;
  province: string;
  province_code: string;
  district: string;
  district_code: string;
  ward: string;
  ward_code: string;
  phone: string;

  //endregion
  context: any;

  constructor(item: CustomerAddress, context: any) {
    Object.assign(this, Object.assign({}, item));
    this.context = context;
  }

  get fullName() {
    return this.first_name + ' ' + this.last_name;
  }

  set fullName(value) {
    this.first_name = value.split(' ').slice(0, -1).join(' ');
    this.last_name = value.split(' ').slice(-1).join(' ');
  }

  get fullAddress(): string {
    return [this.address1, this.district, this.province].join(', ');
  }

  get isEditMode(): boolean {
    const context = this.context;
    return context.edit && context.edit.id === this.id;
  }

  get toObject(): CustomerAddress {
    return omit(Object.assign({}, this), ['context', 'fullname', 'fullAddress', 'isEditMode']) as CustomerAddress;
  }
}

@Component({
  components: {FlashMessageHub},
  data: () => ({
    faCheckCircle,
    faEdit,
    faTrashAlt,
    faSave,
  }),
})
export default class UserPanelPageAddresses extends Vue {
  @ModuleState((state: CustomerAddressState) => state.list) _address: Array<CustomerAddress>;

  edit: AddressExtended = null;

  get address(): Array<AddressExtended> {
    const self = this;
    return self._address.map(item => {
      return new Address(item, self);
    });
  }

  @ModuleAction(CUSTOMER_ADDRESS_ACTION_DELETE) deleteItem;
  @ModuleAction(CUSTOMER_ADDRESS_ACTION_UPDATE) updateItem;

  beginEdit(item) {
    this.edit = item;
  }

  cancelEdit() {
    this.edit = null;
  }

  beforeDestroy() {
    this.edit = null;
  }
}

export {default as PageAddressesIcon} from '@fortawesome/fontawesome-free-regular/faAddressCard';
