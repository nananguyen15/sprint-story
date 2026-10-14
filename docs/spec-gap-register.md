# PSM I build gate and specification gaps

This register tracks decisions from the supplied product brief before features are allowed to write learner progress or publish lessons. `Open` means implementation must not guess.

## P0 — resolve before learner progress and authoring APIs

| Topic | Gap in source spec | Decision / action |
| --- | --- | --- |
| Progress sync | BR-SS-032 merges by client `updated_at`, which is unsafe with offline devices, clock skew and resets. | Use idempotent client events, server-assigned learner sequence, transactionally updated projection, and an account epoch for reset/import. Do not merge state by client timestamp. |
| First-attempt grading | “Only the first attempt” does not define whether first means lifetime, session or presentation. | Define stable grading/presentation key and retry behavior before sync API. |
| Reward reconstruction | Answer events alone cannot reconstruct mission, game, chest and streak rewards. | Persist reward-producing events with a unique source key; make PostgreSQL the durable reward ledger. |
| Reset/import races | An old offline queue can restore data after reset; schema-only import validation is insufficient. | Make signed-in replace operations online and atomic; increment epoch; reject stale events; validate full payload before replace. |
| Pack release | Draft/review/publish status can become visible before a pack is fully built; learner pinning is underspecified. | Keep immutable packs and a current-pack pointer; activate atomically; pin the pack for a mission; retain previous pack on failure. |
| Progress ownership | Guest merge into an existing account does not say whether to replay history or replace. | Choose replay of event history or explicit replace; never silently merge a state snapshot. |
| Solo-owner workflow | The spec requires independent reviewer while the current owner is the only human. | Owner may self-publish privately after validation and source attestation. External AI review is advisory and recorded against a revision, never represented as independent approval. |

## P1 — settle while building PSM I

| Topic | Gap in source spec | Decision / action |
| --- | --- | --- |
| Queue limits | `buildQueue()` does not enforce BR-SS-003's 20 scheduled reviews/day and does not express practice/mode policy. | Define one queue policy shared by learner and API, including chapter practice, weak spots and new-item top-up. |
| Initial SRS state | `grade()` expects an `ItemState`, but first presentation and initial due state are unspecified. | Define creation/first-answer transitions and test them. |
| Duplicate grading | A mini-game can grade a concept and exam-check can grade related items in the same mission. | Define one graded opportunity per item/session or separate assessment identities; do not double advance SRS. |
| Mission completion | Timer-expiry branch skips work but postcondition marks chapter done. | Completion must follow required steps; early exit saves resumable in-progress state without awarding first-completion reward. |
| Streak threshold | BR-SS-013 requires a completed mission or exactly 10-item review, conflicting with shorter allowed review sessions. | Choose and document whether a completed review session with fewer than 10 due items counts. |
| Placement scope | “Up to 15, two per chapter” has no sampling policy when many chapters/exams are targeted; retry behavior can demote state. | PSM I scope only; define eligible chapters, sparse pools, stop behavior, and monotonic unlock/state updates. |
| Mock lifecycle | Resume, deadline, offline auto-submit, unanswered answers and SRS timing are incomplete or conflict between UC-SS-11/12. | Persist a frozen attempt with item revisions, option order and deadline; only finalization mutates results; readiness counts eligible full mocks only. |
| Curriculum prerequisites | Learning path, exam coverage, shared concepts and sequential unlocking are conflated. | Separate story ordering from prerequisite graph and exam coverage; PSM I first. |
| Source precision | `SourceRef` names a guide but not edition, section, URL or locator. | Add auditable source location and content review note before public question bank. |
| Question rights/accuracy | “Exam wording” risks implying copied exam items; Scrum learning content needs review and coverage evidence. | Author original practice items; cite official source and verify current exam format before claiming fidelity. |

## Out of scope for this foundation

- PSM II, PSPO I/II, Two-lens, A/B experiments, AI-generated content, social features.
- Learner auth, sync endpoints, authoring/publishing endpoints and finished PSM I lessons.
- External AI review as an automated approval authority.

These gaps came from reading the supplied brief and architecture. They are not a substitute for source-by-source validation of exam format or Scrum content.
