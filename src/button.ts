import { BitmapFont, BitmapText, Container, Sprite, Texture } from "pixi.js";

export function Button({ color, position, action, title }) {
  const container = new Container();
  [container.x, container.y] = position;

  const sprite = Sprite.from(Texture.WHITE);
  sprite.tint = color;
  sprite.interactive = true;
  sprite.width = 200;
  sprite.height = 50;
  sprite.on("pointertap", (e) => action(e));

  BitmapFont.from("arial", {
    fill: "#fff",
    fontFamily: "Arial",
    fontSize: 32,
  });
  const text = new BitmapText(title, {
    fontName: "arial",
  });
  [text.x, text.y] = [10, 4];

  container.addChild(sprite);
  container.addChild(text);

  return container;
}
