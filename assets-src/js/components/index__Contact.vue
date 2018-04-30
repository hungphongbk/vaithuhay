<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  .vth-contact {
    margin: {
      top: 40px;
      bottom: 20px;
    }
    border: 6px solid #bfbfbf;
    padding: 40px 20px 20px 20px;
    font-size: $font-size-base;
    @include responsive('sm-min') {
      border-width: 10px;
      padding: 40px 40px 20px 40px;
      font-size: $font-size-base*1.3;
    }
    background: {
      image: url(../../img/12194.png);
      size: cover;
    }
  }

  .description {
    text-align: center;
    @include responsive('xs-max') {
      margin-bottom: $line-height-computed;
    }
  }

  .contact-form {
    @include responsive('sm-min') {
      width: 60%;
      margin: 32px (100% - 60%)/2;
      font-size: $font-size-base*1.6;
    }
    .form-group {
      @include _(clearfix);
    }
    .control-label {
      float: left;
      width: 60px;
      text-align: left;
      @include responsive('xs-max') {
        line-height: 34px;
      }
    }
    #email {
      margin-left: 60px;
      width: calc(100% - 60px);
      border-bottom: 1px solid #333;
      background-color: transparent;
    }
    @include responsive('sm-min') {
      .control-label {
        width: 120px;
      }
      #email {
        margin-left: 120px;
        width: calc(100% - 120px);
      }
    }
    .btn {
      display: inline-block;
    }
    .register {
      padding-top: 24px;
      span {
        font-size: .8em;
        vertical-align: middle;
        line-height: 34px;
        display: inline-block;
        margin: 0 .7em;
      }
    }
  }
</style>
<template lang="pug">
  div
    .vth-contact
      .description
        | Bị hấp dẫn bởi những sản phẩm sáng tạo?
        br
        | Đăng ký nhận thư để không bỏ lỡ bất kì sản phẩm nào tại Vaithuhay.com!
      form.form-horizontal.contact-form(@submit.prevent="submit")
        input(name="form_type", type="hidden", value="contact")
        input(name="utf8", type="hidden", value="✓")
        .form-group
          label.control-label(for="email")= 'Email:'
          input.form-control#email(type="text", name="EMAIL")
        .form-group.text-center.register
          button.btn.btn-theme.submit(type="submit") {{$t('register')}}
          template(v-if="like_")
            span {{$t('or')}}
            a.btn.btn-fb(target="_blank", :href="fanpage") LIKE FANPAGE VAITHUHAY.COM
        .form-group
          p.text-success(v-if="status") {{status}}
</template>
<script>
  const $ = jQuery;
  export default {
    props: {
      like_: {
        type: Boolean,
        default: false
      },
      popupInMobile_: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fanpage: vth.homepage.fanpage,
        contactLink: 'https://vaithuhay.us17.list-manage.com/subscribe/post-json?u=a8c643e31c4f6fe8d2d5ec949&amp;id=ae079e8ffd&c=?',
        form: {
          contact: {}
        },
        status: null
      };
    },
    methods: {
      async submit({target}) {
        const {result} = await $.ajax({
          type: 'POST',
          url: this.contactLink,
          data: $(target).serialize(),
          dataType: 'jsonp'
        });
        if (result === 'success') {
          this.status = this.$t('thank');
        }
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "register": "REGISTER NOW",
      "or": "or",
      "thank": "Thank you for subscribing vaithuhay!"
    },
    "vi": {
      "register": "ĐĂNG KÍ NGAY",
      "or": "hoặc",
      "thank": "Cám ơn bạn đã theo dõi vài thứ hay nhé!"
    }
  }
</i18n>
