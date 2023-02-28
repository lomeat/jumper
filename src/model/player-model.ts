export namespace Player {
  export type State = {
    color: number;
    speed: number;
    isAlive: boolean;
    position: [number, number];
  };

  export type Direction = "left" | "right" | "up" | "down";

  export type Movement = Record<Direction, any>;
}
