<style lang="scss" scoped>
@import "../../../sass/inc/inc";

$icon-size: 32px;
$user-padding-vertical: (($navbar-height - $icon-size)/2);

.navbar-nav > li > a {
  padding-top: $user-padding-vertical - 4px !important;
  padding-bottom: $user-padding-vertical;

  position: relative;
  cursor: pointer;
  img {
    display: inline-block;
    height: $icon-size;
    width: auto;
  }
}

@include responsive("sm-max") {
  a {
    $s: $navbar-height;
    height: $s;
    width: $s;
    z-index: 100001;
    padding: ($navbar-height - $icon-size * 1.2)/2 0;
    text-align: center;
    display: block;
    &,
    &:active,
    &:hover,
    &:focus,
    &:visited {
      color: inherit;
      text-decoration: none;
    }
    img {
      display: inline-block;
      height: $icon-size * 1.2;
      width: auto;
    }
  }
}
</style>
<template lang="pug">
  a(@click="switch_")
    img(:src="flags_[$i18n.locale]")
</template>
<script>
import { Event } from "../index";

export default {
  data() {
    return {
      flags_: {
        vi: require("../../../img/lang/002-vietnam.svg"),
        en: require("../../../img/lang/001-united-states-of-america.svg")
      }
    };
  },
  methods: {
    switch_() {
      const sw = this.$i18n.locale === "en" ? "vi" : "en";
      this.$i18n.locale = sw;
      this.$cookie.set("lang", sw);
      Event.$emit("lang", sw);
    }
  }
};
</script>
