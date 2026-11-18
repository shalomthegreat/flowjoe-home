# Prelaunch website download gate

The owner approved the existing-site modal and shared-code behavior on 2026-11-18. This gate is independent of Supabase account sign-in. It asks on every website download, including historical installers. Missing JavaScript, a wrong code, or a failed server check does not start the installer. Closing the window cancels a pending check.

The isolated Supabase Edge Function lives under supabase/functions/flowjoe-alpha-download. Deploy only this function to the existing project gwgniaqhsljzwffqhfgb with verify_jwt=false, because its own handler checks the shared code. It reads only FLOWJOE_ALPHA_DOWNLOAD_CODE_SHA256: SHA-256 of the trimmed lowercased code. Set that secret with the existing Supabase operator credential; never put the code or digest in the website or this repository. The function needs no database, account, admin, or gateway credentials and performs no writes. CORS allows https://flowjoe.app and responses are not cached.

The download renderer (js/download-releases.js) puts installer destinations in data-download-url and uses #alpha-download for href. Its staticRegions output is also consumed by FlowJoe's release publisher; preserve this link shape in both the HTML fallback and dynamic list. The primary platform button resolves to its matching installer after the list renders.

This is a website gate. Installer storage, public release data, direct file URLs, and installed-app updates remain public and unchanged. The code check does not claim per-person authorization, private storage, or distributed brute-force protection.

Deploy the isolated function first, check valid/wrong code and missing-secret behavior, then publish the static website using the existing GitHub Pages workflow. Do not alter global Supabase Auth settings or redeploy any account function.

Focused checks: node --test tests/alpha-download.test.mjs (6 tests); Playwright with tests/playwright.config.cjs (8 tests) against a static server on 127.0.0.1:8770. Playwright checks use a synthetic code and small synthetic installer responses; they never fetch real installers. Use an installed @playwright/test dependency. Canonical technical contract: FlowJoe docs/REFERENCE/RELEASING.md, Prelaunch website alpha-code check.
