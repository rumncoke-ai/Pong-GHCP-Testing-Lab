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
