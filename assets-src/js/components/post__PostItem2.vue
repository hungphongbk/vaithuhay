<style lang="scss" module>
  @import "../../sass/inc/inc";

  .post- {
    &item {
      display: flex;
      padding: {
        left: 1rem;
        right: 1rem;
      }
    }
    &thumbnail {
      @extend %reset-link;
      display: block;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 17%;
      @include responsive('md-max') {
        width: 20%;
      }
      margin-right: 1.3rem;
      transition: opacity $animation-time ease;
      &:hover {
        opacity: .86;
      }
    }
    &detail {
      flex-grow: 1;
    }
    &title {
      @extend %reset-link;
      h5 {
        font-weight: 700;
        text-transform: uppercase;
      }
    }
    &desc {
      white-space: pre-wrap;
      @include font-size-with-line-height($font-size-base*0.86);
      padding-right: 3rem;
    }
    &price {
      padding-top: 1rem;
      .current {
        @include font-size-with-line-height($font-size-base*1.2);
        font-weight: 700;
      }
      .old {
        color: $text-muted;
        text-decoration: line-through $theme-red-color;
      }
      .percentage {
        color: $theme-red-color;
        font-weight: 700;
        margin-left: 1.3rem;
      }
    }
    &context {
      margin-left: 3rem;
    }
  }
</style>
<template lang="pug">
  div(:class="$style.postItem")
    a(:href="url", :class="$style.postThumbnail" target="_blank")
      thumbnail(:url_='thumbnail', ratio_='1-1', :thumbnailSize_="defaultThumbnailSize_", :lazy_="false", :overlay_="false")
    div(:class="$style.postDetail")
      a(:href="url", :class="$style.postTitle" target="_blank")
        h5 {{item.title}}
      p(:class="$style.postDesc") {{item.desc | i18n}}
    div(:class="$style.postPrice")
      p(:class="$style.current") {{price.current | vnd}}
      template(v-if="price.old>0")
        p
          span(:class="$style.old") {{price.old | vnd}}
          span(:class="$style.percentage") -{{percentage}}
    div(:class="$style.postContext")
      slot
</template>
<script>
  export default {
    name: "ProductItem",
    props: {
      item: Object,
      thumbnailSize_: String
    },
    computed: {
      url() {
        return '/products/' + this.item.handle;
      },
      defaultThumbnailSize_() {
        if (this.thumbnailSize_) return this.thumbnailSize_;
        return this.$mq.tablet ? 'medium' : 'large';
      },
      thumbnail() {
        return this.item.images[0].src;
      },
      price() {
        const variant = this.item.variants[0];
        return {
          current: variant.price * 100,
          old: variant.compare_at_price ? variant.compare_at_price * 100 : 0
        };
      },
      percentage() {
        const {current, old} = this.price;
        if (old === 0) return 0;
        return Math.round((old - current) * 100 / old) + '%';
      }
    }
  };
</script>
