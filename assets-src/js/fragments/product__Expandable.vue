<style lang="scss" module>
@import "../../sass/inc/inc";

.expandable {
  margin: 6px {
    bottom: $line-height-computed;
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
  margin-right: 0.4em;
  margin-left: 0.05em;
  color: #888;
  opacity: 0.7;
  transition: all $animation-time ease;
  &.open {
    transform: rotate(180deg);
  }
}

.title:hover .icon {
  opacity: 1;
}

.inner {
  padding-bottom: $line-height-computed;
}
</style>
<template lang="pug">
  div(:class="$style.expandable")
    h3(:class="$style.title", @click="IS_EXPANDED = !IS_EXPANDED")
      fa-icon(:icon="FA_CIRCLE_UP" size="lg" :class="[$style.icon, IS_EXPANDED?$style.open:'']")
      | {{title | escaped}}
    dropdown(:is-open="IS_EXPANDED")
      div(:class="$style.inner")
        slot
</template>
<script>
import Dropdown from "my-vue-utils/src/components/dropdown.vue";
import FA_CIRCLE_UP from "@fortawesome/fontawesome-free-solid/faArrowCircleUp";

const ProductExpandable = {
  components: { Dropdown },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  filters: {
    escaped: str => str.replace(/&nbsp;/gi, " ")
  },
  data() {
    return {
      IS_EXPANDED: false,
      FA_CIRCLE_UP
    };
  }
};
if (process.env.NODE_ENV !== "production") {
  ProductExpandable.mounted = function() {
    console.log(this);
  };
}

export default ProductExpandable;
</script>
