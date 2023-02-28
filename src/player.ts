import { Sprite, Texture, Ticker } from "pixi.js";

import { KeyboardController } from "./keyboard-controller";
import * as Model from "./model";
import { gameState, initState } from "./state";
import { EPlayerDirections, EAxis } from "./constants";

type Props = {
  sizes?: [number, number];
  position?: [number, number];
};

export function Player(props?: Props) {
  // [init]

  const state: Model.Player.State = gameState.player;

  const sprite = Sprite.from(Texture.WHITE);
  sprite.width = props?.sizes?.[0] ?? 100;
  sprite.height = props?.sizes?.[1] ?? 200;
  sprite.tint = state.color;
  sprite.interactive = true;
  sprite.anchor.set(0.5);

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
    state.position[EAxis[direction]] +=
      dt * state.speed * EPlayerDirections[direction];
  }

  function setPosition(position: Model.Player.State["position"]) {
    state.position = position;
  }

  function watchState() {
    if (!state.isAlive) {
      setSpeed(0);
      setColor(0x000000);
    } else {
      setSpeed(initState.player.speed);
      setColor(initState.player.color);
    }

    sprite.tint = state.color;

    [sprite.x, sprite.y] = state.position;
  }

  function kill() {
    state.isAlive = false;
    removeMovementListeners();
  }

  function alive() {
    state.isAlive = true;
    setPosition(props?.position ?? initState.player.position);
    addMovementListeners();
  }

  function setColor(color: number) {
    state.color = color;
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

  function addMovementListeners() {
    movement.left.subscribe();
    movement.right.subscribe();
    movement.up.subscribe();
    movement.down.subscribe();
  }

  // [output]

  setPosition(props?.position ?? initState.player.position);

  Ticker.shared.add(watchState);

  const newProps = { move, setSpeed, kill, alive, setColor };

  return Object.assign(sprite, newProps);
}
