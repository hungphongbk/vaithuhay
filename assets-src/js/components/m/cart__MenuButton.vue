<style lang="scss" module>
  @import "../../../sass/inc/inc";

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
      @mixin size($s) {
        height: $s;
        width: $s;
        line-height: $s*11/12;
        font-size: $s*9/14;
      }
      display: inline-block;
      font-weight: 500;
      font-family: $font-family-sans-serif;
      vertical-align: top;
      text-align: center;
      margin-left: -7px;
      background: $theme-red-color;
      border-radius: 50%;
      color: white;
      margin-top: -7px;
      @include size(28px);
      @include responsive('xs-max') {
        @include size(24px);
      }
    }

    @include responsive('md-max') {
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
    img {
      transform-origin: bottom left;
    }
  }
</style>
<template lang="pug">
  a(:class="$style.cart")
    img(ref="cartCount", src="../../../img/cart.svg" :style="cartImageStyle")
    span(:class="$style.count" :style="cartCountStyle")= '{{count_}}'
</template>
<script>
  import {CART_COUNT_, CART_FETCH_} from '../../store/types';
  import {mapActions, mapGetters} from 'vuex';
  import {scrollEffectMixin} from "@/components/mixins";
  import {createTransform} from "@/components/helpers";

  export default {
    mixins: [scrollEffectMixin],
    computed: {
      ...mapGetters({
        count_: CART_COUNT_
      }),
      cartImageStyle() {
        return {
          'transform': createTransform({
            scale: 1 - this.scrollTopThreshold,
            translateY: `${this.scrollTopThreshold * 50}%`,
            translateX:`-${this.scrollTopThreshold * 60}%`
          })
        }
      },
      cartCountStyle() {
        return {
          'transform': createTransform({
            translateX:`-${this.scrollTopThreshold * 50}%`,
            translateY:`${this.scrollTopThreshold * 250}%`
          })
        }
      }
    },
    methods: {
      ...mapActions({
        fetch_: CART_FETCH_,
      })
    },
    watch: {
      count_() {
        $(this.$refs.cartCount).animateCss('rubberBand');
      }
    },
    async mounted() {
      await this.fetch_();
    }
  };
</script>
