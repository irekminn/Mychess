/*!
 * form.js v0.0.1
 *
 * Copyright 2019 Irek Minnegaliev
 * Released under the MIT license
 * OOP style
 * Date: 25 May 2019
 */
'use strict';

var titleForms = 'Исходное положение (пример: А6):';

var tagForm = {

 		name : 'form',
 		attribute : {
 					id : 'formchess',
 					action : '#'
 					}
}

var titleForm = {

 		name : 'div',
 		attribute : {
 					id : 'titleform'
 					}
}

var inputDiv = {

 		name : 'input',
 		attribute : { 
 					id : 'input',
 					autocomplete : 'on',
 					maxlength : '2',
 					type : 'text',
 					autofocus : '',
 					value : ''
 					}
}

var btnDiv = {

 		name : 'input',
 		attribute : { 
 					id : 'button',
 					type : 'button',
 					value : 'Ok'
 					}
}

var outDiv = {

 		name : 'div',
 		attribute : { 
 					id : 'outform',
 					class : 'outform'
 					}
}
//объявили класс
class GreatForm {	
	
	//конструктор
 	constructor( tagForm, titleForm, inputDiv, btnDiv, outDiv ){ 

 		this.titleForm = titleForm;
 		this.btnDiv = btnDiv;
 		this.inputDiv = inputDiv;
 		this.outDiv = outDiv;
 		this.arguments = arguments;
 	}
 	//Создает форму
 	greateElements(){

 		let blockSelector ;
 		let parrent = '.form';
 		//begin for
 		for (var i = 0; i < this.arguments.length; i++){

 			for (var key in this.arguments[i]) {
 		
				if ( key == 'name'){

					blockSelector = document.createElement(this.arguments[i][key]);
					continue;
				
				}

				if ( key == 'attribute'){

					for (var keyatr in this.arguments[i][key]) {

					let value = this.arguments[i][key][keyatr];
					blockSelector.setAttribute(keyatr, value); // устанавливает атрибут
				
					}	
				}

				document.querySelector(parrent).appendChild(blockSelector); //вставили элемент последним за родителем
				if ( i == 0 )	//поменяли родителя на form
				parrent = '#'+ document.querySelector(parrent).firstElementChild.id;
			}
		}//end for	
	}//end greateElements

	//Выдает элемент для клика
	get elemForClick() {

    	return this.btnDiv.attribute.id;
  	}
  	//Поле для ввода
  	get inputFormId() {

    	return this.inputDiv.attribute.id;
  	}
  	//Bывод текста
  	get outFormId() {

    	return this.outDiv.attribute.id;
  	}
  	//Ставит надпись на форме
	set titleForms(titleText){
		let selector = '#' + this.titleForm.attribute.id;
		this.titleText = titleText;
	 	document.querySelector(selector).innerHTML = this.titleText;
	}
}//end class GreatForm
//класс обработчика
class Listener {

	constructor (elClick, elInput, elOut){
		//сохраняем контекст
		var self = this; 

		self.clickButton = function(e){

			e = e || event;     //ie style

			//Если нет события выходим
			if (e === undefined || e == "") return;

			//Если нет id блока, то не тот блок, выходим
    		if ( e.target.id === undefined || e.target.id == "") return;

    		//Если клик не по кнопке выходим 
    		if ( e.target.id !== elClick ) return ; 
	
    		//checked input value
    		if ( self.checkValue(document.getElementById(elInput).value) == false)

    			{
    				let noValid = true;
    				Listener.showPossition( false, '','','','', noValid );
    				return
    			} 

    		//Отправляет позицию в игру и берет значение выделенной фигуры
    		let inputValue = document.getElementById(elInput).value;
    		self.pieceForForm(inputValue, this.pieceSelect);
       		//Вывод позиций
       		let allpos = self.allPos;
       		Listener.showPossition( elOut, true, allpos );
    		   		
		}//end clickButton		
	}//end constructor
	//Вывод позиций
	static showPossition( flag, allpos, blockId, type, color, noValid ){

		let inputElem = document.getElementById(elInput);
		let outText = document.getElementById(elOut);
		// False remove text
		if ( !flag ) { outText.innerHTML = ""; inputElem.value = "";}
		// True add text
		if ( flag == true && blockId !== undefined ) inputElem.value = blockId.toUpperCase();
		if ( flag == true && allpos !== undefined ) outText.innerHTML = 'Возможные варианты хода: ' + allpos.join(', ').toUpperCase();
		// Пришло id и цвет фигуры -- выбираем из блока select и красим фон
		if ( type !== undefined && color !== undefined && noValid === undefined ) document.querySelector('#'+color+type.toUpperCase()).dataset.select = 1;
		// Не валидные данные
		if ( noValid == true ){

			inputElem.value = "";
			outText.innerHTML = "Аккуратней с вводом! RegExp не обманешь :)";
		}
	}// end showPossition

	//check str input
	checkValue (str){	
		//проверяет значения по условию
		if ( /^[A-Ha-h]{1}[1-8]{1}$/.test(str) ) return true;

		else return false;
	}		
	//Отправляет позицию в игру
	pieceForForm (value, pieceSelect){

		let pieceForm;
		let idOfForm;
		//Проверяем пришла ли выделенная фигура, если нет то ставим белого коня
    	if (pieceSelect === undefined || pieceSelect == null)  pieceForm = ['w','N'];

    	else  pieceForm = pieceSelect;
    	//нижний регистр id клетки
    	idOfForm = value.toLowerCase();	
    	//into to the board
    	newPiece.call( this, chess, idOfForm, pieceForm );
	}
}//end class Listener

//greate form
var form = new GreatForm(tagForm, titleForm, inputDiv, btnDiv, outDiv); 
//создаем елементы формы
form.greateElements();
//заголовок поле ввода			
form.titleForms = titleForms;
//Получаем элемент кнопки		
var elClick = form.elemForClick;
//Из какого input берем инфо		
var elInput = form.inputFormId;
//Куда выводим инфо		
var elOut = form.outFormId;			

//Новый обработчик кликов
var handler = new Listener( elClick, elInput, elOut );
//Вешаем обработчик кликов		
document.addEventListener('click', this.handler.clickButton );