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
- newBall() must use positive BALL_SPEED for vy on startup, reset, and after a miss so the ball travels toward the bottom paddle; this is baseline behavior, not a defect or test exercise
- paddle-hit handling must require ball.vy > 0 and place the ball at paddle.y - ball.radius before reflecting it upward; this is baseline behavior, not a defect or test exercise

Seed exactly these intentional defects. Put a short `INTENTIONAL BUG <id>` comment at each defect so the facilitator can verify the seed, but do not add tests that already reveal the fix:
U1. clampPaddleX clamps x to fieldWidth instead of fieldWidth - paddleWidth.
U2. wall collision compares the ball center with 0/fieldWidth instead of considering radius.
U3. best scores are compared as strings, so "100" does not replace "90".
I1. Space keydown ignores KeyboardEvent.repeat and can toggle pause repeatedly while held.
E1. saving a new record does not update in-memory bestScore, so the UI stays stale until reload.
E2. Reset run removes the persistent best score when it should reset only the current run.

Create starter tests with only it.todo/test.skip cases organized as:
- tests/unit/physics.test.ts
- tests/integration/game-model.test.ts
- tests/e2e/scoring.spec.ts
- tests/playwright/controls.spec.ts

Level 2 must contain exactly one todo case: repeated Space keydown. Do not add ball-launch or paddle-overlap exercises.

Add scripts for dev, build, unit/integration Vitest, E2E Playwright, and Playwright-focused tests. Add README setup instructions and .github/copilot-instructions.md telling Copilot to add a failing test before each fix.

First show the proposed file tree. Then create the files. Finally run npm install, npm run build, and the starter test suite. Do not fix any intentional defect.
```

## Acceptance check

Search for all six IDs (`U1`–`U3`, `I1`, `E1`–`E2`), confirm the app builds, and confirm starter tests are pending/skipped rather than red.
