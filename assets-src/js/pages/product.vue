<style lang="scss" scoped>
@import "../../sass/inc/inc";

.images {
  @extend %box-shadow-2;
  @include responsive("xs-max") {
    margin: {
      left: -10px;
      right: -10px;
    }
  }
}

.product-variants {
  margin: $line-height-computed 0;
  + .row {
    margin-top: $line-height-computed * 1.4;
  }
}

.product-body {
  @include responsive("xs-max") {
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
      @include responsive("xs-max") {
        @include font-size-with-line-height(nth($font-size-h, $i) * 0.85);
      }
    }
  }
  p > span {
    line-height: 1.55em;
  }
}

.product-sidebar {
  margin-top: $line-height-computed * 2 + $font-size-h3 * $line-height-base;
  .title {
    @include font-size-with-line-height($font-size-h3 * 0.85);
    font-weight: 700;
    margin: 1em 0 0.3em;
    .fa {
      margin-right: 0.4em;
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
      transition: all $animation-time * 3 ease;
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
  padding-top: 20px;
  .swiper-slide {
    @extend %no-focus;
    margin-bottom: 20px;
    height: auto;
    padding: 0 0.3rem;
    @include responsive("md-min") {
      padding: 0 $grid-gutter-width * 1/3;
    }
    .thumbnail {
      height: 100%;
      @extend %box-shadow-1;
    }
  }
}
</style>
<style lang="scss" module>
@import "../../sass/inc/inc";

.entry-title {
  @include font-size-with-line-height($font-size-h1);
  @include responsive("xs-max") {
    @include font-size-with-line-height($font-size-h3 * 0.85);
  }
  font-weight: 700;
}

.price {
  &,
  + .rating {
    @include font-size-with-line-height($font-size-h1);
    /*margin-top: 20px;*/
    margin-top: 10px;
    @include responsive("xs-max") {
      @include font-size-with-line-height($font-size-h2 * 0.9);
      /*margin-top: 10px;*/
    }
  }
  font-weight: 700;
  color: $theme-red-color;
}

span.oldPrice {
  text-decoration: line-through;
  color: $theme-color-dark-3;
}

.sale {
  @include font-size-with-line-height($font-size-base * 1.05);
  margin-bottom: 0;
  color: $theme-color-dark-3;
  @at-root .percentageNumber {
    color: $theme-red-color;
    font-weight: 700;
  }
}

.add-to-cart-favorite-group {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.add-to-cart {
  flex-grow: 1;
  text-transform: uppercase;
  font-weight: 700;
  border: 2px solid $theme-red-color;
  padding: 0.3em 2em {
    top: 0.4em;
  }
  line-height: 1;
  svg {
    margin-right: 0.5em;
  }
  @include responsive("xs-max") {
    padding: {
      left: 0;
      right: 0;
    }
    width: 100%;
  }
}

.add-to-cart-wrapper {
  @include responsive("xs-max") {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    padding: 0.7rem {
      left: 1rem;
      right: 25%;
    }
    z-index: 10;
    background-color: white;
    //@include lbn-box-shadow(-2px);
    box-shadow: 0 -2px 10px -6px black;
  }
}

.favorite {
  margin-left: 1.85rem;
  @include responsive("xs-max") {
    margin-left: 0.85rem;
  }
  margin-right: 0.3rem;
  color: $theme-color-dark-2;
  &.added {
    color: darken($theme-red-color, 5%);
  }
}

.readmore {
  margin-top: 20px;
  > span {
    display: inline-block;
  }
}

.relatedArticle {
  @extend %reset-link;
  display: block;
  padding: {
    left: 0.3rem;
    right: 0.3rem;
  }
  @include responsive("md-min") {
    padding: {
      left: 1rem;
      right: 1rem;
    }
  }
  &Wrapper {
    background: #444548;
    color: white;
    padding-top: 20px;

    :global {
      ul.slick-dots {
        display: flex;
        align-items: center;
        justify-content: center;

        li:not(:last-child) {
          margin-right: 1.7rem;
        }
        li > button {
          -webkit-appearance: none;
          width: 1rem !important;
          height: 1rem !important;
          overflow: hidden;
          display: block;
          border-radius: 50%;
          background: #aaa;
          color: #aaa;
          border: none;
          padding: 0 !important;
          box-sizing: border-box;
        }
        li.slick-active > button {
          background: $theme-color;
          color: $theme-color;
        }
      }
    }
  }
  &Title {
    margin-top: 1.7rem;
    $font: $font-size-h4;
    @include font-size-with-line-height($font * 0.78);
    text-transform: uppercase;
    font-weight: 700;
    @include responsive("xs-max") {
      @include font-size-with-line-height($font * 0.68);
      margin: {
        top: 0.7rem;
        bottom: 0.3rem;
      }
    }
  }
}

.section-title {
  margin-bottom: 1em;
  font-weight: 700;
  @include responsive("xs-max") {
    margin: {
      top: 0.7rem;
      bottom: 0.6rem;
    }
    @include font-size-with-line-height(1.7rem);
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
