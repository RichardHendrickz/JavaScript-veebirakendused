

//Ootame, kuni leht on laetud
window.onload = function(){

    //saan kätte väljad
  var cm = document.getElementsById('cm');
  var inch = document.getElementsById('inch');

  //Lisan nuppudele kuularid
  document.getElementById('cm-to-inch').addEventListener('click', converttoinch); // mis juhtub, kui vajutada nuppu
  document.getElementById('inch-to-cm').addEventListener('click', function(){
    cm.value = inch.value*2.54;
  }); // mis juhtub, kui vajutada nuppu
  };

  function converttoinch(){
    inch.value = cm.value/2.54;

}
