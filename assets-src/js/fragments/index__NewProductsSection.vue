<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .vth-post-carousel {
    width: 100%;
    @include responsive('sm-max') {
      .carousel-button {
        display: none;
      }
    }
  }

  @include responsive('xs-max') {
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
        div(:class="slide.swiperSlide")
          product-item(:item="p.item")
    .text-center
      a(href="https://vaithuhay.com/collections/san-pham-moi")
        .btn.btn-white KHÁM PHÁ THÊM
</template>
<script>
  import {IndexSection, ItemLoop} from '../components/index';
  import ProductItem              from '@/components/products';
  import {ProductItem_}           from "../components/classes";
  import {slickOptions_}          from "../components/helpers";
  import slide                    from './index__slide.m-scss';

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
        slickOptions_,
        slide
      };
    }
  };
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
