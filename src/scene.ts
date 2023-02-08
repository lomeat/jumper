import { Container, Sprite, Texture, Ticker } from "pixi.js";

import { generateHexColor } from "./utils";

type Props = {
  screenWidth: number;
  screenHeight: number;
  background?: number;
};

export class Scene {
  private background?: number;
  private width: number;
  private height: number;

  private container = new Container();
  private backgroundSprite = new Sprite(Texture.WHITE);

  constructor({ screenHeight, screenWidth, background }: Props) {
    this.height = screenHeight;
    this.width = screenWidth;

    this.backgroundSprite.width = this.width;
    this.backgroundSprite.height = this.height;

    if (background) {
      this.background = background;
      this.backgroundSprite.tint = this.background;
    }

    this.backgroundSprite.interactive = true;
    this.backgroundSprite.on("pointertap", () =>
      // this.changeBackground(0xff0000)
      this.randomBackground()
    );

    this.container.addChild(this.backgroundSprite);
  }

  changeBackground(newBackground: number) {
    this.background = newBackground;
    this.backgroundSprite.tint = this.background;
  }

  randomBackground() {
    this.background = parseInt(generateHexColor());
    this.backgroundSprite.tint = this.background;
  }

  getContainer() {
    return this.container;
  }
}
