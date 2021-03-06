(function(exports) {
  "use strict";

  function initMap() {
    exports.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {
        lat: -28,
        lng: 137
      }
    }); // Load GeoJSON.

    exports.map.data.loadGeoJson(
      "https://storage.googleapis.com/maps-devrel/google.json"
    ); // Add some style.

    exports.map.data.setStyle(function(feature) {
      return (
        /** @type {google.maps.Data.StyleOptions} */
        ({
          fillColor: feature.getProperty("color"),
          strokeWeight: 1
        })
      );
    }); // Set mouseover event for each feature.

    exports.map.data.addListener("mouseover", function(event) {
      document.getElementById(
        "info-box"
      ).textContent = event.feature.getProperty("letter");
    });
  }

  exports.initMap = initMap;
})((this.window = this.window || {}));
