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
    this.map = new L.Map('map');
    this.map.setView(new L.LatLng(51.505, -0.09), 13).addLayer(tileLayer);

    var marker = new L.Marker(new L.LatLng(51.5, -0.09));
    this.map.addLayer(marker);

    this.getCurrent();

    this.nav = new Nav;
    this.nav.init();
  },

  getCurrent: function() {
    navigator.geolocation.getCurrentPosition(this.move.bind(this));
  },

  move: function(position) {
    this.map.setView(new L.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ), 13);
  }
};

function Nav() {
  this._node = document.getElementsByTagName('nav')[0];
}

Nav.prototype = {
  init: function() {
    var current = new NavBtn(document.getElementById('current'), Map.getCurrent);
    var search = new NavBtn(document.getElementById('search'));

    current.listen();
    search.listen();
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
