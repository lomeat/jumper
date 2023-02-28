import { Ticker } from "pixi.js";

type KeyboardState = {
  key: string;
  isDown: boolean;
};

type KeyboardProps = {
  key: string;
  action: (dt) => void;
};

export function KeyboardController(props: KeyboardProps) {
  const state: KeyboardState = {
    key: props.key,
    isDown: false,
  };

  function handleDown(e) {
    if (e.key === state.key) {
      if (!state.isDown && props.action) {
        Ticker.shared.add(props.action);
      }
      state.isDown = true;
      e.preventDefault();
    }
  }

  function handleUp(e) {
    if (e.key === state.key) {
      if (state.isDown && props.action) {
        Ticker.shared.remove(props.action);
      }
      state.isDown = false;
      e.preventDefault();
    }
  }

  function unsubscribe() {
    window.removeEventListener("keydown", handleDown);
    window.removeEventListener("keyup", handleUp);
    Ticker.shared.remove(props.action);
  }

  function subscribe() {
    window.addEventListener("keydown", handleDown, false);
    window.addEventListener("keyup", handleUp, false);
  }

  subscribe();

  return { ...state, unsubscribe, subscribe };
}
