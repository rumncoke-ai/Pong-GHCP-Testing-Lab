# Learner prompt — Level 2: integration testing

```text
Work test-first on Level 2. Inspect GameModel, KeyboardInput, and tests/integration/game-model.test.ts.

Replace only the remaining Space key-repeat todo with a Vitest integration test:
A normal Space keydown followed by a repeat=true Space keydown calls the pause callback exactly once.

Ball launch direction and paddle-overlap handling are already correct and are outside this exercise. Preserve existing regression tests; do not add exercises for these behaviors.

Use real KeyboardEvent objects. Mock only the pause callback; do not use timers or private-field access.

Do not modify production code yet. Run npm run test:integration and explain why these are integration tests rather than unit tests.
```
