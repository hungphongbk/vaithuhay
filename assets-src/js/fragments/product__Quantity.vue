<style lang="scss" module>
  @import "../../sass/inc/inc";
  .product-quantity{
    composes: input-group from global;
    table-layout: fixed;
    border: 2px solid $theme-color-dark;
    width: 100%;
    :global .input-group-addon{
      background-color: #fff;
      border: none;
    }
    >*{
      width: percentage(1/3);
    }
    :global{
      .btn-theme {
        background-color: lighten($theme-color, 25);
        width: 100%;

        &.minus {
          border-right: 2px solid $theme-color-dark;
          margin-right: 0;
        }
        &.plus {
          border-left: 2px solid $theme-color-dark;
          margin-left: 0;
        }
      }
    }
  }
  .quantity_ {
    height: auto;
    text-align: center;
    padding: 6px;
    background: #fff;
    border: none;
  }
</style>
<template lang="pug">
  div(:class="$style.productQuantity")
    span.input-group-btn
      button.btn.btn-theme.minus(type="button", @click="decreaseQuantity_")= '-'
    span.input-group-addon(:class="$style.quantity_", v-if="mode_===0", @click="mode_=1")
      span(ref="anim_", style="display:inline-block; font-weight: 700; font-size: 1.1em")= '{{animatedQuantity_}}'
    input.form-control(:class="$style.quantity_", v-else, type="tel", :value="quantity_", @input="quantity_=$event.target.value", @focusout="mode_=0")
    span.input-group-btn
      button.btn.btn-theme.plus(type="button", @click="++quantity_")= '+'
</template>
<script>
  import TWEEN from "tween.js";

  const $ = jQuery;
  export default {
    model: {
      prop: 'quantity_',
      event: 'change'
    },
    props: {
      quantity_: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        animatedQuantity_: this.quantity_,
        mode_: 0
      };
    },
    watch: {
      quantity_(newValue, oldValue) {
        this.$emit('change', newValue);
        this.animateQuantity_(oldValue, newValue);
      }
    },
    methods: {
      decreaseQuantity_() {
        if (this.quantity_ > 1)
          this.quantity_--;
      },
      animateQuantity_(oldValue, newValue) {
        let self = this,
          animFrame,
          animate = (time) => {
            TWEEN.update(time);
            animFrame = requestAnimationFrame(animate);
          },
          animThumb = this.$refs.anim_,
          isInMode = oldValue < newValue,
          translateOffset = 70;

        function updateStyle() {
          $(animThumb).css({
            opacity: this.opacity_,
            transform: `translateY(${this.translateY_}%)`
          });
        }

        const twOut = new TWEEN.Tween({opacity_: 1.0, translateY_: 0})
          .to({opacity_: 0, translateY_: isInMode ? -translateOffset : translateOffset}, 120)
          .onUpdate(updateStyle);
        const twIn = new TWEEN.Tween({opacity_: 0, translateY_: isInMode ? translateOffset : -translateOffset})
          .to({opacity_: 1.0, translateY_: 0}, 120)
          .onStart(function () {
            self.animatedQuantity_ = newValue;
          })
          .onUpdate(updateStyle);
        twOut.chain(twIn)
          .onComplete(() => {
            cancelAnimationFrame(animate);
          }).start();
        animFrame = requestAnimationFrame(animate);
      }
    },
    mounted() {
      const self = this;
    }
  };
</script>
