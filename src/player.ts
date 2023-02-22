import { Sprite, Texture } from "pixi.js";

import { generateHexColor } from "./utils";

type Props = {
  color?: number;
};

export function Player(props?: Props) {
  const sprite = new Sprite(Texture.WHITE);
  sprite.tint = props?.color ?? generateHexColor();

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

  const newProps = {};

  return Object.assign(sprite, newProps);
}
