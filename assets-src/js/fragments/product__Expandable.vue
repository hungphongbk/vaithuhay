<style lang="scss" module>
  @import "../../sass/inc/inc";

  .expandable {
    margin: 6px {
      bottom: $line-height-computed
    }
    padding: 10px 15px;
    @extend %box-shadow-2;
    border-radius: 15px;
    border: 1px solid #ddd;
  }

  .title {
    font-weight: 700;
    line-height: 1.4;
    color: #444;
    cursor: pointer;
    margin-top: 7px;
  }

  .icon {
    composes: fa fa-lg fa-arrow-circle-up from global;
    margin-right: .4em;
    margin-left: .05em;
    color: #888;
    opacity: 0.7;
    transition: all $animation-time ease;
  }

  .title:hover .icon {
    opacity: 1;
  }

  .inner {
    padding-bottom: $line-height-computed
  }
</style>
<template lang="pug">
  div(:class="$style.expandable")
    h3(:class="$style.title", @click="IS_EXPANDED = !IS_EXPANDED")
      i(:class="[$style.icon, IS_EXPANDED?'fa-rotate-180':'']")
      | {{title | escaped}}
    //dropdown(:is-open="IS_EXPANDED")
      div(:class="$style.inner")
        slot
</template>
<script>
  // TODO: waiting for new repo
  //import Dropdown from 'my-vue-utils/dist/components/dropdown';

  export default {
    //components: {Dropdown},
    props: {
      title: {
        type: String,
        required: true
      }
    },
    filters: {
      escaped: str => str.replace(/&nbsp;/gi, ' ')
    },
    data() {
      return {
        IS_EXPANDED: false
      };
    }
  };
</script>
