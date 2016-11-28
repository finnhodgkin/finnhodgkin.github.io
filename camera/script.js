var filter = "", animTime = 60;
window.onload = function() {
  document.getElementById('imageFile').addEventListener('change', readURL, true);
  filter = getComputedStyle(document.getElementById('picture')).getPropertyValue("filter");
}

function move() {
  var elem = document.getElementById("myBar");
  var width = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (width == 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

function readURL(){
   var file = document.getElementById("imageFile").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      animTime = 60;
      document.getElementById('picture').style.backgroundImage = "url(" + reader.result + ")";
      document.getElementById('picture').className = "reset";
      document.getElementById('picture').style.filter = filter;
      setTimeout(function () {
        document.getElementById('picture').className = "anim";
      }, 250);
      var timer = setInterval(function () {
        if(animTime <= 0) clearInterval(timer);
        else{animTime--; console.log(animTime)};
      }, 1000);
      document.getElementById('tButton').addEventListener('click',shakeIt);
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}

function shakeIt(){
  console.log("Button press");
var currFilter = getComputedStyle(document.getElementById('picture')).getPropertyValue("filter");
document.getElementById('picture').className = "",
shake = "shake";
document.getElementById('picture').style.filter = currFilter;
if(animTime <= 5) shake+= ""; else
if(animTime <= 10){shake += 5; animTime = 5;} else
if(animTime <= 20){shake += 10; animTime = 10;} else
if(animTime <= 30){shake += 20; animTime = 20;}
else              {shake += 30; animTime = 30;}

setTimeout(function () {
  document.getElementById('picture').className = shake;
},250);
}
