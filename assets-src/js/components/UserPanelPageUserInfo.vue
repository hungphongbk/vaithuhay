<style lang="scss" module>
@import "../../sass/inc/inc";

.container {
  background: white;
  padding: 1.3rem {
    top: 2rem;
  }
  height: 100%;
  :global {
    .col-form-label {
      text-align: left;
    }
    .form-control {
      border: 1px solid #ccc {
        radius: 0.4rem;
      }
    }
  }
}
</style>
<template lang="pug">
  div(:class="$style.container")
    flash-message-hub(label="user/information")
    form
      .form-group.row
        label.col-form-label.col-sm-3 Họ và tên
        .col-sm-9
          input.form-control(type="text", v-model="name")
      .form-group.row
        label.col-form-label.col-sm-3 Giới tính
        .col-sm-9
          label.radio-inline
            input#gender-male(type="radio" value="1" v-model="gender")
            | Nam
          label.radio-inline
            input#gender-female(type="radio" value="2" v-model="gender")
            | Nữ
      .form-group.row
        label.col-form-label.col-sm-3 Địa chỉ
        .col-sm-9
          span Truy cập&nbsp;
            a(href="#", @click="goToPageAddress") Danh sách địa chỉ
      .form-group.row
        label.col-form-label.col-sm-3 E-mail
        .col-sm-9
          input.form-control(type="text" disabled :value="email")
          //.mt-2
            a(href="#") Thay đổi E-mail
      .form-group.row
        label.col-form-label.col-sm-3 Ngày sinh
        .col-sm-9
          date-time-picker(v-model="birthday")
      .form-group.row
        .col-sm-9.col-sm-offset-3
          btn.btn-theme(@click="update", :icon="faSave") CẬP NHẬT
</template>
<script lang="ts" src="./UserPanelPageUserInfo.vue.ts"></script>
