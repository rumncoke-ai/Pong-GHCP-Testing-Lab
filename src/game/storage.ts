export const BEST_SCORE_KEY = 'copilot-pong-best';

export function readBestScore(storage: Pick<Storage, 'getItem'>): number {
  const parsed = Number(storage.getItem(BEST_SCORE_KEY));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function saveBestScore(storage: Pick<Storage, 'getItem' | 'setItem'>, score: number): void {
  const current = storage.getItem(BEST_SCORE_KEY) ?? '0';
  // INTENTIONAL BUG U3: strings are compared lexicographically ("100" < "90").
  if (String(score) > current) {
    storage.setItem(BEST_SCORE_KEY, String(score));
  }
}
