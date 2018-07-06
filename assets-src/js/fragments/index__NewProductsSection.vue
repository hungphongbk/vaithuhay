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

  .container {
    :global .vth-section-title {
      margin-bottom: 20px;

      @include responsive('xs-max') {
        margin-top: 0;
        margin-bottom: 0;
        height: 7rem;
        display: table;
        width: 100%;
        padding: 0 4rem;
        > span {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
  }

  .slide {
    @include responsive('xs-max') {
      margin-left: -5px;
      margin-right: -5px;
    }
    &-item {
      @extend %box-shadow-1;
    }
  }

  .list {
    padding-top: 1.6rem;
    //@include responsive('md-min'){
    //  padding-top: 1.6rem;
    //}
  }

  .bottom {
    margin-top: 1rem;
    @include responsive('md-min') {
      margin-top: 2rem;
    }
  }

  .indicator {
    composes: d-flex justify-content-center from global;
    padding: 0 10%;
    @include responsive('md-min') {
      padding: 0 25%;
    }
    &-item {
      composes: flex-fill from global;
      margin: 0 .25rem;
      height: 1rem;
      border-radius: .5rem;
      background: rgba(#000, .09);
      cursor: pointer;
      transition: background $animation-time/3 ease-in-out;
      &.current {
        background: rgba(#000, .36);
      }
    }
  }

  @include responsive('xs-max') {
    .phone-navigator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 7rem;
      .prev, .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(#000, .25);
      }
      .prev {
        left: 1.7rem;
      }
      .next {
        right: 1.7rem;
      }
    }
  }
</style>
<template lang="pug">
  index-section(:class="$style.container" :title="currentCol.title", titleForeground="#fff", background="#fc0")
    div(:class="$style.indicator" v-if="!$mq.phone")
      div(:class="{ [$style.indicatorItem]:true, [$style.current]:col===currentCol }" v-for="(col,index) in collections" @click="current = index")
    div(:class="$style.phoneNavigator" v-else)
      div(:class="$style.prev" @click="prev")
        fa-icon(:icon="faChevronLeft" size="2x")
      div(:class="$style.next" @click="next")
        fa-icon(:icon="faChevronRight" size="2x")
    product-loop.pt.mt-0.mt-sm-5(:class="$style.slide" :list="currentCol.list" slider="flickity" :rows="$mq.phone?2:4")
      template(slot="item", slot-scope="p")
        .pl-1.pr-1.pl-sm-2.pr-sm-2.mt-4.mb-3
          product-item.mb-2(:class="$style.slideItem" :item="p.item")
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
  import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft'
  import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'

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
        current: 0,
        flickityOptsChild: {
          pageDots: false
        },
        faChevronLeft,
        faChevronRight
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
      next() {
        this.current = (this.current + 1) % this.collections.length;
      },
      prev() {
        let current = this.current;
        current--;
        if (current < 0) current += this.collections.length;
        this.current = current;
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
