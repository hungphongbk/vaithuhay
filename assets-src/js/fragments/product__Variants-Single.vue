<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .option {
    font-weight: 700;
  }

  ul{
    margin-right: -.4rem;
  }
  li {
    display: block;
    //&:not(:last-child) {
    padding-right: .4rem;
    padding-bottom: .4rem;
    width: percentage(1/6);
    flex-basis: percentage(1/6);
    //}
    &.selected:not(.disabled) .vth-thumb {
      border: 2px solid $theme-red-color;
    }
    &.disabled .vth-thumb {
      opacity: .7;
    }
  }

  .vth-thumb {
    cursor: pointer;
    width: 100%;
  }
</style>
<template lang="pug">
  div.product-variants
    p
      span.text-theme-red {{value.title}}
    ul.d-flex.flex-wrap
      li(v-for="item in list", :class="{'selected': item===value, 'disabled': !item.available}", @click="$emit('input', item)")
        thumbnail.no-effect.ratio-1-1(:url_="item.image", :overlay_="false", v-tooltip.top="item.title")
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
