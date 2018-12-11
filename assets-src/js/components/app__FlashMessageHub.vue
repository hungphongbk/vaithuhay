<style lang="scss" module>
@import "../../sass/inc/inc";

.flash-message-hub {
  @at-root .item {
    padding: {
      top: 10px;
      bottom: 12px;
    }
  }
  .content {
    margin-left: 0.7rem;
    @include font-size-with-line-height($font-size-base * 0.9);
  }
}
</style>
<template lang="pug">
  div(:class="$style.flashMessageHub")
    .alert(v-for="(item,index) in messages", :key="item.id", :class="[`alert-${item.context}`, $style.item]", role="alert")
      button.close(type="button", aria-label="Close", @click="remove(index)")
        span(aria-hidden="true") &times;
      fa-icon(:class="$style.icon", :icon="icon(item.context)")
      span(:class="$style.content") {{item.message}}
</template>
<script>
import {
  FLASH_ACTION_POP_MESSAGE,
  FLASH_CONTEXT_ALERT,
  FLASH_CONTEXT_ERROR,
  FLASH_CONTEXT_SUCCESS,
  FLASH_MUTATION_PUSH_MESSAGE
} from "@/store/types";
import faCheckCircle from "@fortawesome/fontawesome-free-solid/faCheckCircle";
import faExclamationTriangle from "@fortawesome/fontawesome-free-solid/faExclamationTriangle";
import faExclamationCircle from "@fortawesome/fontawesome-free-solid/faExclamationCircle";

export default {
  name: "FlashMessageHub",
  props: {
    label: String | Array
  },
  data: () => ({
    messages: []
  }),
  methods: {
    icon(context) {
      return {
        [FLASH_CONTEXT_SUCCESS]: faCheckCircle,
        [FLASH_CONTEXT_ALERT]: faExclamationTriangle,
        [FLASH_CONTEXT_ERROR]: faExclamationCircle
      }[context];
    },
    remove(index) {
      this.messages.splice(index, 1);
    },
    async fetch() {
      let promise;
      if (typeof this.label === "string")
        promise = this.$vthStore.dispatch(FLASH_ACTION_POP_MESSAGE, this.label);
      else
        promise = Promise.all(
          this.label.map(
            l =>
              (promise = this.$vthStore.dispatch(FLASH_ACTION_POP_MESSAGE, l))
          )
        );
      this.messages = await promise;
      console.log(`fetch ${this.messages.length} messages`);
    }
  },
  async mounted() {
    await this.fetch();
    this.$vthStore.subscribe(async mutation => {
      if (mutation.type === FLASH_MUTATION_PUSH_MESSAGE) {
        await this.fetch();
      }
    });
  },
  async beforeDestroy() {
    this.messages = [];
  }
};
</script>
