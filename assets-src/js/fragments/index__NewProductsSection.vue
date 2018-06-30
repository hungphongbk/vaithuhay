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
<style lang="scss" module>
  @import "../../sass/inc/inc";
  .slide{
    @include responsive('xs-max'){
      margin-left: -5px;
      margin-right: -5px;
    }
  }
  .list{
    padding-top: 1.6rem;
    //@include responsive('md-min'){
    //  padding-top: 1.6rem;
    //}
  }
  .bottom{
    margin-top: 1rem;
    @include responsive('md-min'){
      margin-top: 2rem;
    }
  }
</style>
<template lang="pug">
  index-section(:title="currentCol.title", titleForeground="#fff", background="#fc0")
    product-loop.pt(:class="$style.slide" :list="collections" slider="flickity" @select="index => current = index")
      template(slot="item", slot-scope="p")
        .row.gutter-5.gutter-sm-10(:class="$style.list")
          .col-xs-6.col-sm-3(v-for="product in pick(p.item.list, 4)")
            product-item.mb-2(:item="product")
    .text-center(:class="$style.bottom")
      a(:href="currentCol.url")
        .btn.btn-white KHÁM PHÁ THÊM
</template>
<script>
  import {IndexSection, ItemLoop} from '../components/index';
  import ProductItem from '@/components/products';
  import {ProductItem_} from "../components/classes";
  import {slickOptions_} from "../components/helpers";
  import slide from './index__slide.m-scss';

  const $ = jQuery;
  export default {
    components: {
      ProductLoop: ItemLoop,
      IndexSection,
      ProductItem
    },
    data() {
      return {
        collections: [],
        slickOptions_,
        slide,
        current: 0
      };
    },
    computed: {
      currentCol() {
        if (this.collections.length === 0) {
          return {
            title: ''
          };
        }
        return this.collections[this.current];
      }
    },
    methods: {
      fetch() {
        const categoryUrls = this.$store.state.categories.list.map(i => i.url)
          .filter(url => !url.includes('tatcasanpham'));
        Promise
          .all(categoryUrls.map(url =>
            jQuery.get(url + '?view=json').then(rs => {
              const obj = JSON.parse(rs);
              obj.url = url;
              obj.list = obj.list.map(ProductItem_);
              return obj;
            })))
          .then(rs => {
            this.collections = rs;
          })
      },
      pick(list, n) {
        return list.slice(0, n);
      }
    },
    mounted() {
      this.fetch();
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
