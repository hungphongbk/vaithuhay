<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .images /deep/ {
    .carousel-button {
      z-index: 999;
    }
    .nav-outer {
      padding: 8px;
      .nav {
        padding: 8px 0;
      }
      background-color: #222;
    }
  }

  .big img, .small img {
    width: 100%;
    height: auto;
    /*object-fit: cover;*/
  }

  .big {
    .vignette {
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.65) inset;
    }
  }

  .small {
    @extend %no-focus;
    transform: scale(1);
    .overlay {
      @extend %abs-full;
      background: rgba(#000, .55);
      opacity: 1;
    }

    .slick-center & {
      transform: scale(1.12);
      z-index: 99999;
      .dark {
        filter: brightness(1.2)
      }
    }

    .slick-center & {
      .overlay {
        opacity: 0;
      }
    }
  }

  // force images full height on fullscreen
  .product-images .static-content {
    height: calc(100% - 60px);
    background: lighten(#000, 7%);
    .container {
      width: 100% !important;
      &, .row, .col-md-10, .product-loop.images {
        height: 100%;
      }
    }
  }

  .static-content .product-loop.images {
    .vth-thumb {
      height: 80vh;
    }
    /deep/ .carousel-button .fa {
      color: darken(#fff, 5%)
    }
    /deep/ .nav-outer {
      display: none;
    }
  }

  // styling navigation button
  .product-loop.images /deep/ {
    .carousel-button {
      @include responsive('sm-max') {
        $size: 40px;
        height: $size;
        width: $size;
        opacity: .85;
        text-align: center !important;;

        background: lighten(black, 4%);
        border-radius: 50%;
        @include _(box-shadow-2);

        &-prev {
          left: $size/8;
          /*text-align: right !important;*/
          .fa {
            margin-right: .35rem;
          }
        }
        &-next {
          right: $size/8;
          /*text-align: left !important;*/
          .fa {
            margin-left: .35rem;
          }
        }
        .fa {
          font-size: $size;
          line-height: $size;
          opacity: 1;
          color: darken(white, 4%) !important;
          transform: scaleY(.7)
        }
      }
      @include responsive('md-min') {
        @include _(box-shadow-2);
        background: white;
        border-radius: 50%;
        height: 60px;
        width: 60px;
        margin-top: -30px;
        &-next .fa {
          margin-right: 25%
        }
        &-prev .fa {
          margin-left: 25%
        }
        .fa {
          line-height: 60px;
          font-size: 32px;
        }
      }
    }
  }
</style>
<template lang="pug">
  .product-images
    image-loop.images(ref="loop", :slider-opts="slick_", :list="images_", :labelIndicator_="labelIndicator_", :fullScreen_="fullScreen_", @full-screen="show_ = true")
      template(slot="item", slot-scope="p")
        .ratio-5-4.big(v-if="p.item.isVideo")
          .content(v-html="p.item.original")
        thumbnail.big.no-effect(v-else, :url_="p.item.original", :lazy_="false", :overlay_="false", ratio_="5-4")
          .content.vignette
      template(slot="thumb", slot-scope="p")
        .ratio-3-2.small
          .content
            img(:src="p.item.small")
            .overlay
    static-overlay(@click.self.native="show_ = false")
      .container
        .row
          .col-md-10.col-md-offset-1
            image-loop.images.pt(:slider-opts="slick_", :list="images_")
              template(slot="item", slot-scope="p")
                .ratio-4-3.big(v-if="p.item.isVideo")
                  .content(v-html="p.item.original")
                thumbnail.big.no-effect(v-else, :url_="p.item.original", :overlay_="false")
</template>
<script>
  import {ItemLoop}     from '../components/index';
  import {overlayMixin} from '../components/mixins';
  // import exposure from '../plugins/image-exposure'

  const $ = jQuery;

  export default {
    name: 'product-images',
    mixins: [overlayMixin],
    components: {ImageLoop: ItemLoop},
    // directives: {exposure},
    props: {
      images_: {
        type: Array,
        default: () => []
      },
      labelIndicator_: {
        type: Boolean,
        default: false
      },
      fullScreen_: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        slick_: {
          lazyLoad: 'progressive',
          infinite: true,
          speed: 300,
          fade: true,
          nav: true
        }
      };
    },
    methods: {
      goTo(img) {
        const index = this.images_.findIndex(item => item.small === img);
        this.$refs.loop.goTo(index);
      },
      reInit() {
        console.log('ahihi');
        this.$refs.loop.reInit();
      },
      exp(el, brightness) {
        if (brightness >= 70) $(el).addClass('light');
        else $(el).addClass('dark');
      }
    }
  };
</script>
