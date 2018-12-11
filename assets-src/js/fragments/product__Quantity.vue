<style lang="scss" module>
@import "../../sass/inc/inc";
.product-quantity {
  composes: input-group from global;
  table-layout: fixed;
  border: 2px solid $theme-color-dark;
  width: 100%;
  :global .input-group-addon {
    background-color: #fff;
    border: none;
  }
  > * {
    width: percentage(1/3);
  }
  :global {
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
      button.btn.btn-theme.minus(type="button", @click="DECREASE_QUANTITY")= '-'
    span.input-group-addon(:class="$style.quantity_", v-if="mode_===0", @click="mode_=1")
      span(ref="anim_", style="display:inline-block; font-weight: 700; font-size: 1.1em") {{ANIMATED_QUANTITY}}
    input.form-control(:class="$style.quantity_", v-else, type="tel", :value="quantity_", @input="quantity_=$event.target.value", @focusout="mode_=0")
    span.input-group-btn
      button.btn.btn-theme.plus(type="button", @click="++quantity_")= '+'
</template>
<script>
import TWEEN from "@tweenjs/tween.js";

const $ = jQuery;
export default {
  model: {
    prop: "quantity_",
    event: "change"
  },
  props: {
    quantity_: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ANIMATED_QUANTITY: this.quantity_,
      mode_: 0
    };
  },
  watch: {
    quantity_(newValue, oldValue) {
      this.$emit("change", newValue);
      this.ANIMATE_QUANTITY(oldValue, newValue);
    }
  },
  methods: {
    DECREASE_QUANTITY() {
      if (this.quantity_ > 1) this.quantity_--;
    },
    ANIMATE_QUANTITY(oldValue, newValue) {
      let self = this,
        animFrame,
        animate = time => {
          TWEEN.update(time);
          animFrame = requestAnimationFrame(animate);
        },
        animThumb = this.$refs.anim_,
        isInMode = oldValue < newValue,
        translateOffset = 70;

      function updateStyle(obj) {
        // debugger;
        $(animThumb).css({
          opacity: obj.Q_OPACITY,
          transform: `translateY(${obj.Q_TRANSLATE_Y}%)`
        });
      }

      const twOut = new TWEEN.Tween({ Q_OPACITY: 1.0, Q_TRANSLATE_Y: 0 })
        .to(
          {
            Q_OPACITY: 0,
            Q_TRANSLATE_Y: isInMode ? -translateOffset : translateOffset
          },
          120
        )
        .onUpdate(updateStyle);
      const twIn = new TWEEN.Tween({
        Q_OPACITY: 0,
        Q_TRANSLATE_Y: isInMode ? translateOffset : -translateOffset
      })
        .to({ Q_OPACITY: 1.0, Q_TRANSLATE_Y: 0 }, 120)
        .onStart(function() {
          self.ANIMATED_QUANTITY = newValue;
        })
        .onUpdate(updateStyle);
      twOut
        .chain(twIn)
        .onComplete(() => {
          cancelAnimationFrame(animate);
        })
        .start();
      animFrame = requestAnimationFrame(animate);
    }
  },
  mounted() {
    const self = this;
  }
};
</script>
