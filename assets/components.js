/* ============================================================
   VIVID NETWORK — Shared components (nav, footer, mobile menu)
   ============================================================ */

const NAV_ITEMS = [
  { label: "Home", href: "index.html", key: "home" },
  { label: "Articles", href: "articles.html", key: "articles" },
  { label: "Vivid Voices", href: "vivid-voices.html", key: "voices" },
  { label: "About", href: "about.html", key: "about" },
  { label: "Get Involved", href: "get-involved.html", key: "involved" },
  { label: "Contact", href: "contact.html", key: "contact" },
];

function renderNav(activeKey){
  const links = NAV_ITEMS.map(item =>
    `<a href="${item.href}" class="${item.key === activeKey ? 'active' : ''}">${item.label}</a>`
  ).join("");

  const mobileLinks = NAV_ITEMS.map(item =>
    `<li><a href="${item.href}">${item.label}</a></li>`
  ).join("") + `<li><a href="search.html">Search</a></li>`;

  const navRoot = document.getElementById("nav-root");
  if(!navRoot) return;

  navRoot.innerHTML = `
    <header class="nav" id="site-nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo display">VIVID NETWORK</a>
        <nav aria-label="Primary">
          <ul class="nav-links">${links}</ul>
        </nav>
        <div class="nav-right">
          <a href="search.html" class="nav-search-btn desktop-only" aria-label="Search Vivid Network">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
          <a href="get-involved.html#submit" class="nav-cta desktop-only">Share Your Story</a>
          <button class="nav-burger" id="burger-btn" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu">
      <ul>${mobileLinks}</ul>
      <a href="get-involved.html#submit" class="btn btn-primary">Share Your Story</a>
    </div>
  `;

  const navEl = document.getElementById("site-nav");
  const onScroll = () => {
    if(window.scrollY > 40){ navEl.classList.add("is-scrolled"); }
    else{ navEl.classList.remove("is-scrolled"); }
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  const burger = document.getElementById("burger-btn");
  const menu = document.getElementById("mobile-menu");
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    menu.classList.toggle("is-open");
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    menu.classList.remove("is-open");
  }));
}

function renderFooter(){
  const footerRoot = document.getElementById("footer-root");
  if(!footerRoot) return;

  footerRoot.innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="display">VIVID NETWORK</div>
            <div class="tag1">A Youth Brand.</div>
            <div class="tag2">By youth. For youth.</div>
          </div>
          <div class="footer-links">
            <div class="footer-col">
              <h4>Site</h4>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="articles.html">Articles</a></li>
                <li><a href="vivid-voices.html">Vivid Voices</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="get-involved.html">Get Involved</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Follow</h4>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">YouTube</a></li>
                <li><a href="#">Spotify</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="imprint">Real Stories. Real Teens. Real Impact.</div>
          <div class="copy">© 2026 Vivid Network</div>
        </div>
      </div>
    </footer>
  `;
}

function initReveal(){
  const els = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window) || !els.length){
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  initReveal();
});
