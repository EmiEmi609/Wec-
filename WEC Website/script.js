// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.querySelector(".menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.hidden = isExpanded; // if expanded, hide; else show
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

// Drag-to-scroll (VOUS-style) for values track
// Horizontal-on-vertical scroll for Values section (pinned)
(function setupHorizontalValuesScroll(){
  const section = document.querySelector(".valuesSection");
  const track = document.querySelector("[data-horizontal-track]");
  if (!section || !track) return;

  let ticking = false;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function setSectionHeight(){
    // Amount of horizontal overflow we need to reveal
    const totalScrollX = track.scrollWidth - track.clientWidth;

    // Map horizontal distance to vertical scroll distance.
    // 1px vertical = 1px horizontal feels natural; increase multiplier if you want slower horizontal movement.
    const multiplier = 1; 
    const extra = totalScrollX * multiplier;

    // Section height must be: viewport height + extra scrolling room
    const vh = window.innerHeight;
    section.style.height = `${vh + extra}px`;
  }

  function update(){
    ticking = false;

    const rect = section.getBoundingClientRect();
    const sectionTopInDoc = window.scrollY + rect.top;

    // How far the user has scrolled INTO the section (in document space)
    const y = window.scrollY - sectionTopInDoc;

    const totalScrollX = track.scrollWidth - track.clientWidth;
    const maxY = section.offsetHeight - window.innerHeight;

    if (totalScrollX <= 0 || maxY <= 0) return;

    // Progress 0..1 through the pinned section
    const progress = clamp(y / maxY, 0, 1);

    // Convert to horizontal scroll
    track.scrollLeft = progress * totalScrollX;
  }

  function onScroll(){
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  // Initial
  setSectionHeight();
  update();

  // Events
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    setSectionHeight();
    update();
  });
})();


// Optional: subtle header shadow on scroll
const header = document.querySelector(".header");
let lastY = 0;

window.addEventListener("scroll", () => {
  const y = window.scrollY || 0;
  if (!header) return;

  if (y > 10 && y >= lastY) {
    header.style.boxShadow = "0 10px 40px rgba(0,0,0,0.28)";
  } else if (y <= 10) {
    header.style.boxShadow = "none";
  }
  lastY = y;
});
