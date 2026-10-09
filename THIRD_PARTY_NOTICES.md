# Third-party notices

The following entries identify third-party skills used by the local authoring
environment. Included skill files retain their upstream licenses; local Vercel
snapshots are excluded from the public repository. Local setup guidance is
Lighthouse-authored; any local adaptations are noted in `.agents/skills/README.md`.

| Vendored content | Upstream provenance | License and notice |
| --- | --- | --- |
| `react-best-practices`, `composition-patterns`, `web-design-guidelines` | [`vercel-labs/agent-skills` at `063bee94c3f4df8453406c830b0a7df0f2860278`](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278) | Not included in this repository. The upstream README and skill metadata declare MIT, but the snapshot has no LICENSE file and does not state the copyright holder or year. Install the pinned source directly into a local ignored copy using [the skill setup instructions](.agents/skills/README.md#install-the-vercel-skills-locally). |
| `playwright-cli` | [`microsoft/playwright-cli` v0.1.22](https://github.com/microsoft/playwright-cli/tree/v0.1.22) | Apache-2.0; the exact upstream license and copyright notice are included in [Playwright-CLI-LICENSE.txt](.agents/skills/licenses/Playwright-CLI-LICENSE.txt). |
| `impeccable` | [`pbakaus/impeccable` skill v4.4.0](https://github.com/pbakaus/impeccable/tree/skill-v4.4.0) | Apache-2.0; see [Impeccable-Apache-2.0.txt](.agents/skills/licenses/Impeccable-Apache-2.0.txt) and the upstream [NOTICE](.agents/skills/licenses/Impeccable-NOTICE.md). |

The existing `.agents/skills/frontend-design/LICENSE.txt` retains the separate
Apache-2.0 license shipped with Frontend Design. Lighthouse's root MIT license
applies only to Lighthouse-authored materials as described in `LICENSE-SCOPE.md`.
