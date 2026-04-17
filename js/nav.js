/* Noir Atelier Travel — Shared Nav + Footer injector */
/* Uses absolute paths so it works from any subdirectory */
(function () {
  const NAV_HTML = `
<nav class="nav" id="mainNav">
  <div class="nav-inner">
    <a href="/index.html" class="nav-logo" aria-label="Noir Atelier Travel Home">
      <img src="/images/Logo/logo-2-gold.svg" alt=""/>
      <span class="nav-logo-text">Noir Atelier Travel</span>
    </a>
    <ul class="nav-links">
      <li class="nav-drop">
        <button class="nav-drop-toggle" data-page="services">Experiences <span class="chevron"></span></button>
        <div class="nav-dropdown">
          <a href="/services.html#custom-trips">Custom Trip Planning</a>
          <a href="/services/river-cruises.html">River Cruises</a>
          <a href="/soulful.html">Soulful Experience</a>
          <a href="/services/milestones.html">Milestones &amp; Celebrations</a>
          <a href="/services/group-travel.html">Group Travel</a>
        </div>
      </li>
      <li class="nav-drop">
        <button class="nav-drop-toggle" data-page="destinations">Destinations <span class="chevron"></span></button>
        <div class="nav-dropdown">
          <a href="/destinations.html" style="color:var(--gold);font-style:italic;">View All Destinations</a>
          <a href="/cambodia.html">Cambodia</a>
          <a href="/colombia.html">Colombia</a>
          <a href="/egypt.html">Egypt</a>
          <a href="/france.html">France</a>
          <a href="/germany.html">Germany</a>
          <a href="/netherlands.html">Netherlands</a>
          <a href="/portugal.html">Portugal</a>
          <a href="/south-africa.html">South Africa</a>
          <a href="/switzerland.html">Switzerland</a>
          <a href="/vietnam.html">Vietnam</a>
        </div>
      </li>
      <li><a href="/soulful.html" data-page="soulful">Soulful</a></li>
      <li><a href="/blog/index.html" data-page="blog">Blog Noir</a></li>
    </ul>
    <a href="/work-with-us.html" class="btn nav-cta" data-page="work">Plan Your Journey</a>
    <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-mobile" id="mobileMenu">
  <a href="/index.html" class="nav-mobile-link" data-page="home">Home</a>
  <div>
    <button class="nav-mobile-link mob-toggle" style="width:100%;background:none;border:none;cursor:pointer;font-family:var(--font-d);font-size:1.4rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);padding:16px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      Experiences <span class="mob-chevron" style="display:inline-block;width:10px;height:10px;border-right:1.5px solid var(--gold);border-bottom:1.5px solid var(--gold);transform:rotate(45deg) translateY(-2px);transition:transform 0.2s;"></span>
    </button>
    <div class="nav-mobile-sub">
      <a href="/services.html">All Services</a>
      <a href="/services/river-cruises.html">River Cruises</a>
      <a href="/soulful.html">Soulful Experience</a>
      <a href="/services/milestones.html">Milestones &amp; Celebrations</a>
      <a href="/services/group-travel.html">Group Travel</a>
    </div>
  </div>
  <div>
    <button class="nav-mobile-link mob-toggle" style="width:100%;background:none;border:none;cursor:pointer;font-family:var(--font-d);font-size:1.4rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);padding:16px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      Destinations <span class="mob-chevron" style="display:inline-block;width:10px;height:10px;border-right:1.5px solid var(--gold);border-bottom:1.5px solid var(--gold);transform:rotate(45deg) translateY(-2px);transition:transform 0.2s;"></span>
    </button>
    <div class="nav-mobile-sub">
      <a href="/destinations.html">View All Destinations</a>
      <a href="/cambodia.html">Cambodia</a>
      <a href="/colombia.html">Colombia</a>
      <a href="/egypt.html">Egypt</a>
      <a href="/france.html">France</a>
      <a href="/germany.html">Germany</a>
      <a href="/netherlands.html">Netherlands</a>
      <a href="/portugal.html">Portugal</a>
      <a href="/south-africa.html">South Africa</a>
      <a href="/switzerland.html">Switzerland</a>
      <a href="/vietnam.html">Vietnam</a>
    </div>
  </div>
  <a href="/soulful.html" class="nav-mobile-link" data-page="soulful">Soulful</a>
  <a href="/blog/index.html" class="nav-mobile-link" data-page="blog">Blog Noir</a>
  <a href="/work-with-us.html" class="nav-mobile-link nav-mobile-cta">Plan Your Journey</a>
</div>`;

  const FOOTER_HTML = `
<footer class="footer footer-grid">
  <div class="footer-col footer-brand">
    <img src="/images/Logo/logo-2-gold.svg" alt="Noir Atelier Travel" class="footer-logo"/>
    <p class="footer-tagline">Culture. Connection. Distinction.</p>
    <a href="mailto:info@noirateliertravel.com" class="footer-email">info@noirateliertravel.com</a>
  </div>
  <div class="footer-col">
    <h4 class="footer-col-head">Explore</h4>
    <ul class="footer-col-links">
      <li><a href="/services.html">Experiences</a></li>
      <li><a href="/destinations.html">Destinations</a></li>
      <li><a href="/services/river-cruises.html">River Cruises</a></li>
      <li><a href="/blog/index.html">Blog Noir</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4 class="footer-col-head">Company</h4>
    <ul class="footer-col-links">
      <li><a href="/work-with-us.html">Work With Us</a></li>
      <li><a href="/privacy-policy.html">Privacy Policy</a></li>
      <li><a href="/terms.html">Terms &amp; Conditions</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4 class="footer-col-head">Connect</h4>
    <div class="footer-social">
      <a href="#" aria-label="Instagram" class="footer-social-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="#" aria-label="Facebook" class="footer-social-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="#" aria-label="TikTok" class="footer-social-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
      </a>
      <a href="#" aria-label="Pinterest" class="footer-social-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.866 3.136-4.561 0-2.386-1.716-4.054-4.165-4.054-2.837 0-4.5 2.127-4.5 4.327 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.285c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
      </a>
    </div>
    <form class="footer-newsletter" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">
      <input name="bot-field" type="hidden"/>
      <input type="email" name="email" placeholder="Your email address" class="footer-newsletter-input" required/>
      <button type="submit" class="footer-newsletter-btn">Subscribe</button>
    </form>
    <p style="font-size:0.72rem;color:rgba(230,220,205,0.4);margin-top:10px;line-height:1.6;">By subscribing, you agree to receive marketing emails from Noir Atelier Travel. You may unsubscribe at any time. View our <a href="/privacy-policy.html" style="color:rgba(196,160,90,0.7);text-decoration:underline;">Privacy Policy</a>.</p>
  </div>
  <div class="footer-bottom">
    <p class="footer-copy">&copy; 2025 Noir Atelier Travel. All rights reserved.</p>
    <ul class="footer-links">
      <li><a href="/privacy-policy.html">Privacy Policy</a></li>
      <li><span class="footer-divider"></span></li>
      <li><a href="#">Accessibility</a></li>
      <li><span class="footer-divider"></span></li>
      <li><a href="/terms.html">Terms &amp; Conditions</a></li>
      <li><span class="footer-divider"></span></li>
      <li><a href="/terms.html#cancellation">Refund Policy</a></li>
    </ul>
  </div>
</footer>`;

  // Inject nav at top of body
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  // Inject footer at end of body
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Active nav link
  const page = document.body.dataset.page || '';
  document.querySelectorAll('.nav-links [data-page], .nav-mobile-link[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // Scroll effect
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(10,9,8,0.98)'
      : 'rgba(10,9,8,0.92)';
  });

  // Hamburger
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });

  // Mobile sub-menus
  document.querySelectorAll('.mob-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      sub.classList.toggle('open');
      const ch = btn.querySelector('.mob-chevron');
      if (ch) ch.style.transform = sub.classList.contains('open')
        ? 'rotate(225deg) translateY(-2px)'
        : 'rotate(45deg) translateY(-2px)';
    });
  });

  // Cookie consent
  var ccScript = document.createElement('script');
  ccScript.src = '/js/cookie-consent.js';
  document.body.appendChild(ccScript);

  // Mobile region toggles (River Cruises sub-menu)
  document.querySelectorAll('.mob-region-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      sub.classList.toggle('open');
      const ch = btn.querySelector('.mob-region-chevron');
      if (ch) ch.style.transform = sub.classList.contains('open')
        ? 'rotate(90deg)'
        : 'rotate(0deg)';
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = body.classList.contains('open');
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('open'));
      if (!isOpen) { body.classList.add('open'); btn.classList.add('open'); }
    });
  });
})();
