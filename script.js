(function () {
  var stage = document.getElementById('stage');
  var glow = document.getElementById('glow');
  var form = document.getElementById('waitlist');
  var errorEl = document.getElementById('error');
  var success = document.getElementById('success');
  var firstNameEl = document.getElementById('firstName');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Cursor-following aura (pointer devices only)
  if (window.matchMedia('(hover: hover)').matches) {
    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect();
      glow.style.left = ((e.clientX - r.left) / r.width) * 100 + '%';
      glow.style.top = ((e.clientY - r.top) / r.height) * 100 + '%';
    });
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();

    if (!name) return showError('Please tell us your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('Please enter a valid email address.');
    if (phone.replace(/\D/g, '').length < 10) return showError('Please enter a valid phone number.');

    // Sends to the Google Apps Script Web App deployed from the Sheet.
    var WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyvHalCh6k-0iEj_dFdUWQog1Uwo4Xdu2S5-uxuAr1CEvH068q1V4BN2nRyNgUaK6M/exec';

    function reveal() {
      firstNameEl.textContent = name.split(/\s+/)[0];
      form.hidden = true;
      success.hidden = false;
    }

    if (WAITLIST_ENDPOINT.indexOf('PASTE_YOUR') === 0) {
      // Endpoint not configured yet — still show success locally so the form isn't broken.
      reveal();
      return;
    }

    fetch(WAITLIST_ENDPOINT, {
      method: 'POST',
      // text/plain avoids a CORS preflight that Apps Script doesn't handle well.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: name, email: email, phone: phone })
    })
      .then(reveal)
      .catch(function () {
        // Even if the network call fails, don't strand the user — but you can
        // change this to showError('Something went wrong, please try again.') instead.
        reveal();
      });
  });
})();
