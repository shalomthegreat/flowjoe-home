// Watch page: one big player and a grid of films. To add a film, upload
// <id>-wide.mp4, <id>-tall.mp4, <id>-wide.jpg and <id>-tall.jpg to files.flowjoe.app/watch/
// and add one line to FILMS with the date it went up as `added` (a film may list several categories). Bump VERSION when a file
// is replaced under the same name. A category with no films is not shown. Then run
// `node scripts/build-watch-film-pages.mjs` so the film gets its own share page (watch/<id>/).
// New categories can be added to CATEGORIES at any time. The full how-to (web-copy settings, upload,
// live checks) is docs/REFERENCE/WATCH_PAGE_PUBLISHING.md in the FlowJoe app repository.
(function () {
  const MEDIA = "https://files.flowjoe.app/watch/";
  const VERSION = "7";
  const CATEGORIES = {writing: "Writing & Publishing", games: "Game Making", services: "Professional Services", development: "Development", design: "Design & Creative"};
  const FILMS = [
    {id: "hero-one-flow", added: "2026-11-19", title: "One flow", line: "A short film in production, from first idea to final cut, kept in one flow.", dur: "0:35", cats: ["writing"]},
    {id: "world-builder", added: "2026-11-19", title: "You’re a world builder", line: "A whole story bible, and Joe finds every name spelled two ways.", dur: "1:14", cats: ["writing", "games"], credit: "Fallenbrooke Rising, by JJ Silver."},
    {id: "graphic-novelist", added: "2026-11-19", title: "You’re a graphic novelist", line: "Scripts, sketches and pages side by side, for one book.", dur: "0:32", cats: ["writing"]},
    {id: "dungeon-master", added: "2026-11-19", title: "You’re a dungeon master", line: "Three weeks between sessions. Joe finds the promise the party made a ferryman.", dur: "1:05", cats: ["games"]},
    {id: "the-bard", added: "2026-11-19", title: "You’re the bard", line: "Wren owes the innkeeper a song, so Joe writes one from her own motto.", dur: "0:55", cats: ["games", "writing"]},
    {id: "card-game-designer", added: "2026-11-19", title: "You’re a card game designer", line: "Ninety-three cards, the rules and the playtests in one place.", dur: "0:50", cats: ["games"]},
    {id: "tabletop-game-designer", added: "2026-11-19", title: "You’re a tabletop game designer", line: "A board game from first prototype to the printed box.", dur: "1:41", cats: ["games"], credit: "Waypoint, by Waypoint Games."},
    {id: "massage-therapist", added: "2026-11-19", title: "You’re a massage therapist", line: "Services, client notes and studio photos for a small practice.", dur: "0:43", cats: ["services"]},
    {id: "serial-entrepreneur", added: "2026-11-19", title: "You’re a serial entrepreneur", line: "Every venture and every idea, finally in one place.", dur: "0:46", cats: ["services", "development"]},
    {id: "app-builder", added: "2026-11-20", title: "You’re an app builder", line: "An app planned screen by screen, then built by an agent exactly as planned.", dur: "2:28", cats: ["development"]},
    {id: "business-owner", added: "2026-11-20", title: "You’re a business owner", line: "A coffee roaster asks Joe once, and each Monday Joe finds new places to call.", dur: "1:48", cats: ["services"]},
    {id: "graphic-designer", added: "2026-11-21", title: "You’re a graphic designer", line: "Two branches, one link, nothing to install, and the client writes back.", dur: "1:26", cats: ["design"]}
  ];

  // A film may carry `wideOnly: true` while its vertical cut is not uploaded yet: Vertical then plays the widescreen file. Remove the flag when <id>-tall.mp4 is up.
  const url = (film, shape, ext) => `${MEDIA}${film.id}-${ext === "mp4" && film.wideOnly ? "wide" : shape}.${ext}?v=${VERSION}`;
  const player = document.getElementById("player");
  const box = document.getElementById("player-box");
  const grid = document.getElementById("grid");
  const btnWide = document.getElementById("shape-wide");
  const btnTall = document.getElementById("shape-tall");
  const title = document.getElementById("info-title");
  const line = document.getElementById("info-line");
  const meta = document.getElementById("info-meta");
  const credit = document.getElementById("info-credit");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let shape = window.matchMedia("(max-width: 560px)").matches ? "tall" : "wide";
  // A film's own page is /watch/<id>/; older links used /watch/#<id>.
  const named = (location.pathname.match(/\/watch\/([^/]+)\/?$/) || [])[1] || location.hash.slice(1);
  let current = FILMS.find((f) => f.id === named);

  // Tile size: Large (three across, with each film's line) or Compact (more across, title only).
  // Remembered in this browser only.
  const sizeLarge = document.getElementById("size-large");
  const sizeCompact = document.getElementById("size-compact");
  function setSize(compact, remember) {
    grid.classList.toggle("is-compact", compact);
    sizeLarge.setAttribute("aria-pressed", String(!compact));
    sizeCompact.setAttribute("aria-pressed", String(compact));
    if (remember) { try { localStorage.setItem("flowjoe-watch-size", compact ? "compact" : "large"); } catch (error) { /* storage blocked */ } }
  }
  sizeLarge.addEventListener("click", () => setSize(false, true));
  sizeCompact.addEventListener("click", () => setSize(true, true));
  try { setSize(localStorage.getItem("flowjoe-watch-size") === "compact", false); } catch (error) { /* storage blocked */ }

  // Order: Newest first (the default) or Oldest first, by each film's `added` date. Films that went up
  // the same day keep their order in FILMS either way. Remembered in this browser only.
  const sortNew = document.getElementById("sort-newest");
  const sortOld = document.getElementById("sort-oldest");
  const byDate = (oldest) => FILMS.map((f, i) => [f, i]).sort(([a, i], [b, j]) => (oldest ? (a.added || "").localeCompare(b.added || "") : (b.added || "").localeCompare(a.added || "")) || i - j).map(([f]) => f);
  function setOrder(oldest, remember) {
    sortNew.setAttribute("aria-pressed", String(!oldest));
    sortOld.setAttribute("aria-pressed", String(oldest));
    const tiles = new Map([...grid.children].map((t) => [t.dataset.id, t]));
    for (const film of byDate(oldest)) if (tiles.has(film.id)) grid.append(tiles.get(film.id));
    if (remember) { try { localStorage.setItem("flowjoe-watch-order", oldest ? "oldest" : "newest"); } catch (error) { /* storage blocked */ } }
    if (current) nameNeighbours();
  }
  sortNew.addEventListener("click", () => setOrder(false, true));
  sortOld.addEventListener("click", () => setOrder(true, true));

  const filters = document.getElementById("filters");
  function addFilter(key, label) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.dataset.cat = key;
    chip.textContent = label;
    chip.setAttribute("aria-pressed", String(key === "all"));
    filters.append(chip);
  }
  addFilter("all", "All");
  for (const [key, label] of Object.entries(CATEGORIES)) {
    if (FILMS.some((f) => f.cats.includes(key))) addFilter(key, label);
  }
  filters.addEventListener("click", (event) => {
    const chip = event.target.closest("button");
    if (!chip) return;
    const cat = chip.dataset.cat;
    for (const c of filters.children) c.setAttribute("aria-pressed", String(c === chip));
    for (const tile of grid.children) tile.hidden = cat !== "all" && !tile.dataset.cats.split(" ").includes(cat);
    nameNeighbours();
  });

  const page = document.getElementById("main-content");
  for (const film of FILMS) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "w-tile";
    tile.dataset.id = film.id;
    tile.dataset.cats = film.cats.join(" ");
    const thumb = document.createElement("span");
    thumb.className = "w-thumb";
    const img = document.createElement("img");
    img.src = url(film, "wide", "jpg");
    img.alt = "";
    img.loading = "lazy";
    img.width = 1280;
    img.height = 720;
    const now = document.createElement("span");
    now.className = "w-now";
    now.textContent = "Playing";
    const dur = document.createElement("span");
    dur.className = "w-dur";
    dur.textContent = film.dur;
    thumb.append(img, now, dur);
    const name = document.createElement("b");
    name.textContent = film.title;
    const story = document.createElement("span");
    story.className = "w-line";
    story.textContent = film.line;
    tile.append(thumb, name, story);
    grid.append(tile);
  }
  let oldestFirst = false;
  try { oldestFirst = localStorage.getItem("flowjoe-watch-order") === "oldest"; } catch (error) { /* storage blocked */ }
  setOrder(oldestFirst, false);
  // With no film named in the link, the page opens on the first film in the chosen order.
  if (!current) current = FILMS.find((f) => f.id === grid.firstElementChild.dataset.id);

  function show(film) {
    if (film !== current) history.replaceState(null, "", `/watch/${film.id}/`);
    current = film;
    player.src = url(film, shape, "mp4");
    player.poster = url(film, shape, "jpg");
    box.classList.toggle("is-tall", shape === "tall");
    if (page.classList.contains("w-tall") !== (shape === "tall")) {
      page.classList.toggle("w-tall", shape === "tall");
      for (const tile of grid.children) {
        const img = tile.querySelector("img");
        img.src = url(FILMS.find((f) => f.id === tile.dataset.id), shape, "jpg");
        img.width = shape === "tall" ? 720 : 1280;
        img.height = shape === "tall" ? 1280 : 720;
      }
    }
    title.textContent = film.title;
    document.getElementById("film-now").textContent = film.title;
    line.textContent = film.line;
    meta.textContent = `${film.dur} · ${shape === "wide" ? "Widescreen" : "Vertical"}`;
    credit.hidden = !film.credit;
    credit.textContent = film.credit || "";
    btnWide.setAttribute("aria-pressed", String(shape === "wide"));
    btnTall.setAttribute("aria-pressed", String(shape === "tall"));
    for (const tile of grid.children) tile.classList.toggle("is-playing", tile.dataset.id === film.id);
    nameNeighbours();
  }

  // Previous / next step through the films the filter is showing, and wrap round at either end.
  function neighbour(step) {
    const shown = [...grid.children].filter((t) => !t.hidden).map((t) => FILMS.find((f) => f.id === t.dataset.id));
    const list = shown.length ? shown : [...grid.children].map((t) => FILMS.find((f) => f.id === t.dataset.id));
    const at = list.indexOf(current);
    return list[(at === -1 ? (step > 0 ? 0 : list.length - 1) : at + step + list.length) % list.length];
  }
  function nameNeighbours() {
    document.getElementById("film-prev-name").textContent = neighbour(-1).title;
    document.getElementById("film-next-name").textContent = neighbour(1).title;
  }
  function step(by) {
    show(neighbour(by));
    player.play().catch(() => {});
  }
  // Every film has its own page (flowjoe.app/watch/<id>/) whose link preview shows that film.
  // Share hands that link to the phone's own share sheet where there
  // is one, and otherwise copies it.
  const shareLabel = document.getElementById("film-share-label");
  const filmLink = (film) => `${location.origin}/watch/${film.id}/`;
  let shareTimer = 0;
  function said(text) {
    shareLabel.textContent = text;
    clearTimeout(shareTimer);
    shareTimer = setTimeout(() => { shareLabel.textContent = "Share"; }, 2200);
  }
  document.getElementById("film-share").addEventListener("click", async () => {
    const link = filmLink(current);
    if (navigator.share) {
      try { await navigator.share({title: `${current.title} — FlowJoe`, url: link}); } catch (error) { /* closed without sharing */ }
      return;
    }
    try { await navigator.clipboard.writeText(link); said("Copied"); } catch (error) { said("Failed"); }
  });
  window.addEventListener("hashchange", () => {
    const film = FILMS.find((f) => f.id === location.hash.slice(1));
    if (film && film !== current) show(film);
  });

  // When a film ends, the next one the filter shows starts by itself; after the last one it stops.
  player.addEventListener("ended", () => {
    const shown = [...grid.children].filter((t) => !t.hidden);
    const last = (shown.length ? shown[shown.length - 1] : grid.lastElementChild).dataset.id;
    if (current.id !== last) step(1);
  });
  document.getElementById("film-prev").addEventListener("click", () => step(-1));
  document.getElementById("film-next").addEventListener("click", () => step(1));

  grid.addEventListener("click", (event) => {
    const tile = event.target.closest(".w-tile");
    if (!tile) return;
    show(FILMS.find((f) => f.id === tile.dataset.id));
    player.play().catch(() => {});
    box.scrollIntoView({behavior: reduced.matches ? "auto" : "smooth", block: "center"});
  });

  function setShape(next) {
    if (next === shape) return;
    const time = player.currentTime;
    const playing = !player.paused;
    shape = next;
    show(current);
    player.addEventListener("loadedmetadata", () => {
      player.currentTime = time;
      if (playing) player.play().catch(() => {});
    }, {once: true});
  }
  btnWide.addEventListener("click", () => setShape("wide"));
  btnTall.addEventListener("click", () => setShape("tall"));

  // On a device with a pointer, the player's own controls show only while the pointer (or keyboard
  // focus) is on the player. A paused film shows a play mark so it still reads as a video; clicking
  // the picture plays or pauses. Touch screens keep the controls, since there is nothing to hover.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let over = false;
    let focused = false;
    const sync = () => { player.controls = over || focused; };
    box.classList.add("is-hover-controls");
    box.addEventListener("pointerenter", () => { over = true; sync(); });
    box.addEventListener("pointerleave", () => { over = false; sync(); });
    // Only keyboard focus keeps the controls up: a click also focuses the video, and must not pin them.
    let viaKeys = false;
    document.addEventListener("keydown", () => { viaKeys = true; }, true);
    document.addEventListener("pointerdown", () => { viaKeys = false; }, true);
    player.tabIndex = 0; // without its controls a video is skipped by Tab
    box.addEventListener("focusin", () => { focused = viaKeys; sync(); });
    box.addEventListener("focusout", () => { focused = false; sync(); });
    // With its controls showing, the browser already plays or pauses on a click; cover the moment they are not.
    player.addEventListener("click", () => { if (!player.controls) { if (player.paused) player.play().catch(() => {}); else player.pause(); } });
    const mark = () => box.classList.toggle("is-paused", player.paused);
    for (const name of ["play", "pause", "ended", "emptied"]) player.addEventListener(name, mark);
    mark();
    sync();
  }

  show(current);
})();
