# Workshop plan

## Learning objectives

By the end, participants can:

1. choose a unit, integration, or E2E boundary based on the risk;
2. ask GitHub Copilot for a test without letting it pre-emptively change production code;
3. use boundary values and deterministic game state to reproduce timing-sensitive defects;
4. use Playwright web-first assertions, keyboard input, storage setup, screenshots, and traces;
5. keep regression tests while applying the smallest safe fix.

## Suggested 30–45-minute agenda

Use the 45-minute route for a guided workshop covering all six seeded defects: three unit, one integration, and two E2E. Use the 30-minute route for a demo-led introduction with one hands-on unit scenario. Both routes retain all four workshop levels.

**Before the session:** have participants install dependencies and Playwright Chromium, confirm `npm run build` succeeds, and open the running game. The instructor should rehearse the selected scenarios and have failing tests and a trace ready to demonstrate; setup and browser installation are outside the timed agenda.

| 45-minute route | 30-minute route | Activity |
|---:|---:|---|
| 0–4 min | 0–3 min | Run the game, introduce the test boundaries, and explain the tests-first red/green/refactor loop |
| 4–14 min | 3–9 min | Level 1: write a failing paddle-clamp boundary test and make the smallest fix. In 45 minutes, also demonstrate ball-radius wall checks and numeric best-score comparison; leave those two as follow-up exercises in 30 minutes |
| 14–21 min | 9–14 min | Level 2: reproduce Space key-repeat with real keyboard events, filter repeated events, and rerun the integration regressions. Keep launch direction and paddle-overlap behavior unchanged |
| 21–31 min | 14–21 min | Level 3: demonstrate failing browser journeys for immediate Best updates and record preservation after Reset run, apply the two fixes, and rerun the journeys using deterministic setup |
| 31–39 min | 21–26 min | Level 4: verify the Space-repeat fix and paddle boundaries with Playwright keyboard input and deterministic stepping; inspect a prepared failure trace |
| 39–45 min | 26–30 min | Run the build and broader regression suite, recap which boundary caught each defect, and take questions |

**Pacing:** keep each demonstrated repair tests-first: show the failure, explain it, apply the minimal fix, and rerun the narrow test. In the 30-minute route, instructor-drive Levels 2–4 using prepared tests rather than asking participants to author every scenario. Do not copy answer-key tests into learner folders unless explicitly requested.

The level descriptions and exit criteria below describe the full lab. In the 30-minute route, the two deferred unit defects remain follow-up work, so the final regression run is a review of current coverage, not full-lab completion. If the broader suite exceeds the closing timebox, start it during Level 4 and review its result at the end.

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

**Skills:** distinguish integrated behavior from pure calculation; create real keyboard events; use a mock only at an external callback boundary.

**Scope:** one exercise only: Space key-repeat handling. Ball launch direction and paddle-overlap handling are already correct and are not part of this level.

**Exit criteria:** a normal Space keydown followed by a repeated keydown pauses once; existing regression tests remain green.

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
