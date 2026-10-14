# Workshop plan

## Learning objectives

By the end, participants can:

1. choose a unit, integration, or E2E boundary based on the risk;
2. ask GitHub Copilot for a test without letting it pre-emptively change production code;
3. use boundary values and deterministic game state to reproduce timing-sensitive defects;
4. use Playwright web-first assertions, keyboard input, storage setup, screenshots, and traces;
5. keep regression tests while applying the smallest safe fix.

## Suggested 100-minute agenda

| Time | Activity |
|---:|---|
| 0–10 min | Run the game, review architecture, explain red/green/refactor |
| 10–30 min | Level 1: unit tests and boundary fixes |
| 30–55 min | Level 2: integration tests and state/input fixes |
| 55–75 min | Level 3: browser E2E scoring/reset journeys |
| 75–92 min | Level 4: Playwright keyboard tests and trace inspection |
| 92–100 min | Coverage audit and retrospective |

For a 60-minute version, provide the Level 1 solution tests and complete one scenario per later level.

## Ground rules for Copilot

- Ask for tests first and production edits second.
- Keep the observed requirement in the prompt; do not say only “fix the bug.”
- Reject changes that weaken an assertion, add a sleep, or expose private fields solely to make a test pass.
- Run one narrow test command while iterating, then the entire prior suite.
- Require Copilot to explain why the failure occurs at that test boundary.

## Level 1 — unit

**Files:** `physics.ts`, `storage.ts`, and `tests/unit/physics.test.ts`.

**Skills:** exact boundary cases, immutable inputs, in-memory storage, no browser. Learners should see three independent failures and fix them without touching the model or UI.

**Exit criteria:** all three Level 1 tests pass and `npm run build` succeeds.

## Level 2 — integration

**Files:** `GameModel.ts`, `Input.ts`, real physics/storage collaborators, and `tests/integration/game-model.test.ts`.

**Skills:** distinguish integrated behavior from pure calculation; arrange deterministic overlap; create real keyboard events; use a mock only at an external callback boundary.

**Exit criteria:** a reset ball travels toward the paddle, an outgoing overlapping ball cannot score, and repeated keydown pauses once.

## Level 3 — E2E

**Files:** browser app and `tests/e2e/scoring.spec.ts`.

**Skills:** assert visible outcomes, seed localStorage before reload, click by role, use a test seam only for setup, avoid sleeps.

**Exit criteria:** new records update immediately and Reset run preserves the record through the full UI journey.

## Level 4 — Playwright

**Files:** `tests/playwright/controls.spec.ts`.

**Skills:** `page.keyboard`, `page.evaluate`, web-first assertions, trace retention, state inspection after a deterministic step.

**Exit criteria:** keyboard repeat and canvas-boundary regressions remain green across the entire suite.

## Debrief prompts

- Which defects were cheapest to localize with unit tests?
- Which failures required multiple real collaborators?
- What did the browser tests catch that model tests could not prove?
- Where did the deterministic test seam help, and how could it become a liability?
- Which Copilot suggestion did you reject, and why?
