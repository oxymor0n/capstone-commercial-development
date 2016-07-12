// Create a new map
var map = L.map('map', {
  scrollWheelZoom: true
}).setView([40.717802, -73.81326], 11);

// Render map tiles from CartoDB
var cartoDbBaseMapDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(cartoDbBaseMapDark);

//// Create an info box on the bottom right
//var infoBox = L.control({position: 'bottomright'});
//
//infoBox.onAdd = function (map) {
//  var infoBoxDiv = L.DomUtil.create('div', 'info');
//  infoBoxDiv.id = "infoBox";
//  return infoBoxDiv;
//};
//
//infoBox.update = function (type, props) {
//  var infoBoxDiv = L.DomUtil.get("infoBox");
//  infoBoxDiv.innerHTML = 
//    "<div><h4>New York 311 Complaint Rate</h4>" + 
//    (props ? "<b>ZIP code</b>: " + props["GEOID10"] : "Hover over a ZIP code") +
//    "</div>";
//  
//  if (props != null) {
//    var callsCount = [props["Count_2013"], props["Count_2014"], props["Count_2015"], props["Count_2016"]];
//    var graphHeight = Math.max(...callsCount)/100 + 25;
//    var svg = d3.select("#infoBox")
//      .append("svg")
//      .attr("class", "311-chart")
//      .attr("height", graphHeight);
//
//    var barWidth = 20;
//    var barMargin = 5;
//    svg.selectAll("rect")
//      .data(callsCount)
//      .enter()
//      .append("rect")
//      .attr("width" , function (d, index) { return barWidth })
//      .attr("height", function (d, index) { return d/100 })
//      .attr("x", function (d, index) { return index * (barWidth + barMargin)})
//      .attr("y", function (d, index) { return graphHeight - d/100});
//  }
//};
//
//infoBox.addTo(map);