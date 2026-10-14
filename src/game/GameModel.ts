import {
  BALL_RADIUS,
  BALL_SPEED,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  MAX_FRAME_SECONDS,
  PADDLE_HEIGHT,
  PADDLE_MARGIN,
  PADDLE_SPEED,
  PADDLE_WIDTH
} from './constants';
import { bounceOffWalls, clampPaddleX, intersectsPaddle, paddleDeflection } from './physics';
import { readBestScore, saveBestScore, BEST_SCORE_KEY } from './storage';
import type { GameSnapshot, InputState } from './types';

export class GameModel {
  private state: GameSnapshot;

  constructor(private readonly storage: Storage) {
    this.state = {
      ball: this.newBall(),
      paddle: {
        x: (FIELD_WIDTH - PADDLE_WIDTH) / 2,
        y: FIELD_HEIGHT - PADDLE_HEIGHT - PADDLE_MARGIN,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        speed: PADDLE_SPEED
      },
      score: 0,
      bestScore: readBestScore(storage),
      paused: false,
      width: FIELD_WIDTH,
      height: FIELD_HEIGHT
    };
  }

  snapshot(): GameSnapshot {
    return structuredClone(this.state);
  }

  step(seconds: number, input: InputState): void {
    if (this.state.paused) return;
    const dt = Math.min(Math.max(seconds, 0), MAX_FRAME_SECONDS);
    const direction = Number(input.right) - Number(input.left);
    this.state.paddle.x = clampPaddleX(
      this.state.paddle.x + direction * this.state.paddle.speed * dt,
      this.state.width,
      this.state.paddle.width
    );

    this.state.ball.x += this.state.ball.vx * dt;
    this.state.ball.y += this.state.ball.vy * dt;
    this.state.ball = bounceOffWalls(this.state.ball, this.state.width);

    // INTENTIONAL BUG I1: no downward-motion guard or depenetration. A ball that
    // remains inside the paddle can score repeatedly and flip direction each frame.
    if (intersectsPaddle(this.state.ball, this.state.paddle)) {
      const deflection = paddleDeflection(this.state.ball, this.state.paddle);
      this.state.ball.vx += deflection * 90;
      this.state.ball.vy *= -1;
      this.state.score += 1;
      saveBestScore(this.storage, this.state.score);
      // INTENTIONAL BUG E1: bestScore in memory is never updated, so the UI is stale.
    }

    if (this.state.ball.y - this.state.ball.radius > this.state.height) {
      this.state.score = 0;
      this.state.ball = this.newBall();
    }
  }

  togglePause(): void {
    this.state.paused = !this.state.paused;
  }

  resetRun(): void {
    this.state.score = 0;
    this.state.ball = this.newBall();
    this.state.paddle.x = (this.state.width - this.state.paddle.width) / 2;
    // INTENTIONAL BUG E2: resetting a run also destroys the persistent best score.
    this.storage.removeItem(BEST_SCORE_KEY);
    this.state.bestScore = 0;
  }

  /** Test seam used by the browser labs; only exposed by main.ts in test mode. */
  debugSetState(patch: Partial<GameSnapshot>): void {
    this.state = {
      ...this.state,
      ...structuredClone(patch),
      ball: patch.ball ? { ...this.state.ball, ...patch.ball } : this.state.ball,
      paddle: patch.paddle ? { ...this.state.paddle, ...patch.paddle } : this.state.paddle
    };
  }

  private newBall(): GameSnapshot['ball'] {
    return {
      x: FIELD_WIDTH / 2,
      y: FIELD_HEIGHT / 2,
      vx: BALL_SPEED * 0.55,
      // INTENTIONAL BUG I2: a new ball launches away from the player's bottom paddle.
      vy: -BALL_SPEED,
      radius: BALL_RADIUS
    };
  }
}
