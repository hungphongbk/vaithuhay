<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .tab-pane {
    padding: 10px 0;
    @include responsive('sm-min') {
      padding: 30px 0;
    }
    /deep/ {
      img {
        width: 100%;
      }
    }
  }
</style>
<template lang="pug">
  div.tab-pane.fade(:class="{'in active':active_}")
    slot
</template>
<script>
  export default {
    props: {
      title: String,
      badge: Number
    },
    inject: ['tabs_'],
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
