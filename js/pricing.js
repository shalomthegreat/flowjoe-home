// Yearly / Monthly switch on the pricing page.
(function () {
  var prices = {
    annual: {
      proWas: true,
      proAmount: "$6",
      proUnit: "/ month",
      proDetail: "$72 billed yearly. Founding price for the first 30 days after launch or the first 1,000 subscribers, whichever comes first, then yours to keep for as long as you have your account.",
      teamAmount: "$15",
      teamUnit: "/ seat / month",
      teamDetail: "$180 per seat billed yearly. Two seats minimum.",
      note: "Pro is $72 a year for founding members",
    },
    monthly: {
      proWas: false,
      proAmount: "$10",
      proUnit: "/ month",
      proDetail: "The founding price is yearly only.",
      teamAmount: "$18",
      teamUnit: "/ seat / month",
      teamDetail: "Two seats minimum.",
      note: "Yearly saves 20% on Pro and about 17% on Team",
    },
  };
  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function apply(period) {
    var p = prices[period];
    if (!p) return;
    document.querySelectorAll("[data-billing]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-billing") === period ? "true" : "false");
    });
    var was = document.getElementById("pro-was");
    if (was) was.hidden = !p.proWas;
    var tag = document.getElementById("pro-tag");
    if (tag) tag.hidden = !p.proWas;
    var now = document.getElementById("pro-now");
    if (now) now.hidden = !p.proWas;
    set("pro-amount", p.proAmount);
    set("pro-unit", p.proUnit);
    set("pro-detail", p.proDetail);
    set("team-amount", p.teamAmount);
    set("team-unit", p.teamUnit);
    set("team-detail", p.teamDetail);
    set("billing-note", p.note);
  }
  document.querySelectorAll("[data-billing]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-billing"));
    });
  });
})();
