import type { InputState } from './types';

export class KeyboardInput {
  readonly state: InputState = { left: false, right: false };

  constructor(private readonly onPause: () => void) {}

  keydown = (event: KeyboardEvent): void => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') this.state.left = true;
    if (event.code === 'ArrowRight' || event.code === 'KeyD') this.state.right = true;
    if (event.code === 'Space') {
      event.preventDefault();
      // INTENTIONAL BUG I1: key-repeat events toggle pause many times while held.
      this.onPause();
    }
  };

  keyup = (event: KeyboardEvent): void => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') this.state.left = false;
    if (event.code === 'ArrowRight' || event.code === 'KeyD') this.state.right = false;
  };

  attach(target: Window): void {
    target.addEventListener('keydown', this.keydown);
    target.addEventListener('keyup', this.keyup);
  }

  detach(target: Window): void {
    target.removeEventListener('keydown', this.keydown);
    target.removeEventListener('keyup', this.keyup);
  }
}
