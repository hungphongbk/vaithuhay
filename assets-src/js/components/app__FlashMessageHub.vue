<style lang="scss" module>
  .flash-message-hub {

  }
</style>
<template lang="pug">
  div(:class="$style.flashMessageHub")
    .alert(v-for="(item,index) in messages", :key="item.id", :class="`alert-${item.context}`", role="alert")
      button.close(type="button", aria-label="Close", @click="remove(index)")
        span(aria-hidden="true") &times;
      | {{item.message}}
</template>
<script>
  import {FLASH_ACTION_POP_MESSAGE} from "@/store/types";

  export default {
    name: "FlashMessageHub",
    props: {
      label: String | Array
    },
    data: () => ({
      messages: []
    }),
    methods: {
      remove(index) {
        this.messages.splice(index, 1);
      }
    },
    async mounted() {
      let promise;
      if (typeof this.label === 'string')
        promise = this.$store.dispatch(FLASH_ACTION_POP_MESSAGE, this.label);
      else promise = Promise.all(this.label.map(l =>
        promise = this.$store.dispatch(FLASH_ACTION_POP_MESSAGE, l)));
      this.messages = await promise;
    },
    async beforeDestroy() {
      this.messages = [];
    }
  };
</script>
