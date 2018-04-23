<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  a {
    @extend %reset-link;
  }

  img {
    width: 100%;
    @include responsive('sm-max') {
      width: auto;
      height: 100%;
    }
  }

  .index-slider-outer {
    position: relative;
    .Masthead{
      min-height: unset;
      @include responsive('xs-max'){
        height: 100vw*(4/5) !important;
      }
      @include responsive('sm-min'){
        height: 100vw*(638/1639) !important;
      }
    }
    .Masthead__image.is-parallax>img, .Masthead__image>img{
      height: unset;
    }
  }

  .slider- {
    &prev, &next {
      position: absolute;
      top: 50%;
      transform: translateY(-60px);
      cursor: pointer;
      /*z-index: 99998;*/

      .fa {
        color: white;
        font-size: 60px;
      }
    }
    &prev {
      left: 30px;
    }
    &next {
      right: 30px;
    }
  }

  .index-slider {
    /deep/ .slick-slide {
      a {
        position: relative;
      }
    }
    .fa {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -19.5px;
      margin-left: -25px;
      color: #aaa;
    }
    img {
      &.slick-loading + .fa {
        opacity: 1;
      }
      opacity: 1;
      transition: all $animation-time ease;
      &.slick-loading {
        opacity: 0;
      }
    }
  }

  @include responsive('sm-max') {
    .index-slider {
      /deep/ .slick-track {
        height: 100vw * 4/5;
      }
      /deep/ .slick-slide {
        > div, > div > a {
          height: 100%;
        }
      }
      img {
        width: auto;
        height: 100%;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  @keyframes myMove {
    0% {
      transform: scale(1.0, 1.0);
      opacity:1;
      /*transform-origin: 50% 50%;*/
    }
    99% {
      transform: scale(1.05, 1.05);
      opacity:1;
      /*transform-origin: 50% 0%;*/
    }
    100% {
      opacity: 0;
      transform: scale(1.0, 1.0);
    }
  }

  .ken-burns {
    /deep/ &.slick-slider {
      div.slick-active img {
        animation: myMove 5s 1 ease-in-out;
      }
    }
  }
</style>
<template lang="pug">
  section.index-slider-outer
    slick.index-slider(:options="options_")
      a(v-for='slide in images', :href="slide.url")
        //parallax(direction="down")
        img(v-if="$mq.desktop", :data-lazy="slide.image[$i18n.locale].thumbnails['1920w']")
        img(v-else-if="!$mq.phone", :data-lazy="slide.mobile[$i18n.locale].thumbnails['600w']")
        img(v-else, :data-lazy="slide.mobile[$i18n.locale].thumbnails['400w']")
        i.fa.fa-spinner.fa-pulse.fa-3x.fa-fw
    template(v-if="!$mq.tablet")
      .slider-prev(ref="prev")
        i.fa.fa-chevron-left
      .slider-next(ref="next")
        i.fa.fa-chevron-right
</template>
<script>
  import Slick from 'vue-slick'
  import 'slick-carousel/slick/slick.scss'
  import Parallax from 'vue-parallaxy'

  const $ = jQuery;

  export default {
    components: {Slick, Parallax},
    data() {
      const self = this,
        responsive = (breakpoint, settings) => ({breakpoint, settings});
      return {
        options_: {
          lazyLoad: 'ondemand',
          infinite: true,
          speed: 500,
          fade: true,
          prevArrow: '.index-slider-outer .slider-prev',
          nextArrow: '.index-slider-outer .slider-next',
          autoplay: true,
          autoplaySpeed: 3000,
          cssEase: 'ease-in-out',
//                    responsive: [
//                        responsive(426, {
//
//                        })
//                    ]
        },
        images_: window.vth.homepage.slider
      }
    },
    computed: {
      images() {
        return this.images_.filter(slide => true)
      }
    }
  }
</script>
