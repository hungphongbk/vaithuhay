<style lang="scss" scoped>
@import "../../sass/inc/inc";

.offline {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: darken($brand-warning, 20%);
  padding: 1.7rem 3rem;
  color: white;
}
</style>
<template lang="pug">
  div
    offline(@detected-condition="detect")
    div(v-if="offline")
      .offline
        p {{$t('label')}}
</template>
<script>
import { Offline } from "@/components";

const $ = jQuery;

export default {
  components: { Offline },
  data() {
    return {
      offline: false
    };
  },
  methods: {
    detect(online) {
      console.log(online);
      this.offline = !online;
      const $body = $("body");
      if (!online && !$body.hasClass("site-offline-mode")) {
        $body.addClass("site-offline-mode");
      }
    }
  }
};
</script>
<i18n>
  {
    "en": {
      "label": "You're in Offline mode!"
    },
    "vi": {
      "label": "Bạn đang ở chế độ Offline!"
    }
  }
</i18n>
