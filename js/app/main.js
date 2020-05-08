'use strict';

require(['component/startPage/startPage', 'component/gamePage/gamePage','component/controller/controller'], (Start, Game, Controller) => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if(!urlParams.has('name')){
        let start = new Start();
        document.body.innerHTML = start;
        start.afterRender();
    } else {
        let game = new Game();
        document.body.innerHTML = game;
        Controller.init();
        game.afterRender();
    }
});