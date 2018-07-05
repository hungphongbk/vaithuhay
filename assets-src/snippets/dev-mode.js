(function (window, $) {
  function toggleDev(dev) {
    $.ajax({
      type: 'POST',
      url: '/cart/update.js',
      data: 'attributes[dev]=' + (dev ? 'true' : 'false'),
      dataType: 'json',
      success: function () {
        console.log('DevMode ' + (dev ? 'enabled' : 'disabled') + '. F5 again');
      }
    });
  }

  window.enterDevMode = function () {
    toggleDev(true);
  };
  window.exitDevMode = function () {
    toggleDev(false);
  };
})(window, jQuery);
