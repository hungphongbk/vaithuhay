<style lang="scss" module>
@import "../../sass/inc/inc";

.tab-pane {
  composes: tab-pane from global;
  padding: 10px 0;
  @include responsive("sm-min") {
    padding: 30px 0;
  }
  img {
    width: 100%;
  }
}
</style>
<template lang="pug">
  .fade(:class="{ [$style.tabPane]:true, 'in active':active_}")
    slot
</template>
<script>
export default {
  props: {
    title: String,
    badge: Number
  },
  inject: ["tabs_"],
  data() {
    return {
      hash: -1
    };
  },
  computed: {
    active_() {
      return this.hash === this.tabs_.active_;
    }
  },
  mounted() {
    this.$parent.add_(this);
  }
};
</script>
