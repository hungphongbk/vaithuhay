<style lang="scss" scoped="">
  @import "../../sass/inc/inc";

  .vth-section {
    position: relative;
    padding: 1px 24px 40px;
    @media(max-width: $screen-lg) {
      padding: {
        left: 0;
        right: 0;
        bottom: 20px;
      }
    }
  }

  .vth-section-title {
    font-weight: bold;
    text-transform: uppercase;
    @include responsive('xs-max') {
      @include font-size-with-line-height(20px);
    }
  }

  .col-sm-12 {
    position: inherit;
  }
</style>
<template lang="pug">
  section.vth-section(:style="backgroundStyle_", :class="[contentWidth]")
    .container
      .row
        .col-sm-12
          h1.vth-section-title(:style="{color: titleForeground}") <span>{{title}}</span>
          slot
</template>
<script>
  const patterns = {
    pattern1: require('../../img/pattern.png'),
    pattern2: require('../../img/7304.jpg')
  };
  export default {
    props: {
      title: {
        type: String,
        default: '[vth-object]',
      },
      titleForeground: {
        type: String,
        default: '#333'
      },
      background: {
        type: String,
        default: '#fff'
      },
      backgroundImage: null,
      contentWidth: String
    },
    computed: {
      backgroundStyle_() {
        const [color, img] = [this.background, this.backgroundImage];
        const style = {
          'background-color': color
        };
        if (img) {
          style['background-image'] = `url(${patterns[img]})`;
          style['background-size'] = 'contain';
        }
        return style;
      }
    }
  };
</script>
