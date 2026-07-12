/* FlowJoe — hero interactions
   Kept intentionally light: scroll reveal, nav shadow, subtle parallax tilt,
   and gentle floating callouts. Respects prefers-reduced-motion. */

(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Nav shadow on scroll ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Scroll reveal via IntersectionObserver ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Pointer-driven parallax tilt on the workspace mockup ---- */
  var stage = document.querySelector(".hero__stage");
  var workspace = document.getElementById("workspace");
  if (stage && workspace && !reduceMotion && window.matchMedia("(pointer:fine)").matches) {
    var baseX = 6, baseY = -13, raf = null, tx = baseX, ty = baseY;
    stage.addEventListener("mousemove", function (ev) {
      var r = stage.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width - 0.5;
      var py = (ev.clientY - r.top) / r.height - 0.5;
      ty = baseY + px * 8;
      tx = baseX - py * 6;
      schedule();
    });
    stage.addEventListener("mouseleave", function () { ty = baseY; tx = baseX; schedule(); });
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        workspace.style.transform =
          "rotateX(" + tx.toFixed(2) + "deg) rotateY(" + ty.toFixed(2) + "deg) rotateZ(1.5deg)";
        raf = null;
      });
    }
  }

  /* ---- Gentle floating for callouts ---- */
  if (!reduceMotion) {
    document.querySelectorAll("[data-float]").forEach(function (el, i) {
      el.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-7px)" }, { transform: "translateY(0)" }],
        { duration: 4200 + i * 600, iterations: Infinity, easing: "ease-in-out", delay: i * 400 }
      );
    });
  }

  /* ---- Hemisphere slider interaction ---- */
  var hemiSlider = document.getElementById("hemiSlider");
  var sliderLeft = document.getElementById("sliderLeft");
  var sliderHandle = document.getElementById("sliderHandle");
  if (hemiSlider && sliderLeft && sliderHandle) {
    var isDragging = false;
    var container = hemiSlider.querySelector(".slider-widget__container");

    var updateSlider = function (clientX) {
      if (window.innerWidth <= 940) return; // Disable dragging on mobile layout
      var rect = container.getBoundingClientRect();
      var x = clientX - rect.left;
      var pct = Math.max(10, Math.min(90, (x / rect.width) * 100));
      sliderLeft.style.width = pct + "%";
      sliderHandle.style.left = pct + "%";
    };

    var onMove = function (e) {
      if (!isDragging) return;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    };

    var onStart = function (e) {
      if (window.innerWidth <= 940) return;
      isDragging = true;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onEnd);
    };

    var onEnd = function () {
      isDragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    sliderHandle.addEventListener("mousedown", onStart);
    sliderHandle.addEventListener("touchstart", onStart);

    // Click anywhere on container to move
    container.addEventListener("mousedown", function (e) {
      if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
        updateSlider(e.clientX);
      }
    });
  }

  /* ---- Core Features horizontal carousel ---- */
  var scroller = document.getElementById("featuresScroller");
  if (scroller) {
    var arrows = document.querySelectorAll(".features__arrow");
    var stepFor = function () {
      var card = scroller.querySelector(".feat-card");
      if (!card) return scroller.clientWidth * 0.8;
      var gap = parseInt(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap) || 20;
      return card.offsetWidth + gap;
    };
    var updateArrows = function () {
      var maxScroll = scroller.scrollWidth - scroller.clientWidth - 1;
      arrows.forEach(function (btn) {
        var isPrev = btn.getAttribute("data-scroll") === "prev";
        btn.disabled = isPrev ? scroller.scrollLeft <= 0 : scroller.scrollLeft >= maxScroll;
      });
    };
    arrows.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = btn.getAttribute("data-scroll") === "prev" ? -1 : 1;
        scroller.scrollBy({ left: dir * stepFor(), behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
    scroller.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows, { passive: true });
    updateArrows();
  }

  /* ---- Nav link highlighting on scroll ---- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav__links a");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var href = link.getAttribute("href");
            link.classList.toggle("is-active", href === "#" + id);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: "-20% 0px -50% 0px" });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

})();
