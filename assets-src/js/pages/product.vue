<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .entry-title {
    @include font-size-with-line-height($font-size-h1);
    @include responsive('xs-max') {
      @include font-size-with-line-height($font-size-h3*0.85);
    }
    font-weight: 700;
  }

  .price {
    &, + .rating {
      @include font-size-with-line-height($font-size-h1);
      margin-top: 20px;
      @include responsive('xs-max') {
        @include font-size-with-line-height($font-size-h2*0.9);
        margin-top: 10px;
      }
    }
    font-weight: 700;
    color: $theme-red-color;
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
      .item {
        @extend %reset-link;
        @extend %clearfix;
        display: block;
      }
      &:not(:last-child) .item {
        padding-bottom: 12px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 12px;
      }
      .vth-thumb {
        width: 80px;
        float: left;
        margin-right: 15px;
      }
      .title {
        margin-top: 0;
        color: #666;
        font-size: $font-size-h5*1.1;
        line-height: $font-size-h5*1.55;
      }
      &:hover .title {
        color: #444;
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
<template lang="pug" src="./product.pug"></template>
<script>
  // components
  import ProductImages from '../fragments/product__Images.vue'
  import ProductQuantity from '../fragments/product__Quantity.vue'
  import ProductTabs from '../fragments/product__Tabs.vue'
  import ProductTab from '../fragments/product__Tab.vue'
  // import ProductVariants from
  const ProductVariants = () => import(/* webpackChunkName: "product-variant" */ '../fragments/product__Variants')
  import ProductFaq from '../fragments/product__FAQ.vue'
  import ProductExpandable from '../fragments/product__Expandable.vue'
  import ProductWholeSale from '../fragments/product__Wholesale.vue'
  import {AddToCartWrapper} from '../components/index'
  import {ItemLoop, Paginate, OverlaySelector, ProductRating} from '../components/index'
  import {ProductItem1 as ProductItem} from '../components/products'
  import ProductWholeSaleItem from '../fragments/product__WholeSale-Item.vue'
  // mixins & helpers
  import {addToCartMixin} from '../components/mixins'
  import {ProductItem_, WholeSale} from '../components/classes'
  import {delay} from '../components/helpers'
  import transform from '../plugins/content-transform'
  //    import {i18nFields} from '../plugins/i18n'

  import ripple from 'js-effect-ripple'

  const $ = jQuery,
    {current, images, variants, relateds, tops, topPromos, faq} = window.product,
    responsive = (breakpoint, settings) => ({breakpoint, settings}),
    slickOptions_ = {
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 3,
      responsive: [
        responsive(1111, {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
        }),
        responsive(768, {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          arrow: false,
        }),
        responsive(426, {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          autoplay: true,
          autoplaySpeed: 3000
        })
      ]
    };

  export default {
    mixins: [addToCartMixin],
    directives: {
      ripple: (el) =>
        $(el).addClass('btn-ripple').click(e => ripple(e))
    },
    components: {
      ProductImages,
      ProductQuantity,
      ProductTabs,
      ProductTab,
      ProductVariants,
      ProductRating,
      AddToCartWrapper,
      ItemLoop,
      ProductItem,
      ProductFaq,
      ProductWholeSale
    },
    data() {
      // const {current, images, variants, relateds, tops, topPromos, faq} = this.$store.state.product
      // console.log(current)
      return {
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
          title: '',
          price: {
            current: "-1",
          }
        },
        relateds: relateds.filter(i => i !== null).slice(0, 4).map(ProductItem_),
        sales: relateds.filter(i => i !== null).slice(0, 8).map(ProductItem_),
        tops: tops.filter(i => i !== null).slice(0, 4).map(ProductItem_),
        topPromos: topPromos.filter(i => i !== null).map(ProductItem_),
        slickOptions_,
        contentCollapse: true,
        wholesale: [],
        faq: (faq && faq.faq) ? faq.faq : [],
        commentCount: null,
        giftAvatars: [''],
        giftVariants: ['']
      }
    },
    computed: {
      title$i18n() {
        return this.title[this.$i18n.locale];
      },
      variantId() {
        return this.variantSelected.id;
      },
      price() {
        return this.variantSelected.price.current;
      },
      description$i18n() {
        return this.description[this.$i18n.locale].replace(/\n/g, "<br />");
      },
      top6() {
        return this.tops.slice(0, 6)
      }
    },
    asyncComputed: {
      async body() {
        await delay(100);
        const res = await transform([
          'responsiveFrame',
          'markupTable',
          ['makeGallery', {
            imgCount_: 9
          }],
          'makeExpandable',
          'lazyloadImg'
        ], this);
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
        console.log(e)
      },
      injectVideo_($videoFrame) {
        $videoFrame.attr('width', '100%');
        $videoFrame.attr('height', '100%');
        const self = this,
          src = $videoFrame.attr('src'),
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
        const data = await $.get('https://api.v1.hungphongbk.com/vaithuhay/b/products/' + current.id + '/wholesale');
        if (data.length > 0) {
          this.wholesale = data.map(({rules}, index) => new WholeSale(index + 1, rules[0], this));
        }
      },
      async fetchCommentCount() {
        const {share} = await $.get(`https://graph.facebook.com/v2.8/?fields=share%7Bcomment_count%7D&id=http://vaithuhay.com${this.url}`);
        this.commentCount = share.comment_count;
      }
    },
    beforeRouteEnter(to, from, next) {

    },
    async mounted() {
      await Promise.all([this.fetchWholesale(), this.fetchCommentCount()])
    }
  }
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
