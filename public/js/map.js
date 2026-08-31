// OpenStreetMap Geocoding (Free API) se coordinates fetch karna
async function initMap() {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        listingLocation
      )}`
    );
    const data = await response.json();

    let lat = 19.076; // Default: Mumbai if not found
    let lon = 72.8777;

    if (data && data.length > 0) {
      lat = parseFloat(data[0].lat);
      lon = parseFloat(data[0].lon);
    }

    // Initialize Map
    const map = L.map("map").setView([lat, lon], 12);

    // OpenStreetMap Free Tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add Marker & Popup
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<b>${listingTitle}</b><br>Exact location provided after booking.`)
      .openPopup();
  } catch (err) {
    console.error("Error loading map coordinates:", err);
  }
}

initMap();