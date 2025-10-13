// js/planner.js
// ---------------------------------------------
// Travel planner form & PDF download
// ---------------------------------------------

const form = document.getElementById('plannerForm');
const itineraryDiv = document.getElementById('itinerary');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  // Build itinerary text
  const itineraryHtml = `
    <h3>Your Trip Plan</h3>
    <p><strong>Destination:</strong> ${data.destination}</p>
    <p><strong>Start Date:</strong> ${data.start}</p>
    <p><strong>Days:</strong> ${data.days}</p>
    <p><strong>Budget:</strong> ₹${data.budget}</p>
    <p>Suggested Activities: Explore local culture, try authentic cuisine, support local artisans.</p>
  `;

  itineraryDiv.innerHTML = itineraryHtml;
});

document.getElementById('downloadPdf').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(itineraryDiv, {
    callback: function (doc) {
      doc.save("itinerary.pdf");
    },
    x: 10,
    y: 10
  });
});


