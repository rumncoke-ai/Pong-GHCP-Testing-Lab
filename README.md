# Copilot Pong Testing Lab

A single-player Pong workshop for practicing **test-first debugging with GitHub Copilot**. The starter game is playable but contains eight deliberate defects. Learners progressively expose and fix them with unit, integration, end-to-end, and Playwright-focused tests.

The visual treatment follows the supplied reference: black field, green monospace Score/Best display, white ball, and a blue paddle. See [`docs/reference-pong.png`](docs/reference-pong.png).

> **Start with the prompts:** use the single consolidated [`COPILOT_PROMPTS.md`](COPILOT_PROMPTS.md), or browse the step-by-step index in [`prompts/README.md`](prompts/README.md). Facilitators can use [`prompts/00-generate-buggy-game.md`](prompts/00-generate-buggy-game.md) to recreate the starter; learners begin at [`prompts/01-unit-tests.md`](prompts/01-unit-tests.md).

## Workshop levels

| Level | Scope | Test location | Main lesson |
|---|---|---|---|
| 1 | Unit | `tests/unit` | Boundary values and pure behavior |
| 2 | Integration | `tests/integration` | Collaboration among model, input, storage, and physics |
| 3 | End-to-end | `tests/e2e` | Visible browser journeys across all app layers |
| 4 | Playwright | `tests/playwright` | Keyboard input, web-first assertions, deterministic state, and traces |

**Why both E2E and Playwright?** E2E is the scope of a test. Playwright is the browser automation tool. Level 3 focuses on complete player outcomes; Level 4 deliberately practices Playwright-specific APIs and debugging techniques.

## Quick start

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npx playwright install chromium
npm run dev
```

Open the URL printed by Vite. Controls are **Left/Right** or **A/D**, **Space** to pause, and the on-screen buttons.

## Test commands

```bash
npm test                    # starter Vitest tests (todos are pending)
npm run test:unit           # Level 1
npm run test:integration    # Level 2
npm run test:e2e            # Level 3
npm run test:playwright     # Level 4
npm run test:all            # all learner tests
npm run build               # type-check + production build
```

The `solutions/tests` directory contains facilitator reference tests. Against the untouched starter they are expected to fail—this proves the seeded defects are observable:

```bash
npm run test:solutions:unit
npm run test:solutions:integration
npm run test:solutions:e2e
npm run test:solutions:playwright
```

## Recommended learner loop

1. Open the next prompt in `prompts/` and paste it into GitHub Copilot Chat.
2. Ask Copilot to write tests only.
3. Run the narrow test command and inspect the red failure.
4. Paste the matching fix prompt.
5. Make the smallest production change that turns the test green.
6. Run prior levels as a regression suite.
7. Commit at the checkpoint before moving on.

Suggested checkpoints:

```bash
git add . && git commit -m "lab: establish buggy Pong baseline"
git add . && git commit -m "test: cover and fix unit-level boundaries"
git add . && git commit -m "test: cover and fix component integration"
git add . && git commit -m "test: cover and fix player scoring journeys"
git add . && git commit -m "test: add Playwright interaction regressions"
```

## Repository map

```text
.github/copilot-instructions.md   Repo-specific Copilot guardrails
docs/                             Workshop and facilitator material
prompts/                          Ordered copy/paste Copilot prompts
solutions/tests/                  Canonical facilitator regression tests
src/game/                         Model, input, physics, renderer, controller
tests/unit/                       Level 1 starter tests
tests/integration/                Level 2 starter tests
tests/e2e/                        Level 3 starter tests
tests/playwright/                 Level 4 starter tests
```

## Test-mode seam

Visiting `/?testMode=1` exposes `window.__PONG_TEST__`. It allows browser tests to snapshot state, arrange precise state, step simulated time, reset, and toggle pause. It is absent during normal play. This removes random timing and arbitrary browser sleeps without bypassing rendering or storage assertions.

## Facilitator material

- [`docs/WORKSHOP.md`](docs/WORKSHOP.md): timing, goals, and delivery plan
- [`docs/INSTRUCTOR_GUIDE.md`](docs/INSTRUCTOR_GUIDE.md): spoiler-filled bug map and fixes
- [`solutions/tests`](solutions/tests): complete tests learners are expected to create

## License

MIT
