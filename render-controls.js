var waitOnMapData = setInterval(function () {
  // create an object that holds all the GeoJSON map layers that we can switch between
  var mapLayers = {
    "311 Complaints": geoJsonLayer311
  };
  
  // make sure all GeoJSON layers have been initialized
  console.log("Checking if all data have loaded...");
  console.log(mapLayers);
  for (layer in mapLayers) {
    if (mapLayers[map] === null) { return false; }
  }
  
  // All maps have been initialized, create a layers selector
  console.log("All data have loaded, creating control");
  L.control.layers(null, mapLayers, {position: "topright", collapsed: false}).addTo(map);
  
  // clear the interval after we've finished creating the Layers control
  clearInterval(waitOnMapData);
}, 100);

var infoBoxes = {
  "311 Complaints": infoBox311
}

map.on('overlayadd', function (event) {
  console.log(event);
  infoBoxes[event.name].addTo(map);
});

map.on('overlayremove', function (event) {
  console.log(event);
  infoBoxes[event.name].removeFrom(map);
});
