import { Container, Sprite, Texture } from "pixi.js";

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

  function callOutside() {
    console.log("outside");
  }

  container.addChild(background);

  return Object.assign(container, { callOutside });
}
