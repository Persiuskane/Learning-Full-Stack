// Namespace
const App = {
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    },

    init() {
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle('hidden')
        });

        App.$.resetBtn.addEventListener("click", (event) => {
            console.log('Reset');
            
        });

        App.$.newRoundBtn.addEventListener("click", (event) => {
            console.log('New Round');
            
        });

    },
}


window.addEventListener('load', App.init);

