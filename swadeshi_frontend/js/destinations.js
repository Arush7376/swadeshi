// js/destinations.js
// ---------------------------------------------
// Dynamically load and display destinations
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('dest-grid');

  // Fetch from API layer (with demo fallback)
  const destinations = await getDestinations();

  // Render cards
  destinations.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card destination-card';
    card.innerHTML = `
      <h3>${d.name}</h3>
      <p>${d.description}</p>
      <p class="muted"><strong>Region:</strong> ${d.region}</p>
    `;
    grid.appendChild(card);
  });
});
