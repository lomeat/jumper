import { Player } from "./player-model";

export namespace Controls {
  export type State = {
    movement: Controls.Movement;
  };

  export type Movement = Record<Player.Direction, string>;
}
