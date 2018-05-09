<style lang="scss" scoped>
  #contact-detail {
    text-align: center;
    @at-root #logo {
      width: 60%;
      margin: 0 20%;
    }
  }
</style>
<style lang="scss" module>
  @import "../../sass/inc/inc";

  @mixin icon-size($icon-size) {
    /*$icon-size: $font-size-h3*1.8;*/
    display: inline-block;
    font-size: $icon-size/1.8;
    height: $icon-size;
    width: $icon-size;
    line-height: $icon-size;
    margin: {
      left: $icon-size*0.15;
      right: $icon-size*0.15;
    }
    border-radius: 50%;
    color: white;
  }

  .socials {
    margin: 20px auto;
    :global li {
      display: inline;
      text-align: center;
      .fa {
        @include icon-size($font-size-h3*1.8);
        @include responsive('sm-max') {
          @include icon-size($font-size-h3*1.5);
        }
        &.fa-facebook {
          @include outline-effect(lighten(#455796, 30%))
        }
        &.fa-google-plus {
          @include outline-effect(lighten(#c14d3e, 30%))
        }
        &.fa-instagram {
          @include outline-effect(lighten(#60453b, 35%))
        }
        &.fa-twitter {
          @include outline-effect(lighten(#73a9ee, 15%))
        }
      }
    }
  }
</style>
<template lang="pug">
  #contact-detail
    img#logo(:src="logo_")
    ul(:class="$style.socials")
      li(v-for="i in socials_")
        a(:href="i[2]", target="_blank")
          i.fa(:class="i[0]", :style="{'background-color':i[1]}")
    p
      | © 2017 Vaithuhay.com
      br
      | All rights reserved.
</template>
<script>
  export default {
    data() {
      const {links} = vth.footer;
      return {
        logo_: require('../../img/logo.png'),
        socials_: [
          ['fa-facebook', '#455796', links.socials.fb],
          ['fa-google-plus', '#c14d3e', links.socials.google],
          ['fa-instagram', '#60453B', links.socials.insta],
          ['fa-twitter', '#73a9ee', links.socials.twitter]
        ]
      };
    }
  };
</script>
