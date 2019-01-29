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
<template lang="pug">
.vth-single-product
  .vth-product-summary
    .container
      .row.gutter-sm-50
        .col-sm-5
          product-images.images(ref="images", :images_="images", :fullScreen_="true" @change="selectImageUpdateVariant")
        .col-sm-7
          h2(:class="$style.entryTitle") {{title$i18n}}
          .clearfix
            template(v-if="price.current!=='-1'")
              h2(:class="$style.price", style="display: inline-block") {{price.current}}&nbsp;
                span.small(v-if="priceSalePercentage", :class="$style.oldPrice") ({{price.old}})
              p(v-if="priceSalePercentage", :class="$style.sale") Tiết kiệm:&nbsp;
                span(:class="$style.percentageNumber") {{priceSalePercentage | percentage}}
                | &nbsp; ({{priceSaleDiff | vnd}})
            product-rating.pull-right(v-model="rating", color="#997a00", background-color="#f5e4a3", :clickable="true")
          hr
          p.short-desc(v-html="description$i18n")
          product-variants(v-show="variants.length>1", :list="variants", :options_="variantOptions", v-model="variantSelected", @input="({image}) => $refs.images.goTo(image)")
          div(:class="$style.addToCartWrapper")
            .d-flex
              div.mr-2(v-if="!$mq.phone")
                product-quantity(v-model="quantity")
              div(:class="$style.addToCartFavoriteGroup")
                add-to-cart-wrapper.btn-theme-red(:class="$style.addToCart", v-ripple='', @cart-failed="error") {{$t('buyNow')}}
                div(@click="addToFavorite", style="padding-top: .4rem; padding-bottom: .4rem")
                  fa-icon(:class="{ [$style.favorite]:true, [$style.added]:favorite }", :icon="favorite ? faHeartSolid : faHeart", size="2x")
  .product-body
    .container
      .row(:class="{'flex-row': !$mq.tablet}").gutter-30
        .col-md-8
          product-tabs
            product-tab(:title="$t('info')")
              component.product-content(:is="body", :class="{contentCollapse}")
              .text-center(:class="$style.readmore", @click="contentCollapse = !contentCollapse")
                span.btn.btn-theme(v-if="contentCollapse") {{$t('seeMore')}}
                span.btn.btn-theme(v-else) {{$t('collapse')}}
            product-tab(title="FAQ", :badge="faq.length")
              product-faq(:list="faq")
            product-tab(:title="$t('comment')", :badge="commentCount")
              .fb-comments(:data-href="`http://vaithuhay.com${url}`", data-width="100%")
        .col-md-4.product-sidebar
          .inner
            div(v-if="wholesale.length>0")
              h3.title
                i.fa.fa-lg.fa-gift
                | {{$t('combo.label')}}
              product-whole-sale(:list="wholesale", :variant-id="variantId", :product-id="productId")
            template(v-if="relateds.length>0")
              h3.title
                i.fa.fa-lg.fa-link
                | {{$t('related')}}
              ul.products-sidebar
                li(v-for="rel in relateds")
                  product-small-item.item(:product="rel")
            div
              h3.title
                i.fa.fa-lg.fa-certificate
                | {{$t('top')}}
              ul.products-sidebar
                li(v-for="rel in top6")
                  product-small-item.item(:product="rel")
    div(:class="$style.relatedArticleWrapper" v-if="relatedArticles.length>0" v-dark-panel.overlay="")
      .container.pb-4
        .text-center
          h3.title(:class="$style.sectionTitle") CÁC BÀI VIẾT LIÊN QUAN
        item-loop.pt(:slider-opts="slickOptionsWithDot" :list="relatedArticles" :is-light="true")
          template(slot="item" slot-scope="p")
            .swiper-slide
              a(:class="$style.relatedArticle" :href="`/blogs/news/${p.item.handle}`")
                thumbnail(ratio_="1-1", :overlay_="false", :url_="p.item.image.src", :lazy_="false")
                .ratio-3-2.ratio-sm-3-1
                  .content
                    h4(:class="$style.relatedArticleTitle") {{p.item.title}}
    .top-products
      .container
        .row
          .col-sm-12
            .text-center
              h3.title(:class="$style.sectionTitle") {{$t('sale')}}
            item-loop.pt(:slider-opts="slickOptions_", :list="topPromos")
              template(slot="item", slot-scope="p")
                .swiper-slide
                  product-item(:item="p.item", thumbnailSize_="medium")

</template>
<script>
import ProductImages from "../fragments/product__Images.vue";
import ProductQuantity from "../fragments/product__Quantity.vue";
import ProductTabs from "../fragments/product__Tabs.vue";
import ProductTab from "../fragments/product__Tab.vue";
import ProductFaq from "../fragments/product__FAQ.vue";
import ProductExpandable from "../fragments/product__Expandable.vue";
import ProductWholeSale from "../fragments/product__WholeSale.vue";
import {
  AddToCartWrapper,
  Event,
  ItemLoop,
  ProductRating
} from "../components/index";
import ProductItem from "@/components/products";
import ProductWholeSaleItem from "../fragments/product__WholeSale-Item.vue";
import ProductSmallItem from "../components/app__ProductSmallItem";
// mixins & helpers
import { addToCartMixin } from "../components/mixins";
import { ProductItem_, WholeSale } from "../components/classes";
import { delay } from "../components/helpers";
import transform from "../plugins/content-transform";
import ripple from "js-effect-ripple";
import ProductModule from "../store/product";
import { mapState } from "vuex";
//    import {i18nFields} from '../plugins/i18n'
import faHeart from "@fortawesome/fontawesome-free-regular/faHeart";
import faHeartSolid from "@fortawesome/fontawesome-free-solid/faHeart";
import faCartPlus from "@fortawesome/fontawesome-free-solid/faCartPlus";
import {
  PRODUCT_ACTION_FAVORITE_FETCH,
  PRODUCT_ACTION_FAVORITE_TOGGLE
} from "@/store/types";
import ProductRelatedArticles from "../fragments/product__RelatedArticles.vue";
import { DarkPanel } from "@/plugins/directives";
import { SYSTEM_ON__MOBILE_HEADER_CONTENT } from "@/types";
import mobileHeader from "@/fragments/m/product__MobileHeader";

const $ = jQuery,
  {
    current,
    images,
    variants,
    relateds,
    tops,
    topPromos,
    faq
  } = window.product,
  responsive = (breakpoint, settings) => ({ breakpoint, settings }),
  slickOptions_ = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      responsive(1111, {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false
      }),
      responsive(768, {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        arrow: false
      }),
      responsive(426, {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000
      })
    ]
  },
  slickOptionsWithDot = {
    ...slickOptions_,
    dots: true
  },
  convertToNumber = ({ current, old }) => {
    const convert = str =>
      str ? str.replace(/,|₫/g, "") * 1.0 : Number.MIN_SAFE_INTEGER;
    return {
      current: convert(current),
      old: convert(old)
    };
  };

export default {
  mixins: [addToCartMixin],
  directives: {
    ripple: el =>
      $(el)
        .addClass("btn-ripple")
        .click(e => ripple(e)),
    DarkPanel
  },
  components: {
    ProductImages,
    ProductQuantity,
    ProductTabs,
    ProductTab,
    "product-variants": () =>
      import(/* webpackChunkName: "product-variant" */ "../fragments/product__Variants"),
    ProductRating,
    AddToCartWrapper,
    ItemLoop,
    ProductItem,
    ProductFaq,
    ProductWholeSale,
    ProductSmallItem,
    ProductRelatedArticles
  },
  data() {
    return {
      faHeart,
      faHeartSolid,
      faCartPlus,
      productId: current.id * 1,
      title: current._title,
      url: current.url,
      description: current.description.desc,
      content: current.content,
      rating: current.rating,
      quantity: 1,
      images,
      variants,
      variantOptions: current.options,
      variantSelected: {
        id: -1,
        title: "",
        price: {
          current: "-1"
        }
      },
      relateds: relateds
        .filter(i => i !== null)
        .slice(0, 4)
        .map(ProductItem_),
      sales: relateds
        .filter(i => i !== null)
        .slice(0, 8)
        .map(ProductItem_),
      tops: tops
        .filter(i => i !== null)
        .slice(0, 4)
        .map(ProductItem_),
      topPromos: topPromos.filter(i => i !== null).map(ProductItem_),
      slickOptions_,
      slickOptionsWithDot,
      contentCollapse: true,
      wholesale: [],
      faq: faq && faq.faq ? faq.faq : [],
      commentCount: null,
      giftAvatars: [""],
      giftVariants: [""],
      relatedArticles: [],
      mobileHeader
    };
  },
  computed: {
    title$i18n() {
      return this.title[this.$i18n.locale];
    },
    variantId() {
      return this.variantSelected.id;
    },
    price() {
      return this.variantSelected.price;
    },
    priceSalePercentage() {
      const price = convertToNumber(this.price);
      if (!price.old) return 0;
      if (price.current >= price.old) return 0;
      return (price.old - price.current) / price.old;
    },
    priceSaleDiff() {
      const price = convertToNumber(this.price);
      return (price.old - price.current) * 100;
    },
    description$i18n() {
      return this.description[this.$i18n.locale].replace(/\n/g, "<br />");
    },
    top6() {
      return this.tops.slice(0, 6);
    },
    ...mapState({
      favorite: state => state.product.favorite
    })
  },
  asyncComputed: {
    async body() {
      await delay(100);
      const res = await transform(
        [
          "responsiveFrame",
          "markupTable",
          [
            "makeGallery",
            {
              imgCount_: 9
            }
          ],
          "makeExpandable",
          "lazyloadImg"
        ],
        this
      );
      res.components = {
        ProductImages,
        ProductExpandable,
        ProductWholeSaleItem
      };
      return res;
    }
  },
  methods: {
    error(e) {
      console.log(e);
    },
    injectVideo_($videoFrame) {
      $videoFrame.attr("width", "100%");
      $videoFrame.attr("height", "100%");
      const self = this,
        src = $videoFrame.attr("src"),
        [, id] = /embed\/([^\/]+)/.exec(src) || [],
        small = `http://img.youtube.com/vi/${id}/0.jpg`;
      self.images.unshift({
        small,
        original: $videoFrame[0].outerHTML,
        isVideo: true
      });
      self.$refs.images.reInit();
    },
    async fetchWholesale() {
      const data = await $.get(
        "https://server.vaithuhay.com/b/products/" + current.id + "/wholesale"
      );
      if (data.length > 0) {
        this.wholesale = data.map(
          ({ rules }, index) => new WholeSale(index + 1, rules[0], this)
        );
      }
    },
    async fetchRelatedArticles() {
      this.relatedArticles = await $.get(
        "https://server.vaithuhay.com/b/products/" +
          current.id +
          "/relatedArticles"
      );
    },
    async fetchCommentCount() {
      const { share } = await $.get(
        `https://graph.facebook.com/v2.8/?fields=share%7Bcomment_count%7D&id=http://vaithuhay.com${
          this.url
        }`
      );
      this.commentCount = share.comment_count;
    },
    addToFavorite() {
      return this.$vthStore.dispatch(PRODUCT_ACTION_FAVORITE_TOGGLE);
    },
    selectImageUpdateVariant(image) {
      const variant = this.variants.find(v => v.image === image);
      if (variant) this.variantSelected = variant;
    }
  },
  created() {
    Event.$emit(SYSTEM_ON__MOBILE_HEADER_CONTENT, this.mobileHeader);
  },
  async beforeMount() {
    this.$vthStore.registerModule("product", ProductModule, {
      preserveState: true
    });
    const patch = await $.get(
      "https://server.vaithuhay.com/b/products/" +
        current.id +
        "/patch-variants"
    );
    for (const v of this.variants) {
      const vPatch = patch.find(p => p.id * 1 === v.id);
      v.price.old =
        Math.round(vPatch.compare_at_price)
          .toLocaleString("vi-VN")
          .replace(/\./g, ",") + "₫";
    }
    console.log(this.variants);
  },
  async mounted() {
    await Promise.all([
      this.fetchWholesale(),
      this.fetchCommentCount(),
      this.fetchRelatedArticles()
    ]);
    this.$vthStore.dispatch(PRODUCT_ACTION_FAVORITE_FETCH);
  },
  destroyed() {
    this.$vthStore.unregisterModule("product");
  }
};
</script>
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
