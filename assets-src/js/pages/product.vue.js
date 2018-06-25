import ProductImages                                                   from '../fragments/product__Images.vue';
import ProductQuantity                                                 from '../fragments/product__Quantity.vue';
import ProductTabs                                                     from '../fragments/product__Tabs.vue';
import ProductTab                                                      from '../fragments/product__Tab.vue';
import ProductFaq                                                      from '../fragments/product__FAQ.vue';
import ProductExpandable                                               from '../fragments/product__Expandable.vue';
import ProductWholeSale                                                from '../fragments/product__WholeSale.vue';
import {AddToCartWrapper, ItemLoop, ProductRating}                     from '../components/index';
import ProductItem                                                     from '@/components/products';
import ProductWholeSaleItem                                            from '../fragments/product__WholeSale-Item.vue';
import ProductSmallItem                                                from '../components/app__ProductSmallItem';
// mixins & helpers
import {addToCartMixin}                                                from '../components/mixins';
import {ProductItem_, WholeSale}                                       from '../components/classes';
import {delay}                                                         from '../components/helpers';
import transform                                                       from '../plugins/content-transform';
import ripple                                                          from 'js-effect-ripple';
import ProductModule                                                   from '../store/product';
import {mapState}                                                      from 'vuex';
//    import {i18nFields} from '../plugins/i18n'
import faHeart
                                                                       from '@fortawesome/fontawesome-free-regular/faHeart';
import faHeartSolid
                                                                       from '@fortawesome/fontawesome-free-solid/faHeart';
import faCartPlus
                                                                       from '@fortawesome/fontawesome-free-solid/faCartPlus';
import {PRODUCT_ACTION_FAVORITE_FETCH, PRODUCT_ACTION_FAVORITE_TOGGLE} from "@/store/types";

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
  },
  convertToNumber = ({current, old}) => {
    const convert = str => str ? str.replace(/,|₫/g, '') * 1.0 : Number.MIN_SAFE_INTEGER;
    return {
      current: convert(current),
      old: convert(old)
    };
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
    'product-variants': () => import(/* webpackChunkName: "product-variant" */ '../fragments/product__Variants'),
    ProductRating,
    AddToCartWrapper,
    ItemLoop,
    ProductItem,
    ProductFaq,
    ProductWholeSale,
    ProductSmallItem
  },
  data() {
    // const {current, images, variants, relateds, tops, topPromos, faq} = this.$vthStore.state.product
    // console.log(current)
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
      console.log(e);
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
      const data = await $.get('https://server.vaithuhay.com/b/products/' + current.id + '/wholesale');
      if (data.length > 0) {
        this.wholesale = data.map(({rules}, index) => new WholeSale(index + 1, rules[0], this));
      }
    },
    async fetchCommentCount() {
      const {share} = await $.get(`https://graph.facebook.com/v2.8/?fields=share%7Bcomment_count%7D&id=http://vaithuhay.com${this.url}`);
      this.commentCount = share.comment_count;
    },
    addToFavorite() {
      return this.$vthStore.dispatch(PRODUCT_ACTION_FAVORITE_TOGGLE);
    }
  },
  beforeMount() {
    this.$vthStore.registerModule('product', ProductModule, {preserveState: true});
  },
  async mounted() {
    await Promise.all([this.fetchWholesale(), this.fetchCommentCount()]);
    this.$vthStore.dispatch(PRODUCT_ACTION_FAVORITE_FETCH);
  },
  destroyed() {
    this.$vthStore.unregisterModule('product');
  }
};
