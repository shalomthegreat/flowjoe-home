// Release list -> download page content. Shared by two readers so they can never disagree:
//   - download/index.html, which shows the live list from https://files.flowjoe.app/releases.json, and
//   - FlowJoe's release command (scripts/publish-release.cjs in the FlowJoe repo), which writes the same content into the
//     page's own HTML between <!--r:NAME--> markers, so the page is right without JavaScript, for search engines and
//     link previews, and if the list cannot load.
// The list is data, never run as code: every entry is checked, and only files.flowjoe.app addresses become links.
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.FlowJoeReleases = api;
})(typeof self !== "undefined" ? self : this, function () {
  const ROWS = {
    mac: [
      {arch: "arm64", kind: "dmg", title: "Apple Silicon", meta: "macOS 14 Sonoma or later", sum: "macOS · Apple Silicon (.dmg)"},
      {arch: "x64", kind: "dmg", title: "Intel", meta: "macOS 14 Sonoma or newer", sum: "macOS · Intel (.dmg)", soon: "Intel Macs · macOS 14 Sonoma or newer — coming soon", pending: "Listed here when the Intel download is released."}
    ],
    win: [{kind: "exe", title: "64-bit installer", meta: "Windows 10 or 11 · .exe", sum: "Windows · 64-bit (.exe)"}],
    linux: [
      {kind: "appimage", title: "AppImage", meta: "Any distribution", sum: "Linux · AppImage"},
      {kind: "deb", title: "Debian / Ubuntu", meta: ".deb", sum: "Linux · Debian / Ubuntu (.deb)", soon: "Debian / Ubuntu (.deb) — coming soon"}
    ]
  };
  const SHORT = {"mac-arm64-dmg": "Mac", "mac-x64-dmg": "Mac (Intel)", "win-x64-exe": "Windows", "linux-x64-appimage": "Linux", "linux-x64-deb": ".deb"};
  const COPY_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[c]);
  const mb = (bytes) => `${Math.round(bytes / 1e6)} MB`;
  const pretty = (v) => v.replace(/-(alpha|beta)/, " $1");
  const when = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric", timeZone: "UTC"});
  const fileFor = (rel, os, row) => rel.files.find((f) => f.os === os && f.kind === row.kind && (!row.arch || f.arch === row.arch));
  // A release link may carry ?sha256=<fingerprint> so a rebuilt file under the same name is never served from an old cache.
  const safeUrl = (u) => (/^https:\/\/files\.flowjoe\.app\/releases\/[A-Za-z0-9._\/-]+(?:\?sha256=[a-f0-9]{64})?$/.test(u) ? u : null);
  const safeNotes = (u) => (/^https:\/\/flowjoe\.app\/docs\/#[a-z0-9#-]+$/.test(u) ? u.replace("https://flowjoe.app", "") : "/docs/#changelog");

  // Only well-formed entries are used: a version and date in the expected shape, 64-character fingerprints, real sizes,
  // and addresses on files.flowjoe.app. Anything else is dropped.
  function cleanReleases(data) {
    const KINDS = new Set(Object.keys(SHORT));
    const releases = (Array.isArray(data && data.releases) ? data.releases : [])
      .map((r) => ({
        version: r && r.version,
        date: r && r.date,
        notes: r && r.notes,
        files: (Array.isArray(r && r.files) ? r.files : []).filter((f) => f && KINDS.has(`${f.os}-${f.arch}-${f.kind}`) && safeUrl(f.url) && /^[0-9a-f]{64}$/.test(f.sha256) && Number.isFinite(f.size) && f.size > 0)
      }))
      .filter((r) => typeof r.version === "string" && /^\d+\.\d+\.\d+(-[0-9a-z.]+)?$/i.test(r.version) && /^\d{4}-\d{2}-\d{2}$/.test(r.date || "") && r.files.length);
    return releases.length ? {releases} : null;
  }

  // Everything the page shows that depends on the release list, as text and HTML. `data` must come from cleanReleases.
  function releaseView(data) {
    const rel = data && data.releases && data.releases[0];
    if (!rel) return null;
    const files = {};
    let sums = "";
    for (const [os, rows] of Object.entries(ROWS)) {
      let html = "";
      for (const row of rows) {
        const f = fileFor(rel, os, row),
          url = f && safeUrl(f.url);
        const intelId = row.arch === "x64" && os === "mac" ? ' id="mac-intel"' : "";
        if (url) {
          html += `<div class="dl-file"${intelId}><div><div class="dl-file__name">${esc(row.title)}</div><div class="dl-file__meta">${esc(row.meta)} &middot; ${esc(mb(f.size))}</div></div><a class="btn btn--sm btn--primary" href="${esc(url)}" download>Download</a></div>`;
          sums += `<div class="dl-sum"><div class="dl-sum__label">${esc(row.sum)}</div><div class="dl-sum__row"><code class="dl-hash">${esc(f.sha256)}</code><button type="button" class="dl-copy" data-copy aria-label="Copy ${esc(row.sum)} fingerprint" title="Copy">${COPY_ICON}</button></div></div>`;
        } else if (row.soon) {
          html += `<div class="dl-soon"${intelId}>${esc(row.soon)}</div>`;
          if (row.pending) sums += `<div class="dl-sum"><div class="dl-sum__label">${esc(row.sum)}</div><div class="dl-sum__row"><code class="dl-hash dl-hash--none">${esc(row.pending)}</code></div></div>`;
        }
      }
      files[os] = html || `<div class="dl-soon">Not in ${esc(rel.version)}; see Previous versions below.</div>`;
    }
    const arm = fileFor(rel, "mac", ROWS.mac[0]),
      intel = fileFor(rel, "mac", ROWS.mac[1]),
      win = fileFor(rel, "win", ROWS.win[0]),
      app = fileFor(rel, "linux", ROWS.linux[0]);
    const meta = {};
    if (arm) meta.mac = `For Apple Silicon Macs · ${mb(arm.size)} · ${intel ? "Intel Macs: see below" : "Intel Mac version coming soon"}`;
    if (intel) meta.macIntel = `Intel · ${mb(intel.size)} · macOS 14 Sonoma or newer`;
    if (win) meta.win = `64-bit · ${mb(win.size)} · Windows 10 or 11`;
    if (app) meta.linux = `AppImage · ${mb(app.size)} · 64-bit`;
    const versions = data.releases
      .map((r, i) => {
        // Each download carries its SHA-256 fingerprint (shown on hover and read out by screen readers).
        const links = (r.files || [])
          .map((f) => [SHORT[`${f.os}-${f.arch}-${f.kind}`], safeUrl(f.url), f.sha256])
          .filter(([label, url]) => label && url)
          .map(([label, url, sha]) => `<a href="${esc(url)}" title="SHA-256 ${esc(sha || "")}" aria-label="${esc(label)}, SHA-256 ${esc(sha || "")}">${esc(label)}</a>`)
          .join('<span class="dl-dot">&middot;</span>');
        return `<div class="dl-vrow"><span class="dl-vname">${esc(r.version)}${i === 0 ? ' <span class="dl-latest">Latest</span>' : ""}</span><span>${esc(when(r.date))}</span><span>${links}</span><a class="dl-vnotes" href="${esc(safeNotes(r.notes))}">What changed &rarr;</a></div>`;
      })
      .join("");
    return {
      latestLabel: `Latest version ${pretty(rel.version)}`,
      whatsnewText: `What’s new in ${rel.version.replace(/-(alpha|beta).*$/, "")} →`,
      whatsnewHref: safeNotes(rel.notes),
      files,
      sums,
      versions,
      meta
    };
  }

  // The page's own HTML for each <!--r:NAME--> region (used by the release command). The built-in list's JSON is
  // escaped so it can never close its <script> element.
  function staticRegions(data) {
    const v = releaseView(data);
    if (!v) return null;
    return {
      "latest-label": esc(v.latestLabel),
      "primary-meta": esc(v.meta.mac || "FlowJoe runs on Mac, Windows and Linux computers"),
      whatsnew: `<a class="dl-whatsnew" id="whatsnew" href="${esc(v.whatsnewHref)}">${esc(v.whatsnewText)}</a>`,
      "files-mac": v.files.mac,
      "files-win": v.files.win,
      "files-linux": v.files.linux,
      sums: v.sums,
      versions: v.versions,
      "built-in-list": `<script type="application/json" id="release-list">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`
    };
  }

  return {cleanReleases, releaseView, staticRegions};
});
