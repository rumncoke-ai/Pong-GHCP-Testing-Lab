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
