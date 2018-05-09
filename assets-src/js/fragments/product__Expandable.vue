<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  h3 {
    font-weight: 700;
    line-height: 1.4;
    color: #444;
    cursor: pointer;
    margin-top: 7px;
  }

  .fa {
    margin-right: .4em;
    margin-left: .05em;
    color: #888;
    opacity: 0.7;
    transition: all $animation-time ease;
    h3:hover & {
      opacity: 1;
    }
  }

  .product-expandable {
    margin: 6px {
      bottom: $line-height-computed
    }
    padding: 10px 15px;
    @extend %box-shadow-2;
    border-radius: 15px;
    border: 1px solid #ddd;
  }

  .inner {
    padding-bottom: $line-height-computed
  }
</style>
<style lang="scss">
  @import "../../sass/inc/inc";

  .slide- {
    &enter-active, &leave-active {

      transition: all $animation-time*2 ease
    }
    &enter, &leave-to {
      opacity: 0;
      max-height: 0;
    }
  }
</style>
<template lang="pug">
  .product-expandable
    h3(@click="expanded_ = !expanded_")
      i.fa.fa-lg.fa-arrow-circle-up(:class="[expanded_?'fa-rotate-180':'']")
      | {{title}}
    transition(name="slide")
      .inner(v-if="expanded_")
        slot
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        expanded_: false
      };
    }
  };
</script>
