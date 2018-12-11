<template lang="pug">
  div
    mobile-menu(v-if="!$mq.desktop")
    desktop-menu(v-else)
</template>
<script>
const MobileMenu = () =>
    import(/* webpackChunkName: "mobile" */ "./m/mobile-menu-wrapper.vue"),
  DesktopMenu = () =>
    import(/* webpackChunkName: "desktop" */ "./d/nav-menu-desktop.vue");

export default {
  components: {
    MobileMenu,
    DesktopMenu
  }
};
</script>
