<style lang="scss">
@import "../sass/inc/inc";

#primary {
  position: relative;
  padding-top: $navbar-height;
}
#main {
  min-height: 100vh;
}
</style>
<style lang="scss" scoped>
@import "../sass/inc/inc";

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 99999;
  @include responsive("sm-max") {
    position: fixed;
    top: 0;
  }
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
    line-height: $icon-size * 0.95;
    color: #ddd;
    @include responsive("xs-max") {
      color: white;
    }
  }
  &:hover :global(.fa) {
    color: #fff;
  }
  @include responsive("xs-max") {
    bottom: 130px;
    right: 20px;
  }
}
</style>
<template lang="pug">
  #app.hfeed.site(v-scroll="onScroll")
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
    //app-service-worker
    //app-offline-mode
    system-modal(v-if="systemModal !== null", :title="systemModal.title", :content="systemModal.content", :commands="systemModal.commands", :options="systemModal.options")
</template>
<script>
import { Event } from "./components";
import AppOfflineMode from "./fragments/app__OfflineMode";
import { tooltip } from "@/plugins";
import { USER_MUTATION_LOGIN } from "@/store/types";
import { $modalEvent, SystemModal } from "@/plugins/ModalManager";
import {
  SYSTEM_MODAL_HIDE,
  SYSTEM_MODAL_SHOW,
  SYSTEM_ON_SCROLL,
  SYSTEM_ON__MOBILE_HEADER_CONTENT,
  SYSTEM_MOBILE_HEADER_CONTENT
} from "@/types";

const $ = jQuery;

export default {
  directives: { tooltip },
  components: {
    //'app-service-worker': () => import(/* webpackChunkName: "vaithuhay-sw" */ './fragments/app__ServiceWorker'),
    AppOfflineMode,
    SystemModal
  },
  data() {
    return {
      overlay_: false,
      scrollTop: 0,
      screenHeight: $(window).height(),
      iframeUrl: "server.vaithuhay.com",
      systemModal: null,
      mobileHeaderContent: null
    };
  },
  provide() {
    const app = {},
      self = this;
    Object.defineProperty(app, "mobileHeaderContent", {
      enumerable: true,
      get() {
        return self.mobileHeaderContent;
      }
    });
    return { app };
  },
  computed: {
    isScrollToTop() {
      if (this.$mq.phone) return false;
      return this.scrollTop >= this.screenHeight / 4;
    }
  },
  methods: {
    scrollToTop_() {
      $("html,body").animate(
        {
          scrollTop: 0
        },
        400
      );
    },
    initSystemModal() {
      $modalEvent.$on(SYSTEM_MODAL_SHOW, modal => {
        console.log(modal);
        this.systemModal = modal;
      });
      $modalEvent.$on(SYSTEM_MODAL_HIDE, () => {
        this.systemModal = null;
      });
    },
    onScroll(e, { scrollTop }) {
      Event.$emit(SYSTEM_ON_SCROLL, scrollTop);
    },
    initMobileHeaderContent() {
      Event.$on(SYSTEM_ON__MOBILE_HEADER_CONTENT, component => {
        this.mobileHeaderContent = component;
      });
    }
  },
  async created() {
    await this.$store.dispatch(USER_MUTATION_LOGIN);
  },
  mounted() {
    const self = this;
    Event.$on("overlay", value => (self.overlay_ = value));
    $(document).scroll(() => {
      self.scrollTop = $(window).scrollTop();
    });
    this.initSystemModal();
    this.initMobileHeaderContent();
  }
};
</script>
