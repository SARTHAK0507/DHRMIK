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
    var WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxnjxji3ZK6LCeo9Olry3tyb_MlYyeQgQ1zbLz-mju2q8CGWEZaVBTG50ClwZsCfU9p/exec';

    function reveal() {
      firstNameEl.textContent = name.split(/\s+/)[0];
      form.hidden = true;
      success.hidden = false;
    }

    // no-cors mode: the browser sends the request but won't let us read the
    // response. For a fire-and-forget waitlist write, that's fine - Apps Script
    // still receives and stores the data.
    fetch(WAITLIST_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: name, email: email, phone: phone })
    })
      .then(reveal)
      .catch(function () {
        reveal();
      });
  });
})();
