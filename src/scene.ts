import { Container, Sprite, Texture } from "pixi.js";

import { Player } from "./player";

type Props = {
  sizes: [number, number];
};

export function Scene({ sizes }: Props) {
  // [init]

  const container = new Container();
  const [width, height] = sizes;

  // Background

  const background = new Sprite(Texture.WHITE);
  background.width = width;
  background.height = height;

  container.addChild(background);

  // [main]

  const player = Player({ sizes: [80, 120] });

  setInterval(() => {
    player.kill();
  }, 5000);

  container.addChild(player);

  // [output]

  const newProps = {};

  return Object.assign(container, newProps);
}
