# Learner prompt — fix Level 2

```text
Fix only the defects demonstrated by the new Level 2 tests.

Expected behavior:
- newBall() must use a positive vertical velocity so the ball initially travels toward the bottom paddle;
- paddle-hit handling must run only for a ball moving downward, and the resolved ball must be placed just above the paddle before moving away;
- KeyboardInput must ignore repeated Space keydown events.

Keep the deterministic step API and public interfaces intact. Do not change tests. Run:
1. npm run test:integration
2. npm run test:unit
3. npm run build

Explain how the velocity guard and depenetration prevent repeat scoring at different frame rates.
```
