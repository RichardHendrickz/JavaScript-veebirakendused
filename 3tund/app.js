(function(){
  "use strict";
  var Moosipurk = function(){
//Singleton pattern (järgmised 4 rida on pattern) - keelab rohkem kui 1 korra Mosipurki käivitada
    if(Moosipurk.instance){
      return Moosipurk.instance; //kontrollin ja tagastan selle (?)
    }
    Moosipurk.instance = this; //instance = meie funktsioon, this  viitab moosipurgile
    this.routes = Moosipurk.routes;

    console.log(this);
    this.currentRoute = null; //Hoian meeles, mis lehel olen (home-view, ...)

      //console.log('moosipurgi sees');
      this.init(); // panen rakenduse tööle
  };
  //Kirjeldatud kõik lehed:
  Moosipurk.routes = {
    "home-view": {
      render: function(){
        //käivitan siis, kui jõuan lehele
        console.log("JS avalehel");
          //Kui jõuad home-view'le, käivitub funktsioon, mis teatab, mitu sekundit oled lehel:
        if(this.interval){ clearInterval(this.interval); } //kui intervall on juba olemas, siis teen intervalli nulliks
        var seconds = 0; //Minu koodis ei nulli vahepeal ära. Vt ta koodi
        this.inverval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;
        }, 1000); //käivitub iga 1000ml tagant
      }
    },
    "list-view": {
      render: function(){
        console.log("JS loendi lehel");
      }
    },
    "manage-view": {
      render: function(){
        console.log("JS halduse lehel");
      }
    }
  };



  //KÕIK moosipurgi funktsioonid tulevad siia sisse!
  Moosipurk.prototype = {
    //KÕIK MUUTUJAD, mis on üldised(mitmes kohas kasutatavad jne) ja muudetavad, hakkame hoidma siin
    init: function(){
      console.log('rakendus käivitus');
      //Siia tuleb esialgne loogika:
//vaatan, mis lehel olen. Kui ei ole, lisan avalehe hashi.
      window.addEventListener('hashchange', this.routeChange.bind(this));

      console.log(window.location.hash); //paneme, et kui klient läheb lihtsalt lehele, viskab hashi autom aadressiribale
      if(!window.location.hash){
        window.location.hash = 'home-view';
      } else{
        //hash oli olemas, käivitan routeChange funktsiooni
        this.routeChange();
      }
      //ütlen, et hakka kuulama hiireklõpse.
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      //saan palju suurema haardega elemente valida. N: listi elekteerimine töötab nagu CSS-is
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this)); //kui tahan eventlisteneri sees kutsuda välja mingi teise funktsiooni, siis bind(this) kirjuta lõppu
    },
    addNewClick: function(){
  //    this.click_count++; NEID POLE VAJA ENAM
  //    console.log(this.click_count); NEID POLE VAJA ENAM
      var title = document.querySelector('.title').value;
      var ingredients = document.querySelector('.ingredients').value;
      console.log(title + ' ' + ingredients);

      var new_jar = new Jar(title, ingredients);
      var li = new_jar.createHtmlElement();
      document.querySelector('.list-of-jars').appendChild(li);
    },
    routeChange: function(event){

//Slice võtab ära mingi tähe ehk läeb alates märgitud kohast
      this.currentRoute = window.location.hash.slice(1);
      //kas leht on olemas
      if(this.routes[this.currentRoute]){
        //jah
      this.updateMenu();
      console.log('>---->>>'+this.currentRoute);
        //käivitan selle lehe jaoks ette nähtud JS. Kui olen avalehel, käivitatakse üleval olev avalehe funktsioon, kui mujal, sis muu funkts(mis on üleval koodis kirjeldatud)
      this.routes[this.currentRoute].render();

      }else{
        //ei => error404 - sellist route'i meil ei ole
      console.log('404');
      window.location.hash = 'home-view'; //Muudan aadressireal hashi ära, et jõuaks ikkagi õigele lehele
      }
    },
    updateMenu: function(){

          //kui on mingil menüül klass active-menu siis võtame ära
          document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace(' active-menu', '');

          //käesolevale lehele lisan juurde
          document.querySelector('.' + this.currentRoute).className += ' active-menu';

        }



  };

var Jar = function(new_title, new_ingredients){
  this.title = new_title;
  this.ingredients = new_ingredients;
  };

Jar.prototype = {
  createHtmlElement: function() {
    //anda tagasi ilus html

    //li item, mille sees on span.letter (span klassiga letter) ja span.content
    //li
    //  span.letter (1)
    //     M
    //   span.content(2)
    //    Maasikamoos / maasikas, õun
    var li = document.createElement('li');
    //  (1)
    var span = document.createElement('span');
    span.className = 'letter';
    //nyyd vaja "M" kätte saada
    var letter = document.createTextNode(this.title.charAt(0)); //sobib ka this.title.[0]
    span.appendChild(letter);

    li.appendChild(span); //panen spani list-itemi sisse
    //  (2) - sama contenti kohta
    var content_span = document.createElement('span');
    content_span.className = 'content';

    var content = document.createTextNode(this.title + ' | ' +this.ingredients);
    content_span.appendChild(content);
    li.appendChild(content_span);

    console.log(li);


    return li;

  }


};

  window.onload = function(){
    var app = new Moosipurk();
  };

})();

//    KODUS HARJUTAMISEKS:
//      1) Tee nii, et ei lase tühja lahtreid sisestada. Ütle, et kohustuslik väli.
//      2) Tee 1 väli juurde. Whatever asi.
