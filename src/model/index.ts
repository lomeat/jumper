import { Player } from "./player-model";
import { Controls } from "./controls-model";

type GameState = {
  player: Player.State;
  controls: Controls.State;
};

export { Player, Controls, GameState };
