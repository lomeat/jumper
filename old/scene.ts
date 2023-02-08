import { Container, Sprite, Texture, Ticker } from "pixi.js";

import { Player } from "./player";
import { Rock } from "./rock";
import { Score } from "./score";
import { GameOver } from "./gameover";

import { checkCollision } from "../src/utils";

type Props = {
  screenSizes: [Screen["width"], Screen["height"]];
};

export function Scene({ screenSizes }: Props) {
  // Init

  const container = new Container();
  const [screenWidth, screenHeight] = screenSizes;

  const {
    player,
    playerIsDead,
    playerInteract,
    initPlayer,
    setPlayerVelocity,
  } = Player({
    screenSizes,
    velocity: 10,
    direction: "right",
  });
  const { rock, rockFall, setRockVelocity } = Rock({ screenSizes });
  const { score, incScore, resetScore } = Score();
  const { gameOver } = GameOver({ restartClick: restartGame });

  const background = new Sprite(Texture.WHITE);
  background.width = screenWidth;
  background.height = screenHeight;
  background.interactive = true;
  background.on("pointertap", playerInteract);

  // Funcs

  function isRockFell(delta) {
    rockFall(delta);

    if (rock.y >= screenSizes[1] + 100) {
      rock.y = -100;
      return true;
    }

    return false;
  }

  function scoring(delta) {
    if (isRockFell(delta)) {
      incScore();
    }

    if (checkCollision(player, rock)) {
      playerIsDead();
      setRockVelocity(0);
      container.addChild(gameOver);
    }
  }

  function restartGame() {
    init();
    setRockVelocity(10);
    initPlayer();
    resetScore(0);
    container.removeChild(gameOver);
  }

  function init() {
    player.x = -player.width;
    player.y = screenHeight - 100;

    rock.x = 100;
    rock.y = -100;
  }

  // Body

  init();

  score.x = screenSizes[0] - score.width * 2 - 10;

  gameOver.x = screenWidth / 2 - gameOver.width / 2;
  gameOver.y = screenHeight / 2 - gameOver.height / 2;

  Ticker.shared.add(scoring);

  container.addChild(background);
  container.addChild(player);
  container.addChild(rock);
  container.addChild(score);

  return { scene: container };
}
