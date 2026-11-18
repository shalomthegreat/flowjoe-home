// Prelaunch website gate only. Public installer URLs and installed-app updates are unchanged.
(function () {
  "use strict";
  const dialog = document.getElementById("alpha-download");
  const form = document.getElementById("alpha-form");
  const code = document.getElementById("alpha-code");
  const status = document.getElementById("alpha-status");
  const submit = form.querySelector('button[type="submit"]');
  const idleLabel = submit.textContent;
  let destination = null,
    attempt = null,
    opener = null;
  const safeDownload = (value) => typeof value === "string" && /^https:\/\/files\.flowjoe\.app\/releases\/[A-Za-z0-9._\/-]+(?:\?sha256=[a-f0-9]{64})?$/.test(value);

  function reset() {
    code.removeAttribute("aria-invalid");
    status.textContent = "";
    submit.disabled = false;
    submit.textContent = idleLabel;
    form.removeAttribute("aria-busy");
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-download-url]");
    if (!link) return;
    event.preventDefault();
    if (!safeDownload(link.dataset.downloadUrl)) return;
    destination = link.dataset.downloadUrl;
    opener = link;
    code.value = "";
    reset();
    dialog.showModal();
    code.focus();
  });
  document.getElementById("alpha-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    attempt?.abort();
    attempt = null;
    destination = null;
    code.value = "";
    reset();
    if (opener?.isConnected) opener.focus();
  });
  code.addEventListener("input", () => {
    code.removeAttribute("aria-invalid");
    status.textContent = "";
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (attempt || !dialog.open || !safeDownload(destination)) return;
    const target = destination;
    const controller = new AbortController();
    attempt = controller;
    submit.disabled = true;
    submit.textContent = "Checking code…";
    form.setAttribute("aria-busy", "true");
    status.textContent = "";
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(form.action, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({code: code.value}), signal: controller.signal, credentials: "omit", cache: "no-store", redirect: "error"});
      const result = await response.json();
      if (attempt !== controller || !dialog.open || controller.signal.aborted) return;
      if (response.ok && result.ok === true) {
        attempt = null;
        dialog.close();
        window.location.assign(target);
      } else if (response.status === 403 && result.error === "invalid_code") {
        status.textContent = "That code isn’t valid. Try again, or contact support for an alpha code.";
        code.setAttribute("aria-invalid", "true");
        code.focus();
      } else {
        status.textContent = "We couldn’t check your code. Please try again, or contact support.";
      }
    } catch (_) {
      if (attempt === controller && dialog.open) status.textContent = "We couldn’t check your code. Please try again, or contact support.";
    } finally {
      clearTimeout(timeout);
      if (attempt === controller) {
        attempt = null;
        submit.disabled = false;
        submit.textContent = idleLabel;
        form.removeAttribute("aria-busy");
      }
    }
  });
})();
