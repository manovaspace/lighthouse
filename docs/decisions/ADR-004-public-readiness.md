# ADR-004: Public source licensing and reporting

Date: 2026-10-05. Status: accepted code-license and security-policy decision;
community launch prerequisites remain open.

## Context and decision

Lighthouse is the independent public `manovaspace/lighthouse` repository. The
project owner explicitly selected MIT for its source code and associated developer
documentation. Existing course attribution and authorship remain intact; third-party
and course-content rights are separate. See [LICENSE](../../LICENSE) and
[LICENSE-SCOPE.md](../../LICENSE-SCOPE.md).

The owner selected GitHub private vulnerability reporting, initially monitored by
the project owner, with latest-release support and a target acknowledgement within
seven calendar days. There is no fixed resolution deadline. A backup monitor is
not yet designated. [SECURITY.md](../../SECURITY.md) owns the public reporting policy.
Monitor notification delivery requires the owner's account preferences and is
not proved by enabling the repository form.

[CONTRIBUTING.md](../../CONTRIBUTING.md) defines standalone contribution scope and
checks; [SUPPORT.md](../../SUPPORT.md) routes sanitized public questions. The
[conduct policy](../../CODE_OF_CONDUCT.md) remains a local draft until a maintained
private conduct contact is supplied.

## Consequences and verification

The completed GitHub transfer is preserved. License and community changes do not
alter Vercel, Neon, course data, existing integrations or the judge stub. Content
rights review, post-transfer hosting ownership, main-branch governance, meaningful
CI and contributor setup verification remain public-launch prerequisites.

Maintainers verify private-reporting enablement through the repository API and
inspect the reporting form without submitting a real report. Local link checks
establish only that community-file references exist; they do not verify deployment
or notification delivery. Public files are published through a reviewed PR.
