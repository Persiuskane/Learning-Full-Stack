import Store from "./store.js";
import type { Player } from "./types.js";
import View from "./view.js";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-game", players);

  store.addEventListener("stateChange", () => {
    view.render(store.stats, store.game);
  });

  // New reload render the Screen
  view.render(store.stats, store.game);

  // Multiple tab consistency
  window.addEventListener("storage", () => {
    view.render(store.stats, store.game);
  });

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundBtnEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMoves = store.game.moves.find(
      (move) => move.squareId === +square.id,
    );

    if (existingMoves) return;

    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
