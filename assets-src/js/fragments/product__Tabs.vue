<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  @include responsive('xs-max') {
    .nav-tabs {
      display: flex;
      padding-top: 10px;
      background-color: white;
      .is-sticky & {
        @include _(box-shadow-2);
      }
      li {
        flex: 1;
      }
    }
  }
</style>
<style lang="scss" module>
  @import "../../sass/inc/inc";

  .product-tabs {
    margin-top: $line-height-computed*2+$font-size-h3*$line-height-base;
    margin-right: 20px;
    @include responsive('xs-max') {
      margin-top: 0;
      margin-right: 0;
      :global .container {
        padding: {
          left: 0;
          right: 0;
        }
      }
    }
  }

  .tabs {
    composes: tabs from global;
    position: absolute;
    top: 0;
    left: 0 !important;
    width: 100% !important;
    :global(.container) {
      padding: 0;
    }
    > div {
      border-bottom: 1px solid #bfbfbf;
      background: white;
    }
    .ul {
      display: table;
    }

    .li {
      display: table-cell;
      @include responsive('xs-max') {
        width: 1%;
      }
      &.active {
        border-bottom: 2px solid $theme-red-color;
      }
    }
  }

  .tab-content {
    composes: tab-content from global;
    border: none;
    @include responsive('xs-max') {
      margin-top: $line-height-computed*2+$font-size-h3*$line-height-base;
      border: none {
        top: none;
      }
    }
  }

  .title {
    @extend %reset-link;
    cursor: pointer;
    font-weight: 700;
    text-transform: uppercase;
    font-size: $font-size-h3;
    padding: $line-height-computed*4/3 $grid-gutter-width*1.5 $line-height-computed*2/3;
    display: inline-block;

    /*normal*/
    :global .nav-tabs.nav-justified > li > :local(&) {
      &, &:hover {
        border: 1px solid #bbb;
      }
      margin-left: -1px;
      color: lighten($text-color, 40%);
    }
    :global .nav-tabs.nav-justified > li:first-child > :local(&) {
      margin-left: 0;
    }
    /*active*/
    :global .nav-tabs.nav-justified > li.active > :local(&) {
      border-bottom-color: #bbb;
      background-color: $theme-color;
      color: $text-color;
    }

    @include responsive('xs-max') {
      width: 100%;
      height: 100%;
      text-align: center;
      padding: {
        left: 0;
        right: 0;
      }
      font-size: $font-size-base*1.05;
    }
  }

  .badge {
    vertical-align: super;
    line-height: 0;
    font-weight: 500;
    margin-left: 5px;
    color: $theme-red-color;
    @at-root .zero {
      color: darken(#fff, 40%)
    }
  }
</style>
<template lang="pug">
  div(:class="$style.productTabs")
    div(:class="$style.tabs" v-sticky sticky-offset="offset")
      div
        .container
          ul(:class="$style.ul", role="tablist", ref="tab")
            li(v-for="tab in tabs_", :class="{ [$style.li]:true, [$style.active]:active_===tab.hash}", @click="active_ = tab.hash")
              a(:class="$style.title") {{tab.title}}
                span(v-if="tab.badge!==null", :class="[$style.badge, tab.badge===0?$style.zero:'']") {{tab.badge}}
    div(:class="$style.tabContent")
      slot
</template>
<script>
  const $ = jQuery;
  export default {
    data() {
      return {
        tabs_: [],
        active_: -1,
        offset: {
          top: 60,
          bottom: 40
        }
      };
    },
    provide() {
      const self = this,
        tabs_ = {
          get active_() {
            return self.active_;
          }
        };
      return {tabs_};
    },
    methods: {
      add_(tab) {
        tab.hash = this.tabs_.length + 1;
        if (this.tabs_.length === 0) this.active_ = tab.hash;
        this.tabs_.push(tab);
      }
    },
    mounted() {
//            const self = this;
//            if (self.$mq.tablet) {
//                self.$nextTick(() => {
//                    $(self.$refs.tab).sticky({topSpacing: 60, zIndex: 999});
//                })
//            }
    }
  };
</script>
