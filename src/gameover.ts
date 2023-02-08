import { TextStyle, Text, Container, Graphics } from "pixi.js";

export function GameOver({ restartClick }) {
  const gameOver = new Container();
  const textStyle = new TextStyle({
    fontSize: 80,
    fill: 0xff0000,
  });
  const text = new Text("Game Over!", textStyle);
  const rectangle = new Graphics();

  rectangle.beginFill(0xffffff);
  rectangle.lineStyle({ width: 2, color: 0x000000 });
  rectangle.drawRect(text.width / 2 - 100, text.height + 20, 200, 50);
  rectangle.endFill();
  rectangle.interactive = true;
  rectangle.on("pointertap", restartClick);

  const restartText = new Text("Restart");
  restartText.position.set(
    text.width / 2 - restartText.width / 2,
    text.height + 30
  );
  rectangle.addChild(restartText);

  gameOver.addChild(text);
  gameOver.addChild(rectangle);

  return { gameOver };
}
