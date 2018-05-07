<style lang="scss" module>
  @import "../../sass/inc/inc";
  .container {
    background: white;
    padding: 1.3rem {
      top: 2rem;
    }
    height: 100%;
    :global {
      .control-label{
        text-align: left;
      }
      .form-control{
        border: 1px solid #ccc {
          radius: .4rem;
        }
      }
    }
  }
</style>
<template lang="pug">
  div(:class="$style.container")
    flash-message-hub(label="user/information")
    form.form-horizontal
      .form-group
        label.control-label.col-sm-3 Họ và tên
        .col-sm-9
          input.form-control(type="text", v-model="name")
      .form-group
        .col-sm-9.col-sm-offset-3
          .btn.btn-theme(@click="update") CẬP NHẬT
</template>
<script lang="ts" src="./UserPanelPageUserInfo.vue.ts"></script>
