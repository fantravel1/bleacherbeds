/**
 * BleacherBeds - Search & Filter Module
 * Client-side search and filtering for events, venues, and cities listing pages
 */

(function () {
  'use strict';

  // =========================================================================
  // EVENTS PAGE - Search + Sport Filter + Date Filter
  // =========================================================================

  function initEventsSearch() {
    var searchInput = document.querySelector('.search-input-group input');
    var sportSelect = document.getElementById('sport-type');
    var dateInput = document.getElementById('date-range');
    var eventsList = document.querySelector('.events-list');

    if (!searchInput || !eventsList) return;

    var events = Array.from(eventsList.querySelectorAll('.event-card-large'));
    var paginationSection = document.querySelector('.pagination-section');

    function filterEvents() {
      var query = searchInput.value.toLowerCase().trim();
      var sport = sportSelect ? sportSelect.value : 'All Events';
      var dateVal = dateInput ? dateInput.value : '';

      var visibleCount = 0;

      events.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var matchesQuery = !query || text.indexOf(query) !== -1;

        // Sport filter
        var matchesSport = true;
        if (sport !== 'All Events') {
          var sportLower = sport.toLowerCase();
          // Map display names to content keywords
          var sportMap = {
            'nfl': ['nfl', 'super bowl', 'football'],
            'nba': ['nba', 'basketball'],
            'nhl': ['nhl', 'stanley cup', 'hockey'],
            'soccer': ['soccer', 'champions league', 'football', 'premier league', 'world cup'],
            'college sports': ['ncaa', 'march madness', 'final four', 'college'],
            'concerts & festivals': ['concert', 'festival', 'coachella', 'music']
          };

          var keywords = sportMap[sportLower] || [sportLower];
          matchesSport = keywords.some(function (kw) {
            return text.indexOf(kw) !== -1;
          });
        }

        // Date filter
        var matchesDate = true;
        if (dateVal) {
          var dateText = card.querySelector('.event-date');
          if (dateText) {
            var eventDateStr = dateText.textContent;
            // Try to parse the event date and compare
            var eventDate = new Date(eventDateStr.split('•')[0].trim());
            var filterDate = new Date(dateVal);
            if (!isNaN(eventDate.getTime()) && !isNaN(filterDate.getTime())) {
              matchesDate = eventDate >= filterDate;
            }
          }
        }

        var visible = matchesQuery && matchesSport && matchesDate;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });

      // Update count or show no-results message
      updateResultsCount(eventsList, visibleCount, events.length, 'events');

      // Update pagination text
      if (paginationSection) {
        var pText = paginationSection.querySelector('p');
        if (pText) {
          if (query || sport !== 'All Events' || dateVal) {
            pText.textContent = 'Showing ' + visibleCount + ' matching event' + (visibleCount !== 1 ? 's' : '') + '.';
          } else {
            pText.textContent = 'Showing 1-' + events.length + ' of 150+ upcoming events across 50+ cities worldwide.';
          }
        }
      }
    }

    searchInput.addEventListener('input', filterEvents);
    if (sportSelect) sportSelect.addEventListener('change', filterEvents);
    if (dateInput) dateInput.addEventListener('change', filterEvents);

    // Search button click
    var searchBtn = document.querySelector('.search-input-group button');
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        filterEvents();
      });
    }
  }

  // =========================================================================
  // VENUES PAGE - Search + Sport Filter Chips
  // =========================================================================

  function initVenuesSearch() {
    var searchInput = document.querySelector('.search-box input');
    var chips = document.querySelectorAll('.filter-chips .chip');
    var venueGrid = document.querySelector('.venues-grid');

    if (!searchInput || !venueGrid) return;

    // Don't run on maps page (maps has its own search)
    if (document.getElementById('browse-map')) return;

    var venues = Array.from(venueGrid.querySelectorAll('.venue-card'));
    var activeFilter = 'All Venues';

    function filterVenues() {
      var query = searchInput.value.toLowerCase().trim();
      var visibleCount = 0;

      venues.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var matchesQuery = !query || text.indexOf(query) !== -1;

        // Sport chip filter
        var matchesSport = true;
        if (activeFilter !== 'All Venues') {
          var filterLower = activeFilter.toLowerCase();
          var sportMap = {
            'nfl': ['nfl'],
            'nba': ['nba'],
            'nhl': ['nhl'],
            'soccer': ['soccer'],
            'concerts': ['concert', 'music', 'festival']
          };

          var keywords = sportMap[filterLower] || [filterLower];
          var infoEl = card.querySelector('.venue-info');
          var infoText = infoEl ? infoEl.textContent.toLowerCase() : text;

          matchesSport = keywords.some(function (kw) {
            return infoText.indexOf(kw) !== -1;
          });
        }

        var visible = matchesQuery && matchesSport;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });

      updateResultsCount(venueGrid, visibleCount, venues.length, 'venues');
    }

    searchInput.addEventListener('input', filterVenues);

    // Filter chips
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeFilter = chip.textContent.trim();
        filterVenues();
      });
    });

    // Set initial active state
    if (chips.length > 0) {
      chips[0].classList.add('active');
    }

    // Search button
    var searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        filterVenues();
      });
    }
  }

  // =========================================================================
  // CITIES PAGE - Search
  // =========================================================================

  function initCitiesSearch() {
    var searchInput = document.querySelector('.search-box input');
    var citySections = document.querySelectorAll('.cities-section');

    if (!searchInput || citySections.length === 0) return;

    // Don't run on venues page (it also has .search-box)
    var venueGrid = document.querySelector('.venues-grid');
    if (venueGrid) return;

    var allCards = [];
    citySections.forEach(function (section) {
      var cards = Array.from(section.querySelectorAll('.city-card'));
      allCards = allCards.concat(cards);
    });

    if (allCards.length === 0) return;

    function filterCities() {
      var query = searchInput.value.toLowerCase().trim();
      var visibleCount = 0;

      allCards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var visible = !query || text.indexOf(query) !== -1;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });

      // Show/hide section headings based on whether they have visible cards
      citySections.forEach(function (section) {
        var cards = section.querySelectorAll('.city-card');
        var hasVisible = Array.from(cards).some(function (c) {
          return c.style.display !== 'none';
        });
        var heading = section.querySelector('h2');
        if (heading) {
          heading.style.display = hasVisible ? '' : 'none';
        }

        // No-results per grid
        var grid = section.querySelector('.cities-grid');
        if (grid) {
          var existing = grid.querySelector('.no-results');
          if (!hasVisible && query) {
            if (!existing) {
              var msg = document.createElement('p');
              msg.className = 'no-results';
              msg.textContent = 'No cities match your search.';
              grid.appendChild(msg);
            }
          } else if (existing) {
            existing.remove();
          }
        }
      });
    }

    searchInput.addEventListener('input', filterCities);

    var searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        filterCities();
      });
    }
  }

  // =========================================================================
  // SHARED: No-results message helper
  // =========================================================================

  function updateResultsCount(container, visible, total, type) {
    var existing = container.querySelector('.no-results');

    if (visible === 0) {
      if (!existing) {
        var msg = document.createElement('div');
        msg.className = 'no-results';
        msg.innerHTML = '<p class="no-results-text">No ' + type + ' match your search.</p>' +
          '<p class="no-results-hint">Try a different search term or clear your filters.</p>';
        container.appendChild(msg);
      }
    } else if (existing) {
      existing.remove();
    }
  }

  // =========================================================================
  // INIT
  // =========================================================================

  function init() {
    initEventsSearch();
    initVenuesSearch();
    initCitiesSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
