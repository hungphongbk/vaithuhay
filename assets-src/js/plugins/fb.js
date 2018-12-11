const $ = jQuery;
export default new Promise(resolve => {
  $.ajaxSetup({ cache: true });
  $.getScript("//connect.facebook.net/vi-VN/sdk.js", () => {
    window.FB.init({
      appId: "246837025841849",
      version: "v2.10" // or v2.1, v2.2, v2.3, ...
    });
    resolve(
      (...args) =>
        new Promise(resolve => {
          window.FB.api(...args, response => resolve(response));
        })
    );
  });
});
