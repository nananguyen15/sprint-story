# ADR 0001: PSM I platform foundation

- Status: proposed
- Date: 2026-10-14

## Decision

Use separate learner and Studio frontends, a NestJS API, PostgreSQL as the durable source of truth, and Redis only for disposable cache/rate-limit data. Keep grading logic deterministic in a shared package. Local development uses Docker Compose. Free cloud hosting is a later deployment target and has no uptime guarantee.

Published content is immutable and stored with a content hash in PostgreSQL. A learner pins one pack version for a mission. Rollbacks create a new release from older content rather than rewriting history. The initial owner workflow is self-publish after validation; an external AI review is advisory and recorded against a specific revision, not treated as an independent approver.

Progress sync must use idempotent client event IDs and a learner epoch for reset barriers. Never merge progress by client `updated_at` timestamps. The API and transaction design must be completed before exposing a sync endpoint.

## Consequences

- A Redis outage must not lose learning progress or published content.
- A sleeping/free API may delay login and sync; cached missions remain usable.
- Database backup and restore remain operational responsibilities.
- User auth, sync semantics, publishing transactions, and cloud deployment are not implemented by this foundation yet.
