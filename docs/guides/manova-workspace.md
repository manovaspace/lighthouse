# Lighthouse in Manova

Lighthouse is maintained at [manovaspace/lighthouse](https://github.com/manovaspace/lighthouse).
On 2026-10-05 its existing public GitHub repository was transferred from `aputir`
to `manovaspace`, preserving repository history. The local checkout moved from
`~/Dev/aputir/lighthouse` to `~/Dev/Manova/clients/manova/lighthouse`.

Lighthouse remains an independent Bun/Turborepo repository. The move does not
change course attribution, the existing `aput.ir` domain, application behavior,
Neon/Auth.js/Vercel configuration, package names, or the Phase 2 judge boundary.
Existing local work and ignored files were preserved. Runtime integration with
other Manova products will be designed after the ecosystem review.

## Development

For a standalone clone, follow [Delivery](delivery.md). For a Manova checkout,
open `~/Dev/Manova`, load its workspace instructions, then use the project's
[agent guide](../../AGENTS.md) and [workspace index](../../WORKSPACE_INDEX.md).
Run `bun run dev`, `bun run typecheck`, and `bun run lint` from this repository
using your tool's working-directory option. The existing dev port is `3000`.

Public contribution setup must work without access to Manova's staff handbook,
private registries, production credentials, or the rest of the workspace.
Historical specs and plans may mention the old organization/path; this page is
the current ownership and location reference. Do not treat their old paths as
current setup instructions.

## Recovery of the local move

If the local location must be reverted, stop project processes, ensure the old
destination is absent, and rename the entire checkout back. Update workspace
manifest/routing/index entries to match. Preserve local changes; do not reset or
reclone over them. Local rollback does not require reversing GitHub ownership.
GitHub transfer-back is a separate ownership operation requiring an explicit
decision. The canonical remote remains `git@github.com:manovaspace/lighthouse.git`.
