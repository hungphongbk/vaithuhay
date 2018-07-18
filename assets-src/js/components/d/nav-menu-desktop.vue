<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  $menu-hover-border-thickness: 4px;

  a {
    display: block;
    text-decoration: none;
  }

  .navbar-collapse {
    @extend %white-bg;
  }

  ul {
    display: block;
    font-weight: 400;
    font-style: normal;
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    position: relative;
    /deep/ > a {
      @extend %reset-link;
      &, &:hover, &:focus, &:visited {
        background-color: transparent;
      }
      border-top: $menu-hover-border-thickness solid #fff;
      color: #333333;
      padding-top: ($navbar-padding-vertical - $menu-hover-border-thickness) !important;
      &:hover {
        text-decoration: none;
        background-color: inherit;
        border-top-color: #bcbcbc;
      }
      .fa {
        margin-left: $padding-base-horizontal/2;
      }
    }
  }

  .navbar-toggle {
    float: left;
  }

  .navbar-brand {
    display: block;
    padding: $navbar-height*0.25 0;
    img {
      height: 100%;
    }
  }
</style>
<template lang="pug">
  nav#site-navigation.navbar.main-navigation.navbar-fixed-top.navbar-left(role="navigation")
    div
      .collapse.navbar-collapse.vth-menu
        .container
          .row
            .col-sm-5
              ul.nav.navbar-nav
                li.top
                  a(target="_self", :href="home_") {{$t('homepage')}}
                li.top.dropdown
                  a.dropdown-toggle(href="#", @click="discover_ = !discover_") {{$t('discover')}}
                    i.fa.fa-lg.fa-angle-down
                li.top
                  a(target="_self", :href="`${home_}/blogs/news`") {{$t('news')}}
                li.top
                  a(target="_self", :href="`${home_}/pages/vaithuhay`") {{$t('intro')}}
            a.col-sm-2.navbar-brand(:href="home_")
              img(:src="logo_")
            .col-sm-5
              ul.nav.navbar-nav.navbar-right
                li
                  search
                li
                  cart
                li
                  user
                li
                  lang
            .col-sm-12
              discover#menu-discover(:isShow_="discover_")
</template>
<script>
  import User       from "./nav-menu__User.vue";
  import Cart       from "../cart.vue";
  import Search     from './nav-menu__Search.vue';
  import Lang       from './nav-menu__Lang.vue';
  import LoginPanel from '../app__Login';
  import Discover   from './nav-menu__Discover';

  import {overlayMixin} from '../mixins';

  const $ = jQuery;
  export default {
    mixins: [overlayMixin],
    components: {
      User, Cart, Discover, Search, Lang,
      LoginPanel
    },
    data() {
      return {
        logo_: require('../../../img/logo.png'),
        home_: vth.links.home,
        discover_: false
      };
    }
  };
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
      "news": "Ý tưởng hay",
      "intro": "Giới thiệu"
    }
  }
</i18n>
