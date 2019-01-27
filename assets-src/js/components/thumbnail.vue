<style lang="scss" module>
@import "../../sass/inc/inc";

$thumb-size: 60px;
.thumbnail {
  composes: vth-thumb thumb from global;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    will-change: transform;
    transition: transform $animation-time ease-in;
    transform: scale(1);
  }
  &:not(:global(.no-effect)):hover img {
    transform: scale(1.12);
  }
}

.overlay {
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @extend %abs-full;
  transition: opacity $animation-time ease-in;
  opacity: 0;
}

.thumb-items {
  display: inherit;
  > span {
    color: white;
    background-color: rgba(255, 255, 255, 0.31);
    font-size: $thumb-size/2.4;
    width: $thumb-size;
    height: $thumb-size;
    line-height: $thumb-size;
    border-radius: 50%;
    &:not(last-child) {
      margin-right: 5px;
    }
  }

  transition: transform $animation-time ease-out;
  transform: scale(1.3);
}

.thumbnail:hover .overlay {
  opacity: 1;
  .thumb-items {
    transform: scale(1);
  }
}

.zoomer {
  height: 100%;
  :global(.img-wrap) {
    width: 100%;
    height: 100%;
    /*img {*/
    /*height: 100%;*/
    /*width: auto;*/
    /*}*/
  }
}

.flickity-lazy {
  &:not(:global(.flickity-lazyloaded)) {
    background: {
      image: url(../../img/icon-loading.svg);
      repeat: no-repeat;
      position: center;
    }
  }
}
</style>
<template lang="pug">
  .vth-thumb.thumb(:class="[ $style.thumbnail, ratio_?`ratio-${ratio_}`:'' ]")
    wrapper
      image-zoomer(v-if="useZoomer" :class="$style.zoomer" :src="url_")
      img(v-if="url_ && slickLazy_" :class="$style.flickityLazy" :data-lazy="lazyUrl_" :data-flickity-lazyload="lazyUrl_" :alt="alt_")
      img.lazy(v-else-if="url_ && lazy_", v-lazy="lazyUrl_", :alt="alt_")
      img(v-else-if="url_", :src="lazyUrl_", :alt="alt_")
      img(v-else, :src="demo_")
      div(:class="$style.overlay", v-if="overlay_")
        div(:class="$style.thumbItems")
          slot(name="overlay")
            //span.fa.fa-search
    slot
</template>
<script>
import ImageZoomer from "@/components/image-zoomer";
import loading from "../../img/icon-loading.svg";

export default {
  name: "Thumbnail",
  components: {
    Wrapper: {
      functional: true,
      render(h, { parent, slots }) {
        // console.log(parent)
        const children = slots().default;
        //   notHasRatio = !(parent.ratio_) ;
        // if (notHasRatio) return children;
        return <div class="content">{children}</div>;
      }
    },
    ImageZoomer
  },
  props: {
    url_: String,
    alt_: String,
    ratio_: String,
    overlay_: {
      type: Boolean,
      default: true
    },
    slickLazy_: {
      type: Boolean,
      default: false
    },
    lazy_: {
      type: Boolean,
      default: true
    },
    thumbnailSize_: String,
    type: {
      type: String,
      default: "haravan"
    },
    useZoomer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      demo_: require("../../img/promo-5.png"),
      loading
    };
  },
  computed: {
    lazyUrl_() {
      const { url_ } = this;
      if (!this.thumbnailSize_) return url_;
      return url_.replace(/_master(\.[A-Za-z]*)$/, `_${this.thumbnailSize_}$1`);
    }
  }
};
</script>
