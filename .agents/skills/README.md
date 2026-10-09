# Lighthouse frontend skills

These six skills are used by the Lighthouse authoring environment. Codex
discovers locally installed `SKILL.md` files when it loads the project. The
three Vercel skills are intentionally not included in the public repository;
install their pinned upstream snapshots locally with the commands below. Start
a new session if Codex has not refreshed the skill list.

## Selection

| Skill name | Use |
| --- | --- |
| `frontend-design` | Establish visual direction, typography, layout, and UI copy. |
| `impeccable` | Shape a flow, critique a screen, audit usability, or polish an existing UI. |
| `web-design-guidelines` | Review accessibility, forms, focus, navigation, and responsive behavior. |
| `vercel-react-best-practices` | Implement or review React/Next.js performance and data fetching. |
| `vercel-composition-patterns` | Design reusable React component APIs and composition. |
| `playwright-cli` | Exercise flows and inspect the rendered UI in a browser. |

Choose one visual lead (`frontend-design` or `impeccable`) per task. Combine it
with the relevant engineering skills and browser verification. For a Figma
handoff, use the connected Figma plugin for the exact frame and assets.

The task brief and repository instructions take precedence over skill defaults.
Reuse `@lighthouse/ui` and its Manova components/tokens. Preserve the existing
visual system during refinements. Verify Persian RTL and English LTR, translated
labels, Persian numerals, keyboard navigation, reduced motion, and mobile layouts.
Use the project spec and existing research as product context; installation does
not initialize or invent Impeccable's `PRODUCT.md` or `DESIGN.md`.

## Runtime

After cloning, run `bun install --frozen-lockfile`. The Playwright CLI is a local
dev dependency; use `bun run design:browser` wherever the upstream skill says
`playwright-cli`.

### Install the Vercel skills locally

The pinned upstream snapshot is `063bee94c3f4df8453406c830b0a7df0f2860278`.
It declares MIT in its README and skill metadata, but does not provide a
`LICENSE` file or specify a copyright holder/year. The Vercel skill files are
therefore kept out of this repository; these commands fetch them directly from
their upstream source into the local `.agents/skills/` directory:

```bash
npx skills add https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-best-practices --agent codex --copy
npx skills add https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/composition-patterns --agent codex --copy
npx skills add https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/web-design-guidelines --agent codex --copy
```

The downloaded skill directories are ignored by git. The installer also writes
a root `skills-lock.json` containing source and ref metadata; it does not contain
the skill files. On an existing installation, retain local edits before
reinstalling.

```bash
bun run design:browser --help
bun run design:browser install-browser chromium
bun run design:browser -s=lighthouse open http://localhost:3000/fa
bun run design:browser -s=lighthouse resize 390 844
bun run design:browser -s=lighthouse screenshot
bun run design:browser -s=lighthouse close

bun run design:detect apps/web/src/components
```

Start the app separately with `bun run dev`. The committed
`.playwright/cli.config.json` selects Chromium. Browser downloads live in the
user's Playwright cache; snapshots and other runtime output in
`.playwright-cli/` are ignored by git.

Impeccable's launcher is `.agents/skills/impeccable/scripts/impeccable`. It
downloads a checksum-verified, version-pinned engine on first use if a local
binary is unavailable. Platform binaries are ignored by git.

For automatic design checks, open Codex's `/hooks` menu and approve the installed
`.codex/hooks.json` definitions. This is a Codex trust step required by the
upstream [hook instructions](impeccable/reference/hooks.md). Manual detector
commands work independently of automatic hook approval.

Example prompts:

- `$impeccable critique the student dashboard; report findings before editing.`
- `$web-design-guidelines review apps/web/src/components for accessibility.`
- `$playwright-cli verify the login flow in Persian and English on desktop and mobile.`

## shadcn MCP

The official shadcn MCP server is configured in `.codex/config.toml`, pinned to
`shadcn@4.21.1`. It provides component search, examples, and registry inspection.
Restart Codex with Lighthouse as the project/working directory, then use `/mcp`
to check the connection. Project-local MCP configuration requires a trusted
project. `npx` caches the pinned CLI separately from application dependencies.

Inspect `packages/ui/src/index.ts` before proposing component additions. Prefer
the existing Manova-backed `@lighthouse/ui` exports and tokens. Registry examples
are implementation references; this setup does not initialize a second UI
library. Configure `components.json` for the intended workspace only when a
component-installation task requires it.

Until a registry configuration exists, specify `@shadcn` explicitly in registry
searches. A search across project-configured registries otherwise has no entries.

Example prompt: "Use shadcn's @shadcn registry to find accessible command-menu examples, compare
them with our existing shared components, and propose the smallest addition."

Setup follows the [official shadcn MCP documentation](https://ui.shadcn.com/docs/mcp)
and [Codex project-local MCP configuration](https://learn.chatgpt.com/docs/extend/mcp).

## Sources

Installed on 2026-10-02 from the maintainers' repositories and official installers.
Included skill files retain upstream instructions and supporting references.
The existing local Vercel React guide copy has three repaired relative links;
direct upstream installs do not include those local repairs. Impeccable's
component-review fallback link is repaired in the included local copy.

| Skills | Source snapshot |
| --- | --- |
| Frontend Design | [anthropics/skills](https://github.com/anthropics/skills/tree/8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4/skills/frontend-design) at `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4` |
| Three Vercel skills | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills) at `063bee94c3f4df8453406c830b0a7df0f2860278` |
| Playwright CLI | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli), installed using `@playwright/cli@0.1.22` |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable), installed using `impeccable@4.1.0`; downloaded skill version `4.4.0`, engine `0.1.10` |

Review upstream changes before updating the vendored files. Impeccable's
installer fetches its published skill bundle independently of the npm installer
version; a pinned installer alone does not pin future skill updates. Updating
Codex hook definitions may require approval again through `/hooks`.
