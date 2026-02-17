// js/destinations.js
// ---------------------------------------------
// Dynamically load and display destinations
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('dest-grid') || document.getElementById('dest-preview');
  if (!grid) return;

  // Fetch from API layer (with demo fallback)
  const destinations = await getDestinations();
  const items = grid.id === 'dest-preview' ? destinations.slice(0, 3) : destinations;

  // Render cards
  items.forEach(d => {
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
