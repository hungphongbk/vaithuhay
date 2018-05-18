<style lang="scss" module>
  @import "../../sass/inc/inc";

  $color: lighten($theme-red-color, 50%);
  .wholesale-item {
    @include outline-effect(darken($color, 5%));

    margin-bottom: 15px;
    padding: 10px 20px;
    border-radius: 4px;
    border: 1px solid darken($color, 12%);
    background-color: $color;
    position: relative;
    /*overflow: hidden;*/
    h4 {
      @include font-size-with-line-height(1.2em);
      margin-right: 4rem;
    }
    h3 {
      font-size: 1.7em;
      margin-top: 0;
    }
    :global .btn {
      margin: 10px 0;
      padding: {
        left: 1em;
        right: 1em;
      }
      text-transform: uppercase;
      font-size: 1.2em;
    }

    @include responsive('xs-max') {
      width: calc(100% - 15px);
      @include font-size-with-line-height($font-size-base*0.9);
    }
  }

  //TODO: styling when embedding in product content or article content
  .wholesale-item:global(.in-content) {
    @extend %clearfix;
    .gift-img {
      float: left;
      width: 25%;
      margin-right: 2rem;
    }
  }

  .discount-badge {
    composes: text-center from global;
    position: absolute;
    top: -25px;
    right: -15px;
    width: 70px;
    height: 70px;
    background-color: $theme-red-color;
    border-radius: 50%;
    color: white;
    font-size: $font-size-h4;
    font-weight: 700;
    padding-top: 20px;
    :global(.fa) {
      line-height: .8em;
    }
  }
</style>
<template lang="pug">
  div(:class="$style.wholesaleItem")
    thumbnail.no-effect(:class="$style.giftImg", v-if="rule$.isBuyOneGetOne", ratio_="1-1", :url_="rule$.giftAvatar", :overlay_="false")
    h4.count.text-theme-red {{rule$.title[$i18n.locale]}}
    h3.amount(v-if="!(rule$.isGift)")
      small.text-muted
        s {{rule$.currentPrice}}
      | &nbsp;&nbsp;{{rule$.discountPrice}}
    p.text-muted {{rule$.description[$i18n.locale]}}
    span(:class="$style.discountBadge")
      template(v-if="!rule$.isGift")
        | -{{rule$.amount$}}
      i.fa.fa-gift.fa-2x(v-else)
    async-button.btn-theme-red(:fn="add", :success-delay="1000") {{rule$.isGift?$t('receiveGift'):$t('buyNow')}}
    template(v-if="rule$.__wholesale")
      modal(v-if="modalAvailable && modal", :title="`Chọn sản phẩm ${rule$.isGift?'tặng kèm':'mua kèm'}`", @dismiss="modal=null")
        .modal-body
          product-variants(:list="rule$.additionalProductObj.variants", :options_="rule$.additionalProductObj.current.options", v-model="rule$.additionalProductObj.variantSelected")
          .mt-2
            .btn.btn-theme-red(@click="modal=false") TIẾP TỤC
</template>
<script>
  //TODO: migrate function rule->new WholeSale from page/product.vue to here
  import {CART_ADD_, CART_HAS_PRODUCT_} from '../store/types';
  import {mapActions, mapMutations}     from 'vuex';
  import {WholeSale}                    from "../components/classes";

  const ProductVariants = () => import(/* webpackChunkName: "product-variant" */ '../fragments/product__Variants');
  export default {
    components: {ProductVariants},
    props: {
      apply: {
        type: Number,
        required: true
      },
      rule: {
        type: Object,
        required: true
      }
    },
    data() {
      const rule$ = (typeof this.rule.__wholesale !== 'undefined') ? this.rule : (new WholeSale(0, this.rule));
      return {
        rule$,
        modal: false
      };
    },
    computed: {
      variantId() {
        return this.rule$.product.variantSelected.id;
      },
      modalAvailable() {
        //return true if
        //  typeof combo !== wholesale
        const {rule$} = this;
        if (!rule$.isBuyOneGetOne) return false;
        return rule$.additionalProductObj;
      }
    },
    methods: {
      ...mapMutations({
        has_: CART_HAS_PRODUCT_
      }),
      ...mapActions({
        add_: CART_ADD_
      }),
      async getAdditionalVariant() {
        const self = this,
          {additionalProductObj: product} = self.rule$;
        if (!product.hasMultipleVariants) return product.variants[0];
        return new Promise((resolve, reject) => {
          self.modal = true;
          const unwatch = self.$watch('modal', value => {
            unwatch();
            if (value === false) {
              resolve(product.variantSelected);
            } else reject();
          });

        });
      },
      async add() {
        const item = this.rule$;
        if (item.isBuyOneGetOne) {
//                    const selected = await this.$refs.modal[item.index - 1].show();
//                    console.log(selected);
          try {
            const variantSelected = await this.getAdditionalVariant();
            const tasks = [];
            if (!this.has_(this.apply)) {
              tasks.push(this.add_({
                id: this.variantId,
                quantity: (item.number * 1) || 1
              }));
            }
            //Get additional variant, then push it to cart
            tasks.push(this.add_({
              id: variantSelected.id,
              quantity: 1
            }));
            await Promise.all(tasks);
          } catch (e) {
            console.log('User rejected');
          }
        } else {
          await this.add_({
            id: this.variantId,
            quantity: (item.number * 1) || 1
          });
        }
      },
      isReady({__wholesale: value}) {
        console.log(value);
      }
    },
    mounted() {
      const self = this;
      // self.$watch('rule$', this.isReady, {
      //   deep: true
      // })
    }
  };
</script>
<i18n>
  {
    "en": {
      "buyNow": "Buy now",
      "receiveGift": "Buy now"
    },
    "vi": {
      "buyNow": "Mua ngay",
      "receiveGift": "Nhận quà"
    }
  }
</i18n>
