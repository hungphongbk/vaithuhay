<style lang="scss" module>
  @import "../../sass/inc/inc";

  .container {
    min-height: 100%;
  }

  .item {
    padding: .3rem 1.3rem;
    border-radius: .3rem;
    background: white;
    margin-bottom: .7rem;

    display: flex;
  }

  .info {
    flex-grow: 1;
    h5 {
      display: inline-block;
      text-transform: uppercase;
    }
    @at-root .default {
      margin-left: 2rem;
    }
  }
</style>
<template lang="pug">
  div(:class="$style.container")
    ul
      li(v-for="item in address", :class="$style.item")
        div(:class="$style.info")
          h5 {{item.first_name}} {{item.last_name}}
          span(v-if="item.default", :class="['text-success', $style.default]")
            fa-icon(:icon="faCheckCircle")
            | &nbsp;Địa chỉ mặc định
          p
            span.text-muted Địa chỉ:&nbsp;
            | {{item.fullAddress}}
          p
            span.text-muted Số điện thoại:&nbsp;
            | {{item.phone}}
</template>
<script lang="ts" src="./UserPanelPageAddresses.vue.ts"></script>
