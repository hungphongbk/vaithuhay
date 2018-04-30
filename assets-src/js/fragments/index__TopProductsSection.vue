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
    padding: 0;
    @include responsive('sm-max') {
      .carousel-button {
        display: none;
      }
    }
  }

  @include responsive('xs-max') {
    .swiper-slide {
      margin-bottom: 6px;
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
  index-section(:title="$t('top')", titleForeground="#e02417", background="#ececec")
    product-loop.pt(:slider-opts="slickOptions_", :list="products")
      template(slot="item", slot-scope="p")
        .swiper-slide
          product-item(:item="p.item")
    .text-center
      a.btn.btn-theme(href="https://vaithuhay.com/collections/tatcasanpham") KHÁM PHÁ THÊM
</template>
<script>
  import {IndexSection, ItemLoop} from '../components/index';
  import {ProductItem1 as ProductItem} from '../components/products';
  import {ProductItem_} from "../components/classes";
  import {slickOptions_} from "@/components/helpers";

  const $ = jQuery;
  export default {
    components: {
      ProductLoop: ItemLoop,
      IndexSection,
      ProductItem
    },
    data() {
      return {
        products$: window.products_sale.filter(i => i !== null) || [],
        slickOptions_
      };
    },
    computed: {
      products() {
        return this.products$.map(ProductItem_);
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "top": "what's popular"
    },
    "vi": {
      "top": "được quan tâm"
    }
  }
</i18n>
