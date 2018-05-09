<style lang="scss" scoped>
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
    .fa-inverse {
      color: $theme-red-color;
    }
    &-body {
      padding: 1rem {
        bottom: .3rem;
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
        top: .7rem;
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

    @include responsive('xs-max') {
      right: 1rem;
    }
    @include responsive('sm-min') {
      width: 220px;
      height: auto;
    }
  }
</style>
<template lang="pug">
  div
    transition(name="vth-fade-slide-up")
      .toast(v-if="showRegister", ref="reg", @mouseover="splash($event)")
        .toast-body
          span.fa-stack.fa-2x.pull-left.mr-2
            i.fa.fa-circle.fa-stack-2x
            i.fa.fa-bell-o.fa-stack-1x.fa-inverse
          p Hãy nhấn "Theo dõi" để không bỏ lỡ những sản phẩm, tin tức mới từ Vaithuhay.com!
          .clearfix
        .toast-btn-wrapper
          .toast-btn(@click="getPermission") Theo dõi
          .toast-btn(@click="showRegister=false") Bỏ qua
</template>
<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/messaging';
  import sw       from '@/modules/iframe/sw';

  firebase.initializeApp({
    apiKey: "AIzaSyDu888R1nyP_W_xFX7aATSB0U5irf79lrM",
    authDomain: "hungphongbk-1812.firebaseapp.com",
    databaseURL: "https://hungphongbk-1812.firebaseio.com",
    projectId: "hungphongbk-1812",
    storageBucket: "hungphongbk-1812.appspot.com",
    messagingSenderId: "1926697148"
  });

  const $ = jQuery,
    _message = firebase.messaging();

  const app = new Promise((resolve, reject) => {
      if ('serviceWorker' in navigator) {
        sw({scope: '/'})
          .then(registration => {
            _message.useServiceWorker(registration);
            resolve(_message);
          })
          .catch(reject);
      } else reject();
    }),
    registerToken = (token, dev = false) => $.post('https://api.v1.hungphongbk.com/vaithuhay/b/noti/register', {
      token,
      ...(dev ? {topics: '/topics/dev'} : {}),
      refresh: true
    }).then(() => {
      console.log('token refreshed');
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
        const self = this,
          token = self.token;
        if ((!token) || token.length === 0) {
          self.showRegister = self.$localStorage.get('show', true);
        } else {
          await registerToken(self.$isExperiment, token);
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
      splash({target}) {
        $(target).find('.fa-stack').animateCss('rubberBand');
      },
      ignore() {
        this.showRegister = false;
        this.$localStorage.set('show', false);
      }
    },
    async mounted() {
      if (this.$browser !== 'chrome') return;
      try {
        const message = await app;
        this.token = await message.getToken();
        this.doToken();
      } catch (e) {
        //do nothing
      }
    }
  };
</script>
