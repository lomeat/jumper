import { Sprite, Texture, Ticker } from "pixi.js";

import { KeyboardController } from "./keyboard-controller";
import * as Model from "./model";
import { gameState, initState } from "./state";
import { EPlayerDirections, EAxis, EColors } from "./constants";
import { generateHexColor } from "./utils";

export type Props = {
  sizes?: [number, number];
  position?: [number, number];
};

export type PlayerInstance = Sprite & {
  move: (dt: any, direction: Model.Player.Direction) => void;
  setSpeed: (newSpeed: any) => void;
  kill: () => void;
  alive: () => void;
  setColor: (color: number) => void;
  changeColor: (color?: string) => void;
};

export function Player(props?: Props) {
  // [init]

  const state: Model.Player.State = gameState.player;
  const prevState: Model.Player.State = { ...gameState.player };

  const sprite = Sprite.from(Texture.WHITE);
  sprite.width = props?.sizes?.[0] ?? 100;
  sprite.height = props?.sizes?.[1] ?? 200;
  sprite.tint = state.color;
  sprite.interactive = true;
  sprite.anchor.set(0.5);
  sprite.on("pointertap", (e) => changeColor());

  const movement = Object.entries(gameState.controls.movement).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: KeyboardController({
        key: value,
        action: (dt) => move(dt, key as Model.Player.Direction),
      }),
    }),
    {} as Model.Player.Movement
  );

  // [methods]

  function move(dt, direction: Model.Player.Direction) {
    // Update sprite position
    // Determines 'x' or 'y' by Axis enum
    // Direction's enum returns '1' or '-1'
    state.position[EAxis[direction]] +=
      dt * state.speed * EPlayerDirections[direction];
  }

  function setPosition(position: Model.Player.State["position"]) {
    state.position = position;
  }

  function watchState() {
    if (state.color !== sprite.tint) {
      sprite.tint = state.color;
    }

    [sprite.x, sprite.y] = state.position;
  }

  function kill() {
    state.isAlive = false;
    setSpeed(0);
    prevState.color = state.color;
    setColor(0x000000);
    removeMovementListeners();
  }

  function alive() {
    state.isAlive = true;
    setSpeed(initState.player.speed);
    setColor(prevState.color);
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

  function changeColor(color?: string) {
    const newColor = color ? EColors[color] : generateHexColor();
    setColor(newColor);
    prevState.color = newColor;
  }

  // [output]

  setPosition(props?.position ?? initState.player.position);

  Ticker.shared.add(watchState);

  const newProps = { move, setSpeed, kill, alive, setColor, changeColor };

  return Object.assign(sprite, newProps);
}
