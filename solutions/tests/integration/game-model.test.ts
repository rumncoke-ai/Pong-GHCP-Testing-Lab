import { describe, expect, it, vi } from 'vitest';
import { GameModel } from '../../../src/game/GameModel';
import { KeyboardInput } from '../../../src/game/Input';

describe('Level 2 solution tests', () => {
  it('does not score again while a ball is already travelling away from the paddle', () => {
    const model = new GameModel(localStorage);
    const { paddle } = model.snapshot();
    model.debugSetState({
      score: 4,
      ball: {
        x: paddle.x + paddle.width / 2,
        y: paddle.y,
        vx: 0,
        vy: -120,
        radius: 10
      }
    });
    model.step(0, { left: false, right: false });
    expect(model.snapshot().score).toBe(4);
  });

  it('ignores repeated Space keydown events when toggling pause', () => {
    const onPause = vi.fn();
    const input = new KeyboardInput(onPause);
    input.keydown(new KeyboardEvent('keydown', { code: 'Space', repeat: false }));
    input.keydown(new KeyboardEvent('keydown', { code: 'Space', repeat: true }));
    expect(onPause).toHaveBeenCalledTimes(1);
  });
});
