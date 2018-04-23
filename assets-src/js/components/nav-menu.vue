<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  @include responsive('sm-max') {
    #navigation-menu {
      position: relative;
    }
  }
</style>
<template lang="pug">
  nav#site-navigation.navbar.main-navigation.navbar-fixed-top.navbar-left(role="navigation")
    #navigation-menu
      mobile-menu(v-if="!$mq.desktop")
      desktop-menu(v-else)
</template>
<script>
  const MobileMenu = () => import(/* webpackChunkName: "mobile" */ './m/mobile-menu-wrapper.vue'),
    DesktopMenu = () => import(/* webpackChunkName: "desktop" */ './d/nav-menu-desktop.vue');

  const $ = jQuery;
  export default {
    components: {
      MobileMenu, DesktopMenu
    }
    // data() {
    //   return {
    //     logo_: require('../../img/logo.png?size=130'),
    //     home_: vth.links.home,
    //     discover_: false
    //   }
    // },
    // methods: {
    //   goBack() {
    //     const mobileMenu = this.$refs.mobileMenu;
    //     if (mobileMenu && typeof mobileMenu.goBack === 'function')
    //       mobileMenu.goBack();
    //     else this.show_ = !this.show_;
    //   }
    // }
  }
</script>
<i18n>
  {
    "en": {
      "homepage": "Home",
      "discover": "Discover",
      "news": "News",
      "intro": "About us"
    },
    "vi": {
      "homepage": "Trang chủ",
      "discover": "Khám phá",
      "news": "Tin tức",
      "intro": "Giới thiệu"
    }
  }
</i18n>
