# FlowJoe Website — Build TODO

Section-by-section plan for the marketing site. Each section maps to a slide in
`FlowJoe_Visual_Intelligence2.0.pdf` (see `/pdf-pages`) and uses the tone from
`FlowJoe_Brand_Voice_Update.md`. See `BRAND_GUIDE.md` for tokens, voice, and rules.

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Foundation

- [x] Design-token system — `css/tokens.css`
- [x] Base styles + blueprint/hemisphere background — `css/styles.css`
- [x] Interactions (reveal, nav shadow, parallax tilt) — `js/main.js`
- [ ] Shared components: section wrapper, feature card, callout, pill, footer
- [ ] Favicon + social/OG meta tags + preview image
- [ ] Accessibility pass (focus states, alt text, contrast, reduced-motion)
- [ ] Performance pass (font loading, image sizing, lazy-load mockups)

---

## Sections (in page order)

### 1. Hero — "The Visual Workspace"
- Source slide: `01-visual-intelligence-workspace.png`
- Status: **[x] built**
- Notes: 3D workspace mockup + Tree/Gallery/Joe callouts. Headline in brand voice.

### 2. The Problem — "The Context Collapse"
- Source slide: `02-the-context-collapse.png`
- Status: **[ ]**
- Build: fragmented-tools collage (tabs, downloads, sticky notes, AI chats) with a
  glowing "fracture line" running through it; right-side statement panel.
- Copy angle: relatable, no-judgment. "The problem isn't too much information — it's
  that the context keeps getting lost."

### 3. The Big Idea — "No Trade-Off" (Hemispheres)
- Source slide: `03-the-hemispheres-trade-off.png`
- Status: **[ ]**
- Build: split amber (structure) vs cyan (visual freedom) diagram joined by a central
  "Resizer". This is the signature brand visual — make it a centerpiece.

### 4. How It's Built — UI Architecture
- Source slide: `04-ui-architecture.png`
- Status: **[ ]**
- Build: labelled walkthrough of Spine / Corpus Callosum / Canvas over a full app mockup.
- Mention: local-first, drag-the-resizer.

### 5. Feature — The Spine (Structured Thinking)
- Source slide: `05-the-spine-structured-thinking.png`
- Status: **[ ]**
- Sub-features: multi-root flows, per-node summaries, theming/visual zoning, tag registry.

### 6. Feature — The Canvas (Media Richness)
- Source slide: `06-the-canvas-media-richness.png`
- Status: **[ ]**
- Sub-features: rich media cards, live URL/link cards, inline YouTube/Figma, layouts.

### 7. Feature — Workbench Islands
- Source slide: `07-workbench-islands.png`
- Status: **[ ]**
- Sub-features: editable spreadsheets, rich docs, native calendars — no context switching.

### 8. Feature — Infinite Iteration (Stacks)
- Source slide: `08-infinite-iteration-stack-model.png`
- Status: **[ ]**
- Build: funnel/stack visual + visual scrubber. Emphasize "eliminate clutter, keep history."

### 9. Feature — Sonic Intelligence
- Source slide: `09-sonic-intelligence.png`
- Status: **[ ]**
- Sub-features: ID3 extraction, album-art browsing, persistent global player.

### 10. Meet Joe — Embedded Collaborator
- Source slide: `10-embedded-collaborator-joe-ai.png`
- Status: **[ ]**
- Build: chat panel mockup + "token transparency funnel" explainer.
- Copy angle: Joe is the helpful guide, the user is the hero.

### 11. Trust — Approval-Gated Editing (AI Seatbelt)
- Source slide: `11-approval-gated-flow-editing.png`
- Status: **[ ]**
- Build: flowchart Analyze -> Propose -> Preview -> Approve/Undo. Emphasize safety/undo.

### 12. Power — Multimodal Autonomy & Agent Bridge
- Source slide: `12-multimodal-autonomy-agent-bridge.png`
- Status: **[ ]**
- Sub-features: native image generation, speech-to-text, MCP agent bridge.

### 13. For Builders — JSON Synthesis
- Source slide: `13-synthesis-json-for-ai.png`
- Status: **[ ]**
- Build: human canvas -> AI blueprint (JSON) side-by-side. Likely a more technical section.

### 14. Comparison — The Trade-Off Refusal Matrix
- Source slide: `14-trade-off-refusal-matrix.png`
- Status: **[ ]**
- Build: responsive comparison table (Note apps / Cloud drives / Freeform canvases / FlowJoe).
- Use `--ok` / `--no` status tokens; highlight the FlowJoe column with amber glow.

### 15. Ecosystem + Final CTA — "Beyond an App"
- Source slide: `15-beyond-an-app-ecosystem.png`
- Status: **[ ]**
- Build: concentric ecosystem rings (plugins, custom models, team sync) + closing CTA.
- Copy angle: "The hard part is already shipping today."

---

## Global / Cross-cutting

- [ ] Sticky nav active-section highlighting on scroll
- [ ] Footer: nav, socials, download links, legal
- [ ] Mobile QA for every section (mockups reflow, callouts stack)
- [ ] Optional: light/dark handling (currently dark-only, which matches the deck)
- [ ] Optional: migrate to Next.js if we want richer scroll-linked animation later

---

## Open questions for the team

- [ ] Real product screenshots to replace the CSS mockups? (`img/screenies-*` are empty)
- [ ] Final CTA destination (download, waitlist, or app link)?
- [ ] Pricing section needed?
