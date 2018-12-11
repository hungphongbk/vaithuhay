<style lang="scss" module>
@import "../../../sass/inc/inc";

/*.headline {
    color: $theme-red-color;
    line-height: 35px;
    display: inline-block;
    margin-right: 20px;
  }*/

.cat {
  @extend %reset-link;
  width: percentage(1/4);
  position: relative;
  float: left;
  // Prevent columns from collapsing when empty
  min-height: 1px;
  // Inner gutter via padding
  padding-left: $grid-gutter-width / 2;
  padding-right: $grid-gutter-width / 2;
  margin-bottom: 30px;
  @at-root .inner {
    /*padding-bottom: 20px;*/
    border-bottom: 1px dashed #ccc;
  }

  img {
    width: 100%;
  }
  @at-root .title {
    @include font-size-with-line-height($font-size-h5);
    height: $font-size-h5 * $line-height-base * 2;
    vertical-align: middle;
  }

  opacity: 1;
  transform: translateY(0);
  will-change: opacity, transform;
  transition: all $animation-time ease;
}

.not-show {
  opacity: 0;
  transform: translateY(-5%);
}

/*.discover {
    position: fixed;
    top: $navbar-height;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding-top: 40px;
    font-size: $font-size-base;
    color: white;
  }*/

.see-more {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  @extend %reset-link;
  display: block;
  .text {
    font-weight: 700;
  }
}

.items {
  composes: row from global;
  padding: {
    left: 80px;
    right: 80px;
  }
}
</style>
<template lang="pug">
  static-overlay(:enter_="enter_", :leave_="leave_", @click.self.native="show_ = false")
    .container
      div(:class="$style.item")
        a(:class="[$style.cat, $style.notShow]", v-for="cat in categories", :href="cat.url", ref="elem")
          div(:class="$style.inner")
            thumbnail(:url_="cat.image", ratio_="3-2")
            h5(:class="$style.title") {{cat.title}}
    a(:class="$style.seeMore", :href="all.url")
      h2(:class="$style.text", ref="seeMore") {{$t('0')}}
</template>
<script>
import { mapGetters } from "vuex";
import { CATEGORIES_ALL_, CATEGORIES_LIST_ } from "../../store/types";
import StaticOverlay from "../static-overlay.vue";
import { overlayMixin } from "../mixins";
import { delay } from "../helpers";

const $ = jQuery;

export default {
  props: {
    isShow_: {
      type: Boolean,
      default: false
    }
  },
  mixins: [overlayMixin],
  components: {
    StaticOverlay
  },
  data() {
    return {};
  },
  watch: {
    isShow_(value) {
      this.show_ = value;
    }
  },
  computed: {
    ...mapGetters({
      categories: CATEGORIES_LIST_,
      all: CATEGORIES_ALL_
    })
  },
  methods: {
    async enter_(el) {
      const self = this;
      console.log("???");
      await delay(100);
      for (const elem of self.$refs.elem) {
        await delay(60);
        $(elem).removeClass(self.$style.notShow);
      }
      await delay(200);
      $(self.$refs.seeMore).animateCss("rubberBand");
    },
    async leave_(el, done) {
      for (const elem of this.$refs.elem) {
        $(elem).addClass(self.$style.notShow);
      }
      await delay(100);
    }
  }
};
</script>
<i18n>
  {
    "en": {
      "0": "See Everything"
    },
    "vi": {
      "0": "Xem tất cả"
    }
  }
</i18n>
