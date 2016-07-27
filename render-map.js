//=====================================================================================================================
// Create a new map
//=====================================================================================================================

var map = L.map('map', {
  scrollWheelZoom: true
}).setView([40.717802, -73.81326], 11);


//=====================================================================================================================
// Render map tiles from CartoDB
//=====================================================================================================================

var cartoDbBaseMapDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(cartoDbBaseMapDark);


//=====================================================================================================================
// Create an info box to display additional info on the bottom right
//=====================================================================================================================

var infoBox = L.control({position: 'bottomright'});

// initialize the info box's content
infoBox.onAdd = function (map) {
  var infoBoxDiv = L.DomUtil.create('div', 'info');
  infoBoxDiv.id = "infobox";
  infoBoxDiv.innerHTML = "<div><h3>Commercial Development Data</h3>Hover over a ZIP code</div>";
  return infoBoxDiv;
};

// trigger to update the info box data type
var currentLabel = "";
map.on('overlayadd', function (event) { currentLabel = event.name; });

// update the content of the info box using data from each geoJSON feature's properties field
infoBox.update = function (feature) {
  var infoBoxDiv = L.DomUtil.get("infobox");
  
  if (feature === null || typeof feature === "undefined") {
    infoBoxDiv.innerHTML = "<div><h3>Commercial Development Data</h3>Hover over a ZIP code</div>";

  } else {
    var zipcode = feature.properties["GEOID10"];
    var data = dataByZipcode[zipcode];
    var dataAsText = "<ul>";
    for (field in data[currentLabel]) {
      dataAsText = dataAsText + "<li>" + field + ": " + data[currentLabel][field] + "</li>";
    }
    dataAsText = dataAsText + "</ul>";
    
    infoBoxDiv.innerHTML = "<div><h3>Commercial Development Data for ZIP code " + zipcode + "</h3>" +
      "<h4>" + feature.heatMapUnit + ": " + feature.heatMapValue + "</h4>" +
      "<h4>" + secondaryInputs.rac.label + ": " + data[secondaryInputs.rac.label][secondaryInputs.rac.label] + "</h4>" +
      "<h4>" + secondaryInputs.wac.label + ": " + data[secondaryInputs.wac.label][secondaryInputs.wac.label] + "</h4>" +
      "<h4>" + secondaryInputs.dob.label + ": " + data[secondaryInputs.dob.label][secondaryInputs.dob.label] + "</h4>" +
      "<h4>" + currentLabel + ":</h4>" +
      dataAsText + "</div>";
  }
};

// render the info box
infoBox.addTo(map);


//=====================================================================================================================
// Load data from the geoJSON files
//=====================================================================================================================

var dataByZipcode = {};

// helper function to extract data
function extractRelevantData(rawData, dataType, relevantDataFields, filteredData) {
  for (var i = 0; i < rawData.features.length; i++) {
    var feature = rawData.features[i];
    var featureId = feature.properties["GEOID10"];
    var featureArea = feature.properties["Area"]

    if (typeof filteredData[featureId] === "undefined") {
      filteredData[featureId] = {"area": featureArea}
    };
    if (typeof filteredData[featureId][dataType] === "undefined") {
      filteredData[featureId][dataType] = {}
    }
    
    for (fieldName in relevantDataFields) {
      var fieldLabel = relevantDataFields[fieldName];
      filteredData[featureId][dataType][fieldLabel] = feature.properties[fieldName];
    }
  }
}

// call jQuery's getJSON to load the geoJSON files
var inputCount = 0;
for (var id in geoJsonInputs) {  
  $.getJSON(geoJsonInputs[id].source, function(data) {
    var input = geoJsonInputs[data.id];
    console.log("READING " + input.label);
    extractRelevantData(data, input.label, input.relevantDataFields, dataByZipcode);
    input.geojson = data;
    for (var i = 0; i < input.geojson.features.length; i++) {
      var feature = input.geojson.features[i];
      feature.heatMapUnit = input.heatMapUnit;
      feature.heatMapValue = input.heatMapValueFunction(feature);
      feature.heatMapColor = input.heatMapColorFunction(feature.heatMapValue);
    }
    console.log("FINISHED READING "+input.label);
  });
  inputCount++;
}

for (id in secondaryInputs) {
  $.getJSON(secondaryInputs[id].source, function(data) {
    var input = secondaryInputs[data.id];
    console.log("READING " + input.label);
    extractRelevantData(data, input.label, input.relevantDataFields, dataByZipcode);
    console.log("FINISHED READING "+input.label);
  });
}


//=====================================================================================================================
// Create Leaflet geoJSON layers from the data we've loaded
//=====================================================================================================================

// helper function to create a Leaflet geoJSON layer
function createGeoJsonLayer(id, geoJsonData) {
  
  // function that calculate the style for each geoJSON feature 
  function calculateFeatureStyle(feature) {
    return {
      fillColor: feature.heatMapColor,
      fillOpacity: 0.7,
      weight: 1,
      opacity: 0.7,
      color: 'lightgrey',
      dashArray: '1',
    };
  }

  // function that update the map on mouseover and mouseout for each feature
  function onEachFeature(feature, layer) {
    layer.on({

      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 5,
          color: 'white',
          dashArray: '',
          fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
        infoBox.update(layer.feature);
      },

      mouseout: function (e) {
        geoJsonLayer.resetStyle(e.target);
        infoBox.update();
      }

    });
  }
  
  // generate and return the geoJSON layer
  var geoJsonLayer = L.geoJson(geoJsonData, {
    style: calculateFeatureStyle,
    onEachFeature: onEachFeature
  });
  return geoJsonLayer;
}

// iterate through all the input data and render each geoJSON layer in order
function renderGeoJsons() {
  var mapLayers = {};
  console.log(geoJsonInputs);

  // render each geoJSON layer in order
  for (id in geoJsonInputs) {
    var input = geoJsonInputs[id];
    console.log("RENDERING " + input.label);
    mapLayers[input.label] = createGeoJsonLayer(input.geojson.id, input.geojson);
  }

  // render the layer selector
  L.control.layers(null, mapLayers, {position: "topright", collapsed: false}).addTo(map);
}

// wait for the getJSON() functions to complete, then call renderGeoJsons to render the layers
var waitOnMapData = setInterval(function () {
  // make sure all GeoJSON layers have been initialized
  console.log("Checking if all data have loaded...");
  
  var geojsonCount = 0;
  for (var id in geoJsonInputs) {
    if (typeof geoJsonInputs[id].geojson === "undefined") { return false; }
    geojsonCount++;
  }
  console.log("Loaded " + geojsonCount + "/" + inputCount + " files");
  if (geojsonCount < inputCount) { return false };
  
  // clear the interval after we've finished loading data
  console.log("All data have loaded");
  renderGeoJsons();
  clearInterval(waitOnMapData);
}, 1000);
