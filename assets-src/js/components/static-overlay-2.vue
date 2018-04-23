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
    background-color: rgba(0, 0, 0, .85);
    @include responsive('sm-max') {
      position: fixed;
      top: 0;
      padding-top: $navbar-height*1.3 !important;
      background-color: #263238;
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
    .static-content(v-if="show")
      slot
</template>
<script>
  import {Event} from './index'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    props: {
      name_: {
        type: String,
        default: 'vth-fade'
      },
      enter_: {
        type: Function,
        default: () => () => {
        }
      },
      leave_: {
        type: Function,
        default: () => () => {
        }
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      async show() {
        return 'ahihi';
      },
      close() {

      },
      beforeEnter_() {
//                Event.$emit('overlay', true)
      },
      async beforeLeave_(el, done) {
        await this.leave_();
//                Event.$emit('overlay', false);
        done();
      }
    }
  }
</script>
