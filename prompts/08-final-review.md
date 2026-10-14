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
