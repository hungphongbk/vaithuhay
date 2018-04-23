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

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
  }

  var isExperiment = getUrlParameter("experiment")
  if (isExperiment)
    console.log('EXPERIMENT MODE');

  function transform(url) {
    // if (isExperiment) {
    //   return url.replace(/(.*)\.(css|js)(.*)/, '$1.experiment.$2$3');
    // }
    return url;
  }

  return {
    isDev: getCookie('dev') === "1",
    isExperiment: isExperiment,
    transform: transform,
    loadCss: function (url) {
      url = transform(url);
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.type = 'text/css';
      var before = document.getElementsByTagName('link')[0];
      before.parentNode.insertBefore(link, before);
    },
    loadJs: function (url) {
      if (typeof url === 'string') url = [url];
      (function r() {
        if (url.length > 0) $.cachedScript(transform(url.shift())).done(r);
      })();
    }
  }
})(window, document, document.cookie);
