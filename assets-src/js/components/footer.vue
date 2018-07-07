<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  .row.site-info {
    margin-top: 10px;
  }

  .copyright {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    background-color: $theme-color;
    @include responsive('sm-max') {
      /*background-image: url(../../img/footer-overlay-mobile.png);*/
      /*background-size: cover;*/
      /*filter: contrast(25%) brightness(125%);*/
    }
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
        margin-right: .7rem;
      }
      .pull-left {
        margin-right: 20px;
      }
      .cert {
        float: left;
      }
    }
  }

  .dmca-badge {
    margin-top: .9rem;
    margin-left: 1rem;
    display: inline-block;
  }
</style>
<style lang="scss" module="">
  @import "../../sass/inc/inc";

  .site-footer-outer {
    p {
      @include font-size-with-line-height(0.87*$font-size-base);
    }

    @at-root .contact-info {
      background: rgba(0, 0, 0, 0) no-repeat no-repeat scroll center center;
      $icon-size: $line-height-computed*2;
      :global {
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
    }
  }

  .site-footer {
    padding-bottom: 20px;
    @include responsive('sm-max') {
      :global(.col) {
        flex-basis: 0;
        flex-grow: 1;
      }
    }
  }

  // region Panel
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

  .panel-outer {
    color: white;
  }

  .topList {
    > li > a {
      @extend %reset-link;
      display: inline-block;
      margin: {
        top: .45em;
        bottom: .45em;
      }
      @include font-size-with-line-height(0.9rem);
      @include responsive('sm-min') {
        @include font-size-with-line-height(1rem);
      }
    }
  }

  .next {
    composes: panel-outer;
    background-color: #5c5c5f;
  }

  // endregion

  .logo {
    width: 50%;
    margin: 0 25%;
  }

  .social-icon {
    flex: 0 0 60px;
    width: 60px;
    img {
      @extend %box-shadow-2;
      border-radius: 6px;
    }
  }

  .profile-list {
    @include responsive('sm-max') {
      width: 100%;
      flex-direction: column;
    }
    @include responsive('sm-min') {
      align-items: center !important;
      justify-content: space-between;
    }
  }

  .profile-item {
    @extend %reset-link;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    img {
      flex-basis: 35px;
      width: 35px;
      @extend %box-shadow-2;
      border-radius: 50%;
    }
    p {
      flex-grow: 1;
    }
    flex-direction: row;

    @include responsive('sm-max') {
      flex-direction: column;
      margin-top: 1.5rem;
      img {
        margin-bottom: .3rem;
      }
    }
    @include responsive('sm-min') {
      /*&:not(:last-child) {*/
      /*margin-right: 1.7rem;*/
      /*}*/
    }
  }

  .copyright {
    display: inline-block;

    text-align: center;
    @include font-size-with-line-height(0.77*$font-size-base);
    @include responsive('sm-max') {
      margin-top: $line-height-computed*0.7;
      font-style: italic;
    }
    @include responsive('sm-min') {
      @include font-size-with-line-height(1.1*$font-size-base);
      float: right;
      text-align: right;
      height: 49px;
      line-height: 49px;
    }

    &-title {
      @include font-size-with-line-height(1.05rem);
      @include responsive('sm-min') {
        @include font-size-with-line-height(1.54rem);
      }
    }
  }
</style>
<template lang="pug">
  footer(:class="$style.siteFooterOuter")
    div(v-dark-panel.overlay="")
      .container.pb-5.pt-1
        .row.site-info
          .col-12.col-md-8
            .row
              .col-sm-4
                footer-widget-panel(:title_="$t('aboutUs')")
                  ul(:class="$style.topList")
                    li(v-for="i in aboutLinks$[$i18n.locale]")
                      a(:href="i.url") > {{i.title}}
                  //contact-detail(v-if="$mq.desktop", style="margin-top: 2.5rem;padding-top: 2rem;border-top: 1px solid #ccc")
              .col-sm-4
                footer-widget-panel(:title_="$t('policy')")
                  ul(:class="$style.topList")
                    li(v-for="i in policyLinks$[$i18n.locale]")
                      a(:href="i.url") > {{i.title}}
              .col-sm-4
                footer-widget-panel(:title_="$t('cat')")
                  ul(:class="$style.topList")
                    li(v-for="cat in categories")
                      a(:href="cat.url") > {{cat.title}}
          .col-md-4(v-if="$mq.desktop")
            footer-widget-panel(style="text-align: center")
              .fb-page(:data-href="fanpage", data-small-header='false', data-adapt-container-width='true', data-hide-cover='false', data-show-facepile='true')
    div(:class="$style.next")
      .container(:class="$style.siteFooter")
        .row.site-info.gutter-30.d-flex.flex-wrap(style="margin-bottom: 20px;")
          .col.col-sm-5.pr-sm-5
            .mt-5
              img(:class="$style.logo", src="../../img/vaithuhay-dark-bg.svg")
            p.mt-5.text-justify {{about}}
            .mt-5.d-flex.justify-content-center
              a.px-3.d-inline-block(v-for="icon in SOCIAL_ICONS", :class="$style.socialIcon" :href="icon[1]" target="_blank")
                img.img-fluid(:src="icon[0]")
          .col.col-sm-7.d-flex.justify-content-center(style="flex-direction: column")
            .d-flex(:class="$style.profileList")
              div
                a(:class="$style.profileItem" target="_blank" href="https://www.google.com/maps/place/Vaithuhay/@10.8069623,106.635887,17z/data=!3m1!4b1!4m5!3m4!1s0x3175295b0841c3b1:0xe0131fddd4f59bfd!8m2!3d10.806957!4d106.638081")
                  img.mr-sm-3(src="../../img/footer-icon-01.svg")
                  p.mb-0 Số 26, Đường C12, Phường 13, Q.Tân Bình, TP.HCM
                a(:class="$style.profileItem", href="mailto:support@vaithuhay.com")
                  img.mr-sm-3(src="../../img/footer-icon-02.svg")
                  p.mb-0 Email: support@vaithuhay.com
              div
                a(:class="$style.profileItem", href="tel:+84938228865")
                  img.mr-sm-3(src="../../img/footer-icon-04.svg")
                  p.mb-0 <strong>0938.228.865</strong>
                a(:class="$style.profileItem")
                  img.mr-sm-3(src="../../img/footer-icon-03.svg")
                  p.mb-0 GIỜ LÀM VIỆC: <strong>8:00 A.M : 22:00 P.M</strong>
            .mt-4
              img(style="width: 100%", src="../../img/footer-icon-trust.svg")
    .copyright
      .container.clearfix
        .copyright-text
          p
            strong(:class="$style.copyrightTitle") {{$t('copyright1')}}
          br
          p.addr <i>{{$t('copyright2')}}</i>
        a.cert(href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=43886", target="_blank")
          img(src="../../img/dathongbao.png")
        a.dmca-badge(:href="`//www.dmca.com/Protection/Status.aspx?ID=6487aabe-fe28-4e39-8b1b-8764143a0aaa&refurl=${location}`", title='DMCA.com Protection Status')
          img(src='//images.dmca.com/Badges/dmca-badge-w150-5x1-03.png?ID=6487aabe-fe28-4e39-8b1b-8764143a0aaa', alt='DMCA.com Protection Status')
        span(:class="$style.copyright") @2017 Vaithuhay.com. All right reserved.

</template>
<script>
  import {mapGetters} from 'vuex';
  import {CATEGORIES_LIST_} from '../store/types';
  import ContactDetail from './footer__ContactDetail.vue';
  import FooterWidgetPanel from './footer__WidgetPanel';
  import Dropdown from 'my-vue-utils/dist/components/dropdown';
  import {DarkPanel} from "../plugins/directives";

  export default {
    components: {
      FooterWidgetPanel,
      ContactDetail
    },
    directives: {DarkPanel},
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
        SOCIAL_ICONS: [
          [require('../../img/facebook-icon.svg'), 'https://www.facebook.com/vaithuhayofficial'],
          [require('../../img/google-icon.svg'), 'https://plus.google.com/102534166977272914863'],
          [require('../../img/insta-icon.svg'), 'https://www.instagram.com/vaithuhay/'],
          [require('../../img/youtube-icon.svg'), 'https://www.youtube.com/channel/UC_3z0L6fVXkEruAoXjMEWqw']
        ],
        aboutLinks$: links.about,
        policyLinks$: links.policy,
        location: window.document.location
      };
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
    mounted() {
      // $.cachedScript('//images.dmca.com/Badges/DMCABadgeHelper.min.js')
    }
  };
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
