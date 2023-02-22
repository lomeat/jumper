import { Container, Sprite, Texture } from "pixi.js";

import { Player } from "./player";

type Props = {
  sizes: [number, number];
};

export function Scene({ sizes }: Props) {
  const container = new Container();
  const [width, height] = sizes;

  // Background

  const background = new Sprite(Texture.WHITE);
  background.width = width;
  background.height = height;

  container.addChild(background);

  // [main]

  const player = Player();
  player.setSpeed(10);

  container.addChild(player);

  // End

  const newProps = {};

  return Object.assign(container, newProps);
}
