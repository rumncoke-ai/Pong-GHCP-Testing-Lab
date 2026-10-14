import { expect, test } from '@playwright/test';

test.describe('Level 4 solution tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?testMode=1');
  });

  test('holding Space pauses exactly once', async ({ page }) => {
    await page.evaluate(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', repeat: false }));
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', repeat: true }));
    });
    await expect(page.getByTestId('status')).toHaveText('Paused');
  });

  test('keyboard movement cannot push the paddle outside the canvas', async ({ page }) => {
    await page.evaluate(() => {
      const api = window.__PONG_TEST__!;
      const state = api.snapshot();
      api.setState({ paddle: { ...state.paddle, x: 639 } });
    });
    await page.keyboard.down('ArrowRight');
    await page.evaluate(() => window.__PONG_TEST__!.step(0.05));
    await page.keyboard.up('ArrowRight');

    const state = await page.evaluate(() => window.__PONG_TEST__!.snapshot());
    expect(state.paddle.x + state.paddle.width).toBeLessThanOrEqual(state.width);
  });
});
