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

    $dot-size: 1.6rem;

    @include responsive('md-min') {
      padding: 0 30%;
    }
    &-item {
      composes: d-flex justify-content-center from global;
      flex-basis: percentage(1/8);
      height: $dot-size;
      position: relative;
      &:before {
        position: absolute;
        height: $dot-size*1.6;
        width: $dot-size*1.6;
        top: -$dot-size*0.3;
        left: calc(50% - #{$dot-size*1.6/2});
        content: '';
        visibility: hidden;
        border-radius: 50%;
        border: 2px solid darken($theme-color, 25%);
      }
      > span {
        display: inline-block;
        height: $dot-size;
        width: $dot-size;
        border-radius: 50%;
        background: darken($theme-color, 7%);
        cursor: pointer;
        /*transform: scale(1);*/

        &:before, &:after {
          content: '';
          visibility: visible;
          position: absolute;
          height: 2px;
          top: 50%;
          width: 50%;
          background: inherit;
        }
        &:before {
          left: 0;
        }
        &:after {
          right: 0;
        }
      }
      &:first-child > span:before {
        visibility: hidden;
      }
      &:last-child > span:after {
        visibility: hidden;
      }
      &.current:before {
        visibility: visible;
      }
      &.current > span {
        background: darken($theme-color, 25%);
        /*transform: scale(1.2);*/
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
  index-section(:class="$style.container" :title="currentCol.title", titleForeground="#fff", background="#fc0" :title-animatable="titleAnimate")
    div(:class="$style.indicator" v-if="!$mq.phone")
      div(:class="{ [$style.indicatorItem]:true, [$style.current]:col===currentCol }" v-for="(col,index) in collections" @click="goTo(index)")
        span
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
        faChevronRight,
        titleAnimate: 'vth-fade-slide-right-to-left'
      };
    },
    ls: {
      lastRandomNewProduct: {
        type: Object,
        default: {
          ts: Date.now(),
          step: 4
        }
      }
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
        const categoryUrls = ['san-pham-moi', 'onsale'].map(c => '/collections/' + c + '/');
        Promise
          .all(categoryUrls.map(url =>
            jQuery.get(url + '?view=json').then(rs => {
              const obj = JSON.parse(rs);
              console.log(obj);
              obj.url = url;
              obj.list = obj.list.map(ProductItem_);

              if (/san-pham-moi/.test(obj.url)) {
                //randomly San-Pham-Moi - swap last 4 elements
                let lsValue = this.$ls.get('lastRandomNewProduct', {
                    ts: Date.now(),
                    step: 4
                  }),
                  times = lsValue.step,
                  compareDiff = Date.now() - lsValue.ts,
                  diff = window.vth.settings.autoUpdateNewProducts * 1000;
                if (compareDiff > diff) {
                  console.log('do swap');
                  while (times--) {
                    const tmp = obj.list.pop();
                    obj.list.unshift(tmp);
                  }
                  this.$ls.set('lastRandomNewProduct', {
                    ts: Date.now(),
                    step: lsValue.step += 4
                  })
                }
              }

              return obj;
            })))
          .then(rs => {
            rs.push({
              title: 'SẢN PHẨM HÀNG ĐẦU',
              categoryId: -1,
              url: '#',
              list: window.products_sale
            });
            this.collections = rs;
          })
      },
      next() {
        this.$nextTick(() => {
          this.titleAnimate = 'vth-fade-slide-right-to-left';
          this.current = (this.current + 1) % this.collections.length;
        })
      },
      prev() {
        this.$nextTick(() => {
          this.titleAnimate = 'vth-fade-slide-left-to-right';
          let current = this.current;
          current--;
          if (current < 0) current += this.collections.length;
          this.current = current;
        })
      },
      goTo(index) {
        if (index === this.current) return;
        this.titleAnimate = (index > this.current) ? 'vth-fade-slide-right-to-left' : 'vth-fade-slide-left-to-right';
        this.current = index;
      }
    },
    mounted() {
      this.fetch();
    }
  };
</script>
