import type { GameSnapshot } from './types';

export class Renderer {
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly scoreNode: HTMLElement,
    private readonly bestNode: HTMLElement,
    private readonly statusNode: HTMLElement
  ) {}

  render(state: GameSnapshot): void {
    const context = this.canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = '#050806';
    context.fillRect(0, 0, state.width, state.height);

    context.strokeStyle = 'rgba(41, 255, 117, 0.22)';
    context.setLineDash([10, 14]);
    context.beginPath();
    context.moveTo(state.width / 2, 0);
    context.lineTo(state.width / 2, state.height);
    context.stroke();
    context.setLineDash([]);

    context.fillStyle = '#f8fafc';
    context.beginPath();
    context.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
    context.fill();

    const gradient = context.createLinearGradient(
      state.paddle.x,
      state.paddle.y,
      state.paddle.x + state.paddle.width,
      state.paddle.y
    );
    gradient.addColorStop(0, '#1664ff');
    gradient.addColorStop(1, '#8b5cf6');
    context.fillStyle = gradient;
    context.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);

    this.scoreNode.textContent = String(state.score);
    this.bestNode.textContent = String(state.bestScore);
    this.statusNode.textContent = state.paused ? 'Paused' : 'Running';
  }
}
