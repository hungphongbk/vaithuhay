<style lang="scss"></style>
<template lang="pug">
  async-button(:fn="addToCart_" icon="fa-cart-plus")
    slot
</template>
<script>
import { CART_ADD_ } from "../store/types";
import { mapActions } from "vuex";
import AsyncButton from "@/components/async-button";

export default {
  components: { AsyncButton },
  inject: ["cartItem_"],
  methods: {
    ...mapActions({
      add_: CART_ADD_
    }),
    async addToCart_() {
      const { add_, cartItem_ } = this;
      this.$emit("cart-adding");
      try {
        await add_(cartItem_);
        cartItem_.quantity = 1;
        this.$emit("cart-added");
      } catch (e) {
        this.$emit("cart-failed", e);
      }
    }
  }
};
</script>
