<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  %fix-backface {
    -webkit-perspective: 0;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0,0,0);
    visibility:visible;
    backface-visibility: hidden;
  }

  $thumbnail-height: 280px;
  $effect-time: .25s;
  .thumbnail {
    @extend %reset-link;
    background-color: #fff;
    border: none;
    border-radius: 0;
    padding: 0;
    margin-bottom: 0;

    p {
      font-size: 0.86 * $font-size-base;
      color: #888;
    }
    .thumb {
      width: 100%;
    }

    @at-root .caption-overlay {
      padding: 0;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      &, & * {
        @extend %fix-backface;
      }
    }
    &:hover {
      h4 {
        @extend %theme-link;
      }
    }
  }

  .prices {
    > div {
      display: inline-block;
      width: auto;
      @mixin padding($s) {
        padding: $s*0.7 $s*1.5 {
          bottom: $s;
        }
      }
      @include padding($thumbnail-caption-padding);
      @include responsive('xs-max') {
        @include padding($thumbnail-caption-padding*0.7);
      }
      background-color: rgba(0, 0, 0, 0.65);
    }
    span {
      color: white;
    }
    &.sale .regular-price {
      font-size: 1.12*$font-size-base;
      @media screen and (max-width: $screen-xs-max) {
        font-size: 0.85*$font-size-base;
      }
      opacity: 0.65;
      text-decoration: line-through;
    }
    &.sale .sale-price, .regular-price {
      font-size: 1.62*$font-size-base;
      @media screen and (max-width: $screen-xs-max) {
        font-size: 1.12*$font-size-base;
      }
    }
  }

  .description {
    line-height: $line-height-computed*1.1;
  }

  h4 {
    font-weight: 700;
    font-size: $font-size-h4*0.85;
    @include font-size-with-line-height($font-size-h4*0.85);
    @media screen and (max-width: $screen-xs-max) {
      @include font-size-with-line-height($font-size-h4*0.75);
    }
  }

  .category {
    @include responsive('xs-max') {
      @include font-size-with-line-height($font-size-h5*0.9);
      margin-top: 0;
    }
  }

  // SALE BASDGE
  .content.sale {
    &, & * {
      @extend %fix-backface;
    }
    overflow: visible;

    @mixin f($size) {
      right: $size/10;
      top: -$size/5;

      height: $size;
      width: $size;
      font-size: $size/5;

      .percentage {
        font-size: ($size/5)*1.15;
        font-weight: 700;
      }
    }
    > div {
      position: absolute;
      text-align: center;
      text-transform: uppercase;
      color: white;
      background-color: $theme-red-color;
      border-radius: 50%;

      &:before {
        position: absolute;
        top: 2px;
        left: 2px;
        height: calc(100% - 4px);
        width: calc(100% - 4px);
        content: '';
        visibility: visible;
        border-radius: 50%;
        border: 1px dashed white;
      }

      @include f(60px);
      @include responsive('xs-max') {
        @include f(50px);
      }
    }
  }

  .add-to-cart-btn {
    transition: all $effect-time ease;
    opacity: 1;
    &:after {
      position: absolute;
      display: block;
      content: '';
      top: 50%;
      left: 50%;
      height: 1px;
      width: 1px;
      border-radius: 50%;
      z-index: -1;
      background-color: #009688;
      transform: scale(0);
      opacity: 0;
      transition: all $effect-time ease;
    }
    &.pre-added {
      opacity: 0;
    }
    &.added {
      background-color: #009688 !important;
      color: white;
      &:after {
        transform: scale(400);
        opacity: .9;
      }
    }
  }

  .caption {
    height: $line-height-computed*9.5;
    @include responsive('xs-max') {
      height: $line-height-computed*6.8;
    }
  }

  .bottom {
    padding: 9px {
      top: 0;
    }
  }
</style>
<template lang="pug">
  a.thumbnail(:href="url")
    div(style='position: relative')
      thumbnail(:url_='thumbnail', :alt_="title", ratio_='1-1', :thumbnailSize_="defaultThumbnailSize_", :lazy_="false")
        template(v-if="!$mq.tablet", slot="overlay")
          span.fa.fa-cart-plus.add-to-cart-btn(@click.stop.prevent="add_($event, variants[0].id)")
        .content.sale(v-if="isSale")
          .flex-center
            span
              span.percentage {{sale}}%
              br
              | off
        .content.caption-overlay
          .text-right.prices(:class="[isSale_?'sale':'']")
            div
              template(v-if='isSale_')
                span.sale-price {{price.current}}
                br
                span.regular-price {{price.old}}
              span.regular-price(v-else) {{price.current}}
    .caption
      h5.text-muted.category {{type}}
      h4 {{title}}
      p.description(v-if="!$mq.tablet", v-html="description")
    .bottom
      //product-rating.large(:rating="rating")
</template>
<script>
  import {CART_ADD_} from '../store/types'
  import {mapActions} from 'vuex'
  import {delay} from './helpers'
  // import {ProductRating} from "../components";

  const $ = jQuery;

  export default {
    // components: {ProductRating},
    props: {
      item: Object,
      thumbnailSize_: String
    },
    data() {
      return this.item;
    },
    computed: {
      routerLink() {
        return {
          name: 'product',
          params: {
            product: this.handle
          }
        }
      },
      defaultThumbnailSize_() {
        if (this.thumbnailSize_) return this.thumbnailSize_;
        return this.$mq.tablet ? 'medium' : 'large';
      },
      title() {
        return this.item._title[this.$i18n.locale];
      },
      isSale_() {
        return this.price.old !== null;
      }
    },
    methods: {
      ...mapActions({
        addToCart_: CART_ADD_
      }),
      async add_({target: btn}, id) {
        await this.addToCart_({id});
        const $btn = $(btn);
        $btn.addClass('pre-added');
        await delay(250);
        $btn.addClass('added fa-check').removeClass('pre-added fa-cart-plus');
        await delay(2400);
        $btn.addClass('pre-added').removeClass('added');
        await delay(250);
        $btn.removeClass('pre-added fa-check').addClass('fa-cart-plus');
      }
    }
  }
</script>
