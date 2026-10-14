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
