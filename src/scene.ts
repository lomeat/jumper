import { Container, Sprite, Texture } from "pixi.js";

import { Player } from "./player";
import { UIPlayerButtons } from "./ui/ui-player-buttons";

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

  const player = Player({
    sizes: [80, 120],
    position: [width / 2, height / 2],
  });

  const uiPlayerButtons = UIPlayerButtons({
    width: 240,
    padding: 20,
    position: [width - 240, 0],
    player,
  });

  // [output]

  container.addChild(player);
  container.addChild(uiPlayerButtons);

  const newProps = {};

  return Object.assign(container, newProps);
}
