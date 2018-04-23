<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  $button-size: 70px;
  .product-loop {
    margin-bottom: 20px;
    /deep/ .slick-dots {

    }
    &.pt /deep/ {
      .slick-list {
        padding-top: 20px;
      }
    }
  }

  .nav {
    overflow: hidden;
  }

  .main-outer {
    position: relative;
    margin-bottom: -3px;
    .pt & {
      .carousel-button- {
        &prev {
          left: -$button-size;
        }
        &next {
          right: -$button-size;
        }
      }
    }
  }

  .main {
    overflow: hidden;
  }
</style>
<style lang="scss">
  @import "../../sass/inc/inc";

  $button-size: 70px;
  .carousel-button- {
    /*<!--$icon-margin: $button-size/4;-->*/
    $icon-margin: 0;

    &prev, &next {
      position: absolute;
      top: 50%;
      width: $button-size;
      height: $button-size;
      margin-top: -$button-size/2;
      z-index: 10;
      cursor: pointer;
      opacity: .65;

      /*border-radius: 50%;*/
      /*background-color: rgba(255, 255, 255, 0.9);*/

      .fa {
        font-size: $button-size*0.85;
        line-height: $button-size;
        color: #333;
        opacity: .35;

        transition: opacity $animation-time ease;
      }
      &:hover .fa {
        opacity: 1;
      }
    }
    &prev {
      left: $button-size/2;
      text-align: left;
    }
    &next {
      right: $button-size/2;
      text-align: right;
    }
  }
</style>
<style lang="scss" module>
  @import "../../sass/inc/inc";

  %cls {
    background-color: white;
    color: #555;
    border-radius: 6px;
    padding: $line-height-computed*0.7 $grid-gutter-width;

    position: absolute;

    display: inline-block;
    z-index: 999;
    opacity: .95;
    @extend %box-shadow-1;
  }

  .fullScreen {
    @extend %cls;
    cursor: pointer;
    top: 20px;
    right: 20px;
  }

  .indicator {
    @extend %cls;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
<script>
  import {Carousel, Slide} from 'vue-carousel'

  export default {
    components: {Carousel, Slide},
    render(h) {
      const {opts, list} = this;
      return (<div class="product-loop">
        <Carousel {...opts}>
          {list.map(item =>
            (<Slide key={item.id}>{[this.$scopedSlots.item({
              item
            })]}</Slide>)
          )}
        </Carousel>
      </div>)
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      sliderOpts: Object,
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
    },
    computed: {
      opts() {
        const attrs = {},
          {sliderOpts} = this;
        if (sliderOpts.slidesToShow)
          attrs.perPage = sliderOpts.slidesToShow;
        if (sliderOpts.responsive) {
          const {responsive} = sliderOpts,
            {0: desktop, [responsive.length - 1]: mobile} = responsive;

          attrs.perPageCustom = [
            [desktop.breakpoint, attrs.perPage]
          ];
          for (let i = 1; i < responsive.length - 1; i++) {
            attrs.perPageCustom.push([
              responsive[i].breakpoint,
              responsive[i - 1].settings.slidesToShow
            ])
          }
          attrs.perPage = mobile.slidesToShow;
        }
        attrs.paginationEnabled = false;

        return {attrs};
      }
    },
    methods: {}
  }
</script>
