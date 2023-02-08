import { FederatedPointerEvent, Sprite, Ticker } from "pixi.js";

import { state as rootState } from "./state";

type Direction = "left" | "right" | "idle";

type Props = {
  screenSizes: number[];
  velocity?: number;
  direction?: Direction;
};

export function Player({
  screenSizes,
  velocity = 0,
  direction = "idle",
}: Props) {
  // Init

  const state = { ...rootState.player };

  const player = Sprite.from("player.png");

  // Funcs

  function init() {
    state.isAlive = true;
    if (state.direction === "left") {
      handleChangeDirection("right");
    }
    setVelocity(10);
    player.angle = 0;
  }

  function getDirection(direction) {
    switch (direction) {
      case "left":
        return -1;
      case "right":
        return 1;
      default:
        return 0;
    }
  }

  function moving(delta: number): void {
    player.x =
      player.x + state.velocity * delta * getDirection(state.direction);

    if (player.x - player.width >= screenSizes[0]) {
      player.x = -player.width / 2;
    }

    if (player.x + player.width <= 0) {
      player.x = screenSizes[0] + player.width / 2;
    }
  }

  function setVelocity(newVelocity: number): void {
    state.velocity = newVelocity;
  }

  function handleChangeDirection(direction: Direction) {
    state.direction = direction;
    player.scale.x *= -1;
  }

  function handleClick(e: FederatedPointerEvent): void {
    if (state.isAlive) {
      if (state.direction === "left") {
        handleChangeDirection("right");
      } else {
        handleChangeDirection("left");
      }
    }
  }

  function playerIsDead() {
    if (state.isAlive) {
      player.interactive = false;
      setVelocity(0);
      player.angle = -90;
    }
    state.isAlive = false;
  }

  // Body

  player.scale.set(0.3);
  player.anchor.set(0.5);
  player.interactive = true;

  if (state.isAlive) {
    Ticker.shared.add(moving);
  }

  return {
    player,
    setPlayerVelocity: setVelocity,
    changePlayerDirection: handleChangeDirection,
    playerIsDead,
    playerIsAlive: state.isAlive,
    playerInteract: handleClick,
    initPlayer: init,
  };
}
