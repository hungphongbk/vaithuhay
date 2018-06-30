<style lang="scss" module>
  .item {
    width: percentage(1)
  }
</style>
<template lang="pug">
  flickity(:options="flickityOptions" ref="flkty")
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
          pageDots: false,
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
            console.log(index);
            this.$emit('select', index)
          })
        })
      }
    }
  }
</script>
