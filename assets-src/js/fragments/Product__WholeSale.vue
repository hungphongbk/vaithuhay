<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  ul {
    padding-top: 10px;
    @include responsive('sm-min') {
      padding-top: 20px;
    }
  }
</style>
<template lang="pug">
  div
    ul.wholesale
      li(v-for="i in list", :class="{'gift':i.isGift}")
        product-whole-sale-item(:apply="productId", :rule="i")
        //static-overlay-internal(ref="modal", @click.self.native="show$ = false")
        //    variants(:options_="i.giftVariantOptions", :list="giftVariants")
</template>
<script>

  import {overlayMixin}       from '../components/mixins';
  import Variants             from "./product__Variants-Single.vue";
  import ProductWholeSaleItem from './product__WholeSale-Item';

  export default {
    props: {
      list: Array,
      productId: Number
    },
    mixins: [overlayMixin],
    components: {Variants, ProductWholeSaleItem},

  };
</script>
