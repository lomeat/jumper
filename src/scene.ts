import { Container, Sprite, Texture } from "pixi.js";

import { Player } from "./player";
import { Button } from "./button";
import { ColorPalette } from "./color-palette";

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

  const killButton = Button({
    position: [width - 220, 20],
    color: "red",
    action: player.kill,
    title: "Kill",
  });
  const aliveButton = Button({
    position: [width - 220, 90],
    color: "green",
    action: player.alive,
    title: "Alive",
  });

  const colorPalette = ColorPalette({
    action: player.changeColor,
    position: [width - 220, 200],
  });

  // [output]

  container.addChild(player, killButton, aliveButton, colorPalette);

  const newProps = {};

  return Object.assign(container, newProps);
}
