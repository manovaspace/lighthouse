# License scope and third-party rights

The [MIT license](./LICENSE) applies to Lighthouse-authored source code and its
associated developer documentation. Preserve existing authorship and copyright
notices; the repository's new license does not erase attribution or replace a
third-party license.

Third-party packages, fonts, icons and artwork retain their own licenses. The
lockfile selects exact package versions; those packages' notices and license
terms must accompany any distribution where required.

Vendored agent skills retain their upstream licenses. See
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for included skill notices.
Vercel skill snapshots are excluded from this repository and can be installed
locally from the pinned source described in [the skill setup instructions](./.agents/skills/README.md#install-the-vercel-skills-locally).

The following need separate provenance and redistribution review before a public
release or redistribution of a built artifact:

- Starter SVG files in `apps/web/public/`: `file.svg`, `vercel.svg`, `window.svg`,
  `next.svg` and `globe.svg`.
- Fonts delivered through `@manovaspace/tokens`, including Estedad, Inter and
  IBM Plex Mono, and notices for bundled dependencies.
- Course text, seed curricula, imported fixtures, translations of course content
  and any course artwork.

Selecting MIT for source code does not grant additional rights to these materials.
On 2026-10-05 the project owner confirmed redistribution permission for the course
content, translations and artwork discussed in the readiness review. This
confirmation does not place those materials under MIT or replace third-party
license terms. Per-file provenance and required distribution notices remain part
of the release review.
Do not treat the current inventory as a complete dependency-license audit or as
clearance to redistribute content. Newly contributed source uses MIT; newly added
third-party or course material must identify its origin and permission separately.
