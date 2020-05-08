/*
    Главная страница
*/

define(['base/component', 'css!component/gamePage/game.css'], (Component) => {
	'use strict';
    class gamePage extends Component {

        constructor() {
            super();
        }

        render() {
            return ` 
                <div class="wrapper">
                    <div class="wrapper__info info">
                        <div class="info__series">
                            <p>Серия <span>1</span></p>
                        </div>  
                        <div class="info__score">
                            Компьютер 
                            <span class="info__score_computer">0</span> - <span class="info__score_player">0</span>  
                            ${new URLSearchParams(window.location.search).get('name')}
                        </div>
                        <div class="info__hod"></div>                  
                    </div>
                    <div class="wrapper__field">
                        <div class="wrapper__field_log"></div>

                        <div class="wrapper__field_cell" id="1"></div>
                        <div class="wrapper__field_cell" id="2"></div>
                        <div class="wrapper__field_cell" id="3"></div>
                
                        <div class="wrapper__field_cell" id="4"></div>
                        <div class="wrapper__field_cell" id="5"></div>
                        <div class="wrapper__field_cell" id="6"></div>
                
                        <div class="wrapper__field_cell" id="7"></div>
                        <div class="wrapper__field_cell" id="8"></div>
                        <div class="wrapper__field_cell" id="9"></div>

                    </div>

                    <button class='wrapper_button'>Начать заново</button>            
                </div>`;
        }
        
        afterRender() {
            document.querySelector(".wrapper_button").addEventListener("click", this.reloadGame);
        }

        reloadGame() {
          window.location.reload();
        }  

    }

    return gamePage;

});