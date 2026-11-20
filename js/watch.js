// Watch page: one big player and a grid of films. To add a film, upload
// <id>-wide.mp4, <id>-tall.mp4, <id>-wide.jpg and <id>-tall.jpg to files.flowjoe.app/watch/
// and add one line to FILMS (a film may list several categories). Bump VERSION when a file
// is replaced under the same name. A category with no films is not shown.
(function () {
  const MEDIA = "https://files.flowjoe.app/watch/";
  const VERSION = "1";
  const CATEGORIES = {writing: "Writing & Publishing", games: "Game Making", services: "Professional Services", development: "Development"};
  const FILMS = [
    {id: "hero-one-flow", title: "One flow", line: "A short film in production, from first idea to final cut, kept in one flow.", dur: "0:35", cats: ["writing"]},
    {id: "dungeon-master", title: "You’re a dungeon master", line: "Three weeks between sessions. Joe finds the promise the party made a ferryman.", dur: "1:05", cats: ["games"]},
    {id: "the-bard", title: "You’re the bard", line: "Wren owes the innkeeper a song, so Joe writes one from her own motto.", dur: "0:55", cats: ["games", "writing"]},
    {id: "world-builder", title: "You’re a world builder", line: "A whole story bible, and Joe finds every name spelled two ways.", dur: "1:14", cats: ["writing", "games"], credit: "Fallenbrooke Rising, by JJ Silver."},
    {id: "graphic-novelist", title: "You’re a graphic novelist", line: "Scripts, sketches and pages side by side, for one book.", dur: "0:32", cats: ["writing"]},
    {id: "card-game-designer", title: "You’re a card game designer", line: "Ninety-three cards, the rules and the playtests in one place.", dur: "0:50", cats: ["games"]},
    {id: "tabletop-game-designer", title: "You’re a tabletop game designer", line: "A board game from first prototype to the printed box.", dur: "1:41", cats: ["games"], credit: "Waypoint, by Waypoint Games."},
    {id: "serial-entrepreneur", title: "You’re a serial entrepreneur", line: "Every venture and every idea, finally in one place.", dur: "0:46", cats: ["services", "development"]},
    {id: "massage-therapist", title: "You’re a massage therapist", line: "Services, client notes and studio photos for a small practice.", dur: "0:43", cats: ["services"]}
  ];

  const url = (film, shape, ext) => `${MEDIA}${film.id}-${shape}.${ext}?v=${VERSION}`;
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
  let current = FILMS[0];

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
  });

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

  function show(film) {
    current = film;
    player.src = url(film, shape, "mp4");
    player.poster = url(film, shape, "jpg");
    box.classList.toggle("is-tall", shape === "tall");
    title.textContent = film.title;
    line.textContent = film.line;
    meta.textContent = `${film.dur} · ${shape === "wide" ? "Widescreen" : "Vertical"}`;
    credit.hidden = !film.credit;
    credit.textContent = film.credit || "";
    btnWide.setAttribute("aria-pressed", String(shape === "wide"));
    btnTall.setAttribute("aria-pressed", String(shape === "tall"));
    for (const tile of grid.children) tile.classList.toggle("is-playing", tile.dataset.id === film.id);
  }

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

  show(current);
})();
