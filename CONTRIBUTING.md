# Contributing to Lighthouse

Lighthouse is the Harbor World course platform, with student and staff surfaces,
invite-only accounts, and course-scoped progression. Preserve the existing course
attribution and bilingual Persian/English product behavior. `apps/judge/` is a
stub; execution and judge infrastructure are outside current contribution scope.
Discuss a substantial scope change in an issue before implementing it.

## Local development and checks

Use the root `package.json` toolchain contract: Bun 1.3.14 with this repository's
Turborepo and lockfile. Run commands from the repository root:

```sh
bun install --frozen-lockfile
bun run dev
bun run typecheck
bun run lint
bun run build
```

Use an isolated development database and synthetic fixtures. Consult the web
app's `.env.example` for required environment variable names; never copy production
secrets or run schema/seed commands against a real course database. Public source
contribution does not require access to the staff handbook or private MCP services.
The root test command delegates to package test scripts; there is no claim that
an absent package test suite is a passing acceptance suite.

## Pull requests

1. Fork the public repository and create a focused topic branch from `main`.
2. Preserve unrelated work, existing history and attribution. Direct pushes to
   `main` are prohibited; changes merge through reviewed pull requests.
3. Use Conventional Commit titles, such as `feat:`, `fix:`, `docs:` or `chore:`.
4. Include tests for behavior changes and report the checks actually run, including
   failures or checks requiring unavailable services. Do not claim unrun checks.
5. Update public documentation with changed behavior. Feature and fix releases
   require the appropriate semantic-version bump in the affected manifest.
6. Use synthetic examples and omit private integration details and student data.

Follow [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Report vulnerabilities privately
through [SECURITY.md](./SECURITY.md); general help uses [SUPPORT.md](./SUPPORT.md).

## License and content

New source contributions use [MIT](./LICENSE). Identify third-party material and
its required notices. Fonts, art and course content have separate rights obligations;
see [LICENSE-SCOPE.md](./LICENSE-SCOPE.md). Do not submit content you cannot permit
the project to distribute.
