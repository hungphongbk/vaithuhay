/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/YYPcyY
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: "manifest.json",
    revision: "11496d87bfec777f4d5b6ee89646a4e2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /^https:\/\/vaithuhay\.com\//,
  workbox.strategies.networkFirst({
    networkTimeoutSeconds: 6,
    cacheName: "doc",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
        headers: { "Content-Type": "text/html" }
      })
    ]
  }),
  "GET"
);
workbox.routing.registerRoute(
  /^https:\/\/static\.vaithuhay\.com\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "resource",
    plugins: [new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })]
  }),
  "GET"
);
