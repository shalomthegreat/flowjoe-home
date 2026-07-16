# FlowJoe Website — Build TODO

Section-by-section plan for the marketing site. Each section maps to a slide in
`references/FlowJoe_Visual_Intelligence2.0.pdf` (see `references/pdf-pages/`) and uses the tone from
`references/FlowJoe_Brand_Voice_Update.md`. See `references/BRAND_GUIDE.md` for tokens, voice, and rules.

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Foundation

- [x] Design-token system — `css/tokens.css`
- [x] Base styles + blueprint/hemisphere background — `css/styles.css`
- [x] Interactions (reveal, nav shadow, parallax tilt, slider) — `js/main.js`
- [x] Shared components: section wrapper, feature card, callout, pill, footer
- [ ] Favicon + social/OG meta tags + preview image
- [ ] Accessibility pass (focus states, alt text, contrast, reduced-motion)
- [ ] Performance pass (font loading, image sizing, lazy-load mockups)

---

## Sections (in page order)

### 1. Hero — "The Visual Workspace"
- Source slide: `01-visual-intelligence-workspace.png`
- Status: **[x] done**
- Notes: 3D workspace mockup + Tree/Gallery/Joe callouts. Headline in brand voice.

### 2. The Problem — "The Context Collapse"
- Source slide: `02-the-context-collapse.png`
- Status: **[x] done**
- Build: Fragmented-tools collage (tabs, downloads, sticky notes, AI chats) with a glowing "fracture line" running through it; right-side statement panel.
- Copy angle: Relatable, no-judgment. "The problem isn't too much information — it's that the context keeps getting lost."

### 3. The Big Idea — "No Trade-Off" (Hemispheres)
- Source slide: `03-the-hemispheres-trade-off.png`
- Status: **[x] done**
- Build: Split amber (structure) vs cyan (visual freedom) diagram joined by an interactive central "Resizer" slider. This is the signature brand visual centerpiece.

### 4. How It's Built — UI Architecture
- Source slide: `04-ui-architecture.png`
- Status: **[x] done**
- Build: Labelled walkthrough of Spine / Corpus Callosum / Canvas over a full app mockup.
- Mention: local-first, drag-the-resizer.

### 5. Feature — The Spine (Structured Thinking)
- Source slide: `05-the-spine-structured-thinking.png`
- Status: **[x] done**
- Build: Multi-root flows, per-node summaries, visual zoning.

### 6. Feature — The Canvas (Media Richness)
- Source slide: `06-the-canvas-media-richness.png`
- Status: **[x] done**
- Build: Rich media cards, live URL/link cards, freeform links.

### 7. Feature — Workbench Islands
- Source slide: `07-workbench-islands.png`
- Status: **[x] done**
- Build: Editable spreadsheets, rich docs, native calendars — no context switching.

### 8. Feature — Infinite Iteration (Stacks)
- Source slide: `08-infinite-iteration-stack-model.png`
- Status: **[x] done**
- Build: Stack cards + timeline scrubber. Emphasize "eliminate clutter, keep history."

### 9. Feature — Sonic Intelligence
- Source slide: `09-sonic-intelligence.png`
- Status: **[x] done**
- Build: wave-form notes, ID3 extraction, album-art browsing, persistent global player.

### 10. Meet Joe — Embedded Collaborator
- Source slide: `10-embedded-collaborator-joe-ai.png`
- Status: **[x] done**
- Build: Chat panel mockup + token transparency funnel explainer.
- Copy angle: Joe is the helpful guide, the user is the hero.

### 11. Trust — Approval-Gated Editing (AI Seatbelt)
- Source slide: `11-approval-gated-flow-editing.png`
- Status: **[x] done**
- Build: Flowchart Analyze -> Propose -> Preview -> Approve/Undo. Emphasize safety/undo.

### 12. Power — Multimodal Autonomy & Agent Bridge
- Source slide: `12-multimodal-autonomy-agent-bridge.png`
- Status: **[x] done**
- Build: Native image generation, speech-to-text, Model Context Protocol (MCP) agent bridge.

### 13. For Builders — JSON Synthesis
- Source slide: `13-synthesis-json-for-ai.png`
- Status: **[x] done**
- Build: Human canvas -> AI blueprint (JSON) side-by-side. Technical section explaining canvas-to-code synthesis.

### 14. Comparison — The Trade-Off Refusal Matrix
- Source slide: `14-trade-off-refusal-matrix.png`
- Status: **[x] done**
- Build: Responsive comparison table comparing FlowJoe against note apps, cloud drives, and freeform canvases.

### 15. Ecosystem + Final CTA — "Beyond an App"
- Source slide: `15-beyond-an-app-ecosystem.png`
- Status: **[x] done**
- Build: Concentric ecosystem rings (plugins, custom models, team sync) + closing CTA box.
- Copy angle: "The hard part is already shipping today."

---

## Global / Cross-cutting

- [x] Sticky nav active-section highlighting on scroll
- [x] Footer: nav, socials, download links, legal
- [x] Mobile QA for every section (mockups reflow, callouts stack)
- [x] Dark-only handling matching the visual slide deck
- [x] Migrate to vanilla static site (purged Next.js complexity)

---

## Open questions for the team

- [ ] Integrate real product screenshots (located in `img/screenies-group1/` and `img/screenies-group2/`) to replace/supplement the CSS mockups?
- [ ] Final CTA destination (download, waitlist, or app link)?
- [ ] Pricing section needed?
