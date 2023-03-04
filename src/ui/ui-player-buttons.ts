import { Container, Sprite, Texture } from "pixi.js";

import { Button } from "../button";
import { PlayerInstance } from "../player";
import { ColorPalette } from "../color-palette";

type Props = {
  position: [number, number];
  player: PlayerInstance;
  width: number;
  padding: number;
};

export function UIPlayerButtons({ position, player, width, padding }: Props) {
  // [init]

  const buttonSize: [number, number] = [200, 50];

  const wrapper = new Container();
  [wrapper.x, wrapper.y] = position;

  const container = new Container();
  [container.x, container.y] = [padding, padding];

  const sprite = Sprite.from(Texture.WHITE);
  sprite.tint = 0xf0f3f4;
  [sprite.width, sprite.height] = [width + padding, 300];

  const killButton = Button({
    title: "Kill",
    action: player.kill,
    color: "red",
    position: [0, 0],
    sizes: buttonSize,
  });

  const aliveButton = Button({
    title: "Alive",
    action: player.alive,
    color: "green",
    position: [0, padding + buttonSize[1]],
    sizes: buttonSize,
  });

  const colorPalette = ColorPalette({
    action: player.changeColor,
    position: [0, padding * 2 + buttonSize[1] * 2],
  });

  // [output]

  wrapper.addChild(sprite);
  wrapper.addChild(container);
  container.addChild(killButton, aliveButton, colorPalette);

  return wrapper;
}
