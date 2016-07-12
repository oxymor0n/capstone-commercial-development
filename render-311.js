// create an info box on the bottom right
var infoBox311 = L.control({position: 'bottomright'});

// create a div inside of the control to hold the d3 graph
infoBox311.onAdd = function (map) {
  var infoBox311Div = L.DomUtil.create('div', 'info');
  infoBox311Div.id = "infoBox311";
  infoBox311Div.innerHTML = 
    "<div><h4>New York 311 Complaint Rate</h4>" + 
    "Hover over a ZIP code</div>";
  return infoBox311Div;
};

// update the content of the info box using data from each geoJSON feature's properties field
infoBox311.update = function (properties) {
  var infoBox311Div = L.DomUtil.get("infoBox311");
  infoBox311Div.innerHTML = 
    "<div><h4>New York 311 Complaint Rate</h4>" + 
    (properties ? "<b>ZIP code</b>: " + properties["GEOID10"] : "Hover over a ZIP code") +
    "</div>";
  
  // if we are hovering over a feature and properties is not null, render a d3 graph
  if (properties != null) {
    var callsCountPerYear = [properties["Count_2013"], properties["Count_2014"], properties["Count_2015"], properties["Count_2016"]];
    var graphHeight = Math.max(...callsCountPerYear)/100 + 25;
    
    // initialize the d3 graph
    var svg = d3.select("#infoBox311")
      .append("svg")
      .attr("class", "311-chart")
      .attr("height", graphHeight);

    // render a simple bar graph of 311 calls per year
    var barWidth = 20;
    var barMargin = 5;
    svg.selectAll("rect")
      .data(callsCountPerYear)
      .enter()
      .append("rect")
      .attr("width" , function (d, index) { return barWidth })
      .attr("height", function (d, index) { return d/100 })
      .attr("x", function (d, index) { return index * (barWidth + barMargin)})
      .attr("y", function (d, index) { return graphHeight - d/100});
  }
};

// variable that will hold the 311 geoJson layer
var geoJsonLayer311;

// function that convert a numerical value to a heatmap/chrolopeth color
function getColor311(d) {
  return d > 16000 ? '#7f2704' :
         d > 8000  ? '#a63603' :
         d > 4000  ? '#d94801' :
         d > 2000  ? '#f16913' :
         d > 1000  ? '#fd8d3c' :
         d > 500   ? '#fdae6b' :
         d > 250   ? '#fdd0a2' :
         d > 125   ? '#fee6ce' :
                     '#fff5eb' ;
}

// function that calculate the style for each geoJSON feature 
function style311(feature) {
  var total311CallsCount = feature.properties["Count_2013"] + feature.properties["Count_2014"] + 
      feature.properties["Count_2015"] + feature.properties["Count_2016"];
  // console.log(total311CallsCount);
  return {
    fillColor: getColor311(total311CallsCount),
    fillOpacity: 0.7,
    weight: 1,
    opacity: 0.7,
    color: 'lightgrey',
    dashArray: '1',
  };
}

// function that call the infoBox311.update() method on mouseover and mouseout for each feature
function onEachFeature311(feature, layer) {
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
      infoBox311.update(layer.feature.properties);
    },
    
    mouseout: function (e) {
      geoJsonLayer311.resetStyle(e.target);
      infoBox311.update();
    }
    
  });
}

// load data from 311.geojson and create a Leaflet geoJSON layer from that data
$.getJSON('data/311.geojson', function(data311) {
  geoJsonLayer311 = L.geoJson(data311, {
    style: style311,
    onEachFeature: onEachFeature311
  });
});