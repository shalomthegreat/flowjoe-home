# FlowJoe Brand Guide

A working reference for building the website, distilled from
`references/FlowJoe_Visual_Intelligence2.0.pdf` (visual language) and
`references/FlowJoe_Brand_Voice_Update.md` (tone). Slide renders live in `references/pdf-pages/`.

> **The one-line brief:** Premium software with a pulse. It should feel powerful *and*
> like it was made by real people. FlowJoe is the thoughtful guide; the user is the hero.

---

## 1. Positioning

- **What it is:** A local-first visual workspace that unites notes, files, AI chats,
  research, and creative work — combining rigorous structure with an infinite visual canvas.
- **Category of one:** Structured-yet-rich and local-first (see the Trade-Off Refusal Matrix).
- **Core tension it resolves:** Most tools force a choice between rigid structure *or*
  freeform visual freedom. FlowJoe refuses the trade-off.

---

## 2. Personality

| Trait | Meaning |
| --- | --- |
| **Intelligent** | Knowledgeable but approachable. |
| **Curious** | Invites exploration and discovery. |
| **Helpful** | Acts like a trusted collaborator. |
| **Creative** | Encourages possibility and experimentation. |
| **Calm** | Reduces overwhelm. |
| **Optimistic** | Believes clarity is possible. |

**Voice formula:** 40% Expert · 30% Guide · 20% Creator · 10% Playful Human.

**Never become:** Corporate · Sales-y · Hyperactive · Meme-driven.

---

## 3. Voice & Writing Rules

**Do**
- Talk like a smart human; be specific and visual.
- Use real-world nouns: downloads folders, browser tabs, notes apps, screenshots,
  AI chats, whiteboards, sketches, project folders.
- Use verbs that empower the user: *see, find, connect, build, explore, organize.*
- Show personality in small doses ("No judgment. We've all been there.").
- Make the user the hero; FlowJoe is the guide.

**Don't**
- Avoid corporate abstractions: *leverage, synergize, paradigm shift, next-generation,
  cutting-edge, revolutionary, command center.*
- Don't over-joke — micro-humor only, used sparingly.
- Don't oversell or shout.

**Before / After**
| Old (technical/premium) | Preferred (brand voice) |
| --- | --- |
| Transform scattered information into navigable intelligence. | Turn scattered ideas, files, notes, and AI chats into a workspace that actually makes sense. |
| Organize complexity. | Stop digging through downloads folders, forgotten bookmarks, and twenty open tabs. |
| Revolutionary visual intelligence platform. | A visual workspace that helps you see how everything connects. |
| Visual Intelligence for Modern Work | Finally, a place where everything connects. |

**Headline directions**
- Finally, a place where everything connects.
- Think visually. Build clearly.
- Your ideas deserve better than organized chaos.

**Subheading**
- Bring notes, files, AI conversations, research, and creative work together in one
  visual workspace — so you can spend less time searching and more time creating.

---

## 4. Visual Language (from the deck)

**Mood:** Deep charcoal/navy, cinematic, technical, premium. Backgrounds carry a faint
*blueprint grid* and soft radial glows. Lots of negative space around glowing focal objects.

**The dual-hemisphere motif (signature):**
- **Amber / gold** = structure, logic, "The Spine." (Pulled from the logo.)
- **Cyan / blue** = visual freedom, creativity, "The Canvas."
- Many diagrams split left (amber) vs right (cyan), joined by a central connector.
Use this contrast intentionally to signal "structure meets creativity."

**Recurring components:**
- Glassmorphic panels with glowing amber/cyan borders and rounded corners.
- 3D-perspective app mockups; floating media cards.
- Connector lines ending in glowing node dots (callout labels).
- Diagram archetypes: node trees, media stacks, funnels, concentric rings, comparison matrix.

---

## 5. Color Tokens

Defined in `css/tokens.css`. Summary:

| Role | Token | Value |
| --- | --- | --- |
| Amber (primary/structure) | `--amber-500` | `#fe730c` *(logo "joe")* |
| Amber deep | `--amber-deep` | `#582c0f` *(logo "flow")* |
| Amber tints | `--amber-400 / --amber-300` | `#ff8a2b` / `#ffab5e` |
| Cyan (creative) | `--cyan-500` | `#35a9ff` |
| Cyan tints | `--cyan-400 / --cyan-300` | `#5cc2ff` / `#8ad6ff` |
| Page background | `--bg-800` | `#0a0e14` |
| Deepest / raised | `--bg-900 / --bg-700` | `#070a0f` / `#0e131b` |
| Glass surface | `--glass` | `rgba(20,26,36,0.55)` |
| Text (headings) | `--text-100` | `#eef2f7` |
| Text (body) | `--text-200` | `#cdd5df` |
| Text (muted) | `--text-300` | `#9aa5b3` |
| Status OK | `--ok` | `#34d17a` |
| Status No | `--no` | `#ff5b5b` |

**Usage:** Amber is the primary CTA/brand accent. Cyan is the secondary/creative accent —
use it to balance amber, not as a default button color. Keep backgrounds dark; let glows
do the work.

---

## 6. Typography

| Use | Family | Token |
| --- | --- | --- |
| Display headings | **Fraunces** (serif) | `--font-serif` |
| Body / UI | **Inter** (sans) | `--font-sans` |
| Technical labels, code, UI chrome | **JetBrains Mono** | `--font-mono` |

- Serif for big emotional headlines; mono for eyebrows, captions, and mockup UI text;
  sans for everything else.
- Fluid scale via `--fs-*` tokens (`--fs-display` down to `--fs-mono`).
- Headings: tight tracking (`-0.01em` to `-0.02em`), weight 400–600.

---

## 7. Motion

- Subtle and purposeful: scroll reveals (fade + rise), gentle parallax tilt on mockups,
  slow-floating callouts, soft glow transitions.
- Easing: `--ease-out` = `cubic-bezier(0.22, 1, 0.36, 1)`.
- Always honor `prefers-reduced-motion`. Nothing flashy or hyperactive (matches voice).

---

## 8. Imagery & Iconography

- Prefer product mockups and rich media over stock photography.
- Placeholder media uses amber/cyan/violet gradients until real screenshots (located in `img/screenies-group1/` and `img/screenies-group2/`) are integrated.
- Icons: line style, thin weight (Lucide-compatible), tinted with accent colors.
- Logo: `img/flowjoe-logo.svg` — give it clear space; never recolor the mark.

---

## 9. Quick Do / Don't

**Do:** dark cinematic surfaces · amber + cyan balance · serif headlines · specific,
human copy · glowing glass panels · calm motion.

**Don't:** light backgrounds · rainbow palettes · corporate buzzwords · dense walls of
text · aggressive animation · treating FlowJoe as the hero instead of the user.
