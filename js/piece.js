/*!
 * piece.js v0.0.1
 *
 * Copyright 2019 Irek Minnegaliev
 * Released under the MIT license
 *
 * Date: 25 May 2019
 */
function showPieceBoard(){
	// Массив для фигур. wK - белы король, bN - черны конь и т.д.
	var piece = [	
					['wK', 'wQ', 'wR', 'wB', 'wN', 'wP'],  
					['bK', 'bQ', 'bR', 'bB', 'bN', 'bP']
				];
	// Flag select
	var select = 0;
	// source folder				
	var imgFolder = "img/";	
	// Выбираем блок для фигур
	var pieceBlock = document.querySelector('.piece');   

	// begin for
	for (var i = 0; i < 2; i++) {

		for (var j = 0; j < 6; j++) {

			let pieceDiv = document.createElement('div'); 	//Создаем див под фигуры
			let pieceImg = document.createElement('img');	//img под фигуры

			pieceDiv.className = 'conteinerImg';					//Имя класса для css
			pieceDiv.id = piece[i][j];					//Уникальный id
			pieceDiv.dataset.select = select;			//Устанавливаем data-* атрибут. По нему выбор фигур
	
			pieceImg.className = 'pieceImg';
			pieceImg.src = imgFolder + piece[i][j] + '.png';
			pieceImg.alt = piece[i][j];	
			pieceDiv.appendChild(pieceImg);				//Вставляем картинку в div	
			
			//выводим фигуры
			pieceBlock.appendChild(pieceDiv);
		}
	}// end for	
}// end showPieceBoard
// Ловим клик по фигуре
function clickPiece(){    
	//Обработчик
    document.addEventListener('click', selectPiece ); 
};
// Выбор фигуры
function selectPiece(e){
	// ie style
	e = e || event;     

    let pieceId; 
    // Если клик не по блоку выходим
    if (!e.target.classList.contains('pieceImg')) return;
    // Если нет id родителя, то не тот блок, выходим  		
    if ( e.target.parentNode.id === undefined || e.target.parentNode.id == "") return;    
    // Получен id
    pieceId = e.target.parentNode.id;                                          
    
    let pieceSelect = pieceId.split("");
    this.pieceSelect = pieceSelect;
    // into to the board
    newPiece( chess, this.blockId, pieceSelect );

    // Возврат фигурам фона  function of game.js
  	defaultColor( 'data-select', 0 );
  	// Возврат клеткам доски фона  function of game.js 	
  	defaultColor( 'data-active', 0 ); 	
 	// Ставим фон выделенной фигуре
    document.getElementById(pieceId).dataset.select = 1;
    // Чистим текст -- возможные ходы 
    Listener.showPossition( false );
}

showPieceBoard();
clickPiece();