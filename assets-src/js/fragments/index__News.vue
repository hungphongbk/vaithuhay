<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .homepage-news {
    margin: 0 -5px;
    @include responsive('sm-min') {
      margin: 0 -15px;
    }
  }

  a {
    @extend %reset-link;
  }

  .item {
    @extend %no-focus;
    padding: 0 5px;
    @include responsive('sm-min') {
      padding: 0 15px;
    }
    .title {
      $font: $font-size-h4;
      @include font-size-with-line-height($font*0.95);
      text-transform: uppercase;
      font-weight: 700;
      @include responsive('xs-max') {
        @include font-size-with-line-height($font*0.85)
      }
    }
  }

  .created {
    color: #555;
    font-size: .95em;
    .fa {
      margin-right: .3em;
    }
  }

  .see-more {
    @extend %reset-link;
    text-transform: uppercase;
    font-weight: 700;
    @include font-size-with-line-height($font-size-base*1.12);

    transition: all $animation-time ease;
    color: #666;
    &:hover {
      color: darken($theme-color-dark, 5%)
    }
    .fa {
      //font-size: $font-size-base*0.9;
      @include font-size-with-line-height($font-size-base*0.75);
      margin-left: .7rem;
    }
  }
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('0')", titleForeground="#fff", background="#bfbfbf")
    product-loop.homepage-news.pt(:slider-opts="slickOptions_", :list="articles")
      template(slot="item", slot-scope="p")
        .item
          thumbnail(ratio_="1-1", :overlay_="false", :url_="p.item.image", :lazy_="false")
          .ratio-6-5
            .content
              a(:href="p.item.url")
                h4.title {{p.item.title}}
              p(v-if="!$mq.tablet") {{p.item.excerpt}}
              a.see-more {{$t('seemore')}}
                i.fa.fa-chevron-right
    .text-center
      a(href="https://vaithuhay.com/blogs/news")
        .btn.btn-white KHÁM PHÁ THÊM
</template>
<script>
  import {IndexSection, ItemLoop} from '../components/index'

  export default {
    components: {IndexSection, ProductLoop: ItemLoop},
    data() {
      const self = this,
        responsive = (breakpoint, settings) => ({breakpoint, settings});
      return {
        articles: window.blog.map(article => {
          const obj = {
            ...article,
            diff: ''
          };
          (async () => {
            const moment = await import(/* webpackChunkName: "locale" */ '../plugins/moment');
            self.$set(obj, 'diff', moment.default(article.created, 'DD/MM/YYYY HH:mm:ss').fromNow())
          })();
          return obj;
        }),
        slickOptions_: {
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 2,
          responsive: [
            responsive(1111, {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: false,
            }),
            responsive(768, {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: false,
              arrow: false,
            }),
            responsive(426, {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              autoplay: true,
              autoplaySpeed: 3000
            })
          ]
        }
      }
    }
  }
</script>
<i18n>
  {
  "en": {
  "0": "top news",
  "seemore": "Learn more"
  },
  "vi": {
  "0": "tin tức",
  "seemore": "Đọc thêm"
  }
  }
</i18n>
