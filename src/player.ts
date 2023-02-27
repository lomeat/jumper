import { Application, Sprite, StateSystem, Texture, Ticker } from "pixi.js";

import { KeyboardController } from "./keyboard-controller";
import * as Model from "./model";
import { gameState } from "./state";
import { EPlayerDirections, EAxis } from "./constants";

type Props = {
  sizes?: [number, number];
};

export function Player(props?: Props) {
  // [init]

  const sprite = new Sprite(Texture.WHITE);

  const state: Model.Player.State = gameState.player;

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

  function checkAlive() {
    if (!state.isAlive) {
      removeMovementListeners();
    }
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

  Ticker.shared.add(checkAlive);

  const newProps = { move, setSpeed, removeMovementListeners };

  return Object.assign(sprite, newProps);
}
