import { Application } from "pixi.js";

import { Scene } from "./scene";
import { Player } from "./player";

// [init]

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x000000,
  width: 800,
  height: 600,
});

// [main]

const scene = Scene({ sizes: [app.screen.width, app.screen.height] });
scene.callOutside();

const player = Player();

scene.addChild(player);

app.stage.addChild(scene);
