# Contributing

This repository intentionally starts in a defective state. A contribution should preserve the workshop sequence unless it is explicitly updating the solution material.

1. Add or update a failing regression test.
2. Keep the failure in the level whose test boundary best matches the risk.
3. Make the smallest production fix.
4. Run `npm run build` and the relevant unit/browser suites.
5. Do not commit Playwright reports, traces, screenshots, `dist`, or `node_modules`.
