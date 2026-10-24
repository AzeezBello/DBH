// DBH Solutions - Main JavaScript

var slideIndex = 1;
var slideInterval = null;

function showSlides(n) {
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (!slides || slides.length === 0) return;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (var j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }

  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
  }
}

function plusSlides(n) {
  resetSlideTimer();
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  resetSlideTimer();
  showSlides(slideIndex = n);
}

function startSlideTimer() {
  if (slideInterval) clearInterval(slideInterval);
  var slides = document.getElementsByClassName("mySlides");
  if (slides && slides.length > 1) {
    slideInterval = setInterval(function() {
      showSlides(slideIndex += 1);
    }, 5000);
  }
}

function resetSlideTimer() {
  if (slideInterval) {
    clearInterval(slideInterval);
    startSlideTimer();
  }
}

// Fallback map renderer if Google Maps fails or is blocked
function renderFallbackMap(mapElem, location) {
  if (!mapElem || mapElem.getAttribute('data-map-loaded') === 'true') return;
  mapElem.setAttribute('data-map-loaded', 'true');
  
  var bbox = (location.lng - 0.01) + '%2C' + (location.lat - 0.01) + '%2C' + (location.lng + 0.01) + '%2C' + (location.lat + 0.01);
  var osmUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=' + bbox + '&amp;layer=mapnik&amp;marker=' + location.lat + '%2C' + location.lng;
  
  mapElem.innerHTML = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + osmUrl + '" style="border:0;width:100%;height:100%;"></iframe>';
}

// Google Maps callback
function initMap() {
  var location = {
    lat: 6.431130,
    lng: 3.427020
  };

  var mapElem = document.getElementById('map');
  if (!mapElem) return;

  if (typeof google !== 'undefined' && google.maps && google.maps.Map) {
    try {
      var map = new google.maps.Map(mapElem, {
        zoom: 16,
        center: location,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });

      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'DBH Solutions - 25B Sanusi Fafunwa, Victoria Island, Lagos'
      });

      var infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding:10px;font-family:sans-serif;color:#002B54;"><strong>DBH Solutions Limited</strong><br>25B Sanusi Fafunwa St<br>Victoria Island, Lagos, Nigeria</div>'
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });

      mapElem.setAttribute('data-map-loaded', 'true');
      return;
    } catch (err) {
      console.warn('Google Maps initialization failed, using interactive fallback:', err);
    }
  }

  renderFallbackMap(mapElem, location);
}

// Global handler for Google Maps authentication failures
window.gm_authFailure = function() {
  console.warn('Google Maps authentication failed; loading fallback map.');
  var mapElem = document.getElementById('map');
  renderFallbackMap(mapElem, { lat: 6.431130, lng: 3.427020 });
};

// Document Ready Initialization
$(document).ready(function() {
  // Initialize Materialize mobile sidenav
  var sidenavElems = document.querySelectorAll('.sidenav');
  if (typeof M !== 'undefined' && M.Sidenav) {
    M.Sidenav.init(sidenavElems);
  } else if ($.fn.sidenav) {
    $('.sidenav').sidenav();
  }

  // Close mobile sidenav when a link is clicked
  $('.sidenav a').on('click', function() {
    var sidenavInst = M.Sidenav.getInstance(document.getElementById('mobile-links'));
    if (sidenavInst) {
      sidenavInst.close();
    }
  });

  // Initialize Slides
  showSlides(slideIndex);
  startSlideTimer();

  // If Google Maps hasn't initialized after 2.5 seconds (e.g. offline or blocked), load fallback
  setTimeout(function() {
    var mapElem = document.getElementById('map');
    if (mapElem && mapElem.getAttribute('data-map-loaded') !== 'true') {
      renderFallbackMap(mapElem, { lat: 6.431130, lng: 3.427020 });
    }
  }, 2500);
});
