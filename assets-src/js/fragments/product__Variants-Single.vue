<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .option {
    font-weight: 700;
  }

  li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: .4em;
    }
    &.selected:not(.disabled) .vth-thumb {
      border: 2px solid $theme-red-color;
    }
    &.disabled .vth-thumb {
      opacity: .7;
    }
  }

  .vth-thumb {
    cursor: pointer;
    width: 60px;
  }
</style>
<template lang="pug">
  div.product-variants
    p
      span.text-theme-red {{value.title}}
    ul
      li(v-for="item in list", :class="{'selected': item===value, 'disabled': !item.available}", @click="$emit('input', item)")
        thumbnail.no-effect.ratio-1-1(:url_="item.image", :overlay_="false", v-tooltip.top="item.title",:lazy_="false")
</template>
<script>
  import {tooltip} from '../plugins/index';

  const $ = jQuery;
  export default {
    directives: {
      tooltip
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      value: null
    },
    mounted() {
      console.log('first variant will be selected');
      console.log(this.list[0]);
      this.$emit('input', this.list[0]);
    }
  };
</script>
