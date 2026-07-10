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
})();
