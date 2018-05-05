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
    &:not(:last-child) > a {
      border-bottom: 1px solid #ccc;
    }
  }

  .favorite-item {
    &-wrapper {
      padding: .7rem;
      border-radius: .3rem;
      background: white;
      margin-bottom: .2rem;
    }
    &-remove {
      display: block;
      margin-top: 1.3rem;
      color: #888;
    }
  }

  .favorite-empty {
    padding: 0 20%;
    p {
      margin-top: 1.5rem;
    }
    :global(.svg-inline--fa) {
      color: $theme-red-color;
    }
  }
</style>
<template lang="pug">
  user-button(@click="show=!show")
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
                  .btn.btn-google
                    i.fa.fa-google
                    | google
    div(v-else)
      transition(name="vth-fade-slide-up")
        .popover.bottom(v-if="show")
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
        template(v-if="favorites.length>0")
          ul
            li(v-for="product in favorites", :key="product.id", :class="$style.favoriteItemWrapper")
              product-item(:class="$style.favoriteItem", :item="product", :item-style="2")
                div
                  fa-icon(:class="$style.favoriteItemRemove", :icon="faTimesCircle", size="lg", @click="favoriteToggle(product)")
        .text-center(v-else, :class="$style.favoriteEmpty")
          img(src="../../../img/vaithuhay-not-found.png")
          p Danh sách hiện chưa có gì. Hãy&nbsp;
            span
              fa-icon(:icon="faHeart")
            | &nbsp;sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất nhé
</template>
<script>
  import {loginMixins} from '../mixins';
  import StaticOverlay from '@/components/static-overlay';
  import {OrderTracking, UserButton} from "../index";
  import {USER_LOGGED_IN_, USER_LOGIN_FORM_SHOW_, USER_LOYALTY_} from "../../store/types";
  import {mapActions, mapGetters} from 'vuex';
  import Loyalty from './nav-menu__Loyalty';
  import {USER_FAVORITES_, USER_TOGGLE_FAVORITE} from "@/store/types";
  import ProductItem from '@/components/products';
  import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimes';
  import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';

  export default {
    mixins: [loginMixins],
    components: {UserButton, OrderTracking, Loyalty, ProductItem, StaticOverlay},
    data() {
      return {
        orderTrackingForm: false,
        favoriteModal: false,
        isExperiment: window.o.isExperiment,
        faTimesCircle,
        faHeart,
        show: false
      };
    },
    computed: {
      ...mapGetters({
        loggedIn: USER_LOGGED_IN_,
        loginForm: USER_LOGIN_FORM_SHOW_,
        loyalty: USER_LOYALTY_,
        favorites: USER_FAVORITES_
      }),
      user() {
        return this.$store.state.customer;
      }
    },
    provide() {
      const overlay = {};
      Object.defineProperty(overlay, 'show_', {
        get: () => {
          if (!this.loggedIn)
            return this.loginForm;
          return this.show;
        }
      });
      return {overlay};
    },
    methods: {
      ...mapActions({
        favoriteToggle: USER_TOGGLE_FAVORITE
      }),
      closeForm() {
        if (!this.loggedIn)
          this.$store.commit(USER_LOGIN_FORM_SHOW_, false);
        this.show = false;
      },
      openForm() {
        if (!this.loggedIn)
          this.$store.commit(USER_LOGIN_FORM_SHOW_, true);
        else this.show = true;
      }
    },
    watch: {
      favoriteModal(value) {
        if (value)
          this.show = false;
      },
      show(value) {
        if (value && !this.loggedIn)
          this.$store.commit(USER_LOGIN_FORM_SHOW_, true);
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
