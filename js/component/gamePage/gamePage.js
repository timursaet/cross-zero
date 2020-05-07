define(['base/component', 'component/startPage/startPage', 'css!component/gamePage/game.css'], (Component, startPage) => {
	'use strict';
    class gamePage extends Component {
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
            document.querySelector(".wrapper_button").addEventListener("click", this.startPage);
            this.gameStart();
        }

        startPage() {
          window.location.reload();
        }

        gameStart() {
            const table = document.querySelectorAll('.wrapper__field_cell');
            const infoHod = document.querySelector('.info__hod');
               table.forEach((cell) => {
                    cell.addEventListener('click', () => {
                        infoHod.innerHTML = 'Компьютер думает!';
                        if (cell.innerHTML == '') {
                           
                            cell.innerHTML = 'X';
                        let id_cell = parseInt(cell.getAttribute('id'));
                            arr.push(id_cell);
                            arr_X.push(id_cell);

                            let v = this.checkVictory(arr_X,  new URLSearchParams(window.location.search).get('name'));
            
                            if(arr_X.length != 0 && arr.length < 8) {
                                this.computer();
                                
                            } 

                            if(arr.length == 9 && v != 1) {
                                this.noneVictory();
                            }
                        } 
                    })
                })
        }

        checkVictory(metka, user) {
            const field_log = document.querySelector('.wrapper__field_log');

            let srt1 = 0, srt2 = 0, srt3 = 0, st1 = 0, st2 = 0, st3 = 0; 
        
            let d1 = 0, d2 = 0; 
        
                for (let i = 0; i < metka.length; i++){
                    switch(metka[i]) {
                        case 1: { srt1++; st1++; d1++; break; }
                        case 2: { srt1++; st2++; break; }
                        case 3: { srt1++; st3++; d2++; break; }
                        case 4: { srt2++; st1++; break; }
                        case 5: { srt2++; st2++; d1++; d2++;  break; }
                        case 6: { srt2++; st3++; break; }
                        case 7: { srt3++; st1++; d2++; break; }
                        case 8: { srt3++; st2++; break; }
                        case 9: { srt3++; st3++; d1++;break; }
                    }
                }
        
                if (srt1 == 3 || srt2 == 3 || srt3 == 3) {
                    field_log.innerHTML = ("Победил " + user);
                    field_log.style.display = 'block';
                    this.victoryBegin(user);
                }
        
                if (st1 == 3 || st2 == 3 || st3 == 3) {
                    field_log.innerHTML = ("Победил " + user);
                    field_log.style.display = 'block';
                    this.victoryBegin(user);
                }
        
                if (d1 == 3 || d2 == 3) {
                    field_log.innerHTML = ("Победил " + user);
                    field_log.style.display = 'block';
                    this.victoryBegin(user);
                }
        
                if (srt1 == 3 || srt2 == 3 || srt3 == 3 || st1 == 3 || 
                    st2 == 3 || st3 == 3 || d1 == 3 || d2 == 3) {
                        return 1;
                }     
        }

        victoryBegin(user){
            const table = document.querySelectorAll('.wrapper__field_cell');
            const field_log = document.querySelector('.wrapper__field_log'); 
            const info__series = document.querySelector('.info__series p span');
            const score_computer = document.querySelector('.info__score_computer');
            const score_player = document.querySelector('.info__score_player');
            setTimeout(() => {
               //Скрываем блок победы
               field_log.style.display = 'none';
               table.forEach(cell => cell.innerHTML = '');
               // Подчитываем серию
               let count = parseInt(info__series.innerHTML);
               count++;
               info__series.innerHTML = count;
       
               if (user == 'Компьютер') {
                   let count = parseInt(score_computer.innerHTML);
                   count++;
                   score_computer.innerHTML = count;  
               } else {
                   let count = parseInt(score_player.innerHTML);
                   count++;
                   score_player.innerHTML = count; 
               }
       
               arr.length = [], arr_X = [], arr_O = [];
       
            }, 1000);
        }

        computer() {
            const table = document.querySelectorAll('.wrapper__field_cell');
            const infoHod = document.querySelector('.info__hod');
            let generateNumber, flag = false;
        
            while(true) {
                if (arr.length == 9) {
                    this.noneVictory();
                }
        
                generateNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        
                for (let i = 0; i < arr.length; i++) {
                    if(generateNumber == arr[i]) {
                        flag = true;
                    }      
                }
                if(flag == false) {
                    break;
                }
                else {
                    flag = false;
                    continue;
                }
            }
            
             table.forEach((cell, index) => {
                    if (index == generateNumber-1) {
                        
                        setTimeout(() => {
                            infoHod.innerHTML = 'Ваш ход!'
                        cell.innerHTML = '0';
                        },1000);
                    }
                });

            arr.push(generateNumber);
            arr_O.push(generateNumber);
            this.checkVictory(arr_O, "Компьютер");

        }

        noneVictory() {
            const table = document.querySelectorAll('.wrapper__field_cell');
            const field_log = document.querySelector('.wrapper__field_log');
            const info__series = document.querySelector('.info__series p span'); 
            
            setTimeout(() => {
                field_log.innerHTML = 'Ничья';
                field_log.style.display = 'block';
            }, 500);  
        
            setTimeout(() => {
                field_log.style.display = 'none';
                table.forEach(cell => cell.innerHTML = '');
        
                // Подчитываем серию
                let count = parseInt(info__series.innerHTML);
                count++;
                info__series.innerHTML = count;
        
                arr.length = 0;
                arr_X.length = 0;
                arr_O.length = 0;
        
            }, 1000);  
        
        }
        
    }

    return gamePage;
});