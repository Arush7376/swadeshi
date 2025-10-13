const safetyAlerts = [
  {id: 1, message: "Heavy rainfall expected in Northern region. Exercise caution."},
  {id: 2, message: "Local festival causing traffic in central areas. Plan travel accordingly."},
  {id: 3, message: "Wear masks in crowded places due to health advisories."}
];
// js/safety.js
// ---------------------------------------------
// Fetches and displays safety alerts from the API
// ---------------------------------------------

const alertsContainer = document.getElementById('alertsContainer');

function renderAlerts() {
  alertsContainer.innerHTML = safetyAlerts.map(alert => `
    <div class="alert-card">
      <p>${alert.message}</p>
    </div>
  `).join('');
async function renderAlerts() {
  try {
    const response = await fetch('http://localhost:5000/api/safety-alerts');
    const alerts = await response.json();
    alertsContainer.innerHTML = alerts.map(alert => `
      <div class="alert-card">
        <p>${alert.message}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching safety alerts:', error);
    alertsContainer.innerHTML = '<p>Could not load safety alerts at this time.</p>';
  }
}

renderAlerts();
document.addEventListener('DOMContentLoaded', renderAlerts);
