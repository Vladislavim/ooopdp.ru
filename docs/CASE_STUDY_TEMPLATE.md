# PDP case study template

Current example: `pages/05-project-red-october.html`.
Scope confirmed by the user: finish the existing case and shared template; do not create additional project routes.

## Composition

Use the existing fragment builder and the source manifest `src/pages/project-red-october.page.js`.
The shared visual owner is `shared/production-inner-redesign-v1.css`; the media selector is `shared/production-evidence.js`.

1. `.pdp-case-masthead`: breadcrumb and project name; compact spacing follows the approved homepage's project section.
2. `.pdp-case-spread`: the reusable image/copy axis for all three spreads. Desktop ratio is 1.35/.85; tablet is equal columns; mobile stacks.
3. `.pdp-case-intro`: actual object photograph left; project scope, client identity, compact facts and document link right. Omit unknown facts.
4. `.pdp-case-scope`: task and PDP role aligned to the same axis, without a new decorative panel.
5. `.pdp-case-workspace`: evidence stage left and actual project stages right. `.pdp-evidence` has direct selection, synchronized captions, keyboard support and reduced motion. All images remain available without JavaScript.
6. `.pdp-case-process`: compact numbered sequence inside the workspace, not another standalone section. Omit if unsupported.
7. `.pdp-case-delivery`: real document left and verified result right, preserving the axis. Never fabricate a document or result.
8. Existing shared contact form and footer.

## Adaptation rules

- Reuse the composition and semantic classes; do not duplicate Red October's facts, text or images into a different case.
- Keep three connected spreads on one grid and one media interaction. The rejected dark standalone chapter and independent full-width sections must not return.
- Preserve technical image content and document aspect ratios.
- At 768 and 390, stack content without hiding essential facts or adding sticky obstruction.
- Use existing PDP typography, warm paper, orange and dark surfaces.
- New case routes and new business claims require a separate content decision.
- Desktop Home and Contacts remain frozen.

## Verification

Run `node src/build.mjs --write` then `node src/build.mjs`.
Inspect 1440/768/390, keyboard selection, reduced motion, no-JS media, and PDF links.
The current browser checks are in `output/implementation-qa/verify-interactions.cjs`.
