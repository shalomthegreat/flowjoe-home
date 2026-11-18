const {test, expect} = require("@playwright/test");
const {createHash} = require("node:crypto");
const endpoint = "https://gwgniaqhsljzwffqhfgb.supabase.co/functions/v1/flowjoe-alpha-download";
// Negative coverage proof: simulate the new client script being absent.
test.beforeEach(async ({page}) => {
  if (process.env.FLOWJOE_ALPHA_MUTATION === "missing-client") await page.route("**/js/alpha-download.js", (route) => route.fulfill({contentType: "application/javascript", body: ""}));
});
async function setup(page, mode = "normal") {
  const {createAlphaDownloadHandler} = await import("../supabase/functions/flowjoe-alpha-download/handler.mjs");
  const handler = createAlphaDownloadHandler({codeHash: createHash("sha256").update("sample-access").digest("hex")});
  const downloads = [];
  await page.route("https://files.flowjoe.app/releases.json", (route) => route.abort());
  await page.route("https://files.flowjoe.app/releases/**", async (route) => {
    downloads.push(route.request().url());
    await route.fulfill({status: 200, headers: {"Content-Type": "application/octet-stream", "Content-Disposition": 'attachment; filename="FlowJoe-test-installer.bin"'}, body: "synthetic installer fixture"});
  });
  await page.route(endpoint, async (route) => {
    if (mode === "offline") return route.abort();
    if (mode === "unavailable") return route.fulfill({status: 503, headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:8770"}, json: {error: "unavailable"}});
    if (mode === "invalid-response") return route.fulfill({status: 200, headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:8770"}, json: {ok: false}});
    const r = await handler(new Request(endpoint, {method: "POST", headers: {Origin: "https://flowjoe.app", "Content-Type": "application/json"}, body: route.request().postData()}));
    await route.fulfill({status: r.status, headers: {...Object.fromEntries(r.headers), "Access-Control-Allow-Origin": "http://127.0.0.1:8770"}, body: await r.text()});
  });
  await page.goto("/download/");
  return downloads;
}
test("all latest and previous-version entries ask for a code before requesting an installer", async ({page}) => {
  test.setTimeout(60000);
  const downloads = await setup(page);
  const links = page.locator("a[data-download-url]");
  const total = await links.count();
  expect(total).toBeGreaterThan(10);
  for (let i = 0; i < total; i++) {
    const link = links.nth(i);
    await link.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByLabel("Alpha code", {exact: true})).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  expect(downloads).toEqual([]);
});
test("wrong code cannot start a download and corrected code downloads the exact chosen previous version", async ({page}) => {
  const downloads = await setup(page);
  const chosen = page.locator("#versions-list a[data-download-url]").last();
  const target = await chosen.getAttribute("data-download-url");
  await chosen.click();
  await page.getByLabel("Alpha code", {exact: true}).fill("wrong");
  await page.getByRole("button", {name: "Download FlowJoe"}).click();
  await expect(page.getByRole("status")).toContainText("isn’t valid");
  expect(downloads).toEqual([]);
  await page.getByLabel("Alpha code", {exact: true}).fill("SAMPLE-ACCESS");
  const started = page.waitForEvent("download");
  await page.getByRole("button", {name: "Download FlowJoe"}).click();
  const file = await started;
  expect(file.url()).toBe(target);
  expect(downloads).toEqual([target]);
  await file.delete();
});
for (const mode of ["offline", "unavailable", "invalid-response"])
  test(mode + " code checks keep downloads blocked and allow retry", async ({page}) => {
    const downloads = await setup(page, mode);
    await page.locator("#win a[data-download-url]").click();
    await page.getByLabel("Alpha code", {exact: true}).fill("sample-access");
    await page.getByRole("button", {name: "Download FlowJoe"}).click();
    await expect(page.getByRole("status")).toContainText("couldn’t check");
    await expect(page.getByRole("button", {name: "Download FlowJoe"})).toBeEnabled();
    expect(downloads).toEqual([]);
  });
test("closing a pending check cancels it and does not download after approval arrives", async ({page}) => {
  const downloads = await setup(page);
  let release;
  let received;
  const pending = new Promise((r) => (received = r));
  await page.route(endpoint, async (route) => {
    received();
    await new Promise((r) => (release = r));
    await route.fulfill({status: 200, headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:8770"}, json: {ok: true}}).catch(() => {});
  });
  const opener = page.locator("#win a[data-download-url]");
  await opener.click();
  await page.getByLabel("Alpha code", {exact: true}).fill("sample-access");
  await page.getByRole("button", {name: "Download FlowJoe"}).click();
  await pending;
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  release();
  await page.request.get("http://127.0.0.1:8770/css/alpha-download.css");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(downloads).toEqual([]);
  await opener.click();
  await expect(page.getByLabel("Alpha code", {exact: true})).toHaveValue("");
  await expect(page.getByRole("button", {name: "Download FlowJoe"})).toBeEnabled();
});
test("phone layout preserves support contact, trapped focus, reduced motion and close behavior", async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.emulateMedia({reducedMotion: "reduce"});
  await setup(page);
  await page.locator("#linux a[data-download-url]").first().click();
  const dialog = page.getByRole("dialog");
  const support = dialog.getByRole("link", {name: "Contact support to get one"});
  await expect(support).toHaveAttribute("href", /^mailto:support@flowjoe.app/);
  const box = await dialog.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(390);
  await support.focus();
  await page.keyboard.press("Tab");
  // Chromium lets the native dialog cycle through browser chrome before its first control.
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", {name: "Close alpha code window"})).toBeFocused();
  await page
    .locator("header a")
    .first()
    .evaluate((el) => el.focus());
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  expect(await dialog.evaluate((el) => getComputedStyle(el).transitionProperty)).toBe("none");
  expect(await dialog.evaluate((el) => getComputedStyle(el).translate)).toBe("none");
  await page.getByRole("button", {name: "Close alpha code window"}).click();
  await expect(dialog).not.toBeVisible();
});
test("without JavaScript no installer link bypasses the code window", async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false});
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:8770/download/");
  await expect(page.locator('a[href^="https://files.flowjoe.app/releases/"]')).toHaveCount(0);
  await expect(page.locator("noscript p")).toContainText("JavaScript is needed");
  await context.close();
});
