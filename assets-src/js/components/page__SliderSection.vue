<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  a {
    @extend %reset-link;
  }

  img {
    width: 100%;
  }

  .index-slider-outer {
    position: relative;
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

  @include responsive('xs-max') {
    .index-slider {
      /deep/ .slick-track {
        height: 270px;
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
</style>
<template lang="pug">
  section.index-slider-outer
    slick.index-slider(:options="options_")
      a.ratio-5-2(v-for='slide in slides', href="#")
        .content
          img(:src="slide.image[$i18n.locale]")
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

  const $ = jQuery;

  export default {
    components: {Slick},
    props: {
      slides: {
        type: Array,
        required: true
      }
    },
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
          responsive: [
            responsive(426, {
              autoplay: true,
              autoplaySpeed: 3000
            })
          ]
        }
      }
    }
  }
</script>
