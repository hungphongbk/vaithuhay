<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .modal-backdrop {
    opacity: 0.5;
  }

  .modal-dialog {
    margin-top: $navbar-height+20px;
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-title {
    text-transform: uppercase;
    @include font-size-with-line-height($font-size-h4);
    font-weight: 700;
    display: inline-block;
  }
</style>
<template lang="pug">
  transition(:name="animate")
    div
      .modal-backdrop.show
      .modal(style="display:block", role="dialog")
        .modal-dialog(role="document", :class="size?`modal-${size}`:''")
          .modal-content
            template(v-if="title")
              .modal-header
                h5.modal-title {{title}}
                button.close(v-if="isDismissable", type="button", aria-label="Close", @click="$emit('dismiss')")
                  span(aria-hidden="true") ×
            slot
</template>
<script>
  export default {
    props: {
      title: String,
      animate: {
        type: String,
        default: 'vth-fade'
      },
      size: String,
      isDismissable: {
        type: Boolean,
        default: true
      }
    }
  };
</script>
