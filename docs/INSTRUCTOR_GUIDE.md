# Instructor guide — spoilers

The starter intentionally contains eight defects. Do not give this file to learners until the debrief.

## Defect map

| ID | Seeded defect | Expected failing observation | Minimal repair | Primary level |
|---|---|---|---|---|
| U1 | `clampPaddleX` uses `fieldWidth` as max x | A 160px paddle clamps to 800 instead of 640 | Max is `fieldWidth - paddleWidth` | Unit |
| U2 | Wall checks ignore ball radius | Ball center at x=795, r=10 does not bounce | Test `x ± radius`; reposition at boundary | Unit |
| U3 | Best score comparison is lexical | `"100"` fails to replace `"90"` | Parse current score and compare numbers | Unit |
| I1 | Any paddle overlap scores | Outgoing ball scores/flips again | Require `vy > 0`; place ball above paddle | Integration |
| I2 | New ball has negative `vy` | Serve travels away from bottom paddle | Use positive `BALL_SPEED` | Integration |
| I3 | Space repeat is not filtered | Holding Space toggles pause repeatedly | Return when `event.repeat` is true | Integration / Playwright |
| E1 | Persisted record does not update state | Score shows 1 while Best remains 0 | Update `state.bestScore` when record is set | E2E |
| E2 | Reset deletes the record | Clicking Reset changes Best 7 to 0 | Remove deletion and best-score reset | E2E |

## Canonical repair notes

### U1

```ts
return Math.max(0, Math.min(x, fieldWidth - paddleWidth));
```

For defensive production code, also clamp the upper bound to at least zero if a paddle can be wider than the field.

### U2

Check side edges with `x - radius <= 0` and `x + radius >= fieldWidth`, and top with `y - radius <= 0`. Reposition to `radius`, `fieldWidth - radius`, or `radius` before inverting the relevant velocity. A direction guard (`vx < 0`, `vx > 0`, or `vy < 0`) prevents an already-reflected ball from flipping again.

### U3

Convert storage text to a finite number before comparison. `readBestScore` already demonstrates the desired invalid-value fallback.

### I1

Handle a paddle hit only while `ball.vy > 0`. Set `ball.y = paddle.y - ball.radius` before assigning a negative vertical velocity. This resolves penetration and makes behavior stable across frame sizes.

### I2

Set the new ball's `vy` to positive `BALL_SPEED`, because canvas y increases downward and the player paddle is at the bottom.

### I3

Inside the Space branch, ignore `event.repeat`. Keep `preventDefault()` for both original and repeated Space events if avoiding page scroll is important.

### E1

After incrementing score, compare numeric `score` and `bestScore`. If it is a record, assign `state.bestScore = state.score` and persist that value. Avoid rereading storage on every frame.

### E2

Delete both lines in `resetRun` that remove the key and zero `bestScore`. Reset only run-scoped state.

## Using the reference tests

The files under `solutions/tests` should fail against the untouched starter and pass after the intended repairs. Copying them directly into learner folders is a fallback if Copilot is unavailable or time is short.

The solution suite deliberately does not provide a fully fixed source tree. Learners still have to reason from a red test to a minimal code change.

## Expected starter result

- `npm test`: passes with pending tests.
- `npm run build`: passes.
- Solution unit/integration suites: six failures total.
- Solution E2E/Playwright suites: four failures total once Chromium is installed.

If a reference test passes before its level, check whether a learner or code generator already repaired the corresponding seed.
