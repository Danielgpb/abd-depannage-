/**
 * ABD Depannage — Main JavaScript
 * Vanilla JS, no dependencies
 * Features: mobile nav, dropdown, sticky header, smooth scroll,
 *           lazy loading, WhatsApp link, click-to-call,
 *           scroll reveals, hero parallax, custom cursor,
 *           animated counters, 3D tilt cards, page transitions
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     1. MOBILE HAMBURGER TOGGLE
     ========================================================== */

  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('.nav');

  if (hamburger) {
    // Toggle mobile menu on click
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = document.body.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!document.body.classList.contains('nav-open')) return;
      var clickedInsideNav = nav && nav.contains(e.target);
      var clickedHamburger = hamburger.contains(e.target);
      if (!clickedInsideNav && !clickedHamburger) {
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================
     2. DROPDOWN SERVICES MENU
     ========================================================== */

  var dropdownParents = document.querySelectorAll('.nav-item.has-dropdown');

  dropdownParents.forEach(function (parent) {
    var dropdown = parent.querySelector('.dropdown');
    if (!dropdown) return;

    // --- Desktop: show on hover ---
    parent.addEventListener('mouseenter', function () {
      if (window.innerWidth > 768) {
        dropdown.classList.add('dropdown-open');
      }
    });

    parent.addEventListener('mouseleave', function () {
      if (window.innerWidth > 768) {
        dropdown.classList.remove('dropdown-open');
      }
    });

    // --- Mobile: show on click/tap ---
    var trigger = parent.querySelector('.dropdown-trigger') || parent.querySelector('a');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close any other open dropdowns
          dropdownParents.forEach(function (other) {
            if (other !== parent) {
              var otherDd = other.querySelector('.dropdown');
              if (otherDd) otherDd.classList.remove('dropdown-open');
            }
          });
          dropdown.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    dropdownParents.forEach(function (parent) {
      if (!parent.contains(e.target)) {
        var dropdown = parent.querySelector('.dropdown');
        if (dropdown) dropdown.classList.remove('dropdown-open');
      }
    });
  });

  /* ==========================================================
     3. STICKY HEADER SCROLL EFFECT
     ========================================================== */

  var header = document.querySelector('.header');

  if (header) {
    var scrollThreshold = 50;

    window.addEventListener('scroll', function () {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ==========================================================
     4. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================== */

  var anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      // Ignore bare "#" links
      if (targetId === '#' || targetId.length < 2) return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open after clicking an anchor
        if (document.body.classList.contains('nav-open') && hamburger) {
          document.body.classList.remove('nav-open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ==========================================================
     5. LAZY LOADING IMAGES (IntersectionObserver)
     ========================================================== */

  var lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          // Swap data-src to src
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          // Add loaded class for CSS fade-in transition
          img.addEventListener('load', function () {
            img.classList.add('loaded');
          });
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px' // Start loading 100px before the image enters viewport
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback: load all images immediately if IntersectionObserver not supported
    lazyImages.forEach(function (img) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    });
  }

  /* ==========================================================
     6. WHATSAPP LINK
     ========================================================== */

  var whatsappButtons = document.querySelectorAll('.btn-whatsapp');
  var whatsappUrl = 'https://wa.me/32488048733';

  whatsappButtons.forEach(function (btn) {
    btn.setAttribute('href', whatsappUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  /* ==========================================================
     7. CLICK-TO-CALL LINKS
     ========================================================== */

  var callButtons = document.querySelectorAll('.btn-call');
  var phoneNumber = 'tel:0488048733';

  callButtons.forEach(function (btn) {
    btn.setAttribute('href', phoneNumber);
  });


  /* ==========================================================
     === EXTRAORDINARY VISUAL EFFECTS ===
     ========================================================== */


  /* ==========================================================
     8. SCROLL-DRIVEN REVEALS (IntersectionObserver)
     ========================================================== */

  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }


  /* ==========================================================
     9. HERO PHOTO — statique (parallax retiré)
     ========================================================== */
  /* L'ancien parallax décalait la photo au scroll (translateY), ce qui
     révélait le fond sombre en haut de la carte puisque l'image fait
     exactement 100% de la hauteur. La photo reste désormais fixe. */


  /* ==========================================================
     10. CUSTOM CURSOR (desktop only)
     ========================================================== */

  var cursor = document.querySelector('.cursor-dot');

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.classList.add('visible');
    });

    // Grow cursor on interactive elements
    var hoverTargets = document.querySelectorAll('a, button, .service-card, .review-card, summary');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
      });
    });

    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('visible');
    });
  }


  /* ==========================================================
     11. ANIMATED COUNTERS
     ========================================================== */

  var counterElements = document.querySelectorAll('[data-count-to]');

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    // Set initial value to 0
    counterElements.forEach(function (el) {
      el.textContent = '0';
    });

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseFloat(el.dataset.countTo);
          var suffix = el.dataset.countSuffix || '';
          var duration = 1500;
          var start = performance.now();
          var isFloat = target % 1 !== 0;

          var animate = function (now) {
            var progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = eased * target;
            el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, {
      threshold: 0.5
    });

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }


  /* ==========================================================
     12. 3D TILT ON CARDS (desktop only)
     ========================================================== */

  if (window.matchMedia('(pointer: fine)').matches) {
    var tiltCards = document.querySelectorAll('.service-card, .review-card');

    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (y * -8) + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
        card.style.transition = 'transform 400ms cubic-bezier(0.32, 0.72, 0, 1)';
      });

      card.addEventListener('mouseenter', function () {
        card.style.transition = 'transform 100ms ease-out';
      });
    });
  }


  /* ==========================================================
     13. PAGE TRANSITIONS (View Transitions API)
     ========================================================== */

  if (document.startViewTransition) {
    var internalLinks = document.querySelectorAll('a[href$=".html"]');

    internalLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('tel') && !href.startsWith('mailto')) {
          e.preventDefault();
          document.startViewTransition(function () {
            window.location.href = href;
          });
        }
      });
    });
  }

});
