<style lang="scss" module>
@import "../../sass/inc/inc";

.container {
  :global {
    $button-size: 70px;

    .flickity-page-dots {
      bottom: unset;
      top: -10px;
      @include responsive("md-min") {
        top: -25px;
      }
    }
    .flickity-prev-next-button {
      width: $button-size;
      height: $button-size;
      background: transparent !important;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: 59.5px;
      opacity: 0.35;
      &:hover {
        opacity: 0.65;
      }
      > svg {
        display: none;
      }
      &.next {
        right: -$button-size * 5/4;
        &:before {
          content: "\F054";
        }
      }
      &.previous {
        left: -$button-size * 5/4;
        &:before {
          content: "\F053";
        }
      }
    }
  }
}

.item {
  &:global(.rows-4) {
    width: percentage(1/4);
  }
  &:global(.rows-3) {
    width: percentage(1/3);
  }
  &:global(.rows-2) {
    width: percentage(1/2);
  }
}
</style>
<template lang="pug">
  flickity(:class="$style.container" :options="flickityOpts" ref="flkty")
    div(:class="[$style.item, `rows-${rows}`]" v-for="item in list_")
      slot(name="item" :item="item")
</template>
<script>
import Flickity from "@/components/libs/VueFlickity";
// import Flickity from "vue-flickity";

export default {
  components: { Flickity },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    sliderOpts: {
      type: Object,
      default: () => ({})
    },
    rows: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 3,
        prevNextButtons: !this.$mq.phone,
        percentPosition: false,
        pageDots: false,
        wrapAround: true,
        cellSelector: "." + this.$style.item,
        autoPlay: 1500,
        cellAlign: "left",
        lazyLoad: this.$mq.phone ? 2 : 4
        // any options from Flickity can be used
      },
      list_: []
    };
  },
  computed: {
    flickityOpts() {
      return Object.assign({}, this.flickityOptions, this.sliderOpts);
    }
  },
  watch: {
    list(value) {
      this.list_ = [];
      this.$nextTick(() => {
        this.list_ = value;
      });
    },
    list_() {
      this.$nextTick(() => {
        this.$refs.flkty.rerender();
        this.$refs.flkty.reloadCells();
        // this.$refs.flkty.rerender();
        console.log("changed");
        this.$refs.flkty.on("select", index => {
          // console.log(index);
          this.$emit("select", index);
        });
      });
    }
  },
  mounted() {
    this.list_ = this.list;
  }
};
</script>
