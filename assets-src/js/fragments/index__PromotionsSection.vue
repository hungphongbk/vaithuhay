<style lang="scss" scoped>
@import "../../sass/inc/inc";

.homepage-promo {
  margin: {
    bottom: 40px;
    /*left: 50px;*/
    /*right: 50px;*/
  }
  @include responsive("xs-max") {
    margin: {
      bottom: 20px;
      left: $grid-gutter-width/3;
      right: $grid-gutter-width/3;
    }
  }
}

.item {
  @extend %clearfix;
  @extend %reset-link;
  display: block;
  transition: all $animation-time ease;
  box-shadow: 0 2px 6px -3px rgba(0, 0, 0, 0.65);
  margin-bottom: 1rem;
  border-radius: 0.7rem;
  overflow: hidden;
  @at-root img {
    width: 100%;
    height: 100%;
  }
  @include responsive("xs-max") {
    .homepage-promo .col-sm-6:last-child & {
      margin-bottom: 0;
    }
  }
  @include responsive("sm-min") {
    margin-bottom: 1.7rem;
    border-radius: 1rem;
  }
}
</style>
<template lang="pug">
  index-section(:title="$t('title')", title-foreground="#fc0")
    .homepage-promo
      .row
        .col-sm-6(v-for="cat in promo")
          a.item.ratio-5-2(:href="cat.url")
            .content
              img(v-lazy="cat.img$.thumbnails[$mq.desktop?'600w':'400w']")
    .text-center
      a.btn.btn-theme(href="https://vaithuhay.com/collections/onsale") KHÁM PHÁ THÊM
</template>
<script>
import { IndexSection } from "../components/index";
import { PROMO_LIST_ } from "../store/types";
import { mapGetters } from "vuex";

const $ = jQuery;
export default {
  components: {
    IndexSection
  },
  computed: {
    ...mapGetters({
      promo: PROMO_LIST_
    })
  }
};
</script>
<i18n>
  {
    "en": {
      "title": "top sales"
    },
    "vi": {
      "title": "đang khuyến mãi"
    }
  }
</i18n>
