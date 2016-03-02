(function(){
  "use strict";

  var PassGen = function(){
    // SINGLETON PATTERN (4 rida)
    if(PassGen.instance){
      return PassGen.instance;
    }
    PassGen.instance = this;

	this.passwords = []; //massiiv paroolide jaoks
	this.password_length = null;

	//ul kuhu pistame paroole
	this.container = document.querySelector('#container');


    //panen rakenduse tööle
    this.init();
  };

  //teeme muutuja avalikuks
  window.PassGen = PassGen;

  //kõik  funktsioonid tulevad siia sisse
  PassGen.prototype = {
    init: function(){
      console.log('rakendus käivitus');

	  //kuulan nupuvajutust
	  document.querySelector('#generate').addEventListener('click', this.generatePasswords.bind(this));

    },
	generatePasswords: function(){
    this.passwords = []; //teeme massiivi tühjaks ehk nüüd 'genereeri' vajutamisel näitab uusi sõnu vanade asemel ega hoia vanu alles
		//8 või 16
		this.password_length = document.querySelector('#pass-length').value;

		console.log('genereerin ' + this.password_length);

		//paroolide arv
		var count = 10;

		for(var i = 0; i < count; i++){

			//random index
			var random_index = Math.round(Math.random() * words[this.password_length].length); //randomiga võtame suvalise numbri 0..1 vahel, siis korrutame selle sõnade arvuga ning lõpuks ümardame täisarvuks

			//console.log(random_index);
			var password = words[this.password_length][random_index];
			this.passwords.push(crypt(password)); // krüpteerin

		}

		this.printPasswords();

	},
	printPasswords: function(){

		this.container.innerHTML = ''; //Siin kustutab HTML-ist need sõnad ära. See rida väljakommenteerides näitab ikkagi sõnu üksteise otsa. Massiiv tühjendati ära, kuid vanad sõnad jäeti HTMI-i alles

		for(var i = 0; i < this.passwords.length; i++){

			//tekitan li kus sees on parool
			var el = document.createElement('li');
			var text = document.createTextNode(this.passwords[i]);
			el.appendChild(text);
			this.container.appendChild(el);
			/* Eelmise 4 rea asemel saaks kirjutada ka järgneva rea, kuid ei tohiks, SEST... (pidime ise uurima)
      this.container.innerHTML += '<li>' +this.passwords[i]+ '</li>'; */

		}


	}


  };
  //HELPER FUNCTIONS - ehk meie praegu teeme enda krüpteerimise
    var crypt = function(word){

  	var length = word.length;

  	word = word.replace('i','1');
  	word = word.replace('o','0');
    if(length === 6){
      //Teen pikkusega 8
      word+= Math.round(Math.random()*10);
      word+= Math.round(Math.random()*10);
    }else if(length === 12){
      //teen pikkusega 16
      word+= Math.round(Math.random()*10);
      word+= Math.round(Math.random()*10);
      word+= Math.round(Math.random()*10);
    }

  	return word;

  };

  //window.crypt = crypt; // teoorias ei ole vaja. See selleks, et saaks konsoolis katsetada

  window.onload = function(){
    var app = new PassGen();
  };

})();
