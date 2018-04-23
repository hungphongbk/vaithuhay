<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .swiper-slide {
    @extend %no-focus;
    margin-bottom: 20px;
    height: auto;
    padding: 0 $grid-gutter-width/2;
    .thumbnail {
      height: 100%;
      @extend %box-shadow-1;
    }
  }

  .vth-post-carousel {
    width: 100%;
    @include responsive('sm-max') {
      .carousel-button {
        display: none;
      }
    }
  }

  @include responsive('xs-max') {
    .swiper-slide {
      padding: 0 $grid-gutter-width/5 {
        top: 20px;
      }
    }
    .product-loop {
      margin: {
        left: -$grid-gutter-width/5;
        right: -$grid-gutter-width/5;
        top: -7px;
      }
      /deep/ .slick-list {
        padding-top: 0 !important;
      }
    }
  }
</style>
<template lang="pug">
  index-section(:title="$t('title')", titleForeground="#fff", background="#fc0")
    product-loop.pt(:slider-opts="slickOptions_", :list="products")
      template(slot="item", slot-scope="p")
        .swiper-slide
          product-item(:item="p.item")
    .text-center
      a(href="https://vaithuhay.com/collections/san-pham-moi")
        .btn.btn-white KHÁM PHÁ THÊM
</template>
<script>
  import {ItemLoop, IndexSection} from '../components/index'
  import {ProductItem1 as ProductItem} from '../components/products'
  import {ProductItem_} from "../components/classes"
  import {slickOptions_} from "../components/helpers"

  const $ = jQuery;
  export default {
    components: {
      ProductLoop: ItemLoop,
      IndexSection,
      ProductItem
    },
    data() {
      return {
        products: window.products_new.filter(i => i !== null).map(ProductItem_),
        slickOptions_
      }
    }
  }
</script>
<i18n>
  {
    "en": {
      "title": "top new products"
    },
    "vi": {
      "title": "sản phẩm mới"
    }
  }
</i18n>
