# Instructor guide — spoilers

The starter intentionally contains six defects, including one integration defect. Do not give this file to learners until the debrief.

## Defect map

| ID | Seeded defect | Expected failing observation | Minimal repair | Primary level |
|---|---|---|---|---|
| U1 | `clampPaddleX` uses `fieldWidth` as max x | A 160px paddle clamps to 800 instead of 640 | Max is `fieldWidth - paddleWidth` | Unit |
| U2 | Wall checks ignore ball radius | Ball center at x=795, r=10 does not bounce | Test `x ± radius`; reposition at boundary | Unit |
| U3 | Best score comparison is lexical | `"100"` fails to replace `"90"` | Parse current score and compare numbers | Unit |
| I1 | Space repeat is not filtered | Holding Space toggles pause repeatedly | Return when `event.repeat` is true | Integration / Playwright |
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

Inside the Space branch, ignore `event.repeat`. Keep `preventDefault()` for both original and repeated Space events if avoiding page scroll is important.

### Paddle collision baseline

Paddle hits already require downward motion and place the ball just above the paddle before it moves away. Existing regression tests in `tests/integration/game-model.test.ts` cover this behavior; preserve them while completing the Space key-repeat exercise.

### Ball launch baseline

New balls already use positive `BALL_SPEED` for `vy`, because canvas y increases downward and the player paddle is at the bottom. The former negative-`vy` defect and its launch tests are no longer part of the lab.

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
- Solution unit/integration suites: four failures total (three unit, one integration); the repaired paddle-overlap reference test passes.
- Solution E2E/Playwright suites: four failures total once Chromium is installed.

If a reference test passes before its level, check whether a learner or code generator already repaired the corresponding seed.
