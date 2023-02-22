import { Container, DisplayObject, Sprite, Texture } from "pixi.js";

import { generateHexColor } from "./utils";

type Props = {
  sizes: [number, number];
};

export function Scene({ sizes }: Props) {
  const container = new Container();
  const [width, height] = sizes;

  const background = new Sprite(Texture.WHITE);
  background.width = width;
  background.height = height;
  background.interactive = true;
  background.on("pointertap", randomBackground);

  function randomBackground() {
    const color = parseInt(generateHexColor());
    background.tint = color;
  }

  function callOutside() {
    console.log("outside");
  }

  container.addChild(background);

  return Object.assign(container, { callOutside });
}
