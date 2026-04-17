/* Noir Atelier Travel — Cookie Consent & Analytics */
(function () {

  // ─── Replace with your GA Measurement ID when ready ───
  var GA_ID = 'G-XXXXXXXXXX';
  // ──────────────────────────────────────────────────────

  var STORAGE_KEY = 'noir_cookie_consent';

  function loadGA() {
    if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function removeBanner(banner) {
    banner.style.transform = 'translateY(120%)';
    banner.style.opacity = '0';
    setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 400);
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'noir-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="ncb-inner">' +
        '<div class="ncb-text">' +
          '<p>We use cookies to enhance your experience and analyze site traffic via Google Analytics. By clicking <strong>Accept</strong>, you consent to our use of cookies. You may also <strong>Decline</strong> non-essential cookies. View our <a href="/privacy-policy.html">Privacy Policy</a> for details.</p>' +
        '</div>' +
        '<div class="ncb-actions">' +
          '<button class="ncb-btn ncb-decline" id="ncb-decline">Decline</button>' +
          '<button class="ncb-btn ncb-accept" id="ncb-accept">Accept</button>' +
        '</div>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent =
      '#noir-cookie-banner{' +
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
        'background:rgba(10,9,8,0.97);border-top:1px solid rgba(196,160,90,0.35);' +
        'padding:20px 32px;' +
        'transform:translateY(0);opacity:1;' +
        'transition:transform 0.4s ease,opacity 0.4s ease;' +
        'font-family:"Cormorant Garamond",Georgia,serif;' +
      '}' +
      '.ncb-inner{' +
        'max-width:1100px;margin:0 auto;' +
        'display:flex;align-items:center;justify-content:space-between;gap:32px;' +
        'flex-wrap:wrap;' +
      '}' +
      '.ncb-text p{' +
        'margin:0;font-size:0.9rem;line-height:1.7;color:rgba(230,220,205,0.8);' +
      '}' +
      '.ncb-text a{color:#c4a05a;text-decoration:underline;}' +
      '.ncb-text strong{color:rgba(230,220,205,1);}' +
      '.ncb-actions{display:flex;gap:12px;flex-shrink:0;}' +
      '.ncb-btn{' +
        'padding:10px 24px;font-size:0.75rem;letter-spacing:0.12em;' +
        'text-transform:uppercase;cursor:pointer;border:1px solid rgba(196,160,90,0.5);' +
        'font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;' +
        'transition:background 0.2s,color 0.2s,border-color 0.2s;' +
        'white-space:nowrap;' +
      '}' +
      '.ncb-decline{background:transparent;color:rgba(230,220,205,0.65);}' +
      '.ncb-decline:hover{background:rgba(255,255,255,0.05);color:rgba(230,220,205,1);border-color:rgba(196,160,90,0.8);}' +
      '.ncb-accept{background:#c4a05a;color:#0a0908;border-color:#c4a05a;}' +
      '.ncb-accept:hover{background:#d4b06a;border-color:#d4b06a;}' +
      '@media(max-width:640px){' +
        '.ncb-inner{flex-direction:column;gap:16px;}' +
        '.ncb-actions{width:100%;justify-content:flex-end;}' +
        '#noir-cookie-banner{padding:20px 20px;}' +
      '}';

    document.head.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById('ncb-accept').addEventListener('click', function () {
      setConsent('accepted');
      loadGA();
      removeBanner(banner);
    });

    document.getElementById('ncb-decline').addEventListener('click', function () {
      setConsent('declined');
      removeBanner(banner);
    });
  }

  // On load: check existing consent
  var existing = getConsent();
  if (existing === 'accepted') {
    loadGA();
  } else if (!existing) {
    // No decision yet — show banner after a short delay
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(showBanner, 800); });
    } else {
      setTimeout(showBanner, 800);
    }
  }
  // If 'declined', do nothing (no GA, no banner)

})();
