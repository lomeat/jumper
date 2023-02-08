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
  backgroundColor: 0x000000,
  width: 800,
  height: 600,
});

const scene = new Scene({
  screenHeight: app.screen.height,
  screenWidth: app.screen.width,
});
const sceneContainer = scene.getContainer();

app.stage.addChild(sceneContainer);
