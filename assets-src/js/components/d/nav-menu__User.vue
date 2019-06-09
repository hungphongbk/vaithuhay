<style lang="scss" scoped>
@import "../../../sass/inc/inc";

$user-panel-width: 25vw;

.popover {
  display: block;
  width: $user-panel-width;
  max-width: $user-panel-width;
  top: $navbar-height - 3px;
  right: 0;
  left: unset;
  border-radius: 0;
  margin-top: 0;
  //@extend %box-shadow-2;
  .arrow {
    left: unset;
    right: 20px;
  }
  &-content {
    padding: 0;
    > * {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      /* Non-prefixed version, currently
                                         supported by Chrome and Opera */
    }
  }
}
</style>
<style lang="scss" module>
@import "../../../sass/inc/inc";

.nav-menu-user {
  form {
    @extend %box-shadow-2;
    background: #fbfcfd;
    color: #222;
    font-weight: 600;
    padding: 20px;
  }
}

.loginForm {
  @at-root .isLoggingIn > * {
    opacity: 0.45;
  }
}

.popover-user {
  ul {
    margin-top: 1.7rem;
    border-top: 1px solid #ccc;
  }
}

.popover-item {
  @include font-size-with-line-height($font-size-base * 1.1);
  > a {
    @extend %reset-link;
    display: inline-block;
    width: 100%;
    //@include font-size-with-line-height($font-size-base*1.25);
    padding: {
      top: 1rem;
      bottom: 1rem;
    }
    color: #444;
    &:hover {
      background: #f0f0f0;
      color: #333;
    }
    padding: {
      left: 1rem;
      right: 1rem;
    }
  }
  &:not(:last-child) > a {
    border-bottom: 1px solid #ccc;
  }
}
</style>
<template lang="pug">
  user-button(:class="$style.navMenuUser", @click="show=!show")
    static-overlay(name_="vth-fade-slide-down-bz", @click.self.native="closeForm", v-if="!loggedIn")
      .container
        .row(@click.self="show_=false")
          .col-md-8.col-md-offset-2.col-sm-10.col-sm-offset-1
            app-login-wrapper(:class="{ [$style.loginForm]: true, [$style.isLoggingIn]: user.isLoggingIn}", ref="form", :customer="customer")
              .text-center
                h2 {{$t('login')}}
              .form-group
                input.form-control(name="customer[email]", v-model="customer.email", placeholder="Email", type="email")
              .form-group
                input.form-control(name="customer[password]", v-model="customer.password", placeholder="Password", type="password")
              .form-group.text-center
                button.btn.btn-dark.login(type="submit") {{user.isLoggingIn?$t('loggingIn'):$t('login')}}
              hr
              p Hoặc đăng nhập nhanh với tài khoản mạng xã hội
              .row
                .col-xs-6
                  .btn.btn-fb(@click="facebookLogin")
                    i.fa.fa-facebook
                    | facebook
                .col-xs-6
                  .btn.btn-google(@click="googleLogin")
                    i.fa.fa-google
                    | google
    div(v-else)
      transition(name="vth-fade-slide-up")
        .popover.bottom(v-if="show")
          .arrow
          .popover-content.text-center(:class="$style.popoverUser")
            p
              h4 {{$t('hello')}}&nbsp;
                strong {{user.name}}
            ul
              li(v-if="isExperiment", :class="$style.popoverItem")
                a(href="javascript:void(0)", @click="show_ = false; orderTrackingForm = true")
                  i.fa.fa-search.fa-lg.mr-2
                  | Kiểm tra đơn hàng
              li(:class="$style.popoverItem")
                a(href="#", style="display: block")
                  loyalty
              li(:class="$style.popoverItem")
                a(href="javascript:void(0)", @click="show_ = false; favoriteModal = true") Sản phẩm yêu thích
              li(:class="$style.popoverItem")
                a(href="#") Cài đặt
              li(:class="$style.popoverItem")
                a(href="/account/logout") {{$t('signout')}}
    modal(v-if="orderTrackingForm", title="Kiểm tra đơn hàng", @dismiss="orderTrackingForm = false", size="lg")
      .modal-body
        order-tracking
    modal(v-if="favoriteModal", title="Danh sách sản phẩm yêu thích", @dismiss="favoriteModal = false", size="lg")
      .modal-body(style="background-color: #dddfe2")
        user-panel
</template>
<script>
import { loginMixins } from "../mixins";
import StaticOverlay from "@/components/static-overlay";
import { OrderTracking, UserButton } from "../index";
import {
  USER_LOGGED_IN,
  USER_LOGIN_FORM_SHOW,
  USER_LOYALTY
} from "../../store/types";
import { mapGetters } from "vuex";
import Loyalty from "./nav-menu__Loyalty";
import ProductItem from "@/components/products";
import UserPanel from "./UserPanel";

export default {
  name:'DesktopUser',
  mixins: [loginMixins],
  components: {
    UserButton,
    OrderTracking,
    Loyalty,
    ProductItem,
    StaticOverlay,
    UserPanel
  },
  data:()=>({
    orderTrackingForm: false,
    favoriteModal: false,
    isExperiment: false,
    show: false
  }),
  computed: {
    ...mapGetters({
      loggedIn: USER_LOGGED_IN,
      loginForm: USER_LOGIN_FORM_SHOW,
      loyalty: USER_LOYALTY
    }),
    user() {
      return this.$vthStore.state.customer;
    }
  },
  provide() {
    const overlay = {};
    Object.defineProperty(overlay, "show_", {
      get: () => {
        if (!this.loggedIn) return this.loginForm;
        return this.show;
      }
    });
    return { overlay };
  },
  methods: {
    closeForm() {
      if (!this.loggedIn) this.$vthStore.commit(USER_LOGIN_FORM_SHOW, false);
      this.show = false;
    },
    openForm() {
      if (!this.loggedIn) this.$vthStore.commit(USER_LOGIN_FORM_SHOW, true);
      else this.show = true;
    }
  },
  watch: {
    favoriteModal(value) {
      if (value) this.show = false;
    },
    show(value) {
      if (value && !this.loggedIn)
        this.$vthStore.commit(USER_LOGIN_FORM_SHOW, true);
    }
  },
  mounted(): void {
    console.log(this.show)
  }
};
</script>
<i18n>
  {
    "en": {
      "login": "SIGN IN",
      "loggingIn": "PLEASE WAIT...",
      "signout": "SIGN OUT",
      "hello": "Hello"
    },
    "vi": {
      "login": "ĐĂNG NHẬP",
      "loggingIn": "ĐANG ĐĂNG NHẬP, CHỜ MỘT LÁT...",
      "signout": "ĐĂNG XUẤT",
      "hello": "Xin chào"
    }
  }
</i18n>
