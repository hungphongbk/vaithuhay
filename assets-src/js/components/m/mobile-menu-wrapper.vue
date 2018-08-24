<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  .mobile .cart {
  }
</style>
<style lang="scss" module="">
  @import "../../../sass/inc/inc";

  .container.closed {
    will-change: transform;
  }

  .navigation-menu {
    position: relative;
  }

  .header {
    composes: mobile d-flex justify-content-between align-items-center from global;
  }

  .brand {
    flex-grow: 1;
    composes: navbar-brand from global;
    display: flex;
    justify-content: center;
    float: none;
    transform-origin: bottom center;

    position: relative;
    > * {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      height: 80%;
      width: auto;
    }
    > img {
      height: $navbar-height*0.43;
    }
  }

  .mobile-open {
    transform-origin: bottom left;
    $s: $navbar-height;

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

  .header-content {
    width: 130%;
  }
</style>
<template lang="pug">
  nav#site-navigation.navbar.main-navigation.navbar-fixed-top.navbar-left(role="navigation" :style="navbarHeaderStyle" :class="{[$style.container]:true, [$style.closed]:!show_}")
    div(:class="$style.navigationMenu")
      div(:class="$style.header")
        div(:class="{ [$style.mobileOpen]:true, 'open': show_}" :style="mobileOpenStyle" @click="goBack")
          span.cls
          span
          span.cls
        a(:class="$style.brand" :href="home_" :style="navbarBrandStyle")
          img(v-if="!app.mobileHeaderContent" :src="logo_")
          template(v-else)
            img(:src="logo_" :style="logoStyle")
            .d-flex.align-items-center(:style="headerContentStyle" :class="$style.headerContent")
              component(:is="app.mobileHeaderContent")
        cart-button.cart(@click.native="showCart")
      static-overlay.mobile-panel(name_="vth-fade-slide-right")
        mobile-menu-panel(ref="mobileMenu")
</template>
<script>
  import MobileMenuPanel from './mobile-menu.vue';

  import CartButton from './cart__MenuButton.vue';
  import {overlayMixin, scrollEffectMixin} from '../mixins';

  import {mapGetters} from 'vuex';
  import {USER_LOGIN_FORM_SHOW} from "../../store/types";
  import {Event} from "@/components/index";
  import {SYSTEM_ON_SCROLL_RESET, SYSTEM_MOBILE_HEADER_CONTENT, SYSTEM_CART_OPEN, SYSTEM_CART_CLOSE} from "@/types";
  import {createTransform} from "@/components/helpers";

  const createDynamicTransform = transform => ({
    'transform': transform,
    '-webkit-transform': transform,
    '-moz-transform': transform
  });

  export default {
    mixins: [overlayMixin, scrollEffectMixin],
    components: {
      MobileMenuPanel,
      CartButton
    },
    inject: ['app'],
    data() {
      return {
        logo_: require('../../../img/logo.png'),
        home_: vth.links.home,
        toggle_: 'menu'
      };
    },
    computed: {
      ...mapGetters({
        loginForm: USER_LOGIN_FORM_SHOW
      }),
      navbarHeaderStyle() {
        if (this.show_) return {};
        const translateY = `translateY(-${this.scrollTopThreshold * 100}%)`;
        return createDynamicTransform(translateY);
      },
      navbarBrandStyle() {
        return createDynamicTransform(`scale(${1 - this.scrollTopThreshold})`)
      },
      mobileOpenStyle() {
        return {
          'transform': createTransform({
            scale: 1 - this.scrollTopThreshold * 0.8
          })
        }
      },
      logoStyle() {
        let p = this.scrollTopPercentage, f;
        if (p >= 50) f = 0;
        else f = 1 - p / 50;
        return {
          'opacity': f
        }
      },
      headerContentStyle() {
        let p = this.scrollTopPercentage, f;
        if (p <= 50) f = 0;
        else f = p / 50 - 1;
        return {
          'opacity': f,
          'transform': createTransform({
            translate: `calc(-50% - ${this.scrollTopPercentage / 100}rem), -50%`
          })
        }
      }
    },
    watch: {
      loginForm(value) {
        const self = this;
        if (value) {
          // Truong hop yeu cau show form dang nhap

          self.show_ = true;
          self.$nextTick(() => {
            self.$set(self.$refs.mobileMenu, 'mode', 'login');
          });
        } else {
          // Truong hop yeu cau dong form dang nhap
          // Tat luon menu

          self.show_ = false;
        }
      },
      show_(value) {
        if (value) {
          Event.$emit(SYSTEM_ON_SCROLL_RESET)
        }
      }
    },
    methods: {
      goBack() {
        this.$vthStore.commit(USER_LOGIN_FORM_SHOW, false);
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
        });
      }
    },
    created() {
      const self = this;
      Event.$on(SYSTEM_CART_OPEN, () => {
        self.showCart();
      });
      Event.$on(SYSTEM_CART_CLOSE, () => {
        if (self.show_) {
          self.show_ = false;
          self.$nextTick(() => {
            self.$set(self.$refs.mobileMenu, 'mode', 'dashboard');
          });
        }
      })
    }
  };
</script>
