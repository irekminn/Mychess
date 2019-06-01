/*!
 * mychess.js v0.1.0
 *
 * Copyright 2019 Irek Minnegaliev
 * Released under the MIT license
 *
 * Date: 24 May 2019
 */

function drawBoard(){

    //Начальные настройки доски
    var arrLetters = [0,"a","b","c","d","e","f","g","h"]; 
    var arrNumbers = [0,"8","7","6","5","4","3","2","1"]; 
    var block;
    var flag = true; // белая-черная клетка
    //конец настроек

    var board = document.querySelector('.board');   //Выбираем блок куда добавлять доску

    //begin for
    for( let i=0; i<10; i++ ){
        
        for( let j=0; j<10; j++ ){
            
            if( j==0 )
                flag = !flag;   
            
            block = document.createElement('div');
        
            if( flag ) {

                let idBlockBlack = arrLetters[j]+arrNumbers[i]; //Уникальный id черной клетки: a1-b 
                let dataColor = "b";
                let dataActive = "0";                         
                AddAtribut( 'block black', "", idBlockBlack, dataColor, dataActive );    //Задаем id, data-color и data-active черным клеткам
                 
            }else {

                let idBlockWhite = arrLetters[j]+arrNumbers[i]; //Уникальный id белой клетки: a2-w 
                let dataColor = "w";
                let dataActive = "0"; 
                AddAtribut( 'block white', "", idBlockWhite, dataColor, dataActive );    //Задаем id, data-color и data-active белым клеткам
                
            }//end if
                
            
            if( i == 0 && j != 0 ){  //Рисуем верхний блок буквенной нотации

                if ( j != 9 ){

                    AddAtribut( 'block top', arrLetters[j]);  //Задаем верхний блок класса и выводим текст нотации
                }              
            }//end if

            if( j == 0 && i != 0 ){                   //Рисуем левый вертикальный блок цифровой нотации

               if ( i != 9 ){

                   AddAtribut( 'block left', arrNumbers[i]);  //Задаем левый вертикальный блок класса и выводим цифры нотации
               }                  
            }//end if

            if( i==9 && j != 0 ){
                
                if ( j !=9 ){

                    AddAtribut( 'block bottom', arrLetters[j]);   //Задаем нижний блок класса и выводим текст нотации
                }
            }//end if

            if( j == 9 && i != 0 ) {              //Рисуем правый вертикальный блок цифровой нотации

                if ( i != 9 ) {

                    AddAtribut( 'block right', arrNumbers[i]);    //Задаем правый вертикальный блок класса и выводим цифры нотации
                }

            }//end if

            if( i == 0 && j == 0 ){

                AddAtribut( 'block corner');  //Верхний левый угол ставим белую клетку 
            }
                       
            
            if( i == 0 && j == 9 ){

                AddAtribut( 'block corner');  //Верхний правый угол ставим белую клетку
            }
            

            if( i == 9 && j == 0 ){

                AddAtribut( 'block corner');  //Нижний левый угол ставим белую клетку
            }

            
            if( i == 9 && j == 9 ){

                AddAtribut( 'block corner');  //Нижний правый угол ставим белую клетку
            }
            

            //выводим доску
            board.appendChild(block);
            
            //поменял с черного на белое
            flag = !flag;
        }
    }//end for

    //Назначает елементу имя класса, id и data-* значения
    function AddAtribut( className, TextValue, IdName, dataColor, dataActive ){   
 
        
        if ( className === undefined || className == "" ) return;

            else block.className = className;

        
        if ( TextValue === undefined || TextValue == "") block.innerHTML = ""; //Если текста нет, то вставляем пустоту

            else  block.innerHTML = TextValue;

        
        if ( IdName === undefined || IdName == "" ) block.removeAttribute('id');    //Если есть пустой id удаляем его

           else  block.id = IdName;


        if ( dataColor === undefined || dataColor == "" ) block.removeAttribute('data-color');    //Если есть пустой dataColor удаляем его

           else  block.dataset.color = dataColor;


        if ( dataActive === undefined || dataActive == "" ) block.removeAttribute('data-active');    //Если есть пустой data-active удаляем его

           else  block.dataset.active = dataActive;

    };
};
drawBoard();