import StaticOverlay                        from '@/components/static-overlay.vue';
import AppLoginWrapper                      from '@/components/app__LoginWrapper';
import {USER_IS_LOGGING_IN, USER_LOGGED_IN} from "@/store/types";
import debounce                             from 'lodash/debounce';
import qs                                   from 'query-string';
import faFacebook                           from '@fortawesome/fontawesome-free-brands/faFacebookF';
import faGoogle                             from '@fortawesome/fontawesome-free-brands/faGoogle';

const $ = jQuery;

export const overlayMixin = {
  components: {
    StaticOverlay
  },
  props: {
    overlayKey: String
  },
  data() {
    return {
      show_: false,
      showArr_: []
    };
  },
  computed: {
    show$: {
      get() {
        if (typeof this.overlayKey === 'undefined')
          return this.show_;
        else {
          if (typeof this.showArr_[this.overlayKey] === 'undefined') {
            this.showArr_[this.overlayKey] = false;
          }
          return this.showArr_[this.overlayKey];
        }
      },
      set(value) {
        if (typeof this.overlayKey === 'undefined')
          this.show_ = value;
        else this.showArr_[this.overlayKey] = value;
      }
    }
  },
  provide() {
    const self = this,
      overlay = {
        get show_() {
          return self.show_;
        }
      };
    return {overlay};
  }
};

export const addToCartMixin = {
  provide() {
    const self = this,
      cartItem_ = {
        get id() {
          return self.variantId;
        },
        get quantity() {
          return self.quantity;
        },
        set quantity(value) {
          self.quantity = value;
        }
      };
    return {cartItem_};
  }
};

export const loginMixins = {
  components: {
    AppLoginWrapper
  },
  data() {
    return {
      customer: {
        email: '',
        password: ''
      },
      faFacebook,
      faGoogle
    };
  },
  methods: {
    facebookLogin() {
      this.$vthStore.commit(USER_IS_LOGGING_IN);
      FB.login(async ({authResponse}) => {
        console.log(authResponse);
        if (authResponse) {
          const [email, password] = atob(await $.post('https://server.vaithuhay.com/b/social/auth/facebook', {access_token: authResponse.accessToken})).split(':');
          this.$refs.form.login(email, password);
        }
      }, {scope: 'email'});
    },
    googleLogin() {

    }
  },
  beforeCreate() {
    $.cachedScript('https://apis.google.com/js/client.js');
  }
};

export const orderTrackingMixin = {
  data() {
    return {
      manualFind_: false,
      find: {
        kw: '',
        kw_: ''
      },
      cached_: []
    };
  },
  computed: {
    loggedIn() {
      return this.$vthStore.getters[USER_LOGGED_IN];
    },
    customerId() {
      return this.$vthStore.state.customer.id;
    },
    manualFind() {
      if (!this.loggedIn) return true;
      return this.manualFind_;
    },
    criteria() {
      const criteria = {};
      if (!this.manualFind) {
        criteria.customerId = this.customerId;
      } else {
        criteria.kw = this.find.kw;
      }
      return criteria;
    }
  },
  asyncComputed: {
    async searched() {
      const rs = await $.get('https://server.vaithuhay.com/b/order-tracking?' + qs.stringify(this.criteria));
      if (rs.length > 0) this.cached_ = rs;
      return this.cached_;
    }
  },
  watch: {
    kw_: debounce(function (value) {
      this.kw = value;
    }, 200)
  }
};

export {default as searchMixin} from './search';
