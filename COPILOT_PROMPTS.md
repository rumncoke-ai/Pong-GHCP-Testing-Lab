# GitHub Copilot prompts — single-player Pong testing workshop

This is the consolidated copy/paste prompt pack. Use Prompt 0 only when generating the starter from scratch. In the provided repository, learners start with Prompt 1 and alternate test prompts (red) with fix prompts (green).

---


# Instructor prompt — generate the intentionally buggy game

Use this prompt in GitHub Copilot Chat from an empty repository. It is intentionally explicit so every workshop run starts with the same defects.

```text
Act as a senior TypeScript game developer preparing a software-testing workshop.

Create a complete single-player Pong repository using:
- Vite and strict TypeScript
- an HTML canvas, 800 x 600 logical pixels
- Vitest + jsdom for unit and integration tests
- Playwright for browser tests
- no runtime framework and no runtime dependencies

Visual direction:
- black play field
- green monospace score at the top, with current Score on the left and Best on the right
- white ball and blue/purple paddle near the bottom
- responsive page around the fixed logical canvas
- controls: Left/Right or A/D; Space pauses; buttons for Pause and Reset run

Architecture:
- src/game/physics.ts: pure clamp, wall-bounce, circle/rectangle collision, and deflection functions
- src/game/storage.ts: read/write best score
- src/game/GameModel.ts: deterministic state and step(seconds, input)
- src/game/Input.ts: keyboard state
- src/game/Renderer.ts: canvas and score DOM updates
- src/game/GameController.ts: requestAnimationFrame loop
- src/main.ts: composition root
- expose window.__PONG_TEST__ only when the URL has ?testMode=1; include snapshot, setState, step, reset, and togglePause
- add stable data-testid values for score, best-score, and status

Seed exactly these intentional defects. Put a short `INTENTIONAL BUG <id>` comment at each defect so the facilitator can verify the seed, but do not add tests that already reveal the fix:
U1. clampPaddleX clamps x to fieldWidth instead of fieldWidth - paddleWidth.
U2. wall collision compares the ball center with 0/fieldWidth instead of considering radius.
U3. best scores are compared as strings, so "100" does not replace "90".
I1. paddle collision has no downward-motion guard or depenetration, allowing repeat scoring while overlapping.
I2. a new/reset ball has a negative vy and launches away from the player's bottom paddle.
I3. Space keydown ignores KeyboardEvent.repeat and can toggle pause repeatedly while held.
E1. saving a new record does not update in-memory bestScore, so the UI stays stale until reload.
E2. Reset run removes the persistent best score when it should reset only the current run.

Create starter tests with only it.todo/test.skip cases organized as:
- tests/unit/physics.test.ts
- tests/integration/game-model.test.ts
- tests/e2e/scoring.spec.ts
- tests/playwright/controls.spec.ts

Add scripts for dev, build, unit/integration Vitest, E2E Playwright, and Playwright-focused tests. Add README setup instructions and .github/copilot-instructions.md telling Copilot to add a failing test before each fix.

First show the proposed file tree. Then create the files. Finally run npm install, npm run build, and the starter test suite. Do not fix any intentional defect.
```

## Acceptance check

Search for all eight IDs (`U1`–`U3`, `I1`–`I3`, `E1`–`E2`), confirm the app builds, and confirm starter tests are pending/skipped rather than red.


---


# Learner prompt — Level 1: unit testing

Paste this into GitHub Copilot Chat after opening `tests/unit/physics.test.ts`.

```text
We are doing test-first debugging. Work only on Level 1.

Inspect:
- tests/unit/physics.test.ts
- src/game/physics.ts
- src/game/storage.ts
- src/game/types.ts

Replace the three todo cases with focused Vitest unit tests for these externally observable requirements:
1. A paddle at x=760 in an 800-wide field with width=160 must clamp to x=640.
2. A radius-10 ball centered at x=795 and moving right must bounce in an 800-wide field because its edge has reached the wall.
3. A score of 100 must replace a stored best score of 90.

Constraints:
- Use Arrange/Act/Assert and exact boundary values.
- Test public functions only; do not mock the implementation under test.
- Do not change production code yet.
- Run npm run test:unit and explain each failure in one sentence.
```

After the red tests are reviewed, use `02-fix-unit-bugs.md`.


---


# Learner prompt — fix Level 1

```text
The Level 1 tests are now failing for the intended reasons. Make the smallest production-code changes that satisfy them.

Rules:
- Change only src/game/physics.ts and src/game/storage.ts.
- Clamp paddle x to [0, fieldWidth - paddleWidth].
- Consider ball.radius at the left, right, and top walls and move the ball back to the legal boundary after a hit so it cannot remain outside.
- Parse the stored best score as a number before comparing.
- Preserve function signatures and do not weaken assertions.

Run npm run test:unit and npm run build. Summarize each fix as: defect, failing boundary, code change, regression prevented.
```


---


# Learner prompt — Level 2: integration testing

```text
Work test-first on Level 2. Inspect GameModel, KeyboardInput, the physics helpers, and tests/integration/game-model.test.ts.

Replace the todo cases with Vitest integration tests that verify collaboration between components:
1. A newly constructed model launches the ball toward the bottom paddle (positive vy in this coordinate system).
2. If a ball is overlapping the paddle but already moving upward, one zero-duration step must not increment score or flip it downward.
3. A normal Space keydown followed by a repeat=true Space keydown calls the pause callback exactly once.

Use the real GameModel, real localStorage supplied by jsdom, and real KeyboardEvent objects. Mock only the pause callback. Use debugSetState as the deterministic seam; do not use timers or private-field access.

Do not modify production code yet. Run npm run test:integration and explain why these are integration tests rather than unit tests.
```


---


# Learner prompt — fix Level 2

```text
Fix only the defects demonstrated by the new Level 2 tests.

Expected behavior:
- newBall() must use a positive vertical velocity so the ball initially travels toward the bottom paddle;
- paddle-hit handling must run only for a ball moving downward, and the resolved ball must be placed just above the paddle before moving away;
- KeyboardInput must ignore repeated Space keydown events.

Keep the deterministic step API and public interfaces intact. Do not change tests. Run:
1. npm run test:integration
2. npm run test:unit
3. npm run build

Explain how the velocity guard and depenetration prevent repeat scoring at different frame rates.
```


---


# Learner prompt — Level 3: end-to-end testing

Here “end-to-end” describes test scope: browser UI, model, storage, and renderer all participate. Playwright is the runner, while Level 4 focuses on Playwright-specific interaction techniques.

```text
Implement the skipped scenarios in tests/e2e/scoring.spec.ts as deterministic Playwright end-to-end tests.

For each test, navigate to /?testMode=1 and use window.__PONG_TEST__ only to arrange hard-to-reach game state. Assert outcomes through the visible UI whenever possible.

Scenario A — new record:
- arrange score=0 and bestScore=0;
- place a downward-moving radius-10 ball so it intersects the paddle;
- step the game once;
- assert visible Score is 1 and visible Best is 1.

Scenario B — reset semantics:
- seed localStorage key copilot-pong-best with 7, reload, and confirm Best shows 7;
- click the Reset run button through its accessible role/name;
- assert visible Best is still 7 and localStorage still contains "7".

Do not fix production code. Avoid waitForTimeout and arbitrary sleeps. Run npm run test:e2e and save the trace/screenshot on failure. Explain which layer each failure implicates.
```


---


# Learner prompt — fix Level 3

```text
Use the failing end-to-end tests to make two minimal GameModel fixes:
- after a point, update in-memory bestScore immediately when score exceeds it, as well as persisting it;
- resetRun() resets current score, ball, and paddle position but never deletes or zeroes the best score.

Do not modify selectors, test seams, or tests. Run npm run test:e2e, then all Vitest tests and npm run build. Describe why a unit-only suite could miss the stale score DOM and destructive reset journey.
```


---


# Learner prompt — Level 4: Playwright interaction testing

```text
Implement tests/playwright/controls.spec.ts using Playwright's browser APIs and web-first assertions.

Test 1 — key repeat:
- open /?testMode=1;
- dispatch a normal Space keydown and then a repeat=true Space keydown in the page;
- assert the status remains Paused, proving one physical hold causes one toggle.

Test 2 — keyboard boundary:
- use the test API to put the paddle at x=639;
- press and hold ArrowRight with page.keyboard;
- step exactly 0.05 seconds through the test API;
- release the key;
- assert from the snapshot that paddle.x + paddle.width <= field width.

Use getByTestId for status, page.keyboard for player input, and page.evaluate only for the deterministic seam/state inspection. Do not use sleeps. Run npm run test:playwright.

If either test exposes a defect not already fixed in earlier levels, add the smallest regression fix and rerun npm run test:all plus npm run build. Turn on a trace for the first retry and explain how to inspect it with `npx playwright show-trace`.
```


---


# Learner prompt — final Copilot code review

```text
Review this workshop repository after all four levels are green.

Check for:
- all eight requirements covered by at least one regression test;
- no production behavior tested only through private implementation details;
- no arbitrary sleeps in browser tests;
- deterministic setup through GameModel.debugSetState/window.__PONG_TEST__ only in test mode;
- accessible Playwright selectors;
- no weakened assertions, test.only, test.skip, or it.todo left in learner tests;
- build and test scripts that work in a fresh clone.

Do not edit yet. Return a table with requirement, test file/case, test level, risk if missing, and any gap. Then propose only the minimal edits needed to close genuine gaps. After I approve the plan, make those edits and run npm run build and npm run test:all.
```


---
