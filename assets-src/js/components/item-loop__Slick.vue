<style lang="scss" scoped>
@import "../../sass/inc/inc";

$button-size: 70px;
.product-loop {
  margin-bottom: 20px;
  /deep/ .slick-dots {
  }
  &.pt /deep/ {
    .slick-list {
      padding-top: 20px;
    }
  }
}

.nav {
  overflow: hidden;
}

.main-outer {
  position: relative;
  margin-bottom: -3px;
  .pt & {
    .carousel-button- {
      &prev {
        left: -$button-size;
      }
      &next {
        right: -$button-size;
      }
    }
  }
}

.main {
  overflow: hidden;
}

.row-wrap {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss">
@import "../../sass/inc/inc";

$button-size: 70px;
.carousel-button- {
  /*<!--$icon-margin: $button-size/4;-->*/
  $icon-margin: 0;

  &prev,
  &next {
    position: absolute;
    top: 50%;
    width: $button-size;
    height: $button-size;
    margin-top: -$button-size/2;
    z-index: 10;
    cursor: pointer;
    opacity: 0.65;

    /*border-radius: 50%;*/
    /*background-color: rgba(255, 255, 255, 0.9);*/

    .fa {
      font-size: $button-size * 0.85;
      line-height: $button-size;
      color: #333;
      opacity: 0.35;

      transition: opacity $animation-time ease;
    }
    &:hover .fa {
      opacity: 1;
    }
  }
  &prev {
    left: $button-size/2;
    text-align: left;
  }
  &next {
    right: $button-size/2;
    text-align: right;
  }
}
</style>
<style lang="scss" module>
@import "../../sass/inc/inc";

%cls {
  background-color: white;
  color: #555;
  border-radius: 6px;
  padding: $line-height-computed * 0.7 $grid-gutter-width;

  position: absolute;

  display: inline-block;
  z-index: 999;
  opacity: 0.95;
  @extend %box-shadow-1;
}

.fullScreen {
  @extend %cls;
  cursor: pointer;
  top: 20px;
  right: 20px;
}

.indicator {
  @extend %cls;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.navNext,
.navPrev {
  .isLight & {
    opacity: 0.85;
    :global(.fa) {
      color: $theme-color;
      opacity: 0.65;
    }

    &:hover :global(.fa) {
      opacity: 1;
    }
  }
}
</style>
<template lang="pug">
  .product-loop(:class="{ [$style.isLight]: isLight }")
    template(v-if="slickOpts")
      .main-outer
        slick.main(ref='slide', :options="slickOpts", :class="uniqId_", @afterChange="change_")
          div.row-wrap(v-for="chunk in CHUNKED_LIST")
            slot(v-for="item in chunk", name="item", :item="item")
        template
          .carousel-button.carousel-button-next(:class="[uniqId_, $style.navNext]")
            i.fa(:class="RIGHT_ICON")
          .carousel-button.carousel-button-prev(:class="[uniqId_, $style.navPrev]")
            i.fa(:class="LEFT_ICON")
        div(v-if="labelIndicator_ && !$mq.phone", :class="$style.indicator") Ảnh thứ {{SLICK_INDICATOR}}
        div(v-if="fullScreen_", :class="$style.fullScreen", @click="$emit('full-screen')")
          i.fa.fa-expand
      .nav-outer(v-if="slickOpts.nav")
        slick.nav(ref='sub', :options="slickSlide_", :class="uniqId_")
          .row-wrap(v-for="chunk in CHUNKED_LIST")
            slot(v-for="item in chunk", name="thumb", :item="item")
    template(v-else)
      slot(v-for="item in CHUNKED_LIST", name="item", :item="item")
</template>
<script>
import Slick from "vue-slick";
import chunk from "lodash/chunk";

const responsive = (breakpoint, settings) => ({ breakpoint, settings });
const $ = jQuery;
export default {
  components: { Slick },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    sliderOpts: Object,
    labelIndicator_: {
      type: Boolean,
      default: false
    },
    fullScreen_: {
      type: Boolean,
      default: false
    },
    rows_: {
      type: Number,
      default: 1
    },
    isLight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const { slick, uniqId_ } = this;
    return {
      slickSlide_: {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: `.main.${uniqId_}`,
        centerMode: true,
        arrows: false
      },
      CURRENT_SLIDE: 0
    };
  },
  computed: {
    slickOpts() {
      const { sliderOpts, uniqId_ } = this;
      if (!sliderOpts) return null;
      const opts = Object.assign(
        {},
        {
          prevArrow: `.carousel-button-prev.${uniqId_}`,
          nextArrow: `.carousel-button-next.${uniqId_}`
        },
        sliderOpts
      );
      if (sliderOpts.nav) {
        opts.asNavFor = `.nav.${uniqId_}`;
      }
      return opts;
    },
    SLICK_INDICATOR() {
      return `${this.CURRENT_SLIDE + 1} / ${this.list.length}`;
    },
    LEFT_ICON() {
      return this.$mq.tablet ? "fa-caret-left" : "fa-chevron-left";
    },
    RIGHT_ICON() {
      return this.$mq.tablet ? "fa-caret-right" : "fa-chevron-right";
    },
    CHUNKED_LIST() {
      const { list, slickOpts } = this;
      if (!slickOpts) return list;
      return chunk(list, this.rows_);
    }
  },
  watch: {
    CURRENT_SLIDE(value) {
      this.$emit("change", value);
    }
  },
  methods: {
    goTo(index) {
      this.$refs.slide.goTo(index);
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      const self = this;
      self.$nextTick(() => {
        self.$refs.slide.reSlick();
        if (self.slickOpts.nav) {
          self.$refs.sub.reSlick();
          self.$refs.sub.next();
        }
      });
    },
    change_({}, { currentSlide }) {
      this.$nextTick(() => {
        this.CURRENT_SLIDE = currentSlide;
      });
    }
  }
};
</script>
