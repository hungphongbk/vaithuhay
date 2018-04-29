<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  $user-panel-width: 25vw;

  form {
    @extend %box-shadow-2;
    background: #fbfcfd;
    color: #222;
    font-weight: 600;
    padding: 20px;
  }

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
    &-user {
      ul {
        margin-top: 1.7rem;
        border-top: 1px solid #ccc;
      }
    }
  }
</style>
<style lang="scss" module>
  @import "../../../sass/inc/inc";

  .loginForm {
    @at-root .isLoggingIn > * {
      opacity: .45;
    }
  }

  .popoverItem {
    @include font-size-with-line-height($font-size-base*1.1);
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
    &:not(:last-child)>a{
      border-bottom: 1px solid #ccc;
    }
  }
</style>
<template lang="pug">
  user-button(@click="show_ = !show_")
    static-overlay(name_="vth-fade-slide-down-bz", @click.self.native="show_ = false", v-if="!loggedIn")
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
                  .btn.btn-google
                    i.fa.fa-google
                    | google
    div(v-else)
      transition(name="vth-fade-slide-up")
        .popover.bottom(v-if="show_")
          .arrow
          .popover-content.text-center.popover-user
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
                a(href="#") Cài đặt
              li(:class="$style.popoverItem")
                a(href="/account/logout") {{$t('signout')}}
    modal(v-if="orderTrackingForm", title="Kiểm tra đơn hàng", @dismiss="orderTrackingForm = false", size="lg")
      .modal-body
        order-tracking
</template>
<script>
  import {loginMixins, overlayMixin} from '../mixins';
  import {OrderTracking, UserButton} from "../index";
  import {USER_LOGGED_IN_, USER_LOGIN_FORM_SHOW_, USER_LOYALTY_} from "../../store/types";
  import {mapGetters} from 'vuex';
  import Loyalty from './nav-menu__Loyalty';

  export default {
    mixins: [overlayMixin, loginMixins],
    components: {UserButton, OrderTracking, Loyalty},
    data() {
      return {
        orderTrackingForm: false,
        isExperiment: window.o.isExperiment
      };
    },
    computed: {
      ...mapGetters({
        loggedIn: USER_LOGGED_IN_,
        loginForm: USER_LOGIN_FORM_SHOW_,
        loyalty: USER_LOYALTY_
      }),
      user() {
        return this.$store.state.customer;
      }
    },
    watch: {
      loginForm(value) {
        this.show_ = value;
      }
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
