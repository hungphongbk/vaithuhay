import Vue from "vue";
import store from "@/store/index";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.use(
  VueSocketIO,
  SocketIO("https://api.v1.hungphongbk.com", {
    path: "/vaithuhay/b/socket.io"
  }),
  store
);
