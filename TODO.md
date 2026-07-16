# FlowJoe Website — Build TODO

Marketing site built from `references/FlowJoe_Visual_Intelligence2.0.pdf`, using the tone in
`references/FlowJoe_Brand_Voice_Update.md` and tokens/rules in `references/BRAND_GUIDE.md`.

Vanilla static site: `index.html` + `css/tokens.css` + `css/styles.css` + `js/main.js`.

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Sections (page order in `index.html`)

The original 15-slide plan was consolidated into 8 built sections — feature slides
collapsed into one grid, and all AI/trust slides collapsed into the Joe section.

- [x] Hero — "everything connects" (3D workspace mockup + Tree/Gallery/Joe callouts)
- [x] The Problem — "The Context Collapse" (fractured-tools collage + fracture line)
- [x] The Big Idea — Hemispheres, structure vs freedom, interactive resizer slider
- [x] UI Architecture — Spine / Resizer / Canvas walkthrough over app mockup
- [x] Core Features grid — Spine, Canvas, Workbench Islands, Infinite Iteration, Sonic Intelligence
- [x] Meet Joe — chat mockup + Token Transparency Funnel, AI Seatbelt loop, Multimodal/MCP, JSON Synthesis
- [x] Trade-Off Refusal Matrix — comparison table vs note apps / cloud drives / canvases
- [x] Ecosystem + Final CTA — "Beyond an App" + closing CTA
- [x] Nav (sticky, active-section highlight) + Footer

---

## Foundation

- [x] Design tokens, base styles, blueprint/hemisphere background
- [x] Interactions (reveal, nav shadow, parallax tilt, resizer slider, features scroller)
- [x] Mobile QA — sections reflow, callouts/cards stack
- [x] Dark-only theme matching the slide deck
- [ ] Favicon + OG/Twitter meta tags + social preview image (only `description` meta exists today)
- [ ] Accessibility + performance pass (focus states, contrast, reduced-motion, font loading)

---

## Open questions for the team

- [ ] Wire real CTA destinations — all "Get FlowJoe" / "Sign in" links are `#` placeholders
- [ ] Integrate real product screenshots (`img/screenies-group1/`, `img/screenies-group2/`) to replace CSS mockups?
- [ ] Pricing section needed?
