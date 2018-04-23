<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  @mixin size($s) {
    height: $s;
    width: $s;
    @at-root {
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
    &:hover {
      .fa, img {
        opacity: 1;
      }
      .fa {
        transform: scale(1.16)
      }
      img {
        transform: scale(1.16) translateY(-$s/10);
      }
    }
  }

  .share {
    .fa, img {
      transition: all $animation-time*1.5 ease;
      opacity: .75;
    }

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-color: lighten($theme-color, 33.5%);
    margin-left: 10px;
    cursor: pointer;

    box-shadow: 0 0 0 0 darken($theme-color, 5%);
    transition: box-shadow $animation-time*1.5 ease;
    &:hover {
      box-shadow: 0 0 0 3px darken($theme-color, 5%);
    }

    @include size(60px);
    @include responsive('xs-max') {
      @include size(48px);
    }

    &-fb {
      color: #3b5998;
    }
    &-google {
      color: #ea4335;
    }
  }
</style>
<template lang="pug">
  .social-share.clearfix
    .pull-right
      .share.share-fb(@click="shareFb")
        i.fa.fa-facebook
      .share.share-messenger(@click="shareMessenger")
        img(src="../../img/icons8-facebook-messenger.svg")
      .share.share-google
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
      }
    },
    methods: {
      shareFb() {
        FB.ui({
          method: 'share',
          href: this.canonicalUrl,
          mobile_iframe: true
        })
      },
      shareMessenger() {
        if (this.$md.os() === 'AndroidOS' || this.$md.os() === 'iOS') {

        } else {
          FB.ui({
            method: 'send',
            link: this.canonicalUrl,
          });
        }
      }
    }
  }
</script>
