(function(){
    "use strict";

    var MapsApp = function(){

        if(MapsApp.instance){
            return MapsApp.instance;
        }
        MapsApp.instance = this;

        this.container = null;

        this.init();
    };

    window.MapsApp = MapsApp;

    MapsApp.prototype = {

        init: function(){

            console.log('MapsApp started');

            this.container = document.querySelector('#map-container');

        },
    };

    window.onload = function(){
        var app = new MapsApp();
    };

})();
