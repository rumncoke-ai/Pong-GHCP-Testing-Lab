import { describe, expect, it } from 'vitest';
import { GameModel } from '../../src/game/GameModel';
import { BEST_SCORE_KEY } from '../../src/game/storage';

describe('Level 2 — collaborating game components', () => {
  it.each([-120, 0])('ignores paddle overlap when vertical velocity is %s', (vy) => {
    const model = new GameModel(localStorage);
    const { ball, paddle } = model.snapshot();
    const overlappingBall = { ...ball, x: paddle.x + paddle.width / 2, y: paddle.y, vx: 0, vy };
    model.debugSetState({ ball: overlappingBall });

    model.step(0, { left: false, right: false });

    expect(model.snapshot().score).toBe(0);
    expect(model.snapshot().ball).toEqual(overlappingBall);
    expect(localStorage.getItem(BEST_SCORE_KEY)).toBeNull();
  });

  it('scores once and resolves penetration when a descending ball hits the paddle', () => {
    const model = new GameModel(localStorage);
    const { ball, paddle } = model.snapshot();
    model.debugSetState({
      ball: { ...ball, x: paddle.x + paddle.width * 0.75, y: paddle.y + 1, vx: 0, vy: 120 }
    });

    model.step(0, { left: false, right: false });

    const hit = model.snapshot();
    expect(hit.score).toBe(1);
    expect(hit.ball.y).toBe(paddle.y - ball.radius);
    expect(hit.ball.vy).toBe(-120);
    expect(hit.ball.vx).toBe(45);
    expect(localStorage.getItem(BEST_SCORE_KEY)).toBe('1');

    for (const seconds of [0, 0.001, 1 / 60]) {
      model.step(seconds, { left: false, right: false });
      expect(model.snapshot().score).toBe(1);
      expect(model.snapshot().ball.vy).toBe(-120);
      expect(model.snapshot().ball.vx).toBe(45);
    }
  });

  it.todo('ignores repeated Space keydown events when toggling pause');
});
