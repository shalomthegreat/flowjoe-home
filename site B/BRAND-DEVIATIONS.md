# Site B — Brand Guide Deviations

Per the note on `FlowJoe_Brand_Guide.pdf`: the guide was followed closely, with the
following deviations made for brand coherency. Each is listed with rationale.

## 1. Wordmark font (logo vs. guide conflict)
- **Guide says:** typography is plain/clean sans-serif throughout ("FlowJoe Display Heavy" + clean UI sans).
- **Logo file shows:** `flowjoe-logo-with-padding.jpg` uses a rounded, hand-drawn script style with two-tone coloring ("flow" in cocoa brown, "joe" in orange) plus a coffee cup mark.
- **Deviation:** the HTML wordmark uses **Baloo 2** (rounded, friendly Google Font) with the two-tone Deep Cocoa / Flow Orange split and a ☕ emoji as the cup mark, to stay coherent with the actual logo asset. All other headings follow the guide's plain heavy sans.

## 2. "FlowJoe Display Heavy" substitution
- The guide names a proprietary display face that does not exist as a real font.
- **Deviation:** substituted **Archivo 800** (Google Font) — geometric, heavy, high-legibility — with the guide's specified `-0.5px` tracking applied via `--tracking-display`.

## 3. Tagline usage
- The guide does not mention the tagline at all, but both the logo file and
  `example-brand-img-inspiration.png` feature **"Stay in the Flow, Bro"** prominently.
- **Deviation:** the tagline is included (hero + final CTA) in the logo font for coherency with the brand assets.

## 4. Logo's leaf motif
- The logo's "j" includes an orange leaf detail that the guide never references.
- **Deviation:** not reproduced in HTML scaffolding (would require the image asset); the image placeholder approach per `rules.md` means the real logo file can replace the text wordmark later.

## 5. Subtle paper texture (rule followed by omission)
- Guide allows a sub-3%-opacity grain texture on canvas backdrops.
- **Deviation:** omitted entirely — `rules.md` requires pure HTML scaffolding, and a texture would require an image asset. Easy to add later via a tiled background image on `body`.

## Followed faithfully
- Core palette exactly as specified: Deep Cocoa `#2D251E`, Warm Alabaster `#F9F6F0`, Sage Olive `#4A5842`, Flow Orange `#E25C38` (all defined as CSS vars).
- No pure black anywhere — shadows and muted text use the Deep Cocoa spectrum (rgba tints).
- Flow Orange restricted to CTAs, focal underlines, and the active node marker.
- Subtle environment glow (static warm radial backing) behind the product screenshot.
- Node architecture: rounded cards with implicit inner styling (inset shadow, no thick borders); branching lines in low-opacity Sage Olive.
- Whitespace priority: large section spacing (`--space-section: 130px`), unhurried layout.
- Grounded marketing voice taken from `FJ-WebsiteDraft.md` (e.g., "twenty-seven tabs").
