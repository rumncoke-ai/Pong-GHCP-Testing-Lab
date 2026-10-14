export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export interface GameSnapshot {
  ball: Ball;
  paddle: Paddle;
  score: number;
  bestScore: number;
  paused: boolean;
  width: number;
  height: number;
}

export interface InputState {
  left: boolean;
  right: boolean;
}
