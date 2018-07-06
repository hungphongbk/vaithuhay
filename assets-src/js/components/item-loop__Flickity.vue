<style lang="scss" module>
  @import "../../sass/inc/inc";

  .container {
    :global {
      $button-size: 70px;

      .flickity-page-dots {
        bottom: unset;
        top: -10px;
        @include responsive('md-min') {
          top: -25px;
        }
      }
      .flickity-prev-next-button{
        width: $button-size;
        height: $button-size;
        background: transparent !important;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: 59.5px;
        opacity: .35;
        &:hover{
          opacity: .65;
        }
        >svg{
          display: none;
        }
        &.next{
          right: -$button-size*5/4;
          &:before {
            content: "\F054"
          }
        }
        &.previous{
          left: -$button-size*5/4;
          &:before {
            content: "\F053";
          }
        }
      }
    }
  }
  .item{
    &:global(.rows-4){
      width: percentage(1/4)
    }
    &:global(.rows-3){
      width: percentage(1/3)
    }
    &:global(.rows-2){
      width: percentage(1/2)
    }
  }
</style>
<template lang="pug">
  flickity(:class="$style.container" :options="flickityOpts" ref="flkty")
    div(:class="[$style.item, `rows-${rows}`]" v-for="item in list")
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
      },
      sliderOpts: {
        type: Object,
        default: () => ({})
      },
      rows:{
        type:Number,
        default:1
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
          cellSelector: '.' + this.$style.item,
          autoPlay: 1500,
          cellAlign: 'left'
          // any options from Flickity can be used
        }
      }
    },
    computed:{
      flickityOpts(){
        return Object.assign({},this.flickityOptions, this.sliderOpts)
      }
    },
    watch: {
      list() {
        this.$nextTick(() => {
          this.$refs.flkty.rerender();
          this.$refs.flkty.reloadCells();
          console.log('changed');
          this.$refs.flkty.on('select', (index) => {
            // console.log(index);
            this.$emit('select', index)
          })
        })
      }
    }
  }
</script>
