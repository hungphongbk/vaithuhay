<style lang="scss" scoped>
@import "../../sass/inc/inc";

li {
  &:not(:last-child) {
    margin-right: 0.4em;
    margin-bottom: 0.4em;
  }
  &.selected:not(.disabled) .vth-thumb {
    border: 2px solid $theme-red-color;
  }
  &.disabled .vth-thumb {
    opacity: 0.7;
  }

  ul.text & {
    background: darken($theme-color, 3%);
    &.selected {
      background: darken($theme-color, 14%);
      color: white;
    }
  }
}

.vth-thumb {
  cursor: pointer;
  width: 60px;
}
</style>
<template lang="pug">
  div
    ul.d-flex.flex-wrap(:class="hasImage?'image':'text'")
      li(v-for="item in items", :class="{'btn btn-variant':!hasImage, 'selected': item.title===value.title}", @click="$emit('input', item)")
        thumbnail.no-effect.ratio-1-1(v-if="hasImage", :url_="item.image", :overlay_="false", v-tooltip.top="item.title", :lazy_="false")
        span(v-else) {{item.title}}
</template>
<script>
import { tooltip } from "../plugins";

export default {
  directives: {
    tooltip
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: null
  },
  computed: {
    hasImage() {
      return this.type === "image";
    }
  },
  mounted() {
    this.$emit("input", this.items[0]);
  }
};
</script>
