# Learner prompt — fix Level 2

```text
Fix only the Space key-repeat defect demonstrated by the new Level 2 test.

Expected behavior:
- KeyboardInput must ignore repeated Space keydown events.

Ball launch direction and paddle-overlap handling are already correct; leave GameModel unchanged.

Keep the deterministic step API and public interfaces intact. Do not change tests. Run:
1. npm run test:integration
2. npm run test:unit
3. npm run build

Explain how filtering repeated Space events prevents multiple pause toggles while the key is held.
```
