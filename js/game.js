/*!
 * mychess.js v0.0.1
 *
 * Copyright 2019 Irek Minnegaliev
 * Released under the MIT license
 *
 * Date: 24 May 2019
 */
// Начальные настройки игры
var emptyPosition = '8/8/8/8/8/8/8/8 w - - 0 1';    // Начальная позиция фигур для игры -- пустая доска
var chess = new Chess(emptyPosition);   // Создаем игру
// конец настроек
// Ловим клик по блоку    
function clickBlock(){    
    //Ловим клики по board. Обработчик => showSquare
    document.addEventListener('click', showSquare );      
};//end clickBlock 
// обработчик
function showSquare(e){

    var blockId;
    e = e || event;     //ie style
    //Если клик не по блоку выходим
    if (!e.target.classList.contains('block')) return ;
    //Если нет id блока, то не тот блок, выходим  
    if ( e.target.id === undefined || e.target.id == "") return;    
    //Получен id блока и записан в this
    blockId = e.target.id;  
    this.blockId = blockId;
    //Рисуем ходы фигур  
    newPiece(chess, this.blockId ); 
};//end ShowSquare
// Непосредственно функция подсветки клеток  
function greySquare(square, blockId) {     
        //Ставим клеткам data-active в 2. Красим ходы
        document.querySelector('#'+square).dataset.active = 2;
        //Ставим клеткам data-active в 1. Красим клетку под курсором               
        document.querySelector('#'+blockId).dataset.active = 1;             

};//end greySquare()
// Возврат цвета по default
function defaultColor(Selector, value){     

    var allSelector = document.querySelectorAll('['+Selector+']');

    for (var i = 0; i < allSelector.length; i++) {

        allSelector[i].setAttribute(Selector, value);
    }
};//end DefaultColor
// Вся логика тут
function newPiece( chess, blockId, piece ){            
    
    let type;   // Фигура n -- конь, p -- пешка и т.д
    let color;  // Цвет фигуры
    let moves;  // Возможные ходы из chess
    let allPos = [];    // Коробка для возможных ходов
    // Фигура не пришла, значит первый клик по доске либо продолжение
    if ( piece === undefined || piece == "") {      
        // Вытаскиваем всю позицию в формате Forsyth–Edwards_Notation
        let fen = chess.fen();  
        // Смотрим на доску есть ли фигура
        if( checkPiece(fen) ) {               

                type = this.type;
                color = this.color; 

        } else {
                // Первый клик, берем белого белого     
                type = 'n';     
                color = 'w'   
                
                }               

    } else {    // Новая фигура пришла                            
            
            color = piece[0];               
            type = piece[1];  
        }
    // На случай если не пришло id клетки
    if ( blockId === undefined || blockId == "") blockId = this.blockId;
    if ( blockId === undefined || blockId == "") blockId = 'd4';     
    // Чистим доску
    chess.clear();                                                          
    // Очередность хода в соответствии с цветом фигуры через редактирование позиции (fen)
    let tokens = chess.fen().split(' '); 
    tokens[1] = color;
    chess.load (tokens.join(' '));
    // Фигуру на доску нижний регистр названию
    type = type.toLowerCase();
    chess.put({ type: type, color: color }, blockId);
    // Все возможные ходы                          
    moves = chess.moves({ square: blockId, verbose: true, legal: true });   
    // Клеткам цвет default перед новым закрашиванием
    defaultColor( 'data-active', 0 );               

    // Нет ходов - выйти
    if (moves.length === 0) return;                     
            // Перебираем ходы         
            for (var i = 0; i < moves.length; i++) {    
                    // Костыль для пешек на последней линии
                    if (type == 'p' && moves[i].to.split('').length == 1 ) moves[i].to = moves[i].from;     
                    // Подсветить поля, куда можно ходить
                    greySquare(moves[i].to, blockId);
                    // Все ходы без повторов
                    if ( i == 0 ) {

                        allPos.push(moves[i].to);

                    } else if ( allPos[i-1] === undefined || allPos[i-1] == moves[i].to ) continue;

                        else allPos.push(moves[i].to);
            }
    // Массив в контекст
    this.allPos = allPos;
    // Вывод возможных позиций
    Listener.showPossition( true, this.allPos, blockId, type, color );
};//end NewPiece
// Проверка позицию на наличие фигуры
function checkPiece (fen) {

    if ( /[qkpnrb]/i.test(fen) ) {          
        // Регистрозависимый поиск Флаг g -- возврат обычного массива или null
        if ( fen.match(/[QKPNRB]/g) != null ) { 
            
            color = 'w';           
            type = fen.match(/[QKPNRB]/g);
            type = type[0].toLowerCase();

        } else {

            color = 'b';           
            type = fen.match(/[qkpnrb]/g);
            type = type[0];
        }

            this.color = color;
            this.type = type; 

            return true;
    }       
    return false;
};//end checkPiece

clickBlock();