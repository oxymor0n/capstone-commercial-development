// create an info box on the bottom right
var infoBox = L.control({position: 'bottomright'});
var currentLabel = "";

// create a div inside of the control to hold the d3 graph
infoBox.onAdd = function (map) {
  var infoBoxDiv = L.DomUtil.create('div', 'info');
  infoBoxDiv.id = "infoBox";
  infoBoxDiv.innerHTML = "<div><h4>Commercial Development Data</h4>Hover over a ZIP code</div>";
  return infoBoxDiv;
};

// update the content of the info box using data from each geoJSON feature's properties field
infoBox.update = function (properties) {
  var infoBoxDiv = L.DomUtil.get("infoBox");
  
  if (properties === null || typeof properties === "undefined") {
    infoBoxDiv.innerHTML = "<div><h4>Commercial Development Data</h4>Hover over a ZIP code</div>";

  } else {
    var zipcode = properties["GEOID10"];
    var dataAsText = "<ol>";
    for (field in dataByZipcode[zipcode][currentLabel]) {
      dataAsText = dataAsText + "<li>" + field + ": " + dataByZipcode[zipcode][currentLabel][field] + "</li>";
    }
    dataAsText = dataAsText + "</ol>";
    
    infoBoxDiv.innerHTML = "<div><h4>Commercial Development Data</h4>" +
      "<h5>" + currentLabel + " for ZIP " + zipcode + "</h5>" +
      dataAsText + "</div>";
  }
};