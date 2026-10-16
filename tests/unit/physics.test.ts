import { describe, expect, it } from 'vitest';
import { bounceOffWalls, clampPaddleX } from '../../src/game/physics';
import { BEST_SCORE_KEY, saveBestScore } from '../../src/game/storage';

describe('Level 1 — pure physics and persistence', () => {
  it('keeps the whole paddle inside the right edge', () => {
    // Arrange
    const x = 760;
    const fieldWidth = 800;
    const paddleWidth = 160;

    // Act
    const clampedX = clampPaddleX(x, fieldWidth, paddleWidth);

    // Assert
    expect(clampedX).toBe(640);
  });

  it('bounces when the ball radius touches the side wall', () => {
    // Arrange
    const ball = { x: 795, y: 100, vx: 5, vy: 2, radius: 10 };
    const fieldWidth = 800;

    // Act
    const bouncedBall = bounceOffWalls(ball, fieldWidth);

    // Assert
    expect(bouncedBall.vx).toBe(-5);
  });

  it('stores 100 as a new best score when the previous best is 90', () => {
    // Arrange
    const values = new Map([[BEST_SCORE_KEY, '90']]);
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    };

    // Act
    saveBestScore(storage, 100);

    // Assert
    expect(values.get(BEST_SCORE_KEY)).toBe('100');
  });
});
 