# `orig_test_v2` source architecture

`orig_test_v2/index.html` and `orig_test_v2/pages/*.html` are generated outputs. The editable source lives in this directory. The protected desktop backup is outside this project and is never used as a build target.

## Where to change things

- `data/site-data.js` — brand data, routes, motion tokens and the canonical block registry.
- `blocks/<name>/` — reusable block contracts plus canonical source markup for shared header, footer and CTA blocks. Inner shell templates live beside them as `inner-template.html`.
- `content/<page-id>/parts/` — exact top-level DOM fragments migrated from each existing page.
- `pages/<page-id>.page.js` — page manifest and block order. To move a block, change the `order` array; to reuse a canonical block on another page, add a `blocks` source override. Do not edit generated HTML.
- `build.mjs` — deterministic, dependency-free static builder.

The build resolves a block in this order: manifest `blocks` override, manifest `shared` source, the `data/site-data.js` canonical registry, then the migrated page fragment. This makes reuse and reordering a source edit rather than a manual edit in several generated files. `shared/inner-shell-markup.js` is generated from the inner header, CTA and footer templates and consumed by the existing inner-page runtime shell.

The current production CSS/JS remains the visual source of truth during this first migration pass. The architecture is deliberately additive: it gives the pages one assembly path without introducing a framework, new runtime dependency, or global CSS rewrite.

## Commands

From the repository root:

```powershell
node .\orig_test_v2\src\tools\migrate.mjs
node .\orig_test_v2\src\build.mjs --write
node .\orig_test_v2\src\build.mjs
```

The last command is a read-only architecture check. The builder refuses to write outside `orig_test_v2` and explicitly refuses any path containing `PDP-backup-before-structure`.

`baselines/homepage-before.html` and its SHA-256 file are the pre-migration homepage reference used for visual regression checks. Do not edit them manually. The homepage output is kept byte-stable after removing the generated marker.
