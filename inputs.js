
var geoJsonInputs = {
  "311": {
    "source": "data/311.geojson",
    "label": "311 Complaints Rate",
    "relevantDataFields": {
      "Count_2013": "Complaints Rate (2013)",
      "Count_2014": "Complaints Rate (2014)",
      "Count_2015": "Complaints Rate (2015)",
      "Count_2016": "Complaints Rate (2016)"
    },
    "heatMapUnit": "Total Complaints per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return (featureData["Count_2013"] + featureData["Count_2014"] + 
              featureData["Count_2015"] + featureData["Count_2016"])/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 12535 ? '#7f0000' :
             value > 8657  ? '#b30000' :
             value > 7000  ? '#d7301f' :
             value > 5115  ? '#ef6548' :
             value > 3433  ? '#fc8d59' :
             value > 2129  ? '#fdbb84' :
             value > 1579  ? '#fdd49e' :
             value > 1037  ? '#fee8c8' :
                             '#fff7ec' ;
    }
  },
  "dob": {
    "source": "data/DOB.geojson",
    "label": "DOB Permits",
    "relevantDataFields": {
      "NB_counts": "New Buildings Count"
    },
    "heatMapUnit": "Total New Buildings per Square Mile ",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["NB_counts"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 44507 ? '#800026' :
             value > 10229 ? '#bd0026' :
             value > 6016  ? '#e31a1c' :
             value > 4026  ? '#fc4e2a' :
             value > 3092  ? '#fd8d3c' :
             value > 1989  ? '#feb24c' :
             value > 1472  ? '#fed976' :
             value > 917   ? '#ffeda0' :
                             '#ffffcc' ;
    }
  },
  "entropy": {
    "source": "data/Entropy.geojson",
    "label": "Entropy",
    "relevantDataFields": {
      "incoming_4": "Commuter Diversity"
    },
    "heatMapUnit": "Entropy Value",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["incoming_4"];
    },
    "heatMapColorFunction": function (value) {
      return value > 0.022442197 ? '#081d58' :
             value > 0.005053315 ? '#253494' :
             value > 0.001576715 ? '#225ea8' :
             value > 0.001043188 ? '#1d91c0' :
             value > 0.000815029 ? '#41b6c4' :
             value > 0.000644344 ? '#7fcdbb' :
             value > 0.000553246 ? '#c7e9b4' :
             value > 0.000455881 ? '#edf8b1' :
                                   '#ffffd9' ;
    }
  },
  "lehd-incoming": {
    "source": "data/LEHD-incoming.geojson",
    "label": "LEHD Data (Incoming)",
    "relevantDataFields": {
      "lehd_csv_i": "LEHD Incoming Workers"
    },
    "heatMapUnit": "Total Incoming Workers per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["lehd_csv_i"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 9556848.397 ? '#49006a' :
             value > 495077.9703 ? '#7a0177' :
             value > 77450.79545 ? '#ae017e' :
             value > 26637.27142 ? '#dd3497' :
             value > 17798.34545 ? '#f768a1' :
             value > 14125.48572 ? '#fa9fb5' :
             value > 9936.250963 ? '#fcc5c0' :
             value > 6408.63135  ? '#fde0dd' :
                                   '#fff7f3' ;
    }
  },
  "lehd-resident": {
    "source": "data/LEHD-resident.geojson",
    "label": "LEHD Data (Resident)",
    "relevantDataFields": {
      "lehd_csv_r": "LEHD Resident Workers"
    },
    "heatMapUnit": "Total Residential Workers per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["lehd_csv_r"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 392566.9842 ? '#67001f' :
             value > 98044.91346 ? '#980043' :
             value > 55385.9026  ? '#ce1256' :
             value > 41882.66192 ? '#e7298a' :
             value > 28683.77581 ? '#df65b0' :
             value > 15411.6507  ? '#c994c7' :
             value > 20452.85291 ? '#d4b9da' :
             value > 10956.28863 ? '#e7e1ef' :
                                   '#f7f4f9' ;
    }
  },
  "mta": {
    "source": "data/MTAturnstile.geojson",
    "label": "MTA Usage",
    "relevantDataFields": {
      "ENTRIES": "Entry Swipes",
      "EXITS": "Exit Swipes"
    },
    "heatMapUnit": "Total Turnover per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return (featureData["ENTRIES"] + featureData["EXITS"])/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 626061747021 ? '#4d004b' :
             value > 189944659261 ? '#810f7c' :
             value > 110276969548 ? '#88419d' :
             value > 52929311947  ? '#8c6bb1' :
             value > 25160157126  ? '#8c96c6' :
             value > 10377901045  ? '#9ebcda' :
             value > 7055778572   ? '#bfd3e6' :
             value > 3827180776   ? '#e0ecf4' :
                                    '#f7fcfd' ;
    }
  },
  "pluto-land": {
    "source": "data/PlutoLand.geojson",
    "label": "Pluto Land Data",
    "relevantDataFields": {
      "LotArea": "Tax Lot Area (sq ft)"
    },
    "heatMapUnit": "Total Tax Land per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["LotArea"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 43283820.27 ? '#014636' :
             value > 31159186.67 ? '#016c59' :
             value > 26982757.81 ? '#02818a' :
             value > 23674851.87 ? '#3690c0' :
             value > 21855140.33 ? '#67a9cf' :
             value > 20180930.33 ? '#a6bddb' :
             value > 19245966.77 ? '#d0d1e6' :
             value > 18652780.71 ? '#ece2f0' :
                                   '#fff7fb' ;
    }
  },
  "pluto-building": {
    "source": "data/PlutoBuilding.geojson",
    "label": "Pluto Building Data",
    "relevantDataFields": {
      "BldgArea": "Total Building Area (sq ft)",
      "ComArea": "Total Commercial Area (sq ft)",
      "ResArea": "Total Residential Area (sq ft)",
      "OfficeArea": "Total Office Area (sq ft)",
      "RetailArea": "Total Retail Area (sq ft)",
      "GarageArea": "Total Garage Area (sq ft)",
      "StrgeArea": "Total Storage Area (sq ft)",
      "FactryArea": "Total Factory Area (sq ft)",
      "OtherArea": "Total Other Area (sq ft)",
      "YearBuilt": "Year Built"
    },
    "heatMapUnit": "Total Building Area per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["BldgArea"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 240913044.8 ? '#023858' :
             value > 100079918.2 ? '#045a8d' :
             value > 43184945.18 ? '#0570b0' :
             value > 30718896.02 ? '#3690c0' :
             value > 22724031.99 ? '#74a9cf' :
             value > 16913126.25 ? '#a6bddb' :
             value > 12824830.01 ? '#d0d1e6' :
             value > 9758379.175 ? '#ece7f2' :
                                   '#fff7fb' ;
    }
  },
  "sales": {
    "source": "data/Sales.geojson",
    "label": "Real Estate Sales",
    "relevantDataFields": {
      "Sheet1__GS": "Gross Square Footage",
      "Sheet1__SA": "Median Sales Price"
    },
    "heatMapUnit": "Total Square Feet per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["Sheet1__GS"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 1109636.436 ? '#084081' :
             value > 116481.6309 ? '#0868ac' :
             value > 32649.57457 ? '#2b8cbe' :
             value > 16292.9814  ? '#4eb3d3' :
             value > 9438.798954 ? '#7bccc4' :
             value > 7107.037763 ? '#a8ddb5' :
             value > 3814.354946 ? '#ccebc5' :
             value > 2400.801262 ? '#e0f3db' :
                                   '#f7fcf0' ;
    }
  },
  "tensource": {
    "source": "data/TenSource.geojson",
    "label": "TenSource Data",
    "relevantDataFields": {
      "z": "Rent Price ($ per sq ft)"
    },
    "heatMapUnit": "Total Square Feet per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["z"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 144021.269  ? '#00441b' :
             value > 17869.45101 ? '#006d2c' :
             value > 9346.110886 ? '#238b45' :
             value > 4761.150961 ? '#41ae76' :
             value > 824.2785288 ? '#66c2a4' :
             value > 130.5963324 ? '#99d8c9' :
             value > 43.2392191  ? '#ccece6' :
             value > 23.92023147 ? '#e5f5f9' :      
                                   '#f7fcfd' ;
    }
  },
  "tweets": {
    "source": "data/Tweets.geojson",
    "label": "Tweets Count",
    "relevantDataFields": {
      "tweet_coun": "Tweets Count (Oct 2014 - Feb 2015)"
    },
    "heatMapUnit": "Total Tweets per Square Mile",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["tweet_coun"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 18947 ? '#000000' :
             value > 7784  ? '#252525' :
             value > 4225  ? '#525252' :
             value > 2606  ? '#737373' :
             value > 1661  ? '#969696' :
             value > 1096  ? '#bdbdbd' :
             value > 768   ? '#d9d9d9' :
             value > 551   ? '#f0f0f0' :
                             '#ffffff' ;
    }
  },
  "wealth": {
    "source": "data/Wealth.geojson",
    "label": "Average Wealth",
    "relevantDataFields": {
      "Ave_Wealth": "Average Wealth"
    },
    "heatMapUnit": "Average Wealth Value",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["Ave_Wealth"];
    },
    "heatMapColorFunction": function (value) {
      return value > 63627.03651 ? '#3f007d' :
             value > 61816.39781 ? '#54278f' :
             value > 60463.57094 ? '#6a51a3' :
             value > 58751.14435 ? '#807dba' :
             value > 57427.73844 ? '#9e9ac8' :
             value > 55918.76984 ? '#bcbddc' :
             value > 53705.02323 ? '#dadaeb' :
             value > 53705.02323 ? '#efedf5' :
                                   '#fcfbfd' ;
    }
  },
  "prediction": {
    "source": "data/Model2015.geojson",
    "label": "Prediction Model",
    "relevantDataFields": {
      "predicted_": "Predicted Vacancy Rate 2015 (Percent)"
    },
    "heatMapUnit": "Prediction Value",
    "heatMapValueFunction": function (feature) {
      var featureData = feature.properties;
      return featureData["predicted_"]/featureData["Area"];
    },
    "heatMapColorFunction": function (value) {
      return value > 0.154420376 ? '#67000d' :
             value > 0.120788427 ? '#a50f15' :
             value > 0.101940919 ? '#cb181d' :
             value > 0.083103677 ? '#ef3b2c' :
             value > 0.073396893 ? '#fb6a4a' :
             value > 0.049543839 ? '#fc9272' :
             value > 0.037874424 ? '#fcbba1' :
             value > 0.014972865 ? '#fee0d2' :
                                   '#fff5f0' ;
    }
  }
};


var secondaryInputs = {
  "rac": {
    "source": "data/RAC14_ZC.geojson",
    "label": "Total Number of Jobs by Residence Area",
    "relevantDataFields": {
      "Sheet1__C0": "Total Number of Jobs by Residence Area"
    }
  },
  "wac": {
    "source": "data/WAC14_ZC.geojson",
    "label": "Total Number of Jobs by Workplace Area",
    "relevantDataFields": {
      "Sheet1__C0": "Total Number of Jobs by Workplace Area"
    }
  }
}