var o = (function (window, document, cookie) {
  var $ = jQuery;

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  $.cachedScript = function (url, options) {

    // Allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
      dataType: "script",
      cache: true,
      url: url
    });


    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return $.ajax(options);
  };

  return {
    isDev: getCookie('dev') === "1",
    loadJs: function (url) {
      if (typeof url === 'string') url = [url];
      (function r() {
        if (url.length > 0) {
          $.cachedScript(url.shift());
          r();
        }//.done(r);
      })();
    }
  };
})(window, document, document.cookie);
console.log(o);
