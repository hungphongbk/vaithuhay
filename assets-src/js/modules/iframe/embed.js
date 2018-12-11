import { Messaging, post } from "@/modules/iframe/inc";

const log = message => console.log("[sw/embed] " + message);

function entry(message) {
  //for debug only: show current token
  message
    .getToken()
    .then(function(token) {
      return post("https://server.vaithuhay.com/b/noti/register", {
        token,
        refresh: true
      });
    })
    .then(() => {
      log("token refreshed");
      window.parent.postMessage({ token: true }, "https://vaithuhay.com");
    })
    .catch(e => {
      log(e.message);
      window.parent.postMessage({ token: false }, "https://vaithuhay.com");
    });

  //on refresh token
  message.onTokenRefresh(function() {
    message
      .getToken()
      .then(function(token) {
        return post("https://server.vaithuhay.com/b/noti/register", {
          token,
          refresh: true
        });
      })
      .then(() => log("token refreshed"));
  });
}

Messaging.then(entry);
