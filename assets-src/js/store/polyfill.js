import Vue from "vue";
import extend from "lodash/extend";
import cloneDeep from "lodash/cloneDeep";
import customer from "./customer";
import address from "./customer.address";

export default function(store) {
  const obj = extend({}, vth, {
    customer: {
      ...customer.state(),
      address: address.state()
    },
    flash: {
      messages: []
    }
  });
  store.replaceState(cloneDeep(obj));

  Object.defineProperties(Vue.prototype, {
    $vthStore: {
      get() {
        return store;
      }
    }
  });
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    "use strict";
    if (typeof start !== "number") {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
