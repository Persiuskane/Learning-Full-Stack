export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuBtn = this.#qs('[data-id="menu-button"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.model = this.#qs('[data-id="modal"]');
    this.$.modelTxt = this.#qs('[data-id="modal-text"]');
    this.$.modelBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');
    this.$.grid = this.#qs('[data-id="grid"]');
    // this.$.turnIcon = this.#qs('[data-id="turn-icon"]');
    // this.$.turntext = this.#qs('[data-id="turn-text"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // Ui Only Event Listners
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  render(stats, game) {
    const { playerWithStats, ties } = stats;
    const {
      moves,
      currentPlayer,
      status: { isComplete, winner },
    } = game;

    this.#closeAll();
    this.#clearMoves();
    this.#updateScoreBoard(
      playerWithStats[0].wins,
      playerWithStats[1].wins,
      ties,
    );
    this.#initializeMove(moves);
    if (isComplete) {
      const msg = winner ? `${winner.name} has won.` : "Tie!";
      this.#openModel(msg);
      return;
    }
    this.#setTurnIndicator(currentPlayer);
  }

  /**
   * Register All Utility Methods
   */

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modelBtn.addEventListener("click", handler);
  }

  bindNewRoundBtnEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.#delegate(this.$.grid, '[data-id="square"]', "click", handler);
  }

  /**
   * DOM Helper Methods
   */

  #updateScoreBoard(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins} wins`;
    this.$.p2Wins.innerText = `${p2Wins} wins`;
    this.$.ties.innerText = `${ties}`;
  }

  #openModel(msg) {
    this.$.model.classList.remove("hidden");
    this.$.modelTxt.textContent = msg;
  }

  #closeAll() {
    this.#closeModel();
    this.#closeMenu();
  }

  #clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  #initializeMove(moves) {
    this.$$.squares.forEach((square) => {
      const existingMoves = moves.find((move) => move.squareId === +square.id);

      if (existingMoves) {
        this.#handlePlayerMove(square, existingMoves.player);
      }
    });
  }

  #closeModel() {
    this.$.model.classList.add("hidden");
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");
    const icon = this.#qs("i", this.$.menu);

    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");
    const icon = this.#qs("i", this.$.menu);

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  #setTurnIndicator(player) {
    const turn = this.$.turn;
    const turnIcon = document.createElement("i");
    const turnText = document.createElement("p");

    turnIcon.classList.add("fa-solid", player.iconClass, player.colorClass);
    turnText.classList.add(player.colorClass);

    turnText.innerText = `${player.name}, you're up!`;

    turn.replaceChildren(turnIcon, turnText);
  }

  #handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!el) throw new Error("Could not find elements");
    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);
    if (!elList) throw new Error("Could not find elements");
    return elList;
  }

  #delegate(el, selector, eventKey, handler) {
    el.addEventListener(eventKey, (event) => {
      if (event.target.matches(selector)) {
        handler(event.target);
      }
    });
  }
}
