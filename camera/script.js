var filter = "", animTime = 60;
window.onload = function() {
  document.getElementById('imageFile').addEventListener('change', readURL, true);
  filter = getComputedStyle(document.getElementById('picture')).getPropertyValue("filter");
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
        else{animTime--;};
      }, 1000);
      if("ondevicemotion" in window){
        var shakeEvent = new Shake({threshold: 15, timeout: 1000});
        shakeEvent.start();
        window.addEventListener('shake', shakeIt, false);
      }

   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}
function shakeIt(){
  if(animTime > 10){
    var currFilter = getComputedStyle(document.getElementById('picture')).getPropertyValue("filter");
    var shake = "shake",
        current = document.getElementById('picture').className;
    document.getElementById('picture').className = "";
    document.getElementById('picture').style.filter = currFilter;

    setTimeout(function () {
        if(animTime <= 20){shake += 10; animTime = 10;} else
        if(animTime <= 30){shake += 20; animTime = 20;}
        else              {shake += 30; animTime = 30;}
        document.getElementById('picture').className = shake;
    },250);
  }
}
