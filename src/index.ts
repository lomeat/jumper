import {
  Application,
  Sprite,
  Container,
  TextStyle,
  Text,
  BitmapText,
  BitmapFont,
  ParticleContainer,
  Texture,
} from "pixi.js";

import { Scene } from "./scene";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0xffffff,
  width: 800,
  height: 600,
});

const { scene } = Scene({
  screenSizes: [app.screen.width, app.screen.height],
});

app.stage.addChild(scene);
