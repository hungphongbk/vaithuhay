<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .inner {
    margin: 0 20px;
  }

  .image {
    border-radius: 50%;
    @extend %box-shadow-2;
    margin: 0 15% 20px;
    overflow: hidden;
    @at-root img {
      width: auto;
      height: 100%;
      transform: translateX(-50%);
      margin-left: 50%;
    }
  }

  .title {
    font-weight: 700;
  }
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('title')", titleForeground="#fc0", background="#fff")
    .row
      .col-sm-4(v-for="i in items")
        .inner.text-center
          .ratio-1-1.image
            .content
              img(:src="i.image")
          h3.title {{i.title}}
          p {{i.content}}
</template>
<script>
  import {IndexSection} from '../components/index'

  export default {
    components: {IndexSection},
    inject: ['section'],
    computed: {
      items() {
        return this.section.aboutUs[this.$i18n.locale]
      }
    }
  }
</script>
<i18n>
  {
  "en": {
  "title": "about vaithuhay"
  },
  "vi": {
  "title": "về vaithuhay"
  }
  }
</i18n>
