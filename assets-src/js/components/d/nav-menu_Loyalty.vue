<style lang="scss" module>
  @import "../../../sass/inc/inc";

  .loyalty {
    text-align: left;
    > p {
      display: flex;
      > span:first-child {
        flex-grow: 1;
      }
    }
  }

  .balance {
    font-weight: 700;
    color: $theme-red-color;
    font-size: 1.5em;
  }
</style>
<template lang="pug">
  div(:class="$style.loyalty")
    p
      span {{$t('balance')}}
      span.text-right(:class="$style.balance") {{loyalty.balance}}
</template>
<script>
  import {USER_LOYALTY_} from "@/store/types";

  export default {
    name: "Loyalty",
    computed: {
      loyalty() {
        return this.$store.getters[USER_LOYALTY_];
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "balance":"Your current balance"
    },
    "vi":{
      "balance":"Số điểm thưởng hiện tại"
    }
  }
</i18n>
