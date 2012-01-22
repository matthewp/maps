/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function() {
'use strict';

var Map;

function createTileLayer(maxZoom) {
  maxZoom = maxZoom || 18;

  var TITLE_URL = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
  var subdomains = [ 'otile1', 'otile2', 'otile3', 'otile4' ],
    attribution = 'Temporary attribution.';
  return new L.TileLayer(TITLE_URL, {
    maxZoom: maxZoom,
    attribution: attribution,
    subdomains: subdomains
  });
}

Map = {
  init: function() {
    var tileLayer = createTileLayer();
    var map = new L.Map('map');
    map.setView(new L.LatLng(51.505, -0.09), 13).addLayer(tileLayer);

    var marker = new L.Marker(new L.LatLng(51.5, -0.09));
    map.addLayer(marker);

    this.nav = new Nav;
    this.nav.init();
  }
};

function Nav() {
  this._node = document.getElementsByTagName('nav')[0];
}

Nav.prototype = {
  init: function() {
    var current = new NavBtn(document.getElementById('current'), getCurrent);
    var search = new NavBtn(document.getElementById('search'));

    current.listen();
    search.listen();
  },

  getCurrent: function() {
    // TODO Move to user's GPS coordinates.
  }
};

function NavBtn(btn, onclick) {
  this.node = btn;
  this.onclick = onclick;
}

NavBtn.prototype = {
  listen: function() {
    var self = this;

    var evts = [ 'touchstart', 'touchmove', 'touchend',
      'mousedown', 'mousemove', 'mouseup' ];
    evts.forEach(function(evt) {
      self.node.addEventListener(evt, self, true);
    });
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'touchend':
      case 'mouseup':
        this.onclick();
        break;
      case 'touchstart':
      case 'mousedown':
        // TODO highlight node.
        break;
      case 'touchmove':
      case 'mousemove':
        // TODO see if we've left the bounds.
        break;
    }
  },

  onclick: function() { }
};

window.addEventListener('load', function loadMap(e) {
  window.removeEventListener('load', loadMap);
  Map.init();
});


})();
