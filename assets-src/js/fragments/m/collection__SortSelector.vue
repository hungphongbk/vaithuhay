<style lang="scss" module>
@import "../../../sass/inc/inc";

a.cat {
  @extend %reset-link;
  display: inline-block;
  h2 {
    color: darken(#fff, 20%);
    &:hover {
      color: #fff;
    }
  }
}

.sort-title {
  @include responsive("xs-max") {
    @include font-size-with-line-height($font-size-h5);
  }
}
</style>
<template lang="pug">
  overlay-selector(:class="$style.container" :list="list" v-model="value_")
    template(slot="current" slot-scope="p")
      slot(name="current")
        span {{p.item.title}}
    template(slot="item", slot-scope="p")
      a(v-if="p.item.url" :class="$style.cat", :href="p.item.url")
        h2(:class="$style.sortTitle") {{p.item.title}}
      h2(v-else :class="$style.sortTitle") {{p.item.title}}
</template>
<script>
import { OverlaySelector } from "../../components";

export default {
  components: {
    OverlaySelector
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      value_: this.list[0]
    };
  },
  watch: {
    value_(value) {
      this.$emit("input", value);
    }
  }
};
</script>
