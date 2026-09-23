/* ============================================================
   VIVID NETWORK — Hero background typography
   Every phrase travels RIGHT → LEFT, on a seamless looped track
   (each track renders the phrase twice, animates -50%, so the
   repeat is invisible). Speeds vary slightly per row. Subtle
   cursor parallax on desktop only; disabled on mobile / reduced
   motion.
   ============================================================ */

const HERO_PHRASES = [
  { text: "BY YOUTH",     tone: "" ,       duration: 26 },
  { text: "FOR YOUTH",    tone: "purple",  duration: 32 },
  { text: "REAL STORIES", tone: "",        duration: 22 },
  { text: "REAL TEENS",   tone: "gold",    duration: 30 },
  { text: "REAL IMPACT",  tone: "purple",  duration: 25 },
];

function buildHeroTypeLayer(){
  const layer = document.getElementById("hero-type-layer");
  if(!layer) return;

  layer.innerHTML = HERO_PHRASES.map((p) => {
    return `
      <div class="hero-type-row ${p.tone ? 'tone-'+p.tone : ''}">
        <div class="hero-type-track" style="animation-duration:${p.duration}s;">
          <span>${p.text}</span><span>${p.text}</span><span>${p.text}</span>
        </div>
      </div>`;
  }).join("");

  // stagger starting offsets so rows don't move in visual lockstep
  const tracks = layer.querySelectorAll(".hero-type-track");
  tracks.forEach((t, i) => {
    t.style.animationDelay = `-${(i * 4.5)}s`;
  });
}

function initHeroParallax(){
  const layer = document.getElementById("hero-type-layer");
  const hero = document.getElementById("hero");
  if(!layer || !hero) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(min-width: 981px)").matches;
  if(reduceMotion || !isDesktop) return;

  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = relX * 14;   // max ~14px horizontal drift
    targetY = relY * 8;    // max ~8px vertical drift
  });

  function tick(){
    curX += (targetX - curX) * 0.04;
    curY += (targetY - curY) * 0.04;
    layer.style.transform = `translate(${curX}px, ${curY}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeroTypeLayer();
  initHeroParallax();
});
