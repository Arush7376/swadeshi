// js/main.js
// ---------------------------------------------
// Global scripts for Swadeshi Tourism Frontend
// ---------------------------------------------

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

if(navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    // toggle nav visibility
    if(mainNav.style.display === 'flex'){
      mainNav.style.display = 'none';
    } else {
      mainNav.style.display = 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.background = 'white';
      mainNav.style.padding = '1rem';
      mainNav.style.gap = '1rem';
    }
  });
}

// ===== Smooth scroll helper (optional) =====
// Call smoothScrollTo('#section-id') to scroll smoothly to an element
function smoothScrollTo(selector){
  const el = document.querySelector(selector);
  if(el) el.scrollIntoView({ behavior:'smooth' });
}

// Expose helper globally if needed
window.smoothScrollTo = smoothScrollTo;

