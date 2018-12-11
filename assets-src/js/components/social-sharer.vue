<style lang="scss" module>
@import "../../sass/inc/inc";

@mixin size($s) {
  height: $s;
  width: $s;
  :global {
    .fa {
      line-height: $s;
      font-size: $s/2;
    }

    img {
      margin: $s/3.16 20%;
      display: inline-block;
      line-height: $s;
      width: 60%;
      transform: translateY(-$s/10);
    }
  }
  &:hover :global {
    .fa,
    img {
      opacity: 1;
    }
    .fa {
      transform: scale(1.16);
    }
    img {
      transform: scale(1.16) translateY(-$s/10);
    }
  }
}

.share {
  :global {
    .fa,
    img {
      transition: all $animation-time * 1.5 ease;
      opacity: 0.75;
    }
  }

  display: inline-block;
  text-align: center;
  border-radius: 50%;
  background-color: lighten($theme-color, 33.5%);
  margin-left: 10px;
  cursor: pointer;

  box-shadow: 0 0 0 0 darken($theme-color, 5%);
  transition: box-shadow $animation-time * 1.5 ease;
  &:hover {
    box-shadow: 0 0 0 3px darken($theme-color, 5%);
  }

  @include size(60px);
  @include responsive("xs-max") {
    @include size(48px);
  }

  &-fb {
    composes: share;
    color: #3b5998;
  }
  &-messenger {
    composes: share;
  }
  &-google {
    composes: share;
    color: #ea4335;
  }
}
</style>
<template lang="pug">
  .clearfix
    .pull-right
      div(:class="$style.shareFb", @click="shareFb")
        i.fa.fa-facebook
      div(:class="$style.shareMessenger", @click="shareMessenger")
        img(src="../../img/icons8-facebook-messenger.svg")
      div(:class="$style.shareGoogle")
        i.fa.fa-google-plus
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      canonicalUrl: window.location.origin + this.url
    };
  },
  methods: {
    shareFb() {
      FB.ui({
        method: "share",
        href: this.canonicalUrl,
        mobile_iframe: true
      });
    },
    shareMessenger() {
      if (this.$md.os() === "AndroidOS" || this.$md.os() === "iOS") {
      } else {
        FB.ui({
          method: "send",
          link: this.canonicalUrl
        });
      }
    }
  }
};
</script>
