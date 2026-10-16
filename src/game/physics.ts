import type { Ball, Paddle } from './types';

/** Keep the paddle inside the play field. */
export function clampPaddleX(x: number, fieldWidth: number, paddleWidth: number): number {
  // INTENTIONAL BUG U1: the paddle width is ignored at the right edge.
  return Math.max(0, Math.min(x, fieldWidth));
}

/** Bounce from the left, right, and top walls. The bottom is the miss zone. */
export function bounceOffWalls(ball: Ball, fieldWidth: number): Ball {
  const next = { ...ball };

  // INTENTIONAL BUG U2: collision checks use the ball center, not its radius.
  if (next.x <= 0 || next.x >= fieldWidth) {
    next.vx *= -1;
  }
  if (next.y <= 0) {
    next.vy *= -1;
  }
  return next;
}

export function intersectsPaddle(ball: Ball, paddle: Paddle): boolean {
  const nearestX = Math.max(paddle.x, Math.min(ball.x, paddle.x + paddle.width));
  const nearestY = Math.max(paddle.y, Math.min(ball.y, paddle.y + paddle.height));
  const dx = ball.x - nearestX;
  const dy = ball.y - nearestY;
  return dx * dx + dy * dy <= ball.radius * ball.radius;
}

export function paddleDeflection(ball: Ball, paddle: Paddle): number {
  const paddleCenter = paddle.x + paddle.width / 2;
  const normalized = (ball.x - paddleCenter) / (paddle.width / 2);
  return Math.max(-1, Math.min(1, normalized));
}
 