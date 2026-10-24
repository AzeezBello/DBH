// ============================================================
// DBH Solutions - Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Navigation Menu Toggle
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Initialize Slideshow
  showSlides(slideIndex);
  startSlideTimer();
});

// Slideshow Implementation
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
    dots[j].classList.remove("active");
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }

  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
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
