// --- What should do

// 0-iteration
// * TODO: Make Color Palette
// TODO: Change player's color by color buttons palette
// TODO: Observer sub to act with player and change button's color at one place
// TODO: Observer handlers (action-types)

// 1st iteration
// TODO: Make player sprite from tileset
// TODO: Change player sprite by direction
// TODO: Animate player's movements

// 2+ iterations
// TODO: Add background tiles with grass
// TODO: Add parallax camera when moving
// TODO: Add objects on the 'map'

// ---

import { Application, settings } from "pixi.js";

import { Scene } from "./scene";

// [init]

settings.RESOLUTION = 1;

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

// ------
