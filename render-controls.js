var mapLayers = {};
var infoBoxes = {};

$.getJSON('data/311.geojson', function(data) {
  var layer = createGeoJsonLayer(
    "311", "311 Complaints Rate", data, 
    function color311(feature) {
      var properties = feature.properties;
      var total311CallsCount = properties["Count_2013"] + properties["Count_2014"] + properties["Count_2015"] + properties["Count_2016"];
      return total311CallsCount > 16000 ? '#7f2704' :
             total311CallsCount > 8000  ? '#a63603' :
             total311CallsCount > 4000  ? '#d94801' :
             total311CallsCount > 2000  ? '#f16913' :
             total311CallsCount > 1000  ? '#fd8d3c' :
             total311CallsCount > 500   ? '#fdae6b' :
             total311CallsCount > 250   ? '#fdd0a2' :
             total311CallsCount > 125   ? '#fee6ce' :
                                          '#fff5eb' ;
    },
    function data311(feature) {
      var properties = feature.properties;
      return [properties["Count_2013"]/100, properties["Count_2014"]/100, properties["Count_2015"]/100, properties["Count_2016"]/100];
    }
  );
  
  infoBoxes[layer.label] = layer.infoBox;
  mapLayers[layer.label] = layer.geoJsonLayer;
});

// load data from Mta.geojson and create a Leaflet geoJSON layer from that data
$.getJSON('data/MTA_turnstile.geojson', function(data) {
  var layer = createGeoJsonLayer(
    "mta", "MTA Usage", data, 
    function colorMta(feature) {
      var totalMtaCallsCount = feature.properties["ENTRIES"] + feature.properties["EXITS"];
      return totalMtaCallsCount > Math.pow(2, 40) ? '#00441b' :
             totalMtaCallsCount > Math.pow(2, 38) ? '#006d2c' :
             totalMtaCallsCount > Math.pow(2, 36) ? '#238b45' :
             totalMtaCallsCount > Math.pow(2, 34) ? '#41ae76' :
             totalMtaCallsCount > Math.pow(2, 32) ? '#66c2a4' :
             totalMtaCallsCount > Math.pow(2, 30) ? '#99d8c9' :
             totalMtaCallsCount > Math.pow(2, 28) ? '#ccece6' :
             totalMtaCallsCount > Math.pow(2, 26) ? '#e5f5f9' :
                                                    '#f7fcfd' ;
    },
    function dataMta(feature) {
      return [feature.properties["ENTRIES"]/1000000000, feature.properties["EXITS"]/1000000000];
    }
  );
  
  infoBoxes[layer.label] = layer.infoBox;
  mapLayers[layer.label] = layer.geoJsonLayer;
});

var waitOnMapData = setInterval(function () {
  // make sure all GeoJSON layers have been initialized
  console.log("Checking if all data have loaded...");
  console.log(mapLayers);
  
  var layerCount = 0;
  for (layer in mapLayers) {
    if (mapLayers[map] === null) { return false; }
    layerCount++;
  }
  if (layerCount < 2) { return false };

  // All maps have been initialized, create a layers selector
  console.log("All data have loaded, creating control");
  L.control.layers(null, mapLayers, {position: "topright", collapsed: false}).addTo(map);  
  
  // clear the interval after we've finished creating the Layers control
  clearInterval(waitOnMapData);
}, 100);

map.on('overlayadd', function (event) {
  console.log(event);
  infoBoxes[event.name].addTo(map);
});

map.on('overlayremove', function (event) {
  console.log(event);
  infoBoxes[event.name].removeFrom(map);
});
