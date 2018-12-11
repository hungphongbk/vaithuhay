<style lang="scss" scoped>
@import "../../sass/inc/inc";

.static-content {
  position: fixed;
  top: $navbar-height;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100000;
  padding-top: 40px;
  font-size: $font-size-base;
  color: white;
  background-color: rgba(0, 0, 0, 0.85);
  will-change: transform;
  @include responsive("md-max") {
    position: fixed;
    top: 0;
    padding-top: $navbar-height * 1.3 !important;
    background-color: #263238eb;
    /deep/ .container {
      padding: {
        left: 20px;
        right: 20px;
      }
    }
  }
}
</style>
<template lang="pug">
  transition(:name="name_", @before-enter="beforeEnter_", @after-enter="enter_")
    .static-content(v-if="overlay.show_")
      slot
</template>
<script>
export default {
  inject: ["overlay"],
  props: {
    name_: {
      type: String,
      default: "vth-fade"
    },
    enter_: {
      type: Function,
      default: () => () => {}
    },
    leave_: {
      type: Function,
      default: () => () => {}
    }
  },
  methods: {
    beforeEnter_() {
      //                Event.$emit('overlay', true)
    },
    async beforeLeave_(el, done) {
      await this.leave_();
      //                Event.$emit('overlay', false);
      done();
    }
  }
};
</script>
