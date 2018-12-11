<style lang="scss" module="">
@import "../../../sass/inc/inc";

.cartItem {
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 10px !important;

  :global {
    .media-object {
      width: 70px;
      @include responsive("xs-max") {
        width: 60px;
      }
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
</style>
<style lang="scss" scoped>
@import "../../../sass/inc/inc";

$thumb-size: 26px;
%h {
  font-weight: 600;
  color: #fff;
}

.cart-panel {
  @include responsive("sm-max") {
    width: 100%;
    * {
      color: #fff;
    }
  }
}

.cart-panel-title {
  @extend %h;
  margin-bottom: 30px;
  @include responsive("sm-max") {
    text-align: left;
    margin-top: 0;
    @include font-size-with-line-height($font-size-h3);
  }
}

.media,
.media-body {
  overflow: visible;
}

.media-heading {
  @extend %h;
  .badge {
    background-color: $theme-red-color;
    margin-right: 1.2em;
    font-size: $font-size-base * 1.1;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    line-height: 28px;
    padding: 0;
    margin-top: -2px;
    font-weight: 500;
  }
  @include responsive("xs-max") {
    @include font-size-with-line-height($font-size-h5 * 0.9);
    position: relative;
    .badge {
      position: absolute;
      top: -6px;
      left: -26px;
      font-size: 12.6px;
      height: 24px;
      width: 24px;
      line-height: 24px;
    }
  }
}

.media-middle {
  @include responsive("sm-max") {
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
    font-size: $font-size-base;
    color: darken(#fff, 10%);
    @include responsive("xs-max") {
      @include font-size-with-line-height($font-size-small);
    }
  }
}

.summary {
  strong {
    margin-left: 2em;
  }
  margin-bottom: 30px;
}

.checkout {
  @extend %box-shadow-2;
}

/deep/ .static-content {
  @include responsive("sm-max") {
    transform-origin: right top 0;
  }
}

.empty {
  @at-root .text-muted {
    color: darken(#fff, 40%);
  }
}
</style>
<template lang="pug">
  .cart-panel
    .text-center
      h2.cart-panel-title {{$t('cart')}}
    form(v-if="count_>0", :action="checkOutLink_", method="post")
      transition-group(name="vth-fade-slide-right", tag="ul")
        li(v-for="i in list_", :key="i.id")
          .media(:class="$style.cartItem")
            .media-left
              img.media-object(:src="i.image")
            .media-body.media-middle
              h5.media-heading {{i.title}}
                .thumb-items.pull-right
                  span.fa.fa-plus(@click="remove_({id: i.variant_id, quantity: i.quantity + 1})")
                  span.fa.fa-minus(@click="remove_({id: i.variant_id, quantity: i.quantity - 1})")
                  span.fa.fa-times.remove(@click="remove_({id: i.variant_id})")
                span.badge.pull-right(v-if="i.quantity>1") {{i.quantity}}
              <!--span.badge(v-if='i.quantity_>1')= '{{i.quantity_}}'-->
              p.price {{$t('amount')}}: {{i.price | vnd}}
                span(v-if="i.quantity>1") &nbsp;x {{i.quantity}} = {{i.price*i.quantity | vnd}}
      .text-right(:class="$style.checkout")
        .summary
          h4 {{$t('totalAmount')}}
            strong {{price_ | vnd}}
        button.btn.btn-theme-red.checkout(type="submit", name="checkout")
          i.fa.fa-check
          | {{$t('checkoutBtn')}}
    div.empty.text-center(v-else)
      p.text-muted {{$t('cartEmpty')}}
</template>
<script>
import {
  CART_ADD_,
  CART_COUNT_,
  CART_FETCH_,
  CART_LIST_,
  CART_REMOVE_,
  CART_TOTAL_
} from "../../store/types";
import { mapActions, mapGetters } from "vuex";

export default {
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
    })
  },
  methods: {
    ...mapActions({
      fetch_: CART_FETCH_,
      add_: CART_ADD_,
      remove_: CART_REMOVE_
    })
  },
  async mounted() {
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
      "checkoutBtn": "Proceed to Checkout"
    },
    "vi": {
      "cart": "GIỎ HÀNG",
      "cartEmpty": "Chưa có sản phẩm nào",
      "amount": "Thành tiền",
      "totalAmount": "Tổng đơn hàng",
      "checkoutBtn": "Đặt hàng & Thanh toán"
    }
  }
</i18n>
