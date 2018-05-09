<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .overlay-selector {
    cursor: pointer;
  }

  .container > ul {
    display: inline-block;
    @include responsive('sm-min') {
      margin-top: 80px;
    }
  }

  .fa {
    margin-left: $grid-gutter-width/2;
  }

  .item {
    transition: all $animation-time*3 ease;
  }

  .not-show {
    opacity: 0;
    transform: translateX(50%);
  }
</style>
<template lang="pug">
  .overlay-selector.text-left
    span.indicator(@click="show_ = true")
      slot(name="current", :item="value")
      i.fa.fa-angle-down
    static-overlay(name_='vth-fade-slide-up-2x', @click.self.native="show_ = false", :enter_="enter_")
      .container(:class="{'text-center': !$mq.phone}")
        ul
          li.item.not-show(v-for="item in list", @click="$emit('input', item); show_ = false", ref="item")
            slot(name="item", :item="item")
</template>
<script>
  import StaticOverlay  from './static-overlay.vue';
  import {overlayMixin} from './mixins';
  import {delay}        from './helpers';

  const $ = jQuery;

  export default {
    props: {
      list: Array,
      value: null
    },
    mixins: [overlayMixin],
    components: {
      StaticOverlay
    },
    data() {
      return {};
    },
    methods: {
      async enter_() {
        await delay(10);
        for (const elem of this.$refs.item) {
          await delay(50);
          $(elem).removeClass('not-show');
        }
      }
    }
  };
</script>
