window.onload = function(){
 loadClock();
 loadDate();
 document.getElementById("date-div").style.opacity = "0";
 window.setInterval(function(){loadClock();loadDate();}, 500);

 var scroll = document.getElementById("page");
 if (scroll.addEventListener) {
   scroll.addEventListener("mousewheel", MouseWheelHandler, false);
   scroll.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
 }
 else scroll.attachEvent("onmousewheel", MouseWheelHandler);
};

//kella laadimine
function loadClock(){
 var clock = new Date();
 var hour = addZero(clock.getHours());
 var minute = addZero(clock.getMinutes());
 var second = addZero(clock.getSeconds());
 document.getElementById('clock-div').innerHTML = hour + ":" + minute + ":" + second;
}

//kuupäeva laadimine
function loadDate(){
 var clock = new Date();
 var day = addZero(clock.getDate());
 var month = addZero((clock.getMonth())+1);
 var year = clock.getFullYear();
 document.getElementById('date-div').innerHTML = day + "." + month + "." + year;
}

//kuupäeva <div> elemendi paigutus
function datePlacing(){
 var clockDivHeight = document.getElementById('clock-div').offsetHeight;
 document.getElementById('date-div').style.marginTop = (clockDivHeight/1.8) + "px";
}

//nulli lisamine kella ja kuupäeva numbritele
function addZero(number){
 if (number < 10){
   number = "0" + number;
 } return number;
}

//toimingud hiirerullikuga
var fsize = 30;
function MouseWheelHandler(e) {
 var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
 fsize = Math.max(20, Math.min(400, fsize + (10 * delta)));
 document.getElementById("clock-div").style.fontSize = fsize + "px";
 document.getElementById("date-div").style.fontSize = (fsize/2) + "px";
 document.getElementById("info").style.opacity = "0";
 document.getElementById("info").style.marginTop = "100px";
 document.getElementById("date-div").style.opacity = "0";
 datePlacing();
 return false;
}

//toimingud hiireklikiga
var counter = 0;
function mouseClick(){
 var fonts = ["Comic Sans MS", "Courier New", "Arial", "Poiret One", "Impact", "Times New Roman", "Verdana"];
 counter++;
 document.getElementById("clock-div").style.fontFamily = '"' + fonts[counter] + '"';
 document.getElementById("date-div").style.fontFamily = '"' + fonts[counter] + '"';
 if(counter == 7){counter = 0;}
 document.getElementById("info").style.marginTop = "100px";
 document.getElementById("info").style.opacity = "0";
}

//toimingud klaviatuuriga
document.addEventListener('keydown', function(event) {
 document.getElementById("info").style.opacity = "0";
 document.getElementById("info").style.marginTop = "100px";
   if(event.keyCode == 49) {
     document.getElementById("clock-div").style.color = "white";
     document.getElementById("date-div").style.color = "white";
   }
   else if(event.keyCode == 50) {
     document.getElementById("clock-div").style.color = "salmon";
     document.getElementById("date-div").style.color = "salmon";
   }
   else if(event.keyCode == 51) {
     document.getElementById("clock-div").style.color = "green";
     document.getElementById("date-div").style.color = "green";
   }
   else if(event.keyCode == 52) {
     document.getElementById("clock-div").style.color = "red";
     document.getElementById("date-div").style.color = "red";
   }
   else if(event.keyCode == 53) {
     document.getElementById("clock-div").style.color = "orange";
     document.getElementById("date-div").style.color = "orange";
   }
   else if(event.keyCode == 68) {
     if(document.getElementById("date-div").style.opacity == "0"){
       document.getElementById("date-div").style.opacity = "100";
       datePlacing();
     }else if(document.getElementById("date-div").style.opacity == "100"){
       document.getElementById("date-div").style.opacity = "0";
     }
   }
});
