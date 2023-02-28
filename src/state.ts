import * as Model from "./model";
import { generateHexColor } from "./utils";

const player: Model.Player.State = {
  speed: 5,
  color: generateHexColor(),
  isAlive: true,
  position: [100, 100],
};

const controls: Model.Controls.State = {
  movement: {
    left: "a",
    right: "d",
    up: "w",
    down: "s",
  },
};

export const initState: Model.GameState = { player, controls };

export const gameState: Model.GameState = {
  player: { ...initState.player },
  controls: { ...initState.controls },
};
