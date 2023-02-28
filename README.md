## What is ready

- **Controls**. Use W/A/S/D to move.
- **State**. Click on player to change his color
- **UI**. Buttons to kill/alive the player

## Architecture

- **Reactive state**. Initial state and game state that updating in real time.
- **Player**. Best example of "how to create game entities". `Player()` creates new instance of `Sprite()` and merge it with new additional methods (`changeColor, setSpeed, ...`). It updates sprite and it's props in real time with subscribes and watchers.
- **Keyboard**. It realizes keyboard handlers for checking when key is downed/released to accurately handling callbacks/actions.
- **Model**. Full typed model-based system.

## Todos

```
// 0-iteration
// * TODO: Make Color Palette
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
```