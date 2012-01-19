/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function() {
'use strict';

var Map = {
	init: function() {
		var elem = document.getElementById('map');
    elem.style.width = window.innerWidth + 'px';
    elem.style.height = window.innerHeight + 'px';
    ['tap', 'touchstart', 'touchend', 'touchmove'].forEach(function(evt) {
      elem.addEventListener(evt, Map);
    });

		window.map = new MQA.TileMap(elem, 9, {
			lat: 39.743943,
			lng: -105.020089
		}, 'map');
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
