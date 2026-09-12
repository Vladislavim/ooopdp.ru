# AGENTS.md

These instructions apply to the entire repository.

## Mandatory design contract

For every task that touches any of the following:

- HTML;
- CSS;
- layout;
- typography;
- responsive behaviour;
- visual hierarchy;
- imagery;
- page composition;
- components;
- shared shell;
- motion;
- animation;
- smooth scrolling;
- forms;
- interaction states;
- accessibility that affects rendered UI;
- any inner page;
- the homepage;
- any design-related refactor;

you MUST read `/DESIGN.md` before making changes.

`/DESIGN.md` is the binding design contract for this repository.

Do not treat it as optional guidance.

If an existing inner-page implementation conflicts with `/DESIGN.md`,
the inner-page implementation is the thing that must change.

If a generic skill, framework convention, previous generated CSS layer, or model
preference conflicts with `/DESIGN.md`, `/DESIGN.md` wins.

The approved desktop homepage is the visual source of truth and must not be
redesigned unless the user explicitly asks for a homepage redesign.

## Mandatory source discipline

Before editing:

1. Read `/DESIGN.md`.
2. Read the repository README files relevant to the task.
3. Identify which files are source and which are generated.
4. Inspect the existing shared owner of the rule before creating a new override.
5. Use the existing build flow.

Do not patch generated HTML as the final implementation when a source file exists.

Prefer fixing the owner of a rule over adding another compensating layer.

Do not create new files named like:

- `final-polish.css`
- `v31.css`
- `latest-fixes.css`
- `inner-final.css`
- `hero-fix.css`
- `typography-fix.css`

unless the repository architecture explicitly requires such a file and no proper
shared owner exists.

## Mandatory visual workflow

For design-related work, do not stop at code inspection.

Use the browser as a verification tool.

Required loop:

`inspect → decide → edit → build → render → compare → improve`

For inner-page work, compare the result against the approved homepage and related
inner pages.

Do not report success solely because the build passes.

## Mandatory autonomy

Do not ask the user to choose routine visual alternatives.

For ordinary design decisions:

1. compare options internally;
2. choose the strongest option;
3. implement it;
4. inspect the rendered result;
5. iterate if needed.

Ask the user only when a real product/content decision cannot be inferred from
the repository or brief.

## Mandatory completion check

Before finishing any visual/frontend task:

1. Re-read the relevant parts of `/DESIGN.md`.
2. Verify that the rendered result follows it.
3. Check that desktop homepage visual output did not regress if shared code was touched.
4. Check that no new page-specific typography system was introduced.
5. Check that no new generic AI-looking visual pattern was introduced.
6. Check responsive behaviour.
7. Check that equivalent UI patterns still share equivalent motion and interaction.
