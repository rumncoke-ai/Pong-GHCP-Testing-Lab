# Repository guidance for GitHub Copilot

This repository is a teaching lab, not a production game.

- Stack: TypeScript, Vite, Vitest, jsdom, and Playwright.
- Preserve the four workshop levels: unit, integration, end-to-end, and advanced Playwright.
- During a learner exercise, add a failing test before changing production code.
- Make the smallest production change that satisfies the new test.
- Do not copy files from `solutions/` unless the learner explicitly asks for the answer key.
- Keep physics deterministic. Prefer `GameModel.step()` and `window.__PONG_TEST__` over arbitrary sleeps.
- Use accessible, stable selectors (`getByRole`, `getByTestId`) rather than CSS implementation details.
- Run the narrowest relevant test command, then `npm run build` and the broader regression suite.
- Explain the observed failure and why the fix works; do not silently rewrite unrelated code.
