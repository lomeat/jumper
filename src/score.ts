import { BitmapFont, BitmapText, StateSystem, Ticker } from "pixi.js";

export function Score() {
  const state = {
    score: 0,
  };

  function incScore(n: number = 1) {
    state.score += n;
  }

  function decScore(n: number = 1) {
    state.score -= n;
  }

  function resetScore(n: number = 0) {
    state.score = n;
  }

  function updateScoreText() {
    score.text = state.score.toString();
  }

  BitmapFont.from("score", {
    fontSize: 42,
    fill: "red",
  });

  const score = new BitmapText(state.score.toString(), {
    fontName: "score",
  });

  Ticker.shared.add(updateScoreText);

  return { score, incScore, decScore, resetScore };
}
