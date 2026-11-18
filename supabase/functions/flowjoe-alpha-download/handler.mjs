// Shared-code check for the public website, independent of Supabase account authentication.
// No account/database/admin keys, logging, sessions or writes.
const ORIGIN = "https://flowjoe.app";
const encoder = new TextEncoder();
export function createAlphaDownloadHandler({codeHash} = {}) {
  return async function handle(request) {
    const headers = {"Content-Type": "application/json", "Cache-Control": "no-store", Vary: "Origin"};
    if (request.headers.get("Origin") === ORIGIN) {
      headers["Access-Control-Allow-Origin"] = ORIGIN;
      headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
      headers["Access-Control-Allow-Headers"] = "content-type";
    } else return new Response(JSON.stringify({error: "origin_not_allowed"}), {status: 403, headers});
    const reply = (status, body) => new Response(JSON.stringify(body), {status, headers});
    if (request.method === "OPTIONS") return new Response(null, {status: 204, headers});
    if (request.method !== "POST") return reply(405, {error: "method_not_allowed"});
    if (!/^[a-f0-9]{64}$/.test(codeHash || "")) return reply(503, {error: "unavailable"});
    if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415, {error: "invalid_request"});
    let body;
    try {
      const raw = await request.text();
      if (raw.length > 512) return reply(400, {error: "invalid_request"});
      body = JSON.parse(raw);
    } catch (_) {
      return reply(400, {error: "invalid_request"});
    }
    if (typeof body?.code !== "string" || body.code.length > 128) return reply(400, {error: "invalid_request"});
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(body.code.trim().toLowerCase())));
    const supplied = Array.from(digest, (b) => b.toString(16).padStart(2, "0")).join("");
    let different = 0;
    for (let i = 0; i < 64; i++) different |= supplied.charCodeAt(i) ^ codeHash.charCodeAt(i);
    return different ? reply(403, {error: "invalid_code"}) : reply(200, {ok: true});
  };
}
