<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .entry-title {
    @include font-size-with-line-height($font-size-h1);
    @include responsive('xs-max') {
      @include font-size-with-line-height($font-size-h3*0.85);
    }
    font-weight: 700;
  }

  .images {
    @extend %box-shadow-2;
    @include responsive('xs-max') {
      margin: {
        left: -10px;
        right: -10px;
      }
    }
  }

  .product-variants {
    margin: $line-height-computed 0;
    + .row {
      margin-top: $line-height-computed*1.4;
    }
  }

  .add-to-cart {
    text-transform: uppercase;
    font-weight: 700;
    border: 2px solid $theme-red-color;
    padding: {
      left: 2em;
      right: 2em;
    }
    .fa {
      margin-right: 0.7em;
      font-weight: 700;
    }
    @include responsive('xs-max') {
      padding: {
        left: 0;
        right: 0;
      }
      width: 100%;
    }
  }

  .product-body {
    @include responsive('xs-max') {
      padding: {
        left: 0;
        right: 0;
      }
    }
    position: relative;
    .col-md-8 {
      position: unset;
    }
  }

  .readmore {
    margin-top: 20px;
    > span {
      display: inline-block;
    }
  }

  .swiper-slide /deep/ .caption {
    height: 6*$line-height-computed;
    .description {
      display: none;
    }
  }
</style>
<style lang="scss">
  @import "../../sass/inc/inc";

  .product-content {
    overflow: hidden;
    &.contentCollapse {
      max-height: 2000px;
    }

    @for $i from 1 through 6 {
      h#{$i} {
        @include font-size-with-line-height(nth($font-size-h, $i));
        @include responsive('xs-max') {
          @include font-size-with-line-height(nth($font-size-h, $i)*0.85);
        }
      }
    }
    p > span {
      line-height: 1.55em;
    }
  }

  .product-sidebar {
    margin-top: $line-height-computed*2+$font-size-h3*$line-height-base;
    .title {
      @include font-size-with-line-height($font-size-h3*0.85);
      font-weight: 700;
      margin: 1em 0 .3em;
      .fa {
        margin-right: .4em;
        color: $theme-red-color;
      }
    }
  }

  .products-sidebar {
    margin-top: 30px;
    margin-bottom: 50px;
    > .title {
      height: 50px;
      margin: 0;
      font-weight: 700;
      color: #444;
    }
    li {
      &:not(:last-child) .item {
        padding-bottom: 12px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 12px;
      }

      // Transition
      will-change: auto;
      &.anim {
        transition: all $animation-time*3 ease;
      }
      &.before {
        opacity: 0;
        transform: translateX(-30%);
      }
    }
  }

  .wholesale {

  }

  .top-products {
    background-color: #ececec;
    margin-top: 20px;
    .title {
      margin-bottom: 1em;
      font-weight: 700;
    }
    .swiper-slide {
      @extend %no-focus;
      margin-bottom: 20px;
      height: auto;
      padding: 0 $grid-gutter-width*2/3;
      .thumbnail {
        height: 100%;
        @extend %box-shadow-1;
        .caption {
          h4 {
            @include font-size-with-line-height($font-size-h4*0.75);
          }
          h5 {
            @include font-size-with-line-height($font-size-h5*0.85);
          }
        }
      }
    }
  }
</style>
<style lang="scss" module>
  @import "../../sass/inc/inc";
  .price {
    &, + .rating {
      @include font-size-with-line-height($font-size-h1);
      /*margin-top: 20px;*/
      margin-top: 10px;
      @include responsive('xs-max') {
        @include font-size-with-line-height($font-size-h2*0.9);
        /*margin-top: 10px;*/
      }
    }
    font-weight: 700;
    color: $theme-red-color;
  }
  .sale{
    @include font-size-with-line-height($font-size-base*1.05);
    margin-bottom: 0;
    color: $theme-color-dark-3;
    @at-root .percentageNumber{
      color: $theme-red-color;
      font-weight: 700;
    }
  }
</style>
<template lang="pug" src="./product.vue.pug"></template>
<script src="./product.vue.js"></script>
<i18n>
  {
    "en": {
      "buyNow": "Buy now",
      "info": "Information",
      "comment": "Comments",
      "related": "RELATED PRODUCTS",
      "seeMore": "See more...",
      "collapse": "Collapse",
      "top": "TOP PRODUCTS",
      "sale": "ON-SALE PRODUCTS",
      "combo": {
        "label": "RECOMMEND COMBOS"
      }
    },
    "vi": {
      "buyNow": "Mua ngay",
      "info": "Thông tin",
      "comment": "Bình luận",
      "related": "SẢN PHẨM LIÊN QUAN",
      "seeMore": "Xem thêm...",
      "collapse": "Thu gọn",
      "top": "SẢN PHẨM ĐƯỢC XEM NHIỀU",
      "sale": "SẢN PHẨM ĐANG KHUYẾN MÃI",
      "combo": {
        "label": "COMBO HẤP DẪN"
      }
    }
  }
</i18n>
