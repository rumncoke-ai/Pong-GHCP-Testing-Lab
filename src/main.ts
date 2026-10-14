import './style.css';
import { GameController } from './game/GameController';
import { GameModel } from './game/GameModel';
import { Renderer } from './game/Renderer';
import type { GameSnapshot } from './game/types';

declare global {
  interface Window {
    __PONG_TEST__?: {
      snapshot: () => GameSnapshot;
      setState: (patch: Partial<GameSnapshot>) => void;
      step: (seconds: number) => void;
      reset: () => void;
      togglePause: () => void;
    };
  }
}

const canvas = document.querySelector<HTMLCanvasElement>('#game');
const score = document.querySelector<HTMLElement>('[data-testid="score"]');
const best = document.querySelector<HTMLElement>('[data-testid="best-score"]');
const status = document.querySelector<HTMLElement>('[data-testid="status"]');
if (!canvas || !score || !best || !status) throw new Error('Game markup is incomplete');

const model = new GameModel(window.localStorage);
const renderer = new Renderer(canvas, score, best, status);
const controller = new GameController(model, renderer);
controller.start();

document.querySelector('[data-action="pause"]')?.addEventListener('click', () => controller.togglePause());
document.querySelector('[data-action="reset"]')?.addEventListener('click', () => controller.reset());

if (new URLSearchParams(window.location.search).has('testMode')) {
  window.__PONG_TEST__ = {
    snapshot: () => model.snapshot(),
    setState: (patch) => {
      model.debugSetState(patch);
      controller.stepForTest(0);
    },
    step: (seconds) => controller.stepForTest(seconds),
    reset: () => controller.reset(),
    togglePause: () => controller.togglePause()
  };
}
