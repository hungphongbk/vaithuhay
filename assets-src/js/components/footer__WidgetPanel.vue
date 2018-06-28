<style lang="scss" module>
  @import "../../sass/inc/inc";

  .container {
    margin: 24px 0;
    @include responsive('sm-max') {
      text-align: center;
    }
  }

  h3.container {
    @include font-size-with-line-height($font-size-h3*0.69);
    @include responsive('md-min') {
      @include font-size-with-line-height($font-size-h3*0.86);
    }
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  .content {
    position: relative;
    padding-top: 1.5rem;
    &:before {
      visibility: visible;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 3px;
      width: 8rem;
      background-color: $theme-color;
    }
  }
</style>
<template lang="pug">
  div(:class="$style.container")
    h3(v-if="title_" :class="$style.container") {{title_}}
      fa-icon.ml-3(v-if="!$mq.desktop" :icon="FA_CARET_DOWN" size="lg")
    //div(:class="$style.content")
      slot
</template>
<script>
  import FA_CARET_DOWN from '@fortawesome/fontawesome-free-solid/faCaretDown'
  import Dropdown from 'my-vue-utils/dist/components/dropdown';

  export default {
    components: {Dropdown},
    props: {
      title_: {
        type: String,
        default: null
      }
    },
    data: () => ({
      FA_CARET_DOWN,
      IS_EXPANDED: false
    })
  }
</script>
