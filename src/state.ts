import * as Model from "./model";
import { generateHexColor } from "./utils";

const player: Model.Player.State = {
  speed: 5,
  color: generateHexColor(),
  isAlive: true,
};

const controls: Model.Controls.State = {
  movement: {
    left: "a",
    right: "d",
    up: "w",
    down: "s",
  },
};

export const gameState: Model.GameState = {
  player,
  controls,
};
