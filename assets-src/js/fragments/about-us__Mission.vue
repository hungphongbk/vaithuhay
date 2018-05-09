<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  h3 {
    font-weight: 700;
  }

  img {
    width: 80%;
    margin-left: 20%;
  }
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('0')", titleForeground="#fc0", background="#f0f0f0")
    .row.gutter-40
      .col-sm-6
        h3 {{content.title}}
        div {{content.content}}
      .col-sm-6
        img(:src="content.image")
</template>
<script>
  import {IndexSection} from '../components/index';

  export default {
    components: {IndexSection},
    inject: ['section'],
    computed: {
      content() {
        return this.section.mission[this.$i18n.locale];
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "0": "our missions"
    },
    "vi": {
      "0": "sứ mạng"
    }
  }
</i18n>
