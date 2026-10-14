import { GameModel } from './GameModel';
import { KeyboardInput } from './Input';
import { Renderer } from './Renderer';

export class GameController {
  readonly input: KeyboardInput;
  private frameId = 0;
  private lastTime = 0;

  constructor(readonly model: GameModel, private readonly renderer: Renderer) {
    this.input = new KeyboardInput(() => {
      this.model.togglePause();
      this.renderer.render(this.model.snapshot());
    });
  }

  start(): void {
    this.input.attach(window);
    this.renderer.render(this.model.snapshot());
    this.frameId = requestAnimationFrame(this.frame);
  }

  stop(): void {
    cancelAnimationFrame(this.frameId);
    this.input.detach(window);
  }

  togglePause(): void {
    this.model.togglePause();
    this.renderer.render(this.model.snapshot());
  }

  reset(): void {
    this.model.resetRun();
    this.renderer.render(this.model.snapshot());
  }

  stepForTest(seconds: number): void {
    this.model.step(seconds, this.input.state);
    this.renderer.render(this.model.snapshot());
  }

  private frame = (time: number): void => {
    const seconds = this.lastTime === 0 ? 0 : (time - this.lastTime) / 1000;
    this.lastTime = time;
    this.model.step(seconds, this.input.state);
    this.renderer.render(this.model.snapshot());
    this.frameId = requestAnimationFrame(this.frame);
  };
}
