import * as Model from "./model";
import { generateHexColor } from "./utils";

const player: Model.Player = {
  speed: 5,
  color: generateHexColor(),
  isAlive: true,
};

export const gameState = {
  player,
};
