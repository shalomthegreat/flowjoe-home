import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {createRequire} from "node:module";
import {readFile} from "node:fs/promises";
import {createAlphaDownloadHandler} from "../supabase/functions/flowjoe-alpha-download/handler.mjs";
const hash = createHash("sha256").update("sample-access").digest("hex");
const handler = createAlphaDownloadHandler({codeHash: hash});
const request = (body, options = {}) => new Request("https://example.supabase.co/functions/v1/flowjoe-alpha-download", {method: "POST", headers: {Origin: "https://flowjoe.app", "Content-Type": "application/json", ...options.headers}, body: JSON.stringify(body), ...options});
test("shared-code check rejects wrong and missing codes without authorizing", async () => {
  for (const code of ["wrong", "", null]) {
    const r = await handler(request({code}));
    assert.notEqual(r.status, 200);
    assert.notEqual((await r.json()).ok, true);
  }
});
test("shared-code check accepts the configured code with surrounding spaces and letter case", async () => {
  const r = await handler(request({code: "  SAMPLE-ACCESS  "}));
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), {ok: true});
  assert.equal(r.headers.get("Cache-Control"), "no-store");
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "https://flowjoe.app");
});
test("shared-code check stays unavailable without a valid server secret", async () => {
  for (const codeHash of [undefined, "invalid"]) {
    const r = await createAlphaDownloadHandler({codeHash})(request({code: "sample-access"}));
    assert.equal(r.status, 503);
    assert.notEqual((await r.json()).ok, true);
  }
});
test("shared-code check restricts origins and permits only its POST preflight", async () => {
  const foreign = await handler(request({code: "sample-access"}, {headers: {Origin: "https://unrelated.example", "Content-Type": "application/json"}}));
  assert.equal(foreign.status, 403);
  assert.equal(foreign.headers.get("Access-Control-Allow-Origin"), null);
  const preflight = await handler(new Request("https://example.supabase.co/", {method: "OPTIONS", headers: {Origin: "https://flowjoe.app"}}));
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");
  const get = await handler(new Request("https://example.supabase.co/", {headers: {Origin: "https://flowjoe.app"}}));
  assert.equal(get.status, 405);
});
test("shared-code check rejects malformed and oversized requests", async () => {
  for (const body of ["broken", JSON.stringify({code: "x".repeat(513)}), JSON.stringify({code: 123})]) {
    const r = await handler(new Request("https://example.supabase.co/", {method: "POST", headers: {Origin: "https://flowjoe.app", "Content-Type": "application/json"}, body}));
    assert.equal(r.status, 400);
  }
  const form = await handler(request({code: "sample-access"}, {headers: {Origin: "https://flowjoe.app", "Content-Type": "text/plain"}}));
  assert.equal(form.status, 415);
});
test("release rendering keeps latest and historical installers behind the website prompt", async () => {
  const require = createRequire(import.meta.url);
  const api = require("../js/download-releases.js");
  const html = await readFile(new URL("../download/index.html", import.meta.url), "utf8");
  const raw = JSON.parse(html.match(/<script type="application\/json" id="release-list">([\s\S]*?)<\/script>/)[1]);
  const clean = api.cleanReleases(raw);
  const view = api.releaseView(clean);
  for (const part of [...Object.values(view.files), view.versions]) {
    assert.match(part, /href="#alpha-download" data-download-url="https:\/\/files\.flowjoe\.app\/releases\//);
    assert.doesNotMatch(part, /href="https:\/\/files\.flowjoe\.app/);
  }
  assert.doesNotMatch(html, /<a[^>]*href="https:\/\/files\.flowjoe\.app/);
  for (const [name, value] of Object.entries(api.staticRegions(clean))) {
    assert.ok(html.includes("<!--r:" + name + "-->" + value + "<!--/r:" + name + "-->"));
  }
});
