import {
  BitmapFont,
  BitmapText,
  Container,
  Sprite,
  Texture,
  Ticker,
} from "pixi.js";

import { EColors } from "./constants";

type Props = {
  color: keyof typeof EColors;
  position: [number, number];
  action: () => void;
  title: string;
  isDisable?: boolean;
};

export function Button({ color, position, action, title, isDisable }: Props) {
  // [init]

  const state = {
    isDisable: isDisable ?? false,
  };

  const container = new Container();
  [container.x, container.y] = position;

  // Button's sprite background
  const sprite = Sprite.from(Texture.WHITE);
  sprite.tint = EColors[color];
  sprite.interactive = true;
  sprite.width = 200;
  sprite.height = 50;
  sprite.on("pointertap", (e) => handleAction(e));

  // Button's text
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

// 1. button (player action) -> button disable, player action
// 2. button (player action, disable) -> button active, player action
