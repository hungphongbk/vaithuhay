<style lang="scss">
</style>
<template lang="pug">
  div(@click.stop.prevent="addToCart_")
    slot
</template>
<script>
  import {CART_ADD_} from '../store/types'
  import {mapActions} from 'vuex'

  export default {
    inject: ['cartItem_'],
    methods: {
      ...mapActions({
        add_: CART_ADD_
      }),
      async addToCart_() {
        const {add_, cartItem_} = this;
        this.$emit('cart-adding');
        console.log(cartItem_);
        try {
          await add_(cartItem_);
          cartItem_.quantity = 1;
          this.$emit('cart-added');
        } catch (e) {
          this.$emit('cart-failed', e);
        }
      }
    }
  }
</script>
