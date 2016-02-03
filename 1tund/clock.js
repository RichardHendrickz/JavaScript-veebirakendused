window.onload = function(){
  var clock = document.getElementById('kell');
  writeDate();
};

function writeDate(){
  var today = new Date();
  var hours = checkTime(today.getHours());
  var minutes = checkTime(today.getMinutes());
  var seconds = checkTime(today.getSeconds());
  //minutes = checkTime(number);
  //seconds = checkTime(seconds);
  clock.innerHTML = hours + ":" + minutes + ":" + seconds;
}


function checkTime(number) {
  if(number<10) {
    number = "0" + number;
  }
  return number;
}


//Käivitan invervalli
window.setInterval(function(){
  writeDate();
}, 500);
