define(['base/component', 'component/gamePage/gamePage', 'css!component/startPage/start.css'], (Component , Game) => {
	'use strict';
    class startPage extends Component {
        render() {
            return `<div class="wrapper">
                        <div class="wrapper__title">
                            Добро пожаловать в игру крестики нолики!
                        </div>
                        <div class="wrapper__content">
                            <form>
                                <p>Введите Ваше имя:</p>
                                <p><input type="text" class='wrapper__content_name'></p>
                                <button class="wrapper__content_start">
                                    <a>Запустить игру</a>
                                </button>
                            </form>
                        </div>
                    </div>`;
        }

        afterRender() {
            document.querySelector('.wrapper__content_start').addEventListener('click', this.loadingGame);
        }

        loadingGame() {
            let name = document.querySelector(".wrapper__content_name");
            if (name.value !== "") {
                window.location.href = `./index.html?name=${name.value}`;
                let game = new Game();
                document.body.innerHTML = game;
                game.afterRender();
            }
        }
    }
    return startPage;
});