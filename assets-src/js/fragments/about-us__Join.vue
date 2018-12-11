<style lang="scss" scoped>
@import "../../sass/inc/inc";

.headlines {
  padding-top: 2.7em;
  @include responsive("xs-max") {
    padding: {
      top: 0;
      bottom: 2.7em;
    }
  }
}

.recruitment {
  padding: 20px;
  background-color: darken(#fff, 0%);
  h3 {
    font-weight: 700;
    color: #666;
    margin-top: 0;
  }
  label {
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  input,
  textarea {
    background-color: transparent;
  }
}

%h2 {
  @include font-size-with-line-height($font-size-h2);
}

.agency- {
  &selector {
    text-align: center;
    /deep/ .fa {
      @extend %h2;
    }
  }
  &current {
    display: inline-block;
    @extend %h2;
  }
  &title {
  }
}

.sp {
  margin-right: 2rem;
}

.agencies /deep/ .vth-section-title {
  margin-bottom: 1rem;
}

.vth-section.join {
  position: relative;
  overflow: hidden;
  @include responsive("sm-min") {
    &:before,
    &:after {
      position: absolute;
      content: "";
      visibility: visible;
      height: 1vw;
      width: 1vw;
      margin: -0.5vw;
      transform-origin: center center;
      top: 0;
      background-image: url(../../img/rhombus.svg);
      background-size: cover;
      transform: scale(200, 20);
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
  }
  /deep/ .vth-section-title {
    margin-top: 120px;
  }
}
</style>
<template lang="pug">
  div
    index-section.join.vth-post-carousel#tham-gia(:title="$t('title')", titleForeground="#fff", background="#fc0", background-image="pattern2")
      .row.gutter-30
        .col-sm-6.headlines {{content}}
        .col-sm-6
          form.recruitment(@submit.prevent="register")
            h3 {{$t('reg')}}
            .form-group
              label
                input.form-control(type="text", name="name", v-model="name", :placeholder="$t('name')")
                //p.text-danger(v-if="errors.has('name')") {{errors.first('name')}}
            .form-group.row
              .col-sm-5
                label
                  input.form-control(type="text", v-model="phone", :placeholder="$t('phone')")
              .col-sm-7
                label
                  input.form-control(type="text", v-model="email", placeholder="Email")
            .form-group
              label
                textarea.form-control(rows="5", :placeholder="$t('wish')", v-model="wish")
            .form-group
              button.btn.btn-default(type="submit") {{$t('btnReg')}}
            .form-group
              .text-success(v-if="status") {{status}}
    index-section.vth-post-carousel.agencies#cua-hang(:title="$t('title2')", titleForeground="#fc0", background="#fff")
      overlay-selector.agency-selector(:list="agencies", v-model="currentAgency")
        template(slot="current")
          h2.agency-current {{currentAgency.title[$i18n.locale]}}
        template(slot="item", slot-scope="p")
          h2.agency-title {{p.item.title[$i18n.locale]}}
      div(style="margin: 0 10%")
        .row.gutter-30
          .col-sm-6
            img(v-if="currentAgency.image.thumbnails", style="width: 100%", :src="currentAgency.image.thumbnails['600w']")
          .col-sm-6
            div(style="height: 6rem")
            p {{currentAgency.products[$i18n.locale]}}
            br
            p
              i.fa.fa-location-arrow.sp
              | {{currentAgency.address[$i18n.locale]}}
            p
              i.fa.fa-phone.sp
              | {{currentAgency.phone}}
            p
              i.fa.fa-envelope.sp
              | {{currentAgency.email}}
</template>
<script>
import { IndexSection, OverlaySelector } from "../components";

const $ = jQuery;

export default {
  components: { IndexSection, OverlaySelector },
  inject: ["section"],
  data() {
    return {
      version: 1.0,
      currentAgencyIndex: 0,
      name: "",
      phone: "",
      email: "",
      wish: "",
      status: null
    };
  },
  computed: {
    content() {
      return this.section.join[this.$i18n.locale];
    },
    agencies() {
      return this.section.agencies;
    },
    currentAgency: {
      get() {
        return this.agencies[this.currentAgencyIndex];
      },
      set(value) {
        console.log(value);
        this.currentAgencyIndex = this.agencies.findIndex(a => a === value);
      }
    }
  },
  methods: {
    async register() {
      const { name: NAME, phone: PHONE, email: EMAIL, wish: WISH } = this;
      const { result } = await $.ajax({
        type: "POST",
        url:
          "https://vaithuhay.us17.list-manage.com/subscribe/post-json?u=a8c643e31c4f6fe8d2d5ec949&amp;id=a42593d5e8&c=?",
        data: $.param({
          NAME,
          PHONE,
          EMAIL,
          WISH
        }),
        dataType: "jsonp"
      });
      if (result === "success") this.status = this.$t("thank");
    }
  }
};
</script>
<i18n>
  {
    "en": {
      "title": "join with us",
      "title2": "agencies",
      "reg": "LOVE VAITHUHAY? LET'S FIGHT IN!",
      "btnReg": "REGISTER NOW",
      "name": "First name & Last name",
      "phone": "Phone number",
      "wish": "What would you wish for?",
      "thank": "Thank you for receiving the recruitment information from us. Welcome to Vaithuhay, we will contact you as soon as possible."
    },
    "vi": {
      "title": "tham gia cùng chúng tôi",
      "title2": "cửa hàng liên kết",
      "reg": "ĐĂNG KÝ NHẬN TIN TUYỂN DỤNG",
      "btnReg": "ĐĂNG KÝ NGAY",
      "name": "Họ và tên",
      "phone": "Số điện thoại",
      "wish": "Bạn mong muốn điều gì từ chúng tôi?",
      "thank": "Cám ơn bạn đã nhận tin tuyển dụng từ chúng tôi. Chào mừng bạn đến với ngôi nhà Vaithuhay, chúng tôi sẽ liên hệ sớm nhất ngay cho bạn."
    }
  }
</i18n>
