// Sample Data
const itinerary = [
  {place: "Jaipur", date: "2025-10-10", activity: "City Palace Visit"},
  {place: "Varanasi", date: "2025-10-12", activity: "Ganga Aarti"},
];

const bookings = [
  {service: "Hotel - Jaipur", status: "Confirmed"},
  {service: "Bus - Varanasi", status: "Pending"},
];

const cartItems = [
  {item: "Handicraft Bag", price: 1200},
  {item: "Spices Pack", price: 500},
];

const savedDestinations = [
  "Goa Beach", "Kerala Backwaters", "Himachal Pradesh"
];

// Render Functions
function renderItinerary() {
  const container = document.getElementById('itineraryContainer');
  container.innerHTML = itinerary.map(i => `
    <div class="card">
      <h3>${i.place} - ${i.date}</h3>
      <p>${i.activity}</p>
    </div>
  `).join('');
}

function renderBookings() {
  const container = document.getElementById('bookingsContainer');
  container.innerHTML = bookings.map(b => `
    <div class="card">
      <p>${b.service}</p>
      <p>Status: ${b.status}</p>
    </div>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cartContainer');
  container.innerHTML = cartItems.map(c => `
    <div class="card">
      <p>${c.item}</p>
      <p>Price: ₹${c.price}</p>
    </div>
  `).join('');
}

function renderSavedDestinations() {
  const container = document.getElementById('savedDestinationsContainer');
  container.innerHTML = savedDestinations.map(d => `
    <div class="card">
      <p>${d}</p>
    </div>
  `).join('');
}

// Initial Render
renderItinerary();
renderBookings();
renderCart();
renderSavedDestinations();
// Existing dashboard code
function renderDashboard() {
  // old UI rendering code
}

// New backend connection
async function fetchData() {
  try {
    const response = await fetch('http://localhost:5000/api/data');
    const data = await response.json();
    console.log(data);
    // use data in your dashboard
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call fetchData somewhere appropriate
fetchData();
