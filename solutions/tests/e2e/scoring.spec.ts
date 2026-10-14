import { expect, test } from '@playwright/test';

test.describe('Level 3 solution tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?testMode=1');
  });

  test('updates the visible best score immediately after a point', async ({ page }) => {
    await page.evaluate(() => {
      const api = window.__PONG_TEST__!;
      const { paddle } = api.snapshot();
      api.setState({
        score: 0,
        bestScore: 0,
        ball: {
          x: paddle.x + paddle.width / 2,
          y: paddle.y - 9,
          vx: 0,
          vy: 120,
          radius: 10
        }
      });
      api.step(0);
    });
    await expect(page.getByTestId('score')).toHaveText('1');
    await expect(page.getByTestId('best-score')).toHaveText('1');
  });

  test('preserves the best score when Reset run is clicked', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('copilot-pong-best', '7'));
    await page.reload();
    await expect(page.getByTestId('best-score')).toHaveText('7');
    await page.getByRole('button', { name: 'Reset run' }).click();
    await expect(page.getByTestId('best-score')).toHaveText('7');
    expect(await page.evaluate(() => localStorage.getItem('copilot-pong-best'))).toBe('7');
  });
});
