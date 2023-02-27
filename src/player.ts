import { Application, Sprite, Texture, Ticker } from "pixi.js";

import { generateHexColor } from "./utils";
import { KeyboardController } from "./keyboard-controller";

type Props = {
  color?: number;
};

type Direction = "left" | "right" | "up" | "down";

export function Player(props?: Props) {
  // [init]

  const sprite = new Sprite(Texture.WHITE);

  const state = {
    speed: 1,
    color: props?.color ?? generateHexColor(),
  };

  sprite.width = 100;
  sprite.height = 200;
  sprite.x = 200;
  sprite.y = 200;
  sprite.tint = state.color;
  sprite.interactive = true;

  const Movement = {
    left: KeyboardController({
      key: "a",
      action: (dt) => move(dt, "left"),
    }),
    right: KeyboardController({
      key: "d",
      action: (dt) => move(dt, "right"),
    }),
    up: KeyboardController({
      key: "w",
      action: (dt) => move(dt, "up"),
    }),
    down: KeyboardController({
      key: "s",
      action: (dt) => move(dt, "down"),
    }),
  };

  // [methods]

  function move(dt, direction: Direction) {
    switch (direction) {
      case "left":
        sprite.x += dt * state.speed * -1;
        break;
      case "right":
        sprite.x += dt * state.speed * 1;
        break;
      case "up":
        sprite.y += dt * state.speed * -1;
        break;
      case "down":
        sprite.y += dt * state.speed * 1;
        break;
      default:
        break;
    }
  }

  function setSpeed(newSpeed) {
    state.speed = newSpeed;
  }

  function removeControls() {
    Movement.left.unsubscribe();
    Movement.right.unsubscribe();
    Movement.up.unsubscribe();
    Movement.down.unsubscribe();
  }

  const newProps = { move, setSpeed, removeControls };

  return Object.assign(sprite, newProps);
}
