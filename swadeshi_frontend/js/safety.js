const fallbackSafetyAlerts = [
  { id: 1, message: 'Heavy rainfall expected in northern regions. Exercise caution.' },
  { id: 2, message: 'Festival traffic advisory in city centers. Plan travel early.' },
  { id: 3, message: 'Carry ID copies and emergency contacts at all times.' }
];

const alertsContainer = document.getElementById('alertsContainer');

function renderAlerts(alerts) {
  if (!alertsContainer) return;

  alertsContainer.innerHTML = alerts
    .map(
      (alert) => `
      <div class="alert-card">
        <p>${alert.message}</p>
      </div>
    `
    )
    .join('');
}

async function loadSafetyAlerts() {
  try {
    const response = await fetch('/api/safety-alerts');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const alerts = await response.json();
    renderAlerts(alerts);
  } catch (error) {
    console.warn('Safety alerts API unavailable, using fallback data.');
    renderAlerts(fallbackSafetyAlerts);
  }
}

document.addEventListener('DOMContentLoaded', loadSafetyAlerts);
