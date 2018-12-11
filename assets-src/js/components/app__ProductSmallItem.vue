<style lang="scss" module>
@import "../../sass/inc/inc";

.item {
  @extend %reset-link;
  @extend %clearfix;
  display: block;
  :global(.vth-thumb) {
    width: 80px;
    float: left;
    margin-right: 15px;
  }
}

.title {
  margin-top: 0;
  color: #666;
  font-size: $font-size-h5 * 1.1;
  line-height: $font-size-h5 * 1.55;
  font-weight: 600;
  .item:hover & {
    color: #444;
  }
}

.price {
  .current {
    color: $theme-red-color;
    font-weight: 600;
  }
  .old {
    color: #aaa;
    text-decoration: line-through $theme-red-color;
  }
}
</style>
<template lang="pug">
  a(:class="$style.item", :href="product.url", target="_blank")
    thumbnail(:url_="product.thumbnail", thumbnailSize_="small", ratio_="1-1", :overlay_="false")
    h5(:class="$style.title") {{product._title[$i18n.locale]}}
    p(:class="$style.price")
      span(:class="$style.current") {{product.price.current}}&nbsp;
      span(v-if="hasSale", :class="$style.old") {{product.price.old}}
</template>
<script>
export default {
  name: "ProductSmallItem",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasSale() {
      const price = this.product.price;
      return price.old;
    }
  }
};
</script>
