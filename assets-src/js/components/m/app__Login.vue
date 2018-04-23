<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  h2 {
    display: inline-block;
    text-transform: uppercase;
  }

  .btn {
    color: $text-color;
    text-transform: uppercase;
    display: inline-block;
    width: 100%;
  }

  hr, p {
    color: darken(white, 20%);
  }

  .login {
    width: 50%;
  }
</style>
<template lang="pug">
  app-login-wrapper(ref="form", :customer="customer")
    .form-group
      h2.text-center {{$t('login')}}
    .form-group
      input.form-control(name="customer[email]", v-model="customer.email", placeholder="Email", type="email")
    .form-group
      input.form-control(name="customer[password]", v-model="customer.password", placeholder="Password", type="password")
    .form-group.text-center
      button.btn.btn-dark.login(type="submit") {{$t('login')}}
    hr
    p Hoặc đăng nhập nhanh với tài khoản mạng xã hội
    .row
      .col-xs-6
        .btn.btn-fb(@click="facebookLogin")
          i.fa.fa-facebook
          | facebook
      .col-xs-6
        .btn.btn-google
          i.fa.fa-google
          | google
</template>
<script>
  import {loginMixins} from '../mixins'

  const $ = jQuery;

  export default {
    mixins: [loginMixins]
  }
</script>
<i18n>
  {
    "en": {
      "login": "login"
    },
    "vi": {
      "login": "đăng nhập"
    }
  }
</i18n>
