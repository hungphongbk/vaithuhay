<style lang="scss" module>
  @import "../../sass/inc/inc";
  .container{
    :global{
      .flickity-page-dots{
        bottom: unset;
        top: -10px;
        @include responsive('md-min'){
          top: -25px;
        }
      }
    }
  }
  .item {
    width: percentage(1)
  }
</style>
<template lang="pug">
  flickity(:class="$style.container" :options="flickityOptions" ref="flkty")
    div(:class="$style.item" v-for="item in list")
      slot(name="item" :item="item")
</template>
<script>
  import Flickity from 'vue-flickity';

  export default {
    components: {Flickity},
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        flickityOptions: {
          initialIndex: 3,
          prevNextButtons: false,
          percentPosition: false,
          pageDots: true,
          wrapAround: true,
          cellSelector: '.' + this.$style.item
          // any options from Flickity can be used
        }
      }
    },
    watch: {
      list() {
        this.$nextTick(() => {
          this.$refs.flkty.rerender();
          this.$refs.flkty.on('select', (index) => {
            // console.log(index);
            this.$emit('select', index)
          })
        })
      }
    }
  }
</script>
