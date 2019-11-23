/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (exports) {
  'use strict';

  // [START maps_map_projection_simple]
  // This example defines an image map type using the Gall-Peters
  // projection.
  // https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection

  function initMap() {
    // Create a map. Use the Gall-Peters map type.
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 0,
      center: { lat: 0, lng: 0 },
      mapTypeControl: false
    });

    initGallPeters();
    map.mapTypes.set("gallPeters", exports.gallPetersMapType);
    map.setMapTypeId("gallPeters");

    // Show the lat and lng under the mouse cursor.
    var coordsDiv = document.getElementById("coords");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener("mousemove", function(event) {
      coordsDiv.textContent =
        "lat: " +
        Math.round(event.latLng.lat()) +
        ", " +
        "lng: " +
        Math.round(event.latLng.lng());
    });

    // Add some markers to the map.
    map.data.setStyle(function(feature) {
      return {
        title: feature.getProperty("name"),
        optimized: false
      };
    });
    map.data.addGeoJson(cities);
  }


  function initGallPeters() {
    var GALL_PETERS_RANGE_X = 800;
    var GALL_PETERS_RANGE_Y = 512;

    // Fetch Gall-Peters tiles stored locally on our server.
    exports.gallPetersMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        var scale = 1 << zoom;

        // Wrap tiles horizontally.
        var x = ((coord.x % scale) + scale) % scale;

        // Don't wrap tiles vertically.
        var y = coord.y;
        if (y < 0 || y >= scale) return null;

        return (
          "https://developers.google.com/maps/documentation/" +
          "javascript/examples/full/images/gall-peters_" +
          zoom +
          "_" +
          x +
          "_" +
          y +
          ".png"
        );
      },
      tileSize: new google.maps.Size(GALL_PETERS_RANGE_X, GALL_PETERS_RANGE_Y),
      minZoom: 0,
      maxZoom: 1,
      name: "Gall-Peters"
    });

    // Describe the Gall-Peters projection used by these tiles.
    exports.gallPetersMapType.projection = {
      fromLatLngToPoint: function(latLng) {
        var latRadians = (latLng.lat() * Math.PI) / 180;
        return new google.maps.Point(
          GALL_PETERS_RANGE_X * (0.5 + latLng.lng() / 360),
          GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin(latRadians))
        );
      },
      fromPointToLatLng: function(point, noWrap) {
        var x = point.x / GALL_PETERS_RANGE_X;
        var y = Math.max(0, Math.min(1, point.y / GALL_PETERS_RANGE_Y));

        return new google.maps.LatLng(
          (Math.asin(1 - 2 * y) * 180) / Math.PI,
          -180 + 360 * x,
          noWrap
        );
      }
    };
  }

  // GeoJSON, describing the locations and names of some cities.
  var cities = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-87.65, 41.85] },
        properties: { name: "Chicago" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-149.9, 61.218] },
        properties: { name: "Anchorage" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-99.127, 19.427] },
        properties: { name: "Mexico City" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-0.126, 51.5] },
        properties: { name: "London" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [28.045, -26.201] },
        properties: { name: "Johannesburg" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [15.322, -4.325] },
        properties: { name: "Kinshasa" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [151.207, -33.867] },
        properties: { name: "Sydney" }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [0, 0] },
        properties: { name: "0°N 0°E" }
      }
    ]
  };

  exports.cities = cities;
  exports.initGallPeters = initGallPeters;
  exports.initMap = initMap;

}(this.window = this.window || {}));
