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
