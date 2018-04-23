<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  p {
    @include font-size-with-line-height(0.87*$font-size-base);
  }

  .site-footer {
    padding-bottom: 20px;
  }

  #contact-info {
    background: rgba(0, 0, 0, 0) no-repeat no-repeat scroll center center;
    $icon-size: $line-height-computed*2;
    .fa {
      display: inline-block;
      height: $icon-size;
      width: $icon-size;
      line-height: $icon-size;
      text-align: center;
      border-radius: 50px;
      background-color: rgba(#000, .15);
      margin-right: 1em;
    }
    .btn {
      font-size: $font-size-base;
      margin-top: 3px;
    }
  }

  ul.list {
    li > a {
      @extend %reset-link;
      display: inline-block;
      margin: {
        top: .45em;
        bottom: .45em;
      }
    }
  }

  .row.site-info {
    margin-top: 10px;
  }

  .link-list {
    a {
      @include font-size-with-line-height(0.9*$font-size-base);
    }
  }

  .copyright {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    p {
      display: inline-block;
      max-width: 80%;
      text-align: center;
      @include font-size-with-line-height($font-size-base*0.95*0.85);
      margin-bottom: 5px;
      &.addr {
        @include font-size-with-line-height($font-size-base*0.8*0.85)
      }
    }
    .cert {
      float: unset;
      width: 130px;
      /*display: none;*/
      display: inline-block;
      img {
        width: 100%;
      }
    }
    @include responsive('md-min') {
      text-align: left;
      p {
        max-width: 100%;
      }
      &-text {
        float: left;
      }
      .pull-left {
        margin-right: 20px;
      }
      .cert {
        float: left;
      }
    }
  }
  .dmca-badge{
    margin-top: .9rem;
    margin-left: 1rem;
    display: inline-block;
  }
</style>
<style lang="scss" module="">
  @import "../../sass/inc/inc";

  .footerWidgetPanel {
    margin: 24px 0;
  }

  h3.footerWidgetPanel {
    @include font-size-with-line-height($font-size-h3*0.86);
    font-weight: 700;
  }

  .payments :global {
    ul {
      display: inline-block;
    }
    li {
      display: block;
      float: left;
      margin: 4px 6px;
      &:nth-child(4) {
        clear: left;
      }
    }
  }
</style>
<template lang="pug">
  footer
    .container
      .row.site-info.gutter-30(style="margin-bottom: 20px;")
        .col-sm-5
          footer-widget-panel(:title_="$t('contactInfo')", :class="{'text-center': $mq.phone}")
            a(href="tel:0938228865", target="_top")
              span.btn.btn-theme(style="margin-bottom: 1em") {{$t('call')}}
            #contact-info.text-left(:style="{'background-image': 'url('+map_img_+')'}")
              p {{about}}
              p
                i.fa.fa-map-marker.fa-lg
                | {{address}}
              p
                i.fa.fa-phone.fa-lg
                | {{hotline}}
              p
                i.fa.fa-envelope-o.fa-lg
                | {{email}}
        .col-sm-7
          .row.gutter-30
            .col-md-6
              footer-widget-panel(style="text-align: center")
                .fb-page(:data-href="fanpage", data-small-header='false', data-adapt-container-width='true', data-hide-cover='false', data-show-facepile='true')
            .col-md-6
              footer-widget-panel.text-center(:title_="$t('paymentMethod')", :class="$style.payments")
                ul
                  li(v-for="p in payments")
                    img(style="width:54px", :src="p")
    div(style="background-color: #ececec")
      .site-footer.container
        .row.site-info.link-list
          .col-sm-4.col-md-3(v-if="!$mq.phone")
            footer-widget-panel(:title_="$t('aboutUs')")
              ul.list
                li(v-for="i in aboutLinks$[$i18n.locale]")
                  a(:href="i.url") {{i.title}}
              contact-detail(v-if="tabletOnly", style="margin-top: 2.5rem;padding-top: 2rem;border-top: 1px solid #ccc")
          .col-sm-4.col-md-3(v-if="!$mq.phone")
            footer-widget-panel(:title_="$t('policy')")
              ul.list
                li(v-for="i in policyLinks$[$i18n.locale]")
                  a(:href="i.url") {{i.title}}
          .col-sm-4.col-md-3(v-if="!$mq.phone")
            footer-widget-panel(:title_="$t('cat')")
              ul.list
                li(v-for="cat in categories")
                  a(:href="cat.url") {{cat.title}}
          .col-sm-4.col-md-3(v-if="!tabletOnly")
            footer-widget-panel
              contact-detail
    .copyright
      .container.clearfix
        .copyright-text
          p
            strong {{$t('copyright1')}}
          br
          p.addr {{$t('copyright2')}}
        //a.cert(href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=39330", target="_blank")
          img(src="../../img/dathongbao.png")
        a.dmca-badge(:href="`//www.dmca.com/Protection/Status.aspx?ID=6487aabe-fe28-4e39-8b1b-8764143a0aaa&refurl=${location}`", title='DMCA.com Protection Status')
          img(src='//images.dmca.com/Badges/dmca-badge-w150-5x1-03.png?ID=6487aabe-fe28-4e39-8b1b-8764143a0aaa', alt='DMCA.com Protection Status')

</template>
<script>
  import {mapGetters} from 'vuex'
  import {CATEGORIES_LIST_} from '../store/types'
  import ContactDetail from './footer__ContactDetail.vue'
  const $ = jQuery;

  export default {
    components: {
      'footer-widget-panel': {
        render(createElement) {
          const children = this.$slots.default,
            parentStyle = this.$parent.$style;
          if (this.title_)
            children.unshift(createElement('h3', {class: parentStyle.footerWidgetPanel}, this.title_.toUpperCase()));
          return createElement('div', {class: parentStyle.footerWidgetPanel}, children);
        },
        props: {
          title_: String
        }
      },
      ContactDetail
    },
    data() {
      const {about, address, hotline, email, links} = vth.footer;
      return {
        about, address, hotline, email,
        fanpage: vth.homepage.fanpage,
        map_img_: require('../../img/map.png'),
        payments: [
          require('../../img/ic-visa.svg'),
          require('../../img/ic-mastercard.svg'),
          require('../../img/ic-jcb.svg'),
          require('../../img/ic-cash.svg'),
          require('../../img/ic-internet-banking.svg'),
          require('../../img/PayPal2007.svg?size=54')
        ],
        aboutLinks$: links.about,
        policyLinks$: links.policy,
        location: window.document.location
      }
    },
    computed: {
      ...mapGetters({
        categories: CATEGORIES_LIST_
      }),
      tabletOnly() {
        const {$mq} = this;
        return $mq.tablet && !$mq.phone;
      }
    },
    mounted(){
      // $.cachedScript('//images.dmca.com/Badges/DMCABadgeHelper.min.js')
    }
  }
</script>
<i18n>
  {
    "en": {
      "contactInfo": "Contact Info",
      "paymentMethod": "payment methods",
      "call": "CALL TO SHOP NOW",
      "aboutUs": "About us",
      "policy": "Our policy",
      "cat": "Categories",
      "copyright1": "Copyright © 2017 Vaithuhay CO., LTD",
      "copyright2": "No.26 C12 Street, Ward 13, Tan Binh District, Ho Chi Minh City. Business Registration Certificate No.0314272371, issued on 03/08/2017 by HCMC Department of Planning and Investment."
    },
    "vi": {
      "contactInfo": "Thông tin liên hệ",
      "paymentMethod": "phương thức thanh toán",
      "call": "GỌI ĐIỆN NGAY",
      "aboutUs": "Về chúng tôi",
      "policy": "Các chính sách",
      "cat": "Danh mục sản phẩm",
      "copyright1": "© 2018 - Bản quyền của Công ty cổ phần thương mại & công nghệ Newideas",
      "copyright2": "Số 26 Đường C12, Phường 13, Quận Tân Bình, TP.HCM. GPKD số 0314953719 do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 28/03/2018."
    }
  }
</i18n>
