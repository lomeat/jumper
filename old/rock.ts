import { Graphics, RenderTexture, Sprite, Ticker } from "pixi.js";

type Props = {
  screenSizes: number[];
};

export function Rock({ screenSizes }: Props) {
  const state = {
    velocity: 10,
  };

  function rockFall(delta) {
    rock.y = rock.y + state.velocity * delta;
  }

  function setRockVelocity(n: number = 0) {
    state.velocity = n;
  }

  const rock = new Graphics();
  rock.beginFill(0x000000);
  rock.lineStyle(1);
  rock.drawCircle(100, 100, 10);
  rock.endFill();

  return { rock, rockFall, setRockVelocity };
}
