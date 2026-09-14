# PDP service detail template redesign

## Objective

Refine the existing seven-page service-detail system into a calmer, more architectural B2B presentation without changing the PDP brand, shared header, contact form, footer, page order, or page-specific content.

## Chosen direction

Use an editorial architectural system on the established paper background. Keep Geologica and Golos Text, the canonical PDP gutters, black/graphite type, fine dividers, and `#f45116` as an accent rather than a surface.

## Composition

- Hero: breadcrumb, large H1, concise lead and CTA remain primary. A restrained content image occupies the secondary column; it is not a background or decorative hero illustration.
- Editorial sequence: three alternating 58/42 image-and-copy rows. Both sides remain on the paper surface. A narrow shared diagonal seam and small orange index provide the only strong color accent.
- Result: four equal image-led outcomes with compact headings and body copy, no card backgrounds, radius, or shadows.
- FAQ: wide typographic accordion with fine dividers, orange numbers, one open item, and a restrained plus/minus control.
- Projects: retain the shared project-card family and reduce surrounding visual competition.
- Contact and footer: preserve the canonical shared blocks.

## Visual rules

- Orange never becomes a large full-height text-panel fill.
- Section titles use the existing canonical service-page hierarchy; editorial titles are reduced and given more line height.
- Images use consistent crop, slightly reduced saturation, neutral contrast, and the same hover vocabulary.
- Spacing follows a small shared rhythm: compact 16-24px, normal 32-48px, section 72-96px.
- No gradients, rounded cards, soft shadows, decorative pills, fake blueprints, or new motion systems.

## Responsive behaviour

- Desktop: alternating two-column rows with a narrow diagonal seam.
- Tablet: balanced 52/48 split and reduced seam depth.
- Mobile: image above copy, no forced diagonal overlap, one-column FAQ and result cards below 420px.
- Validate at 390, 768, 1024, 1280, and 1440px, including overflow, title wrapping, image crops, header, form, and footer.

## Implementation ownership

The shared template remains data-driven. Structural markup is owned by `src/content/service-pages/` and `src/data/service-pages.js`; visual composition is owned by `shared/production-service-pages.css`. Generated page HTML is rebuilt, not hand-edited.

## Acceptance checks

- All seven pages use the same system with only content and imagery varying.
- Hero, editorial rows, results, FAQ, projects, form, and footer remain in the approved order.
- Large orange slabs are removed from content rows.
- Build reports zero output differences after generation.
- Browser captures show complete imagery and no horizontal overflow across required breakpoints.
- Homepage visual output remains unchanged because no homepage/shared-shell owner is modified.
