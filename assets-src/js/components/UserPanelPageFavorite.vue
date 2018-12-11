<style lang="scss" module>
@import "../../sass/inc/inc";

.favorite-item {
  &-wrapper {
    padding: 0.7rem;
    border-radius: 0.3rem;
    background: white;
    margin-bottom: 0.2rem;
  }
  &-remove {
    display: block;
    margin-top: 1.3rem;
    color: #888;
  }
}

.favorite-empty {
  padding: 0 20%;
  p {
    margin-top: 1.5rem;
  }
  :global(.svg-inline--fa) {
    color: $theme-red-color;
  }
}
</style>
<template lang="pug">
  div
    flash-message-hub(label="product/favorite")
    template(v-if="favorites.length>0")
      ul
        li(v-for="product in favorites", :key="product.id", :class="$style.favoriteItemWrapper")
          product-item(:class="$style.favoriteItem", :item="product", :item-style="2")
            div
              fa-icon(:class="$style.favoriteItemRemove", :icon="faTimesCircle", size="lg", @click="favoriteToggle(product)")
    .text-center(v-else, :class="$style.favoriteEmpty")
      img(src="../../img/vaithuhay-not-found.png")
      p Danh sách hiện chưa có gì. Hãy&nbsp;
        span
          fa-icon(:icon="faHeart")
        | &nbsp;sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất nhé
</template>
<script lang="ts" src="./UserPanelPageFavorite.vue.ts"></script>
