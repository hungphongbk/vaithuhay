<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .btn {
    will-change: width;
  }

  .icon-fade- {
    &enter-active, &leave-active {
      transition: all $animation-time ease;
    }
    &enter, &leave-to {
      opacity: 0;
      max-width: 0;
    }
    &enter-to, &leave {
      opacity: 1;
      max-width: 40px;
    }
  }
</style>
<template lang="pug">
  .btn(@click="doFn")
    transition(name="icon-fade")
      i.fa(v-if="iconCls", :class="iconCls")
    slot
</template>
<script>
  import {delay} from "./helpers"

  export default {
    props: {
      fn: {
        type: Function,
        required: true
      },
      successDelay: {
        type: Number,
        default: 500
      },
      icon: String
    },
    data() {
      return {
        state: 'default'
      }
    },
    computed: {
      iconCls() {
        switch (this.state) {
          case 'default':
            return this.icon;
          case 'ing':
            return 'fa-spin fa-spinner';
          case 'ed':
            return 'fa-check'
        }

      }
    },
    methods: {
      async doFn() {
        const {fn, successDelay} = this;
        this.state = 'ing';
        await fn();
        this.state = 'ed';
        await delay(successDelay);
        this.state = 'default';
      }
    }
  }
</script>
