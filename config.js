/* ALUMATE settings. Only the two settings below are ever edited. */
window.ALUMATE_API = 'https://script.google.com/macros/s/AKfycbxhaE5e5E2HtnxI-ovgO23ePdF4evMbX9Ewkt2PPOvP5FowIAfF7hrqvbZMQoHRGkF3MA/exec';   // the web app address from Apps Script (ends with /exec)
window.ALUMATE_DEMO = true;   // true shows the "demonstration version" notice on the registration page

/* Lets the pages talk to the Google Sheet. Nothing below needs to be changed. */
(function () {
  var NAMES = ['register', 'countBlocked', 'publicInfo', 'myStatus', 'uploadTranscript', 'tVerify', 'tStart', 'tSubmit', 'api'];
  function call(fn, args, ok, fail) {
    var done = false;
    function bad(m) { if (!done) { done = true; if (fail) fail({ message: m }); } }
    if (!/^https?:\/\/[^\s]+$/.test(window.ALUMATE_API || '')) { bad('The web app address is not set in config.js.'); return; }
    fetch(window.ALUMATE_API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ fn: fn, args: args }) })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (done) return; done = true;
        if (r && r.ok) { if (ok) ok(r.value); } else if (fail) fail({ message: (r && r.error) || 'Something went wrong.' });
      })
      .catch(function () { bad('Could not reach the server.'); });
  }
  function runner(ok, fail) {
    var o = {
      withSuccessHandler: function (f) { return runner(f, fail); },
      withFailureHandler: function (f) { return runner(ok, f); }
    };
    NAMES.forEach(function (n) { o[n] = function () { call(n, Array.prototype.slice.call(arguments), ok, fail); }; });
    return o;
  }
  window.google = { script: { run: runner() } };
})();
