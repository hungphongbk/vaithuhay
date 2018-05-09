import Vue       from 'vue';
import extend    from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';
import customer  from './customer';
import address   from './customer.address';

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
  store.replaceState(cloneDeep(obj));

  Object.defineProperty(Vue.prototype, '$vthStore', {
    get() {
      return store;
    }
  });
}
