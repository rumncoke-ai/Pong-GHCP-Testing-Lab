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
