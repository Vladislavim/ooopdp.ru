# DESIGN.md — PDP DESIGN CONTRACT

This file is the binding visual and interaction contract for the PDP website.

It is not inspiration.
It is not a moodboard.
It is not a loose preference list.

When this file, an existing inner-page implementation, a generic design skill,
a previous generated CSS layer, or a model's own preference disagree:

**APPROVED HOMEPAGE + THIS DOCUMENT WIN.**

---

# 1. Fundamental truth

The approved desktop homepage is GOOD.

The current inner pages are NOT an approved visual reference.

Most inner pages should be treated as unfinished design material.

Do not preserve weak inner-page art direction simply because it already exists.

The direction is strictly:

`INNER PAGES → HOMEPAGE DESIGN LANGUAGE`

Never:

`HOMEPAGE → INNER PAGE COMPROMISE`

The site must feel like one designed system, not one homepage plus many separate
landing pages.

---

# 2. Homepage freeze

The current rendered desktop homepage is the visual source of truth.

Do not redesign its:

- layout;
- proportions;
- typography;
- hierarchy;
- density;
- spacing;
- color usage;
- image treatment;
- desktop motion;
- composition;
- art direction.

Technical changes are allowed only when the rendered desktop homepage remains
visually equivalent.

Use the homepage to learn the PDP system.

Do not simplify or normalize the homepage toward weaker inner-page patterns.

Mobile homepage may be improved where responsive behaviour is weak, but must
remain recognizably the same approved design and must not regress desktop.

---

# 3. One website, not one template

PDP is one website.

It is NOT:

- one homepage design;
- one services design;
- one projects design;
- one articles design;
- one contacts design.

Every page must clearly belong to the same visual system.

At the same time, pages must not become copies of one template.

The rule is:

`ONE DESIGN LANGUAGE + CONTENT-SPECIFIC COMPOSITION`

A service page may have a different composition from an article.
A project page may be more image-led.
Documents may be more utilitarian.

But all pages must share the same visual DNA.

---

# 4. Core PDP character

The site should feel:

- architectural;
- technical;
- precise;
- confident;
- editorial;
- structured;
- restrained;
- professional;
- intentionally dense;
- visually distinctive without decorative noise.

It should NOT feel:

- SaaS-like;
- startup-template-like;
- card-heavy;
- soft and rounded;
- generic;
- glassy;
- overly spacious;
- artificially futuristic;
- AI-generated.

Do not introduce visual trends unless they already belong to the homepage.

---

# 5. Typography is semantic, not page-specific

This is a HARD RULE.

There must be one canonical typography system.

Canonical semantic roles:

- `page-title`
- `section-title`
- `subsection-title`
- `item-title`
- `lead`
- `body`
- `meta`
- `label`

Each role must have ONE clear owner for:

- font family;
- font weight;
- font size;
- line height;
- letter spacing;
- responsive scale.

Equivalent semantic roles must not use unrelated values because they occur on
different pages.

A page-specific stylesheet must NOT independently redefine the typography identity
of a canonical role.

Page-specific composition MAY control:

- available width;
- placement;
- grid position;
- alignment;
- local measure.

It must not casually invent another:

- H1 size;
- H2 size;
- tracking;
- line-height;
- font family;
- weight system.

If repeated manual heading correction is necessary, the system is wrong.

Fix the system.

---

# 6. Typographic exceptions

A different typography value is allowed only if it represents a genuinely
different semantic role.

Example:

A long-form article headline may legitimately need an editorial modifier.

If so, it must be:

1. intentionally named;
2. reusable;
3. documented;
4. responsive;
5. used for the same semantic case elsewhere.

Never fix one page with:

`.some-page h1 { font-size: ... }`

just because the title wraps badly.

Fix:

- the canonical role;
- the available measure;
- the wrap strategy;
- or a reusable semantic modifier.

---

# 7. CSS load order is not a design system

There must not be several competing definitions of the same semantic typography
where the final appearance depends on which CSS file loads last.

Historical layers must be consolidated.

Do not solve conflicts by adding:

- `final-polish.css`;
- `v31.css`;
- `inner-final.css`;
- `heading-fix-2.css`;
- `hero-final.css`.

Fix the OWNER of the rule.

When searching for canonical page-title typography, there should be one obvious
source.

---

# 8. Canonical spacing system

Spacing must be systematic.

Establish a small shared vocabulary for:

- page gutters;
- section spacing;
- heading-to-body spacing;
- section-title-to-content spacing;
- compact spacing;
- normal spacing;
- large editorial spacing.

Do not use dozens of unrelated values page by page.

The exact composition can vary.
The rhythm must feel related.

---

# 9. Containers and grid

Use a shared logic for:

- main content width;
- page gutters;
- text measure;
- grid alignment;
- section boundaries.

Different pages may use different grid compositions.

They should still visually align to the same PDP structural system.

Avoid creating a second invisible canvas inside one page with unrelated gutters.

---

# 10. Headings

Headings are one of the strongest continuity signals across the site.

All inner page titles must visibly belong to one family.

All section headings must visibly belong to one family.

Check:

- size;
- weight;
- line-height;
- tracking;
- wrap;
- visual width;
- distance to following content.

Do not manually tune headings one page at a time.

---

# 11. Inner-page hero

The current inner-page hero image treatment is NOT approved.

Do not use a large photographic background / side image in ordinary inner-page
heroes as the default pattern.

It reads as generic AI/corporate landing-page styling and weakens the connection
to the approved homepage.

The default inner-page hero should be primarily typographic and structural.

Build hero identity through:

- typography;
- grid;
- spacing;
- dividers;
- restrained existing PDP technical/architectural primitives where appropriate;
- content-specific metadata;
- strong composition.

Do NOT compensate for removing the photo by adding:

- gradients;
- blobs;
- glass;
- generic abstract illustration;
- fake blueprint decoration;
- random 3D elements;
- oversized decorative icons;
- meaningless AI-looking technical ornaments.

A page may use photography near the top only when the image itself carries
meaningful page content, for example:

- a specific project/case;
- an editorial article where the lead image is content;
- another clearly justified content-led case.

Even then, treat it as CONTENT MEDIA, not as a generic shared hero background.

Default inner-page hero:

`TYPOGRAPHY + STRUCTURE, NOT DECORATIVE PHOTOGRAPHY`

The approved homepage remains unchanged.

---

# 12. Inner pages are allowed to change substantially

Existing inner-page layout is not sacred.

Weak inner pages may be substantially reworked.

Allowed:

- changing grids;
- changing proportions;
- changing text/media relationship;
- increasing or reducing image scale;
- restructuring a section;
- regrouping content;
- changing whitespace;
- changing visual rhythm;
- strengthening hierarchy;
- making editorial compositions;
- replacing weak repeated layouts with a stronger shared pattern.

Preserve:

- factual content;
- page purpose;
- brand;
- navigation logic.

Do not preserve weak presentation.

---

# 13. Reuse before invention

Before creating a new pattern:

1. inspect the homepage;
2. inspect shared blocks;
3. inspect strong existing inner patterns;
4. find an equivalent interaction;
5. reuse or adapt it.

Same purpose should normally use the same primitive.

Examples:

same text link
→ same arrow behaviour

same image card family
→ same hover language

same CTA
→ same interaction

same heading role
→ same typography

same reveal purpose
→ same reveal

same parallax purpose
→ same parallax implementation

---

# 14. Duplicated patterns

Repeated design is not automatically bad.

If a repeated pattern is GOOD:

`REUSE IT.`

If a repeated pattern is WEAK:

`REDESIGN THE SHARED PATTERN ONCE AND REUSE THE IMPROVED VERSION.`

Do not artificially create variety simply to make pages look different.

Variation must serve content.

---

# 15. Shared shell

Header, contact form and footer are canonical site-shell components.

They must be visually and behaviourally identical across homepage and inner pages.

Allowed differences:

- routes;
- relative asset paths;
- active navigation state.

Not allowed:

- different typography;
- different CTA wording without a product reason;
- different geometry;
- different hover;
- different spacing;
- different motion;
- different visual treatment.

One component means one source of truth.

---

# 16. Color

Use the established PDP palette.

Primary references:

- orange `#F45116`;
- near-black around `#101110`;
- paper around `#F7F6F3`;
- established muted neutrals;
- established divider tones.

Prefer existing project tokens.

Orange is an accent.

Do not use additional colors merely to make an inner page distinctive.

---

# 17. Image language

Images should feel like part of one website.

Use consistent principles for:

- crop;
- saturation;
- contrast;
- grayscale where established;
- hover treatment;
- transitions;
- image/text relationships.

Different content may justify different image ratios.

Different pages do not justify unrelated image treatment.

---

# 18. No generic AI website

Do not default to:

- headline + paragraph + 3 identical cards;
- rows of icon cards;
- nested cards;
- huge empty hero;
- generic feature tiles;
- decorative pills;
- meaningless badges;
- gradient text;
- glassmorphism;
- large soft rounded boxes;
- floating SaaS cards;
- excessive shadows;
- decorative monospace;
- random technical decoration;
- huge empty vertical gaps;
- a different gimmick per section.

Use the PDP language instead.

---

# 19. Motion

PDP has one motion vocabulary.

Motion should feel:

- restrained;
- precise;
- responsive;
- consistent.

Same interaction = same motion.

Do not invent new:

- reveal;
- hover;
- arrow animation;
- image transition;
- parallax;
- button motion

if an equivalent PDP interaction already exists.

---

# 20. Motion ownership

Maintain one canonical motion token system.

Use a small vocabulary such as:

- fast feedback;
- UI;
- content;
- rare long authored movement;
- primary easing.

Do not allow each page family to create its own duration/easing philosophy.

Historical aliases may exist temporarily but should resolve toward the canonical
system.

---

# 21. Scroll

Use one canonical smooth-scroll implementation.

Do not create separate Lenis configurations per page.

The whole site should have the same:

- wheel feel;
- easing;
- duration;
- anchor behaviour;
- reduced-motion behaviour.

One site.
One scroll system.

---

# 22. Parallax

Parallax is a shared PDP primitive.

If the same visual use case occurs elsewhere, reuse the existing implementation.

Do not invent another algorithm or intensity simply because the page is different.

Do not add parallax where it has no purpose.

---

# 23. Responsive design

Responsive design is not just fixing overflow.

Every breakpoint should feel intentionally composed.

Validate at least:

- 360px;
- 390px;
- 430px;
- 768px;
- 1024px;
- 1280px;
- 1440px+.

Check:

- title wrapping;
- section rhythm;
- gutters;
- image crop;
- grid collapse;
- touch targets;
- long copy;
- header;
- contact form;
- footer;
- horizontal overflow;
- clipping.

Do not fix responsive typography with random page-specific overrides.

Fix the canonical system.

---

# 24. Page families

Treat page families consistently.

## Company
Company content may be editorial and evidence-driven.

## Services
Structure and service relationships are primary.
Avoid generic card walls.

## Service detail
Explain one service clearly with supporting proof and media.

## Projects / completed works
Let imagery and evidence carry more weight.
Avoid reducing projects to product cards.

## Project detail
Use strong case-study narrative.

## Articles index
Editorial hierarchy matters.

## Article detail
Reading quality matters more than decorative layout.

## Documents
Utility and scanning matter more than spectacle.

## Contacts
Should feel like a natural continuation of the same site.

## Privacy / 404
May be quieter, but still use the same typography and shell.

---

# 25. Source ownership

Work through:

- `src/data/`;
- `src/blocks/`;
- `src/content/`;
- `src/pages/`;
- shared CSS/JS.

Generated HTML is output, not authoring source.

Fix shared problems at the shared owner.

Page-specific CSS should mainly describe composition.

---

# 26. Design skills

Relevant skills should be used when available:

- `impeccable`
- `normalize`
- `layout`
- `impeccable-design-polish`
- `make-interfaces-feel-better`
- `improve-animations`
- `animate`
- `review-animations`
- `harden`

But:

`PDP DESIGN CONTRACT > GENERIC SKILL DEFAULTS`

A skill is not allowed to replace the site's visual language.

---

# 27. Autonomous design judgment

Do not ask the user to choose routine visual alternatives.

When multiple approaches are possible:

1. compare them;
2. choose the strongest;
3. implement it;
4. render it;
5. inspect it;
6. improve it.

The browser is a design verification tool.

Do not use it to transfer design responsibility back to the user.

---

# 28. Visual validation is required

Code consistency alone is not enough.

The rendered pages must actually look unified.

Every important change must be validated in browser.

Compare:

homepage
→ inner page
→ related inner page.

Ask:

"If the URL were hidden, would these obviously belong to the same site?"

Then ask:

"Does this page still express its own content rather than looking copied?"

Both must be true.

---

# 29. Quality threshold

A page is not "good" merely because:

- it has no overflow;
- CSS is valid;
- build passes;
- nothing overlaps.

Those are baseline requirements.

A good page also has:

- strong composition;
- clear hierarchy;
- intentional rhythm;
- balanced image/text relationships;
- confident typography;
- coherent density;
- visual continuity with the homepage.

---

# 30. Default inner-page decision

For inner pages:

Weak
→ redesign.

Generic
→ redesign.

Fragmented
→ normalize to PDP.

Duplicated + weak
→ improve shared pattern once.

Duplicated + good
→ reuse.

Genuinely strong
→ preserve and polish.

Do not classify a page as strong just because it technically works.

---

# 31. Definition of done

The design system is successful only when:

1. Desktop homepage remains visually approved and unchanged.
2. All inner pages clearly belong to the same PDP visual world.
3. One page-title system exists.
4. One section-title system exists.
5. Equivalent headings do not use unrelated page-specific values.
6. One spacing logic exists.
7. One gutter/container logic exists.
8. Shared components are actually shared.
9. Equivalent UI patterns look alike.
10. Equivalent interactions behave alike.
11. Motion is coherent.
12. Smooth scroll is coherent.
13. Responsive behaviour is systematic.
14. Weak inner layouts have actually been redesigned.
15. The current generic hero-photo pattern is removed from ordinary inner pages.
16. No new historical override layer was added.
17. Manual page-by-page heading correction is no longer necessary.

Final test:

> Would these inner pages plausibly look this way if the approved homepage and
> all inner pages had been designed together by the same art director?

If not, the work is not finished.
