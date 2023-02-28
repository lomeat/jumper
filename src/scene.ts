import { Container, Sprite, Texture } from "pixi.js";

import { Player } from "./player";
import { Button } from "./button";

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

  const killButton = Button({
    position: [width - 220, 20],
    color: 0xb54020,
    action: player.kill,
    title: "kill",
  });
  const aliveButton = Button({
    position: [width - 220, 90],
    color: 0x57bf73,
    action: player.alive,
    title: "reset",
  });

  // [output]

  container.addChild(player, killButton, aliveButton);

  const newProps = {};

  return Object.assign(container, newProps);
}
