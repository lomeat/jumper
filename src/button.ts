import { BitmapFont, BitmapText, Container, Sprite, Texture } from "pixi.js";

import { EColors } from "./constants";

type Props = {
  color: keyof typeof EColors;
  position: [number, number];
  action: () => void;
  title: string;
};

export function Button({ color, position, action, title }: Props) {
  // [init]

  const container = new Container();
  [container.x, container.y] = position;

  const sprite = Sprite.from(Texture.WHITE);
  sprite.tint = EColors[color];
  sprite.interactive = true;
  sprite.width = 200;
  sprite.height = 50;
  sprite.on("pointertap", (e) => handleAction(e));

  BitmapFont.from("arial", {
    fill: "#fff",
    fontFamily: "Arial",
    fontSize: 32,
  });
  const text = new BitmapText(title, {
    fontName: "arial",
  });
  [text.x, text.y] = [10, 4];

  // [methods]

  function handleAction(e) {
    // Just to debug button's action
    console.log(`${title} button clicked`);
    action();
  }

  // [output]

  container.addChild(sprite);
  container.addChild(text);

  return container;
}
