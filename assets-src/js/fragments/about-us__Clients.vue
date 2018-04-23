<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .headlines {
    padding-top: 2.7em;
    @include responsive('xs-max') {
      padding: {
        top: 0;
        bottom: 2.7em;
      }
    }
  }

  .vth-section {
    padding-bottom: 0 !important;
    margin-top: -30px;
    /deep/ .vth-section-title {
      margin-bottom: 0;
      @include font-size-with-line-height($font-size-h1*0.8)
    }
  }

  img {
    width: 70%;
    margin: 0 15%;
    height: auto;
    filter: grayscale(100%) opacity(50%);
    transition: filter $animation-time ease;
    &:hover {
      filter: unset;
    }
  }
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('title')", titleForeground="#fc0", background="#fff")
    .row.gutter-30
      .col-xs-6.col-sm-2(v-for="item in content")
        .ratio-1-1
          .content.flex-center
            a(:href="item.url")
              img(:src="item.image")
</template>
<script>
  import {IndexSection} from '../components/index'

  export default {
    components: {IndexSection},
    inject: ['section'],
    computed: {
      content() {
        return this.section.clients
      }
    }
  }
</script>
<i18n>
  {
  "en": {
  "title": "our clients",
  "reg": "LOVE VAITHUHAY? LET'S FIGHT IN!",
  "btnReg": "REGISTER NOW",
  "name": "First name & Last name",
  "phone": "Phone number",
  "wish": "What would you wish for?"
  },
  "vi": {
  "title": "các thương hiệu đang hợp tác",
  "reg": "ĐĂNG KÝ NHẬN TIN TUYỂN DỤNG",
  "btnReg": "ĐĂNG KÝ NGAY",
  "name": "Họ và tên",
  "phone": "Số điện thoại",
  "wish": "Bạn mong muốn điều gì từ chúng tôi?"
  }
  }
</i18n>
