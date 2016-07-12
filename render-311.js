// 311 layer
var layer311;

function getColor311(d) {
  // console.log(d)
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

//function onEachFeature311(feature, layer) {
//  layer.on({
//    
//    mouseover: function (e) {
//      var layer = e.target;
//      layer.setStyle({
//        weight: 5,
//        color: 'white',
//        dashArray: '',
//        fillOpacity: 0.7
//      });
//      if (!L.Browser.ie && !L.Browser.opera) {
//        layer.bringToFront();
//      }
//      infoBox.update('311', layer.feature.properties);
//    },
//    
//    mouseout: function (e) {
//      layer311.resetStyle(e.target);
//      infoBox.update();
//    }
//    
//  });
//}

// load data from 311.geojson and create a Leaflet GeoJSON layer from that data
$.getJSON('data/311.geojson', function(data_311) {
  layer311 = L.geoJson(data_311, {
    style: style311,
    // onEachFeature: onEachFeature311
  });
});