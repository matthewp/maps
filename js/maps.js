/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function() {
'use strict';

var Map = {
	init: function() {
		var tileUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
      subdomains = [ 'otile1', 'otile2', 'otile3', 'otile4' ],
      attribution = 'Temporary attribution.',
      tileLayer = new L.TileLayer(tileUrl, {
        maxZoom: 18,
        attribution: attribution,
        subdomains: subdomains
      });

      var map = new L.Map('map');
      map.setView(new L.LatLng(51.505, -0.09), 13).addLayer(tileLayer);

      var marker = new L.Marker(new L.LatLng(51.5, -0.09));
      map.addLayer(marker);
	},

  handleEvent: function(e) {
    e.preventDefault();
  }
};

window.addEventListener('load', function loadMap(e) {
	window.removeEventListener('load', loadMap);
	Map.init();
});


})();
