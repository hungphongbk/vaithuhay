<style lang="scss">
</style>
<template lang="pug">
  form(@submit.prevent="onSubmit", ref="form", method="post", action="/account/login")
    slot(:customer="customer")
</template>
<script>
  import {USER_IS_LOGGING_IN_, USER_LOGIN_, USER_LOGIN_FORM_SHOW_} from "../store/types";
  import {delay} from "./helpers";

  export default {
    props: {
      customer: {
        type: Object,
        required: true
      }
    },
    methods: {
      async onSubmit() {
        // console.log('submit login form')
        this.$vthStore.commit(USER_IS_LOGGING_IN_);
        await this.$vthStore.dispatch(USER_LOGIN_, this.$refs.form);
        await delay(100);
        this.$vthStore.commit(USER_LOGIN_FORM_SHOW_, false);
      },
      async login(email, password) {
        // console.log(`login via social, get username=${email}`);
        this.customer.email = email;
        this.customer.password = password;
        this.$nextTick(() => {
          this.onSubmit();
        });
      }
    }
  };
</script>
