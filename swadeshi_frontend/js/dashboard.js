let itinerary = [
  { place: 'Jaipur', date: '2025-10-10', activity: 'City Palace Visit' },
  { place: 'Varanasi', date: '2025-10-12', activity: 'Ganga Aarti' }
];

let bookings = [
  { service: 'Hotel - Jaipur', status: 'Confirmed' },
  { service: 'Bus - Varanasi', status: 'Pending' }
];

let cartItems = [
  { item: 'Handicraft Bag', price: 1200 },
  { item: 'Spices Pack', price: 500 }
];

let savedDestinations = ['Goa Beach', 'Kerala Backwaters', 'Himachal Pradesh'];

function renderItinerary() {
  const container = document.getElementById('itineraryContainer');
  if (!container) return;
  container.innerHTML = itinerary
    .map(
      (i) => `
    <div class="card">
      <h3>${i.place} - ${i.date}</h3>
      <p>${i.activity}</p>
    </div>
  `
    )
    .join('');
}

function renderBookings() {
  const container = document.getElementById('bookingsContainer');
  if (!container) return;
  container.innerHTML = bookings
    .map(
      (b) => `
    <div class="card">
      <p>${b.service}</p>
      <p>Status: ${b.status}</p>
    </div>
  `
    )
    .join('');
}

function renderCart() {
  const container = document.getElementById('cartContainer');
  if (!container) return;
  container.innerHTML = cartItems
    .map(
      (c) => `
    <div class="card">
      <p>${c.item}</p>
      <p>Price: INR ${c.price}</p>
    </div>
  `
    )
    .join('');
}

function renderSavedDestinations() {
  const container = document.getElementById('savedDestinationsContainer');
  if (!container) return;
  container.innerHTML = savedDestinations
    .map(
      (d) => `
    <div class="card">
      <p>${d}</p>
    </div>
  `
    )
    .join('');
}

function renderAll() {
  renderItinerary();
  renderBookings();
  renderCart();
  renderSavedDestinations();
}

async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) return;
    const data = await response.json();

    if (Array.isArray(data.itinerary)) itinerary = data.itinerary;
    if (Array.isArray(data.bookings)) bookings = data.bookings;
    if (Array.isArray(data.cartItems)) cartItems = data.cartItems;
    if (Array.isArray(data.savedDestinations)) savedDestinations = data.savedDestinations;
  } catch (error) {
    // Keep fallback demo data when API is unavailable.
  } finally {
    renderAll();
  }
}

document.addEventListener('DOMContentLoaded', fetchData);
