<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  @mixin size($s) {
    height: $s;
    width: $s;
    @at-root {
      .fa {
        line-height: $s;
        font-size: $s/2;
      }
    }
  }

  .vth-section {
    background-size: cover !important;
    padding-bottom: 200px !important;
    position: relative;
    overflow: hidden;
    &:before, &:after {
      position: absolute;
      content: '';
      visibility: visible;
      height: 1vw;
      width: 1vw;
      margin: -0.5vw;
      transform-origin: center center;
      bottom: 0;
      background-image: url(../../img/rhombus.svg);
      background-size: cover;
      transform: scale(200, 15);
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
      transform: scale(200, 15) translateX(0.015vw);
    }
  }

  .member {
    @extend %box-shadow-1;
    padding: 20px;
    background-color: white;
  }

  .avatar {
  }

  h4 {
    font-weight: 700;
  }

  .position {
    color: #666;
  }

  .name {
    @extend h4;
    color: $theme-color;
    text-transform: uppercase;
  }

  p {
    height: $line-height-computed*4;
  }

  @mixin hover-effect-outline($color) {
    background-color: lighten($color, 15%);
    box-shadow: 0 0 0 0 darken($color, 5%);
    &:hover {
      box-shadow: 0 0 0 3px darken($color, 5%);
    }
  }

  ul {
    list-style-type: none;
    text-align: center;

    li {
      display: inline-block;
      text-align: center;
      border-radius: 50%;
      margin-left: 10px;
      cursor: pointer;
      transition: box-shadow $animation-time*1.5 ease;
      .fa {
        color: white;
      }
      &:hover {
        .fa {
          opacity: 1;
        }
      }
      @include size(40px);
      &.facebook {
        @include hover-effect-outline(#3b5998)
      }
      &.email {
        @include hover-effect-outline($theme-color)
      }
    }
  }
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('0')", titleForeground="#444", background="#fc0", background-image="pattern2")
    .row.gutter-30
      .col-sm-4(v-for="i in items")
        .member.text-center
          thumbnail.avatar.no-effect(:url_="i.image.thumbnails['600w']", ratio_="1-1", :overlay_="false")
          h3.name {{i.name}}
          h4.position {{i.position}}
          p {{i.desc}}
          ul
            li.facebook
              i.fa.fa-facebook
            li.email
              i.fa.fa-envelope
</template>
<script>
  import {IndexSection} from '../components/index'

  export default {
    components: {IndexSection},
    inject: ['section'],
    computed: {
      items() {
        return this.section.member[this.$i18n.locale]
      }
    }
  }
</script>
<i18n>
  {
  "en": {
  "0": "our members"
  },
  "vi": {
  "0": "thành viên"
  }
  }
</i18n>
