(function(exports) {
  "use strict";

  function initMap() {
    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: {
        lat: -33.865,
        lng: 151.209
      }
    });
    document.getElementById("submit").addEventListener("click", function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, map) {
    geocoder.geocode(
      {
        componentRestrictions: {
          country: "AU",
          postalCode: "2000"
        }
      },
      function(results, status) {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          window.alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }

  exports.geocodeAddress = geocodeAddress;
  exports.initMap = initMap;
})((this.window = this.window || {}));
