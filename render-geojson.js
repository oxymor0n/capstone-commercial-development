function createGeoJsonLayer(id, geoJsonData) {
  
  // function that calculate the style for each geoJSON feature 
  function caculateFeatureStyle(feature) {
    return {
      fillColor: '#f16913',
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
        infoBox.update(layer.feature.properties);
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
  
  return geoJsonLayer;
}