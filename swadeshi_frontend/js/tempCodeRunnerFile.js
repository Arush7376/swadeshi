// js/api.js
// ---------------------------------------------
// Central API layer for Swadeshi Tourism Frontend
// ---------------------------------------------

// Change this when your backend is ready
const API_BASE = window.SWADESHI_API_BASE || 'http://localhost:5000/api';

// --- Demo fallback data ---
// These arrays let the UI work without a backend
const DEMO_DESTS = [
  { id:1, name:'Rishikesh', region:'North', description:'Yoga, Ganga, and adventure sports' },
  { id:2, name:'Hampi',     region:'South', description:'Ancient ruins and boulder landscapes' },
  { id:3, name:'Puri',      region:'East',  description:'Temples and coastal cuisine' },
  { id:4, name:'Kutch',     region:'West',  description:'Handicrafts and salt flats' }
];

const DEMO_PRODUCTS = [
  { id:1, title:'Handloom Shawl',  price:899, vendor:'Artisan Co.' },
  { id:2, title:'Terracotta Set',  price:499, vendor:'ClayWorks'   },
  { id:3, title:'Spice Box',       price:299, vendor:'TasteLocal'  }
];

// Helper: fetch with graceful error handling
async function safeFetch(url, opts){
  try {
    const res = await fetch(url, opts);
    if(!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for', url, err.message);
    return null;
  }
}

// Public functions used by other JS files
async function getDestinations(){
  const r = await safeFetch(`${API_BASE}/destinations`);
  return r || DEMO_DESTS;   // fallback to demo
}

async function getProducts(){
  const r = await safeFetch(`${API_BASE}/products`);
  return r || DEMO_PRODUCTS;
}

async function getWeather(city){
  const r = await safeFetch(`${API_BASE}/weather/${encodeURIComponent(city)}`);
  if(r) return r;
  // fallback demo weather (temperature in Kelvin)
  return { weather:[{description:'clear sky'}], main:{temp:298} };
}
