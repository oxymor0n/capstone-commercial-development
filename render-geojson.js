function createGeoJsonLayer(id, label, geoJsonData, getFeatureColor, getFeatureData) {
  // create an info box on the bottom right
  var infoBox = L.control({position: 'bottomright'});

  // create a div inside of the control to hold the d3 graph
  infoBox.onAdd = function () {
    var infoBoxDiv = L.DomUtil.create('div', 'info');
    infoBoxDiv.id = "infoBox-"+id;
    infoBoxDiv.innerHTML = 
      "<div><h4>" + label + "</h4>" + 
      "Hover over a ZIP code</div>";
    return infoBoxDiv;
  };

  // update the content of the info box using data from each geoJSON feature's properties field
  infoBox.update = function (feature) {
    var infoBoxDiv = L.DomUtil.get("infoBox-"+id);
    infoBoxDiv.innerHTML = 
      "<div><h4>" + label + "</h4>" + 
      (feature ? "ZIP code: " + feature.properties["GEOID10"] : "Hover over a ZIP code") +
      "</div>";

    // if we are hovering over a feature and properties is not null, render a d3 graph
    if (feature != null) {
      var graphData = getFeatureData(feature);
      var graphHeight = Math.max(...graphData) + 25;

      // initialize the d3 graph
      var svg = d3.select("#infoBox-"+id)
        .append("svg")
        .attr("height", graphHeight);

      // render a simple bar graph for each item in graphData
      var barWidth = 30;
      var barMargin = 5;
      svg.selectAll("rect")
        .data(graphData)
        .enter()
        .append("rect")
        .attr("width" , function (d, index) { return barWidth })
        .attr("height", function (d, index) { return d })
        .attr("x", function (d, index) { return index * (barWidth + barMargin)})
        .attr("y", function (d, index) { return graphHeight - d});
    }
  };

  // function that calculate the style for each geoJSON feature 
  function caculateFeatureStyle(feature) {
    return {
      fillColor: getFeatureColor(feature),
      fillOpacity: 0.7,
      weight: 1,
      opacity: 0.7,
      color: 'lightgrey',
      dashArray: '1',
    };
  }

  // function that call the infoBox.update() method on mouseover and mouseout for each feature
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
  
  var geoJsonLayer = L.geoJson(geoJsonData, {
    style: caculateFeatureStyle,
    onEachFeature: onEachFeature
  });
  
  return {
    label: label,
    infoBox: infoBox,
    geoJsonLayer: geoJsonLayer
  }
}