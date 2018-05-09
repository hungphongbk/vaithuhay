<style lang="scss" module>
  @import "../../sass/inc/inc";

  $cart-padding-vertical: (($navbar-height - $font-size-base*2)/2);

  :global .navbar-nav > li > a {
    &:local.cart {
      padding-top: $cart-padding-vertical - 4px !important;
      padding-bottom: $cart-padding-vertical;
    }
  }

  .cart {
    position: relative;
    :global .fa-shopping-cart {
      font-size: $font-size-base*2;
      line-height: $font-size-base*2;

    }
    .count {
      display: inline-block;
      font-size: 18px;
      font-weight: 500;
      font-family: $font-family-sans-serif;
      line-height: 28px;
      vertical-align: top;
      height: 28px;
      width: 28px;
      text-align: center;
      margin-left: -7px;
      background: $theme-red-color;
      border-radius: 50%;
      color: white;
      margin-top: -7px;
    }

    @include responsive('sm-max') {
      $s: $navbar-height;
      height: $s;
      width: $s;
      z-index: 100001;
      padding: ($navbar-height - $font-size-base*2)/2 0;
      text-align: center;
      &, &:active, &:hover, &:focus, &:visited {
        color: #888;
        text-decoration: none;
      }
      :global .fa-shopping-cart {

      }
    }
  }

  .cartItem {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px !important;

    :global {
      .media-object {
        width: 70px;
      }
      .media-body {
        /*width: auto;*/
      }
      p {
        font-size: 0.85em;
        color: #666;
      }
    }
  }

  .checkout {
    text-align: center;
    :global .fa {
      margin-right: 0.7em;
      font-weight: 700;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  $thumb-size: 26px;
  %h {
    font-weight: 600;
    color: #666;
  }

  .cart-panel {
    @include responsive('md-min') {
      padding: 20px 40px {
        bottom: 40px;
      }
      background: white;
    }
    @include responsive('sm-max') {
      * {
        color: #fff;
      }
    }
  }

  .cart-panel-title {
    @extend %h;
    margin-bottom: 30px;
    @include responsive('sm-max') {
      text-align: left;
    }
  }

  .media-heading {
    @extend %h;
    .badge {
      background-color: $theme-red-color;
      margin-right: 1.2em;
      font-size: $font-size-base*1.1;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      line-height: 28px;
      padding: 0;
      margin-top: -2px;
      font-weight: 500;
    }
  }

  .media-middle {
    @include responsive('sm-max') {
      vertical-align: top;
      text-align: left;
    }
  }

  .thumb-items {
    /*display: inline-block;*/
    > span {
      text-align: center;
      color: white;
      background-color: #888;
      font-size: $thumb-size/2.4;
      width: $thumb-size;
      height: $thumb-size;
      line-height: $thumb-size;
      border-radius: 50%;
      &:not(last-child) {
        margin-right: 5px;
      }
      &.remove {
        background-color: $theme-red-color;
      }
    }
  }

  p {
    &.price {
      font-size: $font-size-base*0.95;
      &.free {
        color: darken($theme-color, 6%)
      }
    }
  }

  .summary {
    color: #666;
    strong {
      margin-left: 2em;
    }
    margin-bottom: 30px;
  }

  .checkout {
    @extend %box-shadow-2;
  }

  /deep/ .static-content {
    @include responsive('sm-max') {
      transform-origin: right top 0;
    }
  }
</style>
<template lang="pug">
  a(:class="$style.cart", href="#")
    i.fa.fa-shopping-cart(ref="cartCount", @click="show_ = !show_")
      span(:class="$style.count")= '{{count_}}'
    static-overlay(name_="vth-fade-slide-down-bz", @click.self.native="show_ = false")
      .container
        p(v-if="count_===0", style="color: #888; text-align:center; padding-top: 2em") {{$t('cartEmpty')}}
        .row(v-else, @click.self="show_ = false")
          .col-md-8.col-md-offset-2.col-sm-10.col-sm-offset-1.cart-panel
            .text-center
              h2.cart-panel-title {{$t('cart')}}
            form(:action="checkOutLink_", method="post")
              ul
                li(v-for="i in list_")
                  .media(:class="$style.cartItem")
                    .media-left
                      img.media-object(:src="i.thumbnail")
                    .media-body.media-middle
                      h5.media-heading {{i.title}}
                        .thumb-items.pull-right
                          span.fa.fa-plus(@click="remove_({id: i.variant_id, quantity: i.quantity + 1})")
                          span.fa.fa-minus(@click="remove_({id: i.variant_id, quantity: i.quantity - 1})")
                          span.fa.fa-times.remove(@click="remove_({id: i.variant_id})")
                        span.badge.pull-right(v-if="i.quantity>1") {{i.quantity}}
                      <!--span.badge(v-if='i.quantity_>1')= '{{i.quantity_}}'-->
                      p.price(v-if="i.price>0") {{$t('amount')}}: {{i.price | vnd}}
                        span(v-if="i.quantity>1") &nbsp;x {{i.quantity}} = {{i.price*i.quantity | vnd}}
                        span.badge.ml-2(v-if="i.discountPercentage>0") -{{i.discountPercentage}}%
                      p.price.free(v-else) {{$t('free')}}
              div(:class="$style.checkout")
                .text-right.summary
                  h4 {{$t('totalAmount')}}
                    strong {{price_ | vnd}}
                button.btn.btn-theme-red.checkout(type="submit", name="checkout")
                  i.fa.fa-check
                  | {{$t('checkoutBtn')}}
</template>
<script>
  import {CART_ADD_, CART_COUNT_, CART_FETCH_, CART_LIST_, CART_REMOVE_, CART_TOTAL_} from '../store/types';
  import {overlayMixin}                                                               from './mixins';
  import {mapActions, mapGetters}                                                     from 'vuex';

  const $ = jQuery;

  export default {
    mixins: [overlayMixin],
    data() {
      return {
        checkOutLink_: vth.links.cart.checkout
      };
    },
    computed: {
      ...mapGetters({
        list_: CART_LIST_,
        count_: CART_COUNT_,
        price_: CART_TOTAL_
      }),
      list() {

      }
    },
    watch: {
      count_() {
        $(this.$refs.cartCount).animateCss('rubberBand');
      }
    },
    methods: {
      ...mapActions({
        fetch_: CART_FETCH_,
        add_: CART_ADD_,
        remove_: CART_REMOVE_
      })
    },
    async mounted() {
//            this.show_ = true;
      await this.fetch_();
    }
  };
</script>
<i18n>
  {
    "en": {
      "cart": "CART",
      "cartEmpty": "Cart empty",
      "amount": "Amount",
      "totalAmount": "Total",
      "checkoutBtn": "Proceed to Checkout",
      "free": "Free"
    },
    "vi": {
      "cart": "GIỎ HÀNG",
      "cartEmpty": "Giỏ hàng rỗng",
      "amount": "Thành tiền",
      "totalAmount": "Tổng đơn hàng",
      "checkoutBtn": "Đặt hàng & Thanh toán",
      "free": "Miễn phí"
    }
  }
</i18n>
