// importScripts('/local-sw-analytics.js');
import sendPushNotificationAnalyticsEvent from './local-sw-analytics';
import './local-sw-cache';
import firebase                           from 'firebase/app';
import 'firebase/messaging';

self.addEventListener('install', event => {
  console.log('[vaithuhay.com] Service Worker cài đặt thành công!');
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {

  const json = event.data.json();
  let id;
  if (json)
    id = json.notification.tag;
  else id = null;

  event.waitUntil(
    // Promise.all([
    //   self.registration.showNotification(
    //     notificationTitle, notificationOptions),
    sendPushNotificationAnalyticsEvent('received', 'push', id)
    // ])
  );
});

// Event phải được đưa lên trước khi init FCM
// Lý do: stopImmediatePropagation() trong event notificationclick của FCM
//    chặn kích hoạt các callback phía sau
self.addEventListener('notificationclick', event => {
  event.waitUntil(
    // Promise.all([
    //   clickResponsePromise,
    sendPushNotificationAnalyticsEvent('click', 'notification', event.notification.tag)
    // ])
  );
});
self.addEventListener('notificationclose', event => {
  event.waitUntil(
    sendPushNotificationAnalyticsEvent('close', 'notification', event.notification.tag)
  );
});

// self.addEventListener('fetch', event => {
//   event.respondWith(fetchAndApply(event.request))
// })

// function fetchAndApply(request) {
//   console.log(request.url);
//   if (/manifest.json/.test(request.url)) {
//     return new Response(
//       JSON.stringify({foo: 'bar'}),
//       {
//         status: 200,
//         headers: new Headers({'Content-Type': 'application/json'})
//       }
//     )
//   }
//
//   return fetch(request)
// }

firebase.initializeApp({
  'messagingSenderId': '1926697148'
});
const messaging = firebase.messaging();
