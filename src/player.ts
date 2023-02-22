import { Sprite, Texture } from "pixi.js";

import { generateHexColor, useState } from "./utils";

type Props = {
  color?: number;
};

type Direction = "left" | "right";

export function Player(props?: Props) {
  const sprite = new Sprite(Texture.WHITE);
  sprite.tint = props?.color ?? generateHexColor();

  const [speed, setSpeed] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>("left");

  sprite.width = 100;
  sprite.height = 200;
  sprite.x = 200;
  sprite.y = 200;

  sprite.interactive = true;
  sprite.on("pointertap", changeSize);

  function changeSize() {
    if (sprite.width === 100) {
      sprite.width = 200;
      sprite.height = 400;
    } else {
      sprite.width = 100;
      sprite.height = 200;
    }
  }

  const newProps = { setSpeed, setDirection };

  return Object.assign(sprite, newProps);
}
