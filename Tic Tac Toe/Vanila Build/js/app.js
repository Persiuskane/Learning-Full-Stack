import Store from "./store.js";
import View from "./view.js";

// Namespace
const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    model: document.querySelector('[data-id="modal"]'),
    modelTxt: document.querySelector('[data-id="modal-text"]'),
    modelBtn: document.querySelector('[data-id="modal-btn"]'),
    turn: document.querySelector('[data-id="turn"]'),
    turnIcon: document.querySelector('[data-id="turn-icon"]'),
    turntext: document.querySelector('[data-id="turn-text"]'),
  },

  state: {
    moves: [],
  },

  getGameStates(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);
    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));
      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress", // in-progress | complete
      winner, // 1 | 2 | Null
    };
  },

  init() {
    App.registerEventListners();
  },

  registerEventListners() {
    // Done
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    // ToDo
    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset");
    });

    // ToDo
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("New Round");
    });

    App.$.modelBtn.addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.model.classList.toggle("hidden");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        // Check If allready played
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId,
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        // Create a Icon Element Determine the Player
        const icon = document.createElement("i");

        const lastMove = App.state.moves.at(-1);
        getOppersitePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppersitePlayer(lastMove.playerId);

        const nextPlayer = getOppersitePlayer(currentPlayer);
        App.$.turntext.textContent = `Player ${nextPlayer}, you're up!`;

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "turquoise");
          App.$.turnIcon.classList.replace("fa-x", "fa-o");
          App.$.turn.classList.replace("turquoise", "yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "yellow");
          App.$.turnIcon.classList.replace("fa-o", "fa-x");
          App.$.turn.classList.replace("yellow", "turquoise");
        }

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        // App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
        square.replaceChildren(icon);

        console.log(App.state);

        // Check If their a winner or a Tie
        const game = App.getGameStates(App.state.moves);
        if (game.status === "complete") {
          App.$.model.classList.toggle("hidden");
          let msg = "";
          if (game.winner) {
            msg = `player ${game.winner} has won.`;
          } else {
            msg = "Tie! Game";
          }

          App.$.modelTxt.textContent = msg;
        }
      });
    });
  },
};

const players = [
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

  function initView() {
    view.closeAll();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updateScoreBoard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties,
    );
    view.initializeMove(store.game.moves);
  }

  initView();
  window.addEventListener("storage", () => {
    initView();
  });

  view.bindGameResetEvent((event) => {
    store.reset();
    initView();
    console.log(store.stats);
  });

  view.bindNewRoundBtnEvent((event) => {
    store.newRound();
    initView();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMoves = store.game.moves.find(
      (move) => move.squareId === +square.id,
    );

    if (existingMoves) return;
    // console.log(store.game.currentPlayer);

    view.handlePlayerMove(square, store.game.currentPlayer);
    store.playerMove(+square.id);

    if (store.game.status.isComplete) {
      const msg = store.game.status.winner
        ? `${store.game.status.winner.name} has won.`
        : "Tie!";
      view.openModel(msg);
      return;
    }

    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
