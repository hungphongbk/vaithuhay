<style lang="scss" scoped>
@import "../../sass/inc/inc";

%center {
  text-align: center;
}

.archive-list {
  position: relative;
  background-color: $theme-color;
  padding-bottom: $line-height-computed * 2.7;

  .list {
    padding: 0 50px {
      top: 50px;
    }
    @include responsive("xs-max") {
      padding: 0 5px;
    }
    .product-item {
      margin-bottom: 20px;
      @include responsive("xs-max") {
        /*padding: {*/
        /*left: 5px;*/
        /*right: 5px;*/
        /*}*/
        margin-bottom: 10px;
      }
      /deep/ .caption {
        height: $line-height-computed * 10;
        @include responsive("xs-max") {
          height: $line-height-computed * 7;
        }
      }
    }
  }
  .thumbnail {
    transition: all $animation-time ease;
    @extend %box-shadow-1;
  }
}

@include responsive("xs-max") {
  .select-cat-list {
    margin: {
      left: -$grid-gutter-width/2;
      right: -$grid-gutter-width/2;
    }
    background-color: darken($theme-color, 4%);
    .select-cat {
      padding: $line-height-computed * 0.7 $grid-gutter-width/2;
    }
  }
}

#main-list {
  position: absolute;
  top: -$navbar-height;
}
</style>
<style lang="scss" module>
@import "../../sass/inc/inc";

%center {
  text-align: center;
}

.vth-wc-archive {
  composes: vth-wc-archive from global;
  @at-root .archive-carousel {
    @include responsive("md-min") {
      background-color: #f3f3f3;
      padding: 90px 0 30px 0;
      position: relative;
      :global {
        .container > div {
          overflow-x: hidden;
          padding: 100px 0;
        }
        .main,
        .slick-list {
          overflow: unset;
        }
        .main-outer {
          position: initial;
        }
        .slick-slide {
          transition: all $animation-time * 3 ease;
          transform: scale(1);
          will-change: transform;
        }
        .slick-center {
          transform: scale(1.65);
          z-index: 2;
          .vth-thumb {
            @include _(box-shadow-2);
          }
        }
      }
    }

    @include responsive("sm-max") {
      :global .product-loop {
        margin-bottom: 0 {
          left: -10px;
          right: -10px;
        }
      }
    }
  }
}

.title {
  @extend %center;
  padding: {
    top: $line-height-computed;
    bottom: $line-height-computed;
  }
  @at-root .page-title {
    display: inline-block;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
    @include font-size-with-line-height($font-size-h1 * 1.15);
    @include responsive("xs-max") {
      @include font-size-with-line-height(2rem);
    }
  }
}

.sort-form {
  @include responsive("sm-min") {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  > div {
    display: inline-block;
    font-size: $font-size-base * 1.4;
    @include responsive("xs-max") {
      font-size: $font-size-base;
      margin-bottom: $font-size-base * 0.7;
    }
    @include responsive("sm-min") {
      display: flex;
      align-items: center;
    }
  }
  margin-bottom: 40px;
  @include responsive("xs-max") {
    margin-bottom: $grid-gutter-width/2;
  }

  :global .overlay-selector.sort-selector {
    display: inline-block;
    margin-left: $grid-gutter-width;
    @include responsive("sm-min") {
      min-width: 240px;
    }

    :local .sort-title {
      text-align: left;
    }

    .indicator {
      padding-bottom: 4px;
      @include responsive("xs-max") {
        padding-bottom: 2px;
      }
      border-bottom: 1px solid;
    }
  }
}

.collectionSelector {
  @include responsive("sm-min") {
    min-width: 318px;
  }
  height: 40px;
}
</style>
<template lang="pug">
  //.vth-wc-archive
  div(:class="$style.vthWcArchive")
    div(:class="$style.archiveCarousel", v-if="slides.length>0")
      .container
        product-loop(:slider-opts="carousel_", :list="slides")
          template(slot="item", slot-scope="p")
            a(:href="p.item.url")
              thumbnail(:url_="p.item.image.vi.thumbnails['600w']", ratio_="3-2", :overlay_="false", :lazy_="false", :slick-lazy_="false")
    .archive-list
      #main-list
      .container
        div(:class="$style.title")
          h1(:class="$style.pageTitle") {{CURRENT_CATEGORY.title}}
        div(:class="$style.sortForm")
          .mr-4
            span.mr-3 Sản phẩm
            sort-selector.sort-selector(:list="CATEGORIES_LIST" v-model="CURRENT_CATEGORY" :class="$style.collectionSelector")
              template(slot="current")
                span {{CURRENT_CATEGORY.title}}
          div
            span.mr-3 Sắp xếp bởi
            sort-selector.sort-selector(:list="sort_", v-model="CURRENT_SORT" style="min-width: 180px;height:40px")
        .list
          product-loop.row.gutter-10.gutter-sm-30(v-if="products.length<20", :list="products")
            template(slot="item", slot-scope="p")
              .col-xs-6.col-md-4
                product-item.product-item(:key="p.item.id", :item="p.item")
          paginate(v-else, :for_="products", :perPage="12", @navigated="navigated")
            template(slot-scope="p")
              //transition-group.row.gutter-10.gutter-sm-30(name="slide-list", tag="div")
              .row.gutter-10.gutter-sm-30
                .col-xs-6.col-md-4(v-for="item in p.list", :key="item.id")
                  product-item.product-item(:item="item")
</template>
<script>
import {
  ItemLoop,
  OverlaySelector,
  PageSlider,
  Paginate
} from "../components/index";
import ProductItem from "@/components/products";
import Slick from "@/components/libs/VueSlickCarousel";
import { mapGetters } from "vuex";
import {
  CATEGORIES_LIST_,
  PRODUCTS_FETCH_,
  PRODUCTS_LIST_,
  PRODUCTS_SORT_
} from "../store/types";
import ProductsModule from "../store/products";
import SortSelector from "../fragments/collection__SortSelector";

const $ = jQuery;

export default {
  components: {
    ProductLoop: ItemLoop,
    Paginate,
    ProductItem,
    Slick,
    OverlaySelector,
    PageSlider,
    SortSelector
  },
  data() {
    const f = (id, title) => ({ id, title }),
      sort_ = [
        f("new", "Mới"),
        f("sale", "Khuyến mãi"),
        f("name", "A-Z"),
        f("pricelow", "Giá: từ cao đến thấp"),
        f("pricehigh", "Giá: từ thấp đến cao")
      ];
    return {
      title_: window.products.title,
      sort_,
      CURRENT_SORT: sort_[0]
    };
  },
  computed: {
    slides() {
      return this.$vthStore.state.products.slides;
    },
    ...mapGetters({
      products: PRODUCTS_LIST_,
      CATEGORIES_LIST: CATEGORIES_LIST_
    }),
    CURRENT_CATEGORY() {
      return this.CATEGORIES_LIST.find(
        cat => cat.id === window.products.categoryId
      );
    },
    carousel_() {
      return this.$mq.tablet
        ? {
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 2000
          }
        : {
            centerMode: true,
            centerPadding: "1px",
            slidesToShow: 3,
            autoplay: true,
            autoplaySpeed: 2000
          };
    }
  },
  watch: {
    CURRENT_SORT({ id }) {
      this.$vthStore.commit(PRODUCTS_SORT_, id);
    }
  },
  methods: {
    navigated() {
      if (this.$mq.phone) $("#app").scrollTo("#main-list");
      else $.scrollTo("#main-list");
    }
  },
  beforeMount() {
    const { list, slides } = window.products;
    this.$vthStore.registerModule("products", ProductsModule);
    this.$vthStore.commit(PRODUCTS_FETCH_, {
      list,
      slides
    });
  },
  destroyed() {
    this.$vthStore.unregisterModule("products");
  }
};
</script>
