import { Container } from "pixi.js";

import { Button } from "./button";
import { EColors } from "./constants";

type Props = {
  action: (color) => void;
  position: [number, number];
};

export function ColorPalette({ action, position }: Props) {
  // [init]

  const container = new Container();
  [container.x, container.y] = position;

  const colors = Object.keys(EColors);

  const buttons = Array.from({ length: 6 }, (_, i) => {
    const color = Object.values(EColors)[i] as keyof typeof EColors;

    return Button({
      color,
      action: () => action(color),
      position: [i > 2 ? (i - 3) * 30 : i * 30, i > 2 ? 30 : 0],
      sizes: [20, 20],
    });
  });

  // [output]

  container.addChild(...buttons);

  return container;
}
