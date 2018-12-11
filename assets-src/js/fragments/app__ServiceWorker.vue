<style lang="scss" module>
@import "../../sass/inc/inc";

.toast {
  $toast-bg: lighten($theme-red-color, 12%);

  position: fixed;
  top: $navbar-height + $line-height-computed;
  left: 1rem;
  z-index: 99999;
  border-radius: 1rem;
  background: $toast-bg;
  font-size: 0.95rem;
  color: white;
  overflow: hidden;
  p {
    text-align: justify;
  }
  :global(.fa-inverse) {
    color: $theme-red-color;
  }
  &-body {
    padding: 1rem {
      bottom: 0.3rem;
    }
  }
  &-btn-wrapper {
    width: 100%;
    display: flex;
    border-top: 1px solid lighten($toast-bg, 8%);
  }
  &-btn {
    flex: 1;
    text-align: center;
    cursor: pointer;
    padding: {
      top: 0.7rem;
      bottom: 1rem;
    }
    &:not(:last-child) {
      border-right: 1px solid lighten($toast-bg, 8%);
    }
    &:hover {
      background-color: desaturate(darken($toast-bg, 8%), 8%);
    }
  }
  @extend %box-shadow-1;

  @include responsive("xs-max") {
    right: 1rem;
  }
  @include responsive("sm-min") {
    width: 220px;
    height: auto;
  }
}
</style>
<template lang="pug">
  div
    transition(name="vth-fade-slide-up")
      div(:class="$style.toast" v-if="showRegister", ref="reg", @mouseover="splash($event)")
        div(:class="$style.toastBody")
          span.fa-stack.fa-2x.pull-left.mr-2
            i.fa.fa-circle.fa-stack-2x
            i.fa.fa-bell-o.fa-stack-1x.fa-inverse
          p Hãy nhấn "Theo dõi" để không bỏ lỡ những sản phẩm, tin tức mới từ Vaithuhay.com!
          .clearfix
        div(:class="$style.toastBtnWrapper")
          div(:class="$style.toastBtn" @click="getPermission") Theo dõi
          div(:class="$style.toastBtn" @click="showRegister=false") Bỏ qua
</template>
<script>
// import firebase from '@/plugins/firebase.js';
import sw from "@/modules/iframe/sw";

const firebasePromise = () =>
  import(/* webpackChunkName: "firebase" */ "@/plugins/firebase");

const $ = jQuery,
  _message = firebasePromise().then(firebase => {
    return firebase.default.messaging();
  });

const app = new Promise((resolve, reject) => {
    if ("serviceWorker" in navigator) {
      sw({ scope: "/" })
        .then(async registration => {
          const msg = await _message;
          msg.useServiceWorker(registration);
          resolve(msg);
        }, reject)
        .catch(reject);
    } else reject();
  }),
  registerToken = (dev = false, token) =>
    $.post(SERVER_URL + "noti/register", {
      token,
      ...(dev ? { topics: "/topics/dev" } : {}),
      refresh: true
    }).then(() => {
      console.log("token refreshed");
    });

export default {
  localStorage: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      showRegister: false,
      token: null
    };
  },
  methods: {
    async doToken() {
      const self = this;
      if (!self.token || self.token.length === 0) {
        self.showRegister = self.$ls.get("show", true);
      } else {
        await registerToken(self.$isExperiment, self.token);
        const message = await app;
        message.onTokenRefresh(async () => {
          self.token = await message.getToken();
          await registerToken(self.$isExperiment, self.token);
        });
      }
    },
    async getPermission() {
      const message = await app;
      await message.requestPermission();
      this.token = await message.getToken();
      this.showRegister = false;
      this.doToken();
    },
    splash({ target }) {
      $(target)
        .find(".fa-stack")
        .animateCss("rubberBand");
    },
    ignore() {
      this.showRegister = false;
      this.$ls.set("show", false);
    }
  },
  async mounted() {
    if (this.$browser !== "chrome") return;
    try {
      const message = await app;
      debugger;
      this.token = await message.getToken();
      this.doToken();
    } catch (e) {
      console.error(e);
      //do nothing
    }
  }
};
</script>
