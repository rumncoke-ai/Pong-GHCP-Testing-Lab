# Learner prompt — fix Level 3

```text
Use the failing end-to-end tests to make two minimal GameModel fixes:
- after a point, update in-memory bestScore immediately when score exceeds it, as well as persisting it;
- resetRun() resets current score, ball, and paddle position but never deletes or zeroes the best score.

Do not modify selectors, test seams, or tests. Run npm run test:e2e, then all Vitest tests and npm run build. Describe why a unit-only suite could miss the stale score DOM and destructive reset journey.
```
