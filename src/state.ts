type State = {
  player: {
    isAlive: boolean;
    velocity: number;
    direction: "left" | "right";
    state: "alive" | "dead";
  };

  rock: {
    velocity: number;
  };

  isGameOver: boolean;
};

const initState = {
  player: {
    velocity: 10,
    direction: "right",
    isAlive: true,
  },
};

export let state = { ...initState };
