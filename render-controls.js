var inputs = {
  "311": {
    "source": "data/311.geojson",
    "label": "311 Complaints Rate",
    "relevantDataFields": {
      "Count_2013": "Count 2013",
      "Count_2014": "Count 2014",
      "Count_2015": "Count 2015",
      "Count_2016": "Count 2016"
    }
  },
  "entropy": {
    "source": "data/Entropy.geojson",
    "label": "Entropy",
    "relevantDataFields": {
      "incoming_e": "incoming_e",
      "incoming_1": "incoming_1",
      "incoming_2": "incoming_2",
      "incoming_3": "incoming_3",
      "incoming_4": "incoming_4"
    }
  },
  "lehd": {
    "source": "data/lehd.geojson",
    "label": "Longitudinal Employer-Household Dynamics",
    "relevantDataFields": {
      "lehd_csv_r": "LEHD Resident",
      "lehd_csv_i": "LEHD Incoming"
    }
  },
  "pluto": {
    "source": "data/pluto.geojson",
    "label": "Pluto Data",
    "relevantDataFields": {
      "LotArea": "Lot Area"
    }
  },
  "mta": {
    "source": "data/mta.geojson",
    "label": "MTA Usage",
    "relevantDataFields": {
      "ENTRIES": "Entries",
      "EXITS": "Exits"
    }
  },
  "sales": {
    "source": "data/Sales.geojson",
    "label": "Real Estate Sales",
    "relevantDataFields": {
      "Sheet1__RE": "RE",
      "Sheet1__CO": "CO",
      "Sheet1__TO": "TO",
      "Sheet1__LA": "LA",
      "Sheet1__GS": "GS",
      "Sheet1__YE": "YE",
      "Sheet1__SA": "SA"
    }
  },
  "tensource": {
    "source": "data/TenSource.geojson",
    "label": "TenSource Data",
    "relevantDataFields": {
      "z": "Rent Price per sq ft"
    }
  },
  "tweets": {
    "source": "data/Tweets.geojson",
    "label": "Tweets Count (Oct 2014 - Feb 2015)",
    "relevantDataFields": {
      "tweet_coun": "Tweets Count"
    }
  },
  "wealth": {
    "source": "data/Wealth.geojson",
    "label": "Average Wealth",
    "relevantDataFields": {
      "Ave_Wealth": "Average Wealth"
    }
  }
};

var mapLayers = {};
var dataByZipcode = {};


function extractRelevantData(rawData, dataType, relevantDataFields, filteredData) {
  for (var i = 0; i < rawData.features.length; i++) {
    var feature = rawData.features[i];
    var featureId = feature.properties["GEOID10"];

    if (typeof filteredData[featureId] === "undefined") {
      filteredData[featureId] = {}
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

var inputsCount = 0;
for (inputId in inputs) {
  var inputConfig = inputs[inputId];
  console.log("READING ", inputConfig.source);
  
  // load data from the geoJSON file and create a Leaflet geoJSON layer from that data
  $.getJSON(inputConfig.source, function(data) {
    var input = inputs[data.id];
    console.log("RENDERING "+input.label);
    extractRelevantData(data, input.label, input.relevantDataFields, dataByZipcode);
    mapLayers[input.label] = createGeoJsonLayer(input.id, data);
  });
  
  inputsCount++;
}


var waitOnMapData = setInterval(function () {
  // make sure all GeoJSON layers have been initialized
  console.log("Checking if all data have loaded...");
  console.log(mapLayers);
  
  var layerCount = 0;
  for (layer in mapLayers) {
    if (mapLayers[layer] === null) { return false; }
    layerCount++;
  }
  if (layerCount < inputsCount) { return false };

  // All maps have been initialized, create a layers selector
  console.log("All data have loaded, creating control");
  L.control.layers(null, mapLayers, {position: "topright", collapsed: false}).addTo(map);  
  
  infoBox.addTo(map);
  
  // clear the interval after we've finished creating the Layers control
  clearInterval(waitOnMapData);
}, 100);


map.on('overlayadd', function (event) {
  console.log(event);
  currentLabel = event.name;
});
