import { describe, expect, it } from 'vitest';
import { bounceOffWalls, clampPaddleX } from '../../../src/game/physics';
import { BEST_SCORE_KEY, saveBestScore } from '../../../src/game/storage';
import type { Ball } from '../../../src/game/types';

describe('Level 1 solution tests', () => {
  it('keeps the whole paddle inside the right edge', () => {
    expect(clampPaddleX(760, 800, 160)).toBe(640);
  });

  it('bounces when the ball radius touches the side wall', () => {
    const ball: Ball = { x: 795, y: 100, vx: 50, vy: 20, radius: 10 };
    expect(bounceOffWalls(ball, 800).vx).toBe(-50);
  });

  it('stores 100 as a new best score when the previous best is 90', () => {
    localStorage.setItem(BEST_SCORE_KEY, '90');
    saveBestScore(localStorage, 100);
    expect(localStorage.getItem(BEST_SCORE_KEY)).toBe('100');
  });
});
