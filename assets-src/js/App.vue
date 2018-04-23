<style lang="scss" scoped>
  @import "../sass/inc/inc";

  #primary {
    position: relative;
    padding-top: $navbar-height;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .85);
    z-index: 99999;
    @include responsive('sm-max') {
      position: fixed;
      top: 0;
    }
  }

  iframe {
    display: none;
  }
</style>
<style lang="scss" module>
  @import "../sass/inc/inc";

  .scrollToTop {
    $icon-size: 50px;
    position: fixed;
    bottom: 60px;
    right: 40px;
    height: $icon-size;
    width: $icon-size;
    border-radius: 50%;
    background-color: $theme-red-color;
    transition: all $animation-time ease;
    @extend %box-shadow-1;
    text-align: center;
    cursor: pointer;
    :global(.fa) {
      font-size: $icon-size/2.2;
      line-height: $icon-size*0.95;
      color: #ddd;
      @include responsive('xs-max') {
        color: white;
      }
    }
    &:hover :global(.fa) {
      color: #fff;
    }
    @include responsive('xs-max') {
      bottom: 130px;
      right: 20px;
    }
  }
</style>
<template lang="pug">
  #app.hfeed.site
    nav-menu
    #primary
      main#main(role="main")
        page-content
        transition(name="vth-fade")
          .overlay(v-show="overlay_")
    page-footer
    transition(name="vth-fade-slide-up")
      div(v-if="isScrollToTop", :class="$style.scrollToTop", v-tooltip.left="'Trở về đầu trang'", @click="scrollToTop_")
        i.fa.fa-chevron-up
    app-service-worker
    app-offline-mode
</template>
<script>
  import {Event} from './components/index'
  import AppServiceWorker from './fragments/app__ServiceWorker'
  import AppOfflineMode from './fragments/app__OfflineMode'
  import {tooltip} from '@/plugins'
  import {delay} from "@/components/helpers";

  const $ = jQuery;

  export default {
    directives: {tooltip},
    components: {AppServiceWorker, AppOfflineMode},
    data() {
      return {
        overlay_: false,
        scrollTop: 0,
        screenHeight: $(window).height(),
        iframeUrl: 'server.vaithuhay.com'
      }
    },
    computed: {
      isScrollToTop() {
        if (this.$mq.phone) return false;
        return this.scrollTop >= this.screenHeight / 4;
      }
    },
    methods: {
      scrollToTop_() {
        $('html,body').animate({
          scrollTop: 0
        }, 400);
      }
    },
    mounted() {
      const self = this;
      Event.$on('overlay', value => self.overlay_ = value);
      $(document).scroll(() => {
        self.scrollTop = $(window).scrollTop();
      });
    }
  }
</script>
