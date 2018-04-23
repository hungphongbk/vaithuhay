<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  .navbar-brand {
    display: block;
    padding: {
      top: $navbar-height*0.35;
      bottom: $navbar-height*0.25;
    }
    img {
      height: $navbar-height*0.4;
    }
    @include _(abs-center);
    float: none;
  }

  .mobile-open {
    $s: $navbar-height;

    float: left;
    display: inline-block;
    position: relative;
    height: $s;
    width: $s;
    z-index: 100001;
    &::after {
      content: '';
      position: absolute;
      top: $s/10;
      bottom: $s/10;
      left: $s/10;
      right: $s/10;
      background-color: #bbb;
      border-radius: 50%;
      opacity: 0;
      transition: all $animation-time ease;
    }
    &:active::after {
      opacity: .25;
    }
    > span {
      $h-mg: 0.34;
      display: block;
      float: left;
      clear: both;
      height: 2px;
      width: $s*$h-mg;
      border-radius: $s*$h-mg;
      background-color: #aaa;
      position: absolute;
      left: $s*((1 - $h-mg)/2);
      overflow: hidden;
      transition: all 0.4s ease;
      &:nth-child(1) {
        margin-top: $s*(0.5-0.12);
        z-index: 9;
      }
      &:nth-child(2) {
        margin-top: $s*0.5;
      }
      &:nth-child(3) {
        margin-top: $s*(0.5+0.12);
      }
    }
    &.open > span {
      background-color: #fff;
      &:nth-child(2) {
        /*overflow: visible;*/
        /*opacity: 0;*/
      }
      &:nth-child(1) {
        transform: rotate(-45deg) scaleX(0.7) translate(-9px, -2.2px);
      }
      &:nth-child(3) {
        transform: rotate(45deg) scaleX(0.7) translate(-9px, 2.3px);
      }
    }
  }

  .mobile-panel {

  }

  .mobile .cart {
    float: right;
  }
</style>
<template lang="pug">
  div
    .navbar-header.mobile
      .mobile-open(:class="{'open': show_}", @click="goBack")
        span.cls
        span
        span.cls
      a.navbar-brand(:href="home_")
        img(:src="logo_")
      cart-button.cart(@click.native="showCart")
    static-overlay.mobile-panel(name_="vth-fade-slide-right")
      .container(style="height: 100%")
        mobile-menu-panel(ref="mobileMenu")
</template>
<script>
  import MobileMenuPanel from './mobile-menu.vue'

  import CartButton from './cart__MenuButton.vue'
  import {overlayMixin} from '../mixins'

  import {mapGetters} from 'vuex'
  import {USER_LOGGED_IN_, USER_LOGIN_FORM_SHOW_} from "../../store/types"

  export default {
    mixins: [overlayMixin],
    components: {
      MobileMenuPanel,
      CartButton
    },
    data() {
      return {
        logo_: require('../../../img/logo.png'),
        home_: vth.links.home,
        toggle_: 'menu'
      }
    },
    computed: {
      ...mapGetters({
        loginForm: USER_LOGIN_FORM_SHOW_
      })
    },
    watch: {
      loginForm(value) {
        const self = this;
        if (value) {
          // Truong hop yeu cau show form dang nhap

          self.show_ = true;
          self.$nextTick(() => {
            self.$set(self.$refs.mobileMenu, 'mode', 'login');
          })
        } else {
          // Truong hop yeu cau dong form dang nhap
          // Tat luon menu

          self.show_ = false;
        }
      }
    },
    methods: {
      goBack() {
        this.$store.commit(USER_LOGIN_FORM_SHOW_, false);
        const mobileMenu = this.$refs.mobileMenu;
        if (mobileMenu && typeof mobileMenu.goBack === 'function')
          mobileMenu.goBack();
        else this.show_ = !this.show_;
      },
      showCart() {
        const self = this;
        if (!self.show_) self.show_ = true;
        self.$nextTick(() => {
          self.$set(self.$refs.mobileMenu, 'mode', 'cart');
        })
      }
    }
  }
</script>
