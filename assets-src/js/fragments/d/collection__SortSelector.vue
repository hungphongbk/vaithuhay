<style lang="scss" module>
  @import "../../../sass/inc/inc";

  .container {
    position: relative;
    /*min-width: 240px;*/
    font-size: 1.2rem;
    p {
      line-height: 1;
    }
  }

  .menu {
    z-index: 99999;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    contain: content;
    background: #FFF;
    will-change: transform, box-shadow;
    transition: box-shadow 300ms step-end;
    animation-duration: 300ms;
    animation-timing-function: step-end;
    transform-origin: top left;
    &-contents {
      transform-origin: top left;
      will-change: transform;
      contain: content;
      animation-duration: 300ms;
      animation-timing-function: step-end;
    }
  }

  .item {
    cursor: pointer;
    transition: background-color 300ms ease;
    background-color: white;
    &:hover {
      background-color: lighten($theme-color, 35%);
    }
    &.selected, &.selected:hover {
      background-color: lighten($theme-color, 20%);
    }
    p {
      white-space: nowrap;
    }
  }

  .menu-active {
    opacity: 1;
    pointer-events: auto;
  }

  .expanded {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
    animation-name: menuExpandAnimation;
    .menu-contents {
      animation-name: menuExpandContentsAnimation;
    }
  }

  .collapsed {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
    animation-name: menuCollapseAnimation;
    .menu-contents {
      animation-name: menuCollapseContentsAnimation;
    }
  }
</style>
<template lang="pug">
  div(:class="$style.container" v-click-outside="collapse")
    .overlay-selector(:class="$style.menu" ref="menu")
      div(:class="$style.menuContents" ref="menuContent")
        ul(:class="$style.items")
          li.px-3(v-for="item in list" @click="select(item)" ref="menuItems" :class="{ [$style.item]:true, [$style.selected]: item===value_ }")
            p.d-inline-block.mb-0.py-3 {{item.title}}
</template>
<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    directives: {ClickOutside},
    props: {
      list: {
        type: Array,
        required: true
      },
      value: {
        type: Object
      }
    },
    data() {
      return {
        value_: this.value,
        expanded: true,
        animate: false,
        duration: 300,
        frameRate: 1000 / 60,
        collapsed: {
          x: 0,
          y: 0
        },
        menu: null,
        menuContents: null,
        menuTitle: null
      }
    },
    computed: {
      nFrames() {
        return Math.round(this.duration / this.frameRate)
      },
      translateY() {
        return -this.list.indexOf(this.value_) * 100 / this.list.length;
      }
    },
    watch: {
      value_(value) {
        this.$emit('input', value)
      }
    },
    methods: {
      activate() {
        this.menu.classList.add(this.$style.menuActive);
        this.animate = true;
      },
      expand() {
        if (this.expanded) {
          return;
        }
        this.expanded = true;

        this.menu.style.transform = `scale(1, 1) translateY(${this.translateY}%)`;
        this.menuContents.style.transform = `scale(1,1) translateY(0)`;

        if (!this.animate) {
          return;
        }
        this.createEaseAnimations();
        this.applyAnimation({expand: true});
      },
      collapse() {
        if (!this.expanded) {
          return;
        }
        this.expanded = false;

        const {x, y} = this.collapsed;
        const invX = 1 / x;
        const invY = 1 / y;

        this.menu.style.transform = `scale(${x}, ${y}) translateY(0)`;
        this.menuContents.style.transform = `scale(${invX}, ${invY}) translateY(${this.translateY}%)`;

        if (!this.animate) {
          return;
        }
        this.createEaseAnimations();
        this.applyAnimation({expand: false});
      },
      toggle() {
        if (this.expanded) {
          this.collapse();
          return;
        }

        this.expand();
      },
      applyAnimation({expand} = opts) {
        const style = this.$style;

        this.menu.classList.remove(style.expanded);
        this.menu.classList.remove(style.collapsed);

        // Force a recalc styles here so the classes take hold.
        window.getComputedStyle(this.menu).transform;

        if (expand) {
          this.menu.classList.add(style.expanded);
          return;
        }

        this.menu.classList.add(style.collapsed);
      },
      calculateScales() {
        const collapsed = this.menuTitle.getBoundingClientRect();
        const expanded = this.menu.getBoundingClientRect();

        this.collapsed = {
          x: collapsed.width / expanded.width,
          y: collapsed.height / expanded.height
        }
      },
      createEaseAnimations() {
        let menuEase = document.querySelector('.menu-ease');
        if (!menuEase) {
          menuEase = document.createElement('style');
          menuEase.classList.add('menu-ease');
        }

        const menuExpandAnimation = [];
        const menuExpandContentsAnimation = [];
        const menuCollapseAnimation = [];
        const menuCollapseContentsAnimation = [];

        const percentIncrement = 100 / this.nFrames;

        for (let i = 0; i <= this.nFrames; i++) {
          const step = this.ease(i / this.nFrames).toFixed(5);
          const percentage = (i * percentIncrement).toFixed(5);
          const startX = this.collapsed.x;
          const startY = this.collapsed.y;
          const endX = 1;
          const endY = 1;
          const startTranslateY = 0;
          const endTranslateY = this.translateY;

          // Expand animation.
          this.append({
            percentage,
            step,
            startX,
            startY,
            endX,
            endY,
            startTranslateY,
            endTranslateY,
            outerAnimation: menuExpandAnimation,
            innerAnimation: menuExpandContentsAnimation
          });

          // Collapse animation.
          this.append({
            percentage,
            step,
            startX: 1,
            startY: 1,
            endX: this.collapsed.x,
            endY: this.collapsed.y,
            startTranslateY: this.translateY,
            endTranslateY: 0,
            outerAnimation: menuCollapseAnimation,
            innerAnimation: menuCollapseContentsAnimation
          });
        }

        menuEase.textContent = `
    @keyframes ${this.$style.menuExpandAnimation} {
      ${menuExpandAnimation.join('')}
    }
    @keyframes ${this.$style.menuExpandContentsAnimation} {
      ${menuExpandContentsAnimation.join('')}
    }
    @keyframes ${this.$style.menuCollapseAnimation} {
      ${menuCollapseAnimation.join('')}
    }
    @keyframes ${this.$style.menuCollapseContentsAnimation} {
      ${menuCollapseContentsAnimation.join('')}
    }`;

        document.head.appendChild(menuEase);
        return menuEase;
      },
      append({
               percentage,
               step,
               startX,
               startY,
               endX,
               endY,
               startTranslateY,
               endTranslateY,
               outerAnimation,
               innerAnimation
             } = opts) {

        const f = (start, end, step) => (start + (end - start) * step).toFixed(5);
        const xScale = f(startX, endX, step);
        const yScale = f(startY, endY, step);
        const yTranslate = f(startTranslateY, endTranslateY, step);

        const invScaleX = (1 / xScale).toFixed(5);
        const invScaleY = (1 / yScale).toFixed(5);
        const invTranslateY = f(endTranslateY, startTranslateY, step);

        outerAnimation.push(`
      ${percentage}% {
        transform: scale(${xScale}, ${yScale}) translateY(${yTranslate}%);
      }`);

        innerAnimation.push(`
      ${percentage}% {
        transform: scale(${invScaleX}, ${invScaleY}) translateY(${invTranslateY}%);
      }`);
      },

      clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      },

      ease(v, pow = 4) {
        v = this.clamp(v, 0, 1);

        return 1 - Math.pow(1 - v, pow);
      },
      select(value) {
        if (!this.expanded) {
          this.expand();
          return;
        }

        if (this.value_ === value) {
          this.collapse();
          return;
        }

        if (value.url)
          window.location.href = value.url;
        else {
          this.value_ = value;
          this.collapse();
        }
      }
    },
    mounted() {
      this.menu = this.$refs.menu,
        this.menuContents = this.$refs.menuContent,
        this.menuTitle = this.$refs.menuItems[0];

      this.calculateScales();
      this.createEaseAnimations();

      this.collapse();
      this.activate();
    }
  }
</script>
