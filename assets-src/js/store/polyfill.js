import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep'
import customer from './customer'
import address from './customer.address'

export default function (store) {
  const obj = extend({}, vth, {
    customer: {
      ...customer.state(),
      address: address.state(),
    },
    flash: {
      messages: []
    },
  });
  console.log(cloneDeep(obj));
  store.replaceState(cloneDeep(obj));
  // store.registerModule('customer',customer);
  // store.registerModule(['customer', 'address'], address);
}
