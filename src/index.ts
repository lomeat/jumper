// TODO: Make player sprite from tileset
// TODO: Change player sprite by direction
// TODO: Animate player's movements

import { Application } from "pixi.js";

import { Scene } from "./scene";

// [init]

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x000000,
  width: 1000,
  height: 800,
});

// [render]

const scene = Scene({ sizes: [app.screen.width, app.screen.height] });

app.stage.addChild(scene);
