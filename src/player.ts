import { Sprite, Texture, Ticker } from "pixi.js";

import { KeyboardController } from "./keyboard-controller";
import * as Model from "./model";
import { gameState } from "./state";
import { EPlayerDirections, EAxis } from "./constants";

type Props = {
  sizes?: [number, number];
};

export function Player(props?: Props) {
  // [init]

  const state: Model.Player.State = gameState.player;

  const sprite = Sprite.from(Texture.WHITE);
  sprite.width = props?.sizes?.[0] ?? 100;
  sprite.height = props?.sizes?.[1] ?? 200;
  sprite.x = 200;
  sprite.y = 200;
  sprite.tint = state.color;
  sprite.interactive = true;

  const movement = Object.entries(gameState.controls.movement).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: KeyboardController({
        key: value,
        action: (dt) => move(dt, key as Model.Player.Direction),
      }),
    }),
    // In my opinion, there is unsafe 'as'
    {} as Model.Player.Movement
  );

  // [methods]

  function move(dt, direction: Model.Player.Direction) {
    // Update sprite 'x' or 'y' position
    // Direction's enum returns '1' or '-1'
    sprite[EAxis[direction]] += dt * state.speed * EPlayerDirections[direction];
  }

  function kill() {
    state.isAlive = false;
    state.speed = 0;
    setColor(0x000000);
    removeMovementListeners();
  }

  function setColor(color: number) {
    state.color = color;
    sprite.tint = color;
  }

  function setSpeed(newSpeed) {
    state.speed = newSpeed;
  }

  function removeMovementListeners() {
    movement.left.unsubscribe();
    movement.right.unsubscribe();
    movement.up.unsubscribe();
    movement.down.unsubscribe();
  }

  // [output]

  const newProps = { move, setSpeed, removeMovementListeners, kill, setColor };

  return Object.assign(sprite, newProps);
}
