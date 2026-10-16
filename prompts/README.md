# GitHub Copilot prompt pack

| Order | Prompt | Audience | Purpose |
|---:|---|---|---|
| 0 | `00-generate-buggy-game.md` | Facilitator | Generate a consistent buggy starter repo from scratch |
| 1 | `01-unit-tests.md` | Learner | Write pure-function and persistence tests |
| 2 | `02-fix-unit-bugs.md` | Learner | Fix boundary and numeric-comparison defects |
| 3 | `03-integration-tests.md` | Learner | Test model, input, physics, and storage collaboration |
| 4 | `04-fix-integration-bugs.md` | Learner | Fix the remaining integration defect: Space key repeat |
| 5 | `05-e2e-tests.md` | Learner | Test visible scoring and reset journeys in a browser |
| 6 | `06-fix-e2e-bugs.md` | Learner | Fix stale UI state and destructive reset |
| 7 | `07-playwright-tests.md` | Learner | Practice deterministic keyboard and browser assertions |
| 8 | `08-final-review.md` | Learner | Audit coverage and remove workshop leftovers |

Prompts deliberately separate **red** (write/run failing tests) and **green** (minimal fix) so Copilot cannot hide a defect by changing test and production code at the same time.
