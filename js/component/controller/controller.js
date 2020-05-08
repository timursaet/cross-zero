/*
    Обработчик игры
*/

define(() => {
	'use strict';
    class gamePage {

        constructor() {
            this.elem = {};
            this.arr = [];
            this.arr_X = [];
            this.arr_O = [];
        };

        /*
            Поиск и создание элементов
        */

       init() {
            this.elem.table = document.querySelectorAll('.wrapper__field_cell');
            this.elem.infoHod = document.querySelector('.info__hod');
            this.elem.field_log = document.querySelector('.wrapper__field_log');
            this.elem.info__series = document.querySelector('.info__series p span');
            this.elem.score_computer = document.querySelector('.info__score_computer');
            this.elem.score_player = document.querySelector('.info__score_player');

            this.elem.table.forEach((cell) => {
                this.elem.infoHod.innerHTML = 'Ваш ход!';
                cell.addEventListener('click', () => {
                    this.elem.infoHod.innerHTML = 'Компьютер думает!';
                    if (cell.innerHTML == '') {
                    
                        cell.innerHTML = 'X';
                    let id_cell = parseInt(cell.getAttribute('id'));
                        this.arr.push(id_cell);
                        this.arr_X.push(id_cell);

                        let v = this.checkVictory(this.arr_X,  new URLSearchParams(window.location.search).get('name'));
        
                        if(this.arr_X.length != 0 && this.arr.length < 8) {
                            this.computer();
                            
                        } 

                        if(this.arr.length == 9 && v != 1) {
                            this.noneVictory();
                        }
                    } 
                })
            })
        
       }

        /*
         * Проверка победных комбинаций
         */

        checkVictory(metka, user) {

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
                    this.elem.field_log.innerHTML = ("Победил " + user);
                    this.elem.field_log.style.display = 'block';
                    this.victoryBegin(user);
                }
        
                if (st1 == 3 || st2 == 3 || st3 == 3) {
                    this.elem.field_log.innerHTML = ("Победил " + user);
                    this.elem.field_log.style.display = 'block';
                    this.victoryBegin(user);
                }
        
                if (d1 == 3 || d2 == 3) {
                    this.elem.field_log.innerHTML = ("Победил " + user);
                    this.elem.field_log.style.display = 'block';
                    this.victoryBegin(user);
                }
        
                if (srt1 == 3 || srt2 == 3 || srt3 == 3 || st1 == 3 || 
                    st2 == 3 || st3 == 3 || d1 == 3 || d2 == 3) {
                        return 1;
                }     
        }

        /*
            Если случилось победа
        */

        victoryBegin(user){
            setTimeout(() => {
               //Скрываем блок победы
               this.elem.field_log.style.display = 'none';
               this.elem.table.forEach(cell => cell.innerHTML = '');
               // Подчитываем серию
               let count = parseInt(this.elem.info__series.innerHTML);
               count++;
               this.elem.info__series.innerHTML = count;
       
               if (user == 'Компьютер') {
                   let count = parseInt(this.elem.score_computer.innerHTML);
                   count++;
                   this.elem.score_computer.innerHTML = count;  
               } else {
                   let count = parseInt(this.elem.score_player.innerHTML);
                   count++;
                   this.elem.score_player.innerHTML = count; 
               }
       
               this.arr.length = [], this.arr_X = [], this.arr_O = [];
       
            }, 1000);
        }

        /*
         Ход компьютера
        */ 

        computer() {
            let generateNumber, flag = false;
        
            while(true) {
                if (this.arr.length == 9) {
                    this.noneVictory();
                }
        
                generateNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        
                for (let i = 0; i < this.arr.length; i++) {
                    if(generateNumber == this.arr[i]) {
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
            
             this.elem.table.forEach((cell, index) => {
                    if (index == generateNumber-1) {
                        
                        setTimeout(() => {
                            this.elem.infoHod.innerHTML = 'Ваш ход!'
                        cell.innerHTML = '0';
                        },1000);
                    }
                });

            this.arr.push(generateNumber);
            this.arr_O.push(generateNumber);
            this.checkVictory(this.arr_O, "Компьютер");

        }

        /*
            Обработчик ничьи
        */

        noneVictory() {
            
            setTimeout(() => {
                this.elem.field_log.innerHTML = 'Ничья';
                this.elem.field_log.style.display = 'block';
            }, 500);  
        
            setTimeout(() => {
                this.elem.field_log.style.display = 'none';
                this.elem.table.forEach(cell => cell.innerHTML = '');
        
                // Подчитываем серию
                let count = parseInt(this.elem.info__series.innerHTML);
                count++;
                this.elem.info__series.innerHTML = count;
        
                this.arr.length = 0;
                this.arr_X.length = 0;
                this.arr_O.length = 0;
        
            }, 1000);  
        
        }
        
    }

    const gameLoad = new gamePage();
    return gameLoad;

});