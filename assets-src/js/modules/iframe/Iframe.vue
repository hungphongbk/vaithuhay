<style>
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
</style>
<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  #app {
    background-color: darken(#fff, 50%);
    padding: 1.2rem;
  }

  #app, #inner {
    height: 100%;
  }

  #inner {
    background-color: white;
    border-radius: .5rem;
    @extend %box-shadow-2;
    > * {
      padding: 1.2rem;
    }
  }

  h3 {
    font-weight: 600;
  }

  .body {
    background-color: lighten($theme-color, 10%);
  }

  button {
    color: #009688;
  }
</style>
<template lang="pug">
  #app
    #inner
      .title
        h3 Đăng kí nhận tin tức
      .body
        p ahihi
      div
        button(@click="register") Đăng kí
</template>
<script>

  import {Messaging, post} from "@/modules/iframe/inc";

  const register = async function () {
    // document.domain = 'vaithuhay.com';
    const self = this;
    if ('serviceWorker' in navigator) {
      const messaging = await Messaging;
      // messaging.onMessage(function (payload) {
      //   console.log("Message received. ", payload);
      //   const {notification} = payload;
      //   new Notification(notification.title, {
      //     body: notification.body
      //   });
      // });
      // window.addEventListener('load', async () => {
      try {
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log(token);
        self.token = token;
        await post('https://server.vaithuhay.com/b/noti/register', {token});
        window.close();
      } catch (e) {
        alert(e.message);
      }
    }
  };

  export default {
    data() {
      return {
        token: null
      };
    },
    methods: {
      register
    }
  };
</script>
