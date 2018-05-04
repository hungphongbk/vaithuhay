<style lang="scss" module>
  @import "../../sass/inc/inc";

  @include responsive('sm-max') {
    .navigation-menu {
      position: relative;
    }
  }
</style>
<template lang="pug">
  nav#site-navigation.navbar.main-navigation.navbar-fixed-top.navbar-left(role="navigation")
    div(:class="$style.navigationMenu")
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
