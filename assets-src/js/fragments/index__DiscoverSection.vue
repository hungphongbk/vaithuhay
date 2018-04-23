<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  .homepage-discover {
    margin: {
      /*bottom: 20px;*/
      /*left: 50px;*/
      /*right: 50px;*/
    }
    @media screen and (max-width: $screen-xs-max) {
      margin: {
        /*bottom: 20px;*/
        left: $grid-gutter-width/3;
        right: $grid-gutter-width/3;
      }
    }
  }

  .item {
    @extend %clearfix;
    @extend %reset-link;
    display: block;
    transition: all $animation-time ease;
    @extend %box-shadow-1;
    @media screen and (max-width: $screen-xs-max) {
      margin-bottom: $line-height-computed;
    }
    .right {
      height: 100%;
      overflow: hidden;
      img {
        width: auto;
      }
    }
    margin: {
      bottom: 30px;
      left: 10px;
      right: 10px;
    }
    overflow: hidden;
    position: relative;
    .content {
      @extend %abs-full;
      overflow: hidden;
      background-color: rgba(#000, .35);
      color: white;
      padding: 0 20%;
    }
    .title {
      text-transform: uppercase;
      line-height: $font-size-h3*1.45;
      @include _(text-shadow-2)
    }
  }

  @mixin item($size, $font) {
    .item {
      height: $size;
      .right {
        width: 100%;
        background-color: white;
        img {
          width: 100%;
          height: auto;

          transform: translateY(-50%);
          margin-top: $size/2;
        }
      }
      .title {
        font-size: $font;
      }
    }

    .vth-thumb {
      width: $size;
    }
  }

  @include item(160px, $font-size-h3);
  @media screen and (max-width: $screen-xs-max) {
    @include item(80px, $font-size-h3*0.7);
  }

  @media screen and (max-width: $screen-sm-max) {
    @include item(120px, $font-size-h3*0.7);
  }
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('title')", titleForeground="#fff", background="#666", backgroundImage="pattern1")
    .homepage-discover
      .row
        .col-sm-6(v-for="cat in categories")
          a.item(:href="cat.url")
            .right
              img(:src="cat.image")
              .content.flex-center.text-center
                h3.title {{cat.title}}
</template>
<script>
  import {IndexSection} from '../components/index'
  import {mapGetters} from 'vuex'
  import {CATEGORIES_LIST_} from "../store/types";

  export default {
    components: {IndexSection},
    data() {
      return {
        demo_: require('../../img/pexels-photo-62689.png')
      }
    },
    computed: {
      ...mapGetters({
        categories: CATEGORIES_LIST_
      })
    }
  }
</script>
<i18n>
  {
  "en": {
  "title": "discover"
  },
  "vi": {
  "title": "khám phá"
  }
  }
</i18n>
