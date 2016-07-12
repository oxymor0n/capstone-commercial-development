var waitOnMapData = setInterval(function () {
  // create an object that holds all the GeoJSON map layers that we can switch between
  var mapLayers = {
    "311": layer311
  };
  
  // make sure all GeoJSON layers have been initialized
  console.log("Checking if all data have loaded...");
  console.log(mapLayers);
  for (layer in mapLayers) {
    if (mapLayers[map] === null) { return false; }
  }

  // add the first GeoJSON layer to the map
  layer311.addTo(map);
  
  // All maps have been initialized, create a layers selector
  console.log("All data have loaded, creating control");
  L.control.layers(mapLayers, null, {position: "topright", collapsed: false}).addTo(map);
  
  // clear the interval after we've finished creating the Layers control
  clearInterval(waitOnMapData);
}, 100);
