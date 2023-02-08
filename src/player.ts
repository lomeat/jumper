import { Sprite, Texture } from "pixi.js";

export class Player extends Sprite {
  velocity = 0;
  direction = "right";

  constructor() {
    super(Texture.WHITE);
    this.tint = 0x000000;
    this.x = 100;
    this.y = 200;
    this.width = 40;
    this.height = 80;
  }

  setVelocity(newVelocity: number) {
    this.velocity = newVelocity;
  }

  get sprite() {
    return this;
  }
}
