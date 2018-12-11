<style lang="scss" scoped>
@import "../../../sass/inc/inc";

.btn {
  color: $text-color;
  text-transform: uppercase;
  display: inline-block;
  width: 100%;
}

hr,
p {
  color: darken(white, 20%);
}
</style>
<style lang="scss" module>
@import "../../../sass/inc/inc";

.login-text {
  display: inline-block;
  text-transform: uppercase;
}

.login {
  width: 50%;
}
</style>
<template lang="pug">
  app-login-wrapper(ref="form", :customer="customer")
    .form-group
      h2.text-center(:class="$style.loginText") {{$t('login')}}
    .form-group
      input.form-control(name="customer[email]", v-model="customer.email", placeholder="Email", type="email")
    .form-group
      input.form-control(name="customer[password]", v-model="customer.password", placeholder="Password", type="password")
    .form-group.text-center
      button.btn.btn-dark(:class="$style.login", type="submit") {{$t('login')}}
    hr
    p Hoặc đăng nhập nhanh với tài khoản mạng xã hội
    .row
      .col-xs-6
        .btn.btn-fb(@click="facebookLogin")
          fa-icon(:icon="faFacebook")
          | facebook
      .col-xs-6
        .btn.btn-google
          fa-icon(:icon="faGoogle")
          | google
</template>
<script>
import { loginMixins } from "../mixins";

const $ = jQuery;

export default {
  mixins: [loginMixins]
};
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
