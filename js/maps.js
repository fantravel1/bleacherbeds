/**
 * BleacherBeds - Maps Module
 * Interactive maps powered by Leaflet.js (OpenStreetMap)
 * Shows venues, facilities, and proximity to stadiums
 */

(function () {
  'use strict';

  // Venue coordinates database
  var VENUES = {
    'allegiant-stadium': {
      name: 'Allegiant Stadium',
      lat: 36.0908,
      lng: -115.1833,
      city: 'Las Vegas, NV',
      sport: 'NFL',
      teams: 'Las Vegas Raiders',
      beds: '500+',
      url: '/venues/sofi-stadium/'
    },
    'sofi-stadium': {
      name: 'SoFi Stadium',
      lat: 33.9535,
      lng: -118.3392,
      city: 'Los Angeles, CA',
      sport: 'NFL',
      teams: 'LA Rams, LA Chargers',
      beds: '200+',
      url: '/venues/sofi-stadium/'
    },
    'metlife-stadium': {
      name: 'MetLife Stadium',
      lat: 40.8128,
      lng: -74.0742,
      city: 'East Rutherford, NJ',
      sport: 'NFL',
      teams: 'NY Giants, NY Jets',
      beds: '300+',
      url: '/venues/metlife-stadium/'
    },
    'caesars-superdome': {
      name: 'Caesars Superdome',
      lat: 29.9511,
      lng: -90.0812,
      city: 'New Orleans, LA',
      sport: 'NFL',
      teams: 'New Orleans Saints',
      beds: '300+',
      url: '/venues/caesars-superdome/'
    },
    'arrowhead-stadium': {
      name: 'Arrowhead Stadium',
      lat: 39.0489,
      lng: -94.4839,
      city: 'Kansas City, MO',
      sport: 'NFL',
      teams: 'Kansas City Chiefs',
      beds: '150+',
      url: '#'
    },
    'madison-square-garden': {
      name: 'Madison Square Garden',
      lat: 40.7505,
      lng: -73.9934,
      city: 'New York, NY',
      sport: 'NBA / NHL',
      teams: 'NY Knicks, NY Rangers',
      beds: '175+',
      url: '#'
    },
    'crypto-arena': {
      name: 'Crypto.com Arena',
      lat: 34.0430,
      lng: -118.2673,
      city: 'Los Angeles, CA',
      sport: 'NBA / NHL',
      teams: 'LA Lakers, LA Kings',
      beds: '150+',
      url: '#'
    },
    'mercedes-benz-stadium': {
      name: 'Mercedes-Benz Stadium',
      lat: 33.7554,
      lng: -84.4010,
      city: 'Atlanta, GA',
      sport: 'NFL',
      teams: 'Atlanta Falcons',
      beds: '180+',
      url: '#'
    },
    'amerant-center': {
      name: 'Amerant Center',
      lat: 25.7814,
      lng: -80.1870,
      city: 'Miami, FL',
      sport: 'NBA',
      teams: 'Miami Heat',
      beds: '120+',
      url: '#'
    },
    'santiago-bernabeu': {
      name: 'Santiago Bernabéu',
      lat: 40.4531,
      lng: -3.6883,
      city: 'Madrid, Spain',
      sport: 'Soccer',
      teams: 'Real Madrid',
      beds: '220+',
      url: '#'
    },
    'wembley-stadium': {
      name: 'Wembley Stadium',
      lat: 51.5560,
      lng: -0.2795,
      city: 'London, England',
      sport: 'Soccer / NFL',
      teams: 'England National Team',
      beds: '300+',
      url: '#'
    },
    'camp-nou': {
      name: 'Camp Nou',
      lat: 41.3809,
      lng: 2.1228,
      city: 'Barcelona, Spain',
      sport: 'Soccer',
      teams: 'FC Barcelona',
      beds: '250+',
      url: '#'
    },
    'san-siro': {
      name: 'San Siro',
      lat: 45.4781,
      lng: 9.1240,
      city: 'Milan, Italy',
      sport: 'Soccer',
      teams: 'AC Milan, Inter Milan',
      beds: '280+',
      url: '#'
    },
    'anfield': {
      name: 'Anfield',
      lat: 53.4308,
      lng: -2.9608,
      city: 'Liverpool, England',
      sport: 'Soccer',
      teams: 'Liverpool FC',
      beds: '200+',
      url: '#'
    }
  };

  // Sample facility locations near venues
  var FACILITIES = {
    'allegiant-stadium': [
      { name: 'Downtown Fan Village', lat: 36.0935, lng: -115.1800, type: 'Sleep Pods', price: '$120-$150', distance: '0.3 mi' },
      { name: 'Vegas Convention Dorms', lat: 36.0880, lng: -115.1760, type: 'Dorm Rooms', price: '$90-$130', distance: '0.5 mi' },
      { name: 'Strip Recreation Center', lat: 36.0950, lng: -115.1870, type: 'Cots', price: '$75-$100', distance: '0.4 mi' }
    ],
    'sofi-stadium': [
      { name: 'Inglewood Community Center', lat: 33.9580, lng: -118.3430, type: 'Cots & Bunks', price: '$80-$120', distance: '0.3 mi' },
      { name: 'Forum Fan Village', lat: 33.9583, lng: -118.3418, type: 'Sleep Pods', price: '$100-$150', distance: '0.4 mi' },
      { name: 'LAX Hostel Overflow', lat: 33.9470, lng: -118.3350, type: 'Dorm Rooms', price: '$85-$110', distance: '0.6 mi' },
      { name: 'Inglewood Rec Center', lat: 33.9610, lng: -118.3370, type: 'Cots', price: '$70-$95', distance: '0.5 mi' }
    ],
    'metlife-stadium': [
      { name: 'Meadowlands Recreation Center', lat: 40.8155, lng: -74.0700, type: 'Cots & Bunks', price: '$90-$130', distance: '0.4 mi' },
      { name: 'MetLife Fan Hub', lat: 40.8100, lng: -74.0680, type: 'Sleep Pods', price: '$110-$160', distance: '0.6 mi' },
      { name: 'Rutgers University Guest Dorms', lat: 40.8020, lng: -74.0620, type: 'Dorm Rooms', price: '$80-$110', distance: '2 mi' },
      { name: 'Secaucus Community Center', lat: 40.8070, lng: -74.0780, type: 'Cots', price: '$85-$120', distance: '0.8 mi' }
    ],
    'caesars-superdome': [
      { name: 'Superdome Central Dorms', lat: 29.9530, lng: -90.0780, type: 'Dorm Rooms', price: '$80-$120', distance: '0.2 mi' },
      { name: 'NOLA Recreation Center', lat: 29.9490, lng: -90.0750, type: 'Cots', price: '$75-$100', distance: '0.4 mi' },
      { name: 'French Quarter Event Village', lat: 29.9550, lng: -90.0710, type: 'Sleep Pods', price: '$110-$140', distance: '0.5 mi' },
      { name: 'Warehouse District Bunks', lat: 29.9480, lng: -90.0830, type: 'Bunks', price: '$85-$115', distance: '0.3 mi' }
    ]
  };

  // Custom marker icons
  function createVenueIcon() {
    return L.divIcon({
      className: 'bb-marker bb-marker-venue',
      html: '<span class="bb-marker-inner">&#x1F3DF;</span>',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -42]
    });
  }

  function createFacilityIcon() {
    return L.divIcon({
      className: 'bb-marker bb-marker-facility',
      html: '<span class="bb-marker-inner">&#x1F6CF;</span>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34]
    });
  }

  // Create a popup for a venue marker
  function venuePopup(venue) {
    return '<div class="bb-popup">' +
      '<h3 class="bb-popup-title">' + venue.name + '</h3>' +
      '<p class="bb-popup-meta">' + venue.city + ' &bull; ' + venue.sport + '</p>' +
      '<p class="bb-popup-teams">' + venue.teams + '</p>' +
      '<p class="bb-popup-beds"><strong>' + venue.beds + '</strong> overflow beds available</p>' +
      '<a href="' + venue.url + '" class="bb-popup-link">View Venue Details &rarr;</a>' +
      '</div>';
  }

  // Create a popup for a facility marker
  function facilityPopup(facility) {
    return '<div class="bb-popup">' +
      '<h3 class="bb-popup-title">' + facility.name + '</h3>' +
      '<p class="bb-popup-meta">' + facility.type + ' &bull; ' + facility.distance + ' from venue</p>' +
      '<p class="bb-popup-price"><strong>' + facility.price + '</strong>/night</p>' +
      '</div>';
  }

  // Initialize the global browse map (for /maps/ page)
  function initBrowseMap() {
    var mapEl = document.getElementById('browse-map');
    if (!mapEl) return;

    var map = L.map('browse-map', {
      scrollWheelZoom: false
    }).setView([39.8283, -98.5795], 4); // Center on USA

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    var venueIcon = createVenueIcon();
    var markers = L.markerClusterGroup ? L.markerClusterGroup() : L.layerGroup();

    // Add all venue markers
    Object.keys(VENUES).forEach(function (key) {
      var venue = VENUES[key];
      var marker = L.marker([venue.lat, venue.lng], { icon: venueIcon })
        .bindPopup(venuePopup(venue));
      markers.addLayer(marker);
    });

    markers.addTo(map);

    // Fit to venue bounds
    var bounds = [];
    Object.keys(VENUES).forEach(function (key) {
      bounds.push([VENUES[key].lat, VENUES[key].lng]);
    });
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    // Filter buttons
    var filterBtns = document.querySelectorAll('.map-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        markers.clearLayers();

        Object.keys(VENUES).forEach(function (key) {
          var venue = VENUES[key];
          if (filter === 'all' || venue.sport.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            var marker = L.marker([venue.lat, venue.lng], { icon: venueIcon })
              .bindPopup(venuePopup(venue));
            markers.addLayer(marker);
          }
        });

        // Re-fit bounds
        var filteredBounds = [];
        markers.eachLayer(function (layer) {
          filteredBounds.push(layer.getLatLng());
        });
        if (filteredBounds.length > 0) {
          map.fitBounds(filteredBounds, { padding: [40, 40] });
        }
      });
    });

    // Search input
    var searchInput = document.getElementById('map-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var query = this.value.toLowerCase().trim();
        if (!query) {
          // Reset - show all
          markers.clearLayers();
          Object.keys(VENUES).forEach(function (key) {
            var venue = VENUES[key];
            markers.addLayer(
              L.marker([venue.lat, venue.lng], { icon: venueIcon }).bindPopup(venuePopup(venue))
            );
          });
          return;
        }

        markers.clearLayers();
        Object.keys(VENUES).forEach(function (key) {
          var venue = VENUES[key];
          var searchString = (venue.name + ' ' + venue.city + ' ' + venue.teams + ' ' + venue.sport).toLowerCase();
          if (searchString.indexOf(query) !== -1) {
            var marker = L.marker([venue.lat, venue.lng], { icon: venueIcon })
              .bindPopup(venuePopup(venue));
            markers.addLayer(marker);
          }
        });

        // Fit to filtered
        var filteredBounds = [];
        markers.eachLayer(function (layer) {
          filteredBounds.push(layer.getLatLng());
        });
        if (filteredBounds.length === 1) {
          map.setView(filteredBounds[0], 13);
        } else if (filteredBounds.length > 1) {
          map.fitBounds(filteredBounds, { padding: [40, 40] });
        }
      });
    }
  }

  // Initialize a venue detail map (for /venues/[slug]/ pages)
  function initVenueMap() {
    var mapEl = document.getElementById('venue-map');
    if (!mapEl) return;

    var venueId = mapEl.getAttribute('data-venue-id');
    var venue = VENUES[venueId];
    if (!venue) return;

    var map = L.map('venue-map', {
      scrollWheelZoom: false
    }).setView([venue.lat, venue.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    // Add venue marker
    var venueIcon = createVenueIcon();
    L.marker([venue.lat, venue.lng], { icon: venueIcon })
      .bindPopup(venuePopup(venue))
      .addTo(map)
      .openPopup();

    // Add facility markers
    var facilities = FACILITIES[venueId];
    if (facilities) {
      var facilityIcon = createFacilityIcon();
      facilities.forEach(function (facility) {
        L.marker([facility.lat, facility.lng], { icon: facilityIcon })
          .bindPopup(facilityPopup(facility))
          .addTo(map);
      });

      // Draw walking radius circle (roughly 0.5 mi = ~800m)
      L.circle([venue.lat, venue.lng], {
        radius: 800,
        color: '#e63946',
        fillColor: '#e63946',
        fillOpacity: 0.05,
        weight: 2,
        dashArray: '6, 4'
      }).addTo(map);

      // Fit to all markers
      var allPoints = [[venue.lat, venue.lng]];
      facilities.forEach(function (f) {
        allPoints.push([f.lat, f.lng]);
      });
      map.fitBounds(allPoints, { padding: [30, 30] });
    }
  }

  // Initialize an event detail map (for /events/[slug]/ pages)
  function initEventMap() {
    var mapEl = document.getElementById('event-map');
    if (!mapEl) return;

    var venueId = mapEl.getAttribute('data-venue-id');
    var venue = VENUES[venueId];
    if (!venue) return;

    var map = L.map('event-map', {
      scrollWheelZoom: false
    }).setView([venue.lat, venue.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    // Add venue marker
    var venueIcon = createVenueIcon();
    L.marker([venue.lat, venue.lng], { icon: venueIcon })
      .bindPopup('<div class="bb-popup"><h3 class="bb-popup-title">' + venue.name + '</h3><p class="bb-popup-meta">Event Venue</p></div>')
      .addTo(map);

    // Add facility markers
    var facilities = FACILITIES[venueId];
    if (facilities) {
      var facilityIcon = createFacilityIcon();
      facilities.forEach(function (facility) {
        L.marker([facility.lat, facility.lng], { icon: facilityIcon })
          .bindPopup(facilityPopup(facility))
          .addTo(map);
      });

      // Walking radius
      L.circle([venue.lat, venue.lng], {
        radius: 800,
        color: '#e63946',
        fillColor: '#e63946',
        fillOpacity: 0.05,
        weight: 2,
        dashArray: '6, 4'
      }).addTo(map);

      // Fit to all markers
      var allPoints = [[venue.lat, venue.lng]];
      facilities.forEach(function (f) {
        allPoints.push([f.lat, f.lng]);
      });
      map.fitBounds(allPoints, { padding: [30, 30] });
    }
  }

  // Wait for DOM and Leaflet to be ready
  function init() {
    if (typeof L === 'undefined') return;
    initBrowseMap();
    initVenueMap();
    initEventMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
