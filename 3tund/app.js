(function(){
  "use strict";
  var Moosipurk = function(){
//Singleton pattern (järgmised 4 rida on pattern)
    if(Moosipurk.instance){
      return Moosipurk.instance; //kontrollin ja tagastan selle (?)
    }
    Moosipurk.instance = this; //instance = meie funktsioon, this  viitab moosipurgile
    console.log(this);
    this.click_count = 0;

      //console.log('moosipurgi sees');
      this.init(); // panen rakenduse tööle
  };

  //KÕIK moosipurgi funktsioonid tulevad siia sisse!
  Moosipurk.prototype = {
    //Kõiki muutujad, mis on üldised(mitmes kohas kasutatavad jne) ja muudetavad, hakkame hoidma siin



    init: function(){
      console.log('rakendus käivitus');
      //Siia tuleb esialgne loogika:
      //ütlen, et hakka kuulama hiireklõpse.
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      //saan palju suurema haardega elemente valida. N: listi elekteerimine töötab nagu CSS-is
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this)); //kui tahan eventlisteneri sees kutsuda välja mingi teise funktsiooni, siis bind(this) kirjuta lõppu
    },
    addNewClick: function(){
      this.click_count++;
      console.log(this.click_count);
    }
  };

  window.onload = function(){
    var app = new Moosipurk();
  };

})();
