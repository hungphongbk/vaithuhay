<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  .modal- {
    &enter, &leave-active {
      opacity: 0;
      .modal-container {
        transform: scale(1, 1);
      }
    }
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    .admin-bar & {
      top: 32px;
    }
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    $pos: 'top' 'middle' 'bottom';
    @each $p in $pos {
      &.#{$p} {
        vertical-align: #{$p};
      }
    }
    &.top {
      padding-top: 70px;
    }
  }

  .modal-container {
    will-change: transform;

    width: 800px;
    .modal-wrapper.large & {
      width: $container-large-desktop - $grid-gutter-width;
    }
    margin: 0 auto;
    padding: 20px 15px;
    background-color: #fff;
    /*border-radius: 2px;*/
    /*box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
    transition: all .3s ease;
    /*font-family: Helvetica, Arial, sans-serif;*/
  }
</style>
<template lang="pug">
  transition(name="modal")
    .modal-mask
      .modal-wrapper(:class="[position_, large_?'large':'']", @click.self="$emit('close')")
        .modal-container
          slot
</template>
<script>
  export default {
    props: {
      position_: {
        type: String,
        default: 'middle'
      },
      large_: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
