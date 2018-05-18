<style lang="scss" module>
  @import "../../sass/inc/inc";

  .faq {
    padding: {
      left: 0;
      right: 0;
    }

    h5 {
      font-weight: 700;
    }

    :global .form-control {
      border: 1px solid #f0f0f0;
      margin-bottom: 10px;
    }
  }

  .item {
    display: block;
    padding: 5px 20px;
    border-radius: 6px;
    border: 1px solid #e9ebee;
    box-shadow: 0 1px 6px -2px #999;

    margin-bottom: $line-height-computed*1/2;

    :global {
      p, .fa {
        color: lighten($text-color, 25%);
      }

      .fa {
        margin-right: 0.7em;
        transition: all $animation-time ease
      }

      p {
        padding-left: 1.7em;
      }
    }
    &.open :global(.fa) {
      transform: rotate(90deg)
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .faq-anim {
    &-enter-active, &-leave-active {
      transition: all $animation-time ease
    }
    &-enter, &-leave-to {
      max-height: 0;
      opacity: 0;
    }
    &-enter-to, &-leave {
      max-height: 100px;
      opacity: 1;
    }
  }
</style>
<template lang="pug">
  div(:class="$style.faq")
    ul
      li(v-for="(item, index) in list$", :class="{ [$style.item]:true, [$style.open]: toggle[index]}", @click="toggles(index)")
        h5
          i.fa.fa-chevron-right
          | {{item.ask}}
        transition(name="faq-anim")
          p(v-if="toggle[index]") {{item.answer}}
    //hr
    textarea.form-control(rows="4", :placeholder="$t('q')", v-model="newAsk")
    p(v-if="status") {{status}}
    .btn.btn-grey(@click="sendFaq") {{$t('send')}}
</template>
<script>
  import auth from '../plugins/auth';

  const $ = jQuery;
  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        toggle: Array(20).fill(false),
        newAsk: '',
        status: null
      };
    },
    computed: {
      list$() {
        return this.list
          .filter(({vi: {answer}}) => typeof answer !== 'undefined' && answer !== null && answer.length > 0)
          .map(i => i[this.$i18n.locale]);
      }
    },
    methods: {
      toggles(i) {
        this.$set(this.toggle, i, !this.toggle[i]);
      },
      sendFaq() {
        const self = this;
        auth.wrap(async () => {
          const {status} = await $.ajax({
            type: 'POST',
            url: `https://server.vaithuhay.com/b/products/${window.product.current.id}/ask`,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
              ask: self.newAsk
            })
          });
          if (status === 'ok') {
            self.status = 'Cám ơn bạn. Câu hỏi của bạn đã được gửi đi!';
          } else {
            self.status = 'Oops. Something went wrong :(';
          }
        })();
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "q": "",
      "send": ""
    },
    "vi": {
      "q": "Bạn còn điều gì thắc mắc về sản phẩm? Gửi câu hỏi tại đây nhé ^^",
      "send": "Gửi câu hỏi"
    }
  }
</i18n>
