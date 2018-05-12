<style lang="scss" module>
  @import "../../../sass/inc/inc";

  .loyalty {
    text-align: left;
    > p {
      display: flex;
      margin-bottom: .3em;
      > span:first-child {
        flex-grow: 1;
      }
    }
  }
</style>
<template lang="pug">
  div(:class="$style.loyalty")
    p {{$t('balance')}}
    p.small.text-muted ({{$t('status',{p:loyalty.balance})}})
</template>
<script>
  import {USER_LOYALTY} from "@/store/types";

  export default {
    name: "Loyalty",
    computed: {
      loyalty() {
        return this.$vthStore.getters[USER_LOYALTY];
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "balance": "Your current balance",
      "status": "You have %{p} points"
    },
    "vi": {
      "balance": "Số điểm thưởng hiện tại",
      "status": "Bạn đang có %{p} điểm thưởng"
    }
  }
</i18n>
