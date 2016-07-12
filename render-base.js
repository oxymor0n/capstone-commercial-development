// Create a new map
var map = L.map('map', {
  scrollWheelZoom: true
}).setView([40.717802, -73.81326], 11);

// Render map tiles from CartoDB
var cartoDbBaseMapDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(cartoDbBaseMapDark);