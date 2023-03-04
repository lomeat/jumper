import {
  BitmapFont,
  BitmapText,
  Container,
  Sprite,
  Texture,
  Ticker,
} from "pixi.js";

import { EColors } from "./constants";

export type Props = {
  color: keyof typeof EColors;
  position: [number, number];
  action: () => void;
  title?: string;
  isDisable?: boolean;
  sizes?: [number, number];
  fontSize?: number;
};

export function Button({
  color,
  position,
  action,
  title,
  isDisable = false,
  sizes,
  fontSize,
}: Props) {
  // [init]

  const state = {
    isDisable,
    sizes: sizes ?? [200, 50],
  };

  const container = new Container();
  [container.x, container.y] = position;

  // Button's sprite background
  const sprite = Sprite.from(Texture.WHITE);
  sprite.tint = EColors[color];
  sprite.interactive = true;
  [sprite.width, sprite.height] = state.sizes;
  sprite.on("pointertap", (e) => handleAction(e));

  // Button's text
  BitmapFont.from("arial", {
    fill: "#fff",
    fontFamily: "Arial",
  });
  const text = new BitmapText(title ?? "", {
    fontName: "arial",
    fontSize: fontSize ?? 32,
  });
  [text.x, text.y] = [10, 4];

  // [methods]

  function handleAction(e) {
    action();
  }

  function toggleDisable(value?: boolean) {
    state.isDisable = value ?? !state.isDisable;
  }

  function watchState() {
    if (state.isDisable) {
      sprite.tint = EColors.gray;
      sprite.interactive = false;
    } else {
      sprite.tint = EColors[color];
      sprite.interactive = true;
    }
  }

  // [output]

  Ticker.shared.add(watchState);

  container.addChild(sprite);
  container.addChild(text);

  const newProps = { toggleDisable };

  return Object.assign(container, newProps);
}
