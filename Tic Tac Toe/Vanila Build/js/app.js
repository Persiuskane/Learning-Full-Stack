// Namespace
const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  state: {
    currentPlayer: 1,
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

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`Clicked ${event.target.id}`);
        console.log(`Current Player is ${App.state.currentPlayer}`);

        if (square.hasChildNodes()) {
          return;
        }
        const icon = document.createElement("i");

        if (App.state.currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "turquoise");
        } else {
          icon.classList.add("fa-solid", "fa-o", "yellow");
        }

        App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;
        square.replaceChildren(icon);

        // <i class="fa-solid fa-x turquoise"></i>
        // <i class="fa-solid fa-o yellow"></i>
      });
    });
  },
};

window.addEventListener("load", App.init);
