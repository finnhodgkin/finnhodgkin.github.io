var filter = "", animTime = 60;
window.onload = function() {
  var pic = document.getElementById('picture');
  filter = getComputedStyle(document.getElementById('picture')).getPropertyValue("filter");
  document.getElementById('imageFile').onchange = function (e) {
    loadImage(
        e.target.files[0],
        function (img) {
          img.id = "imageBox"
          pic.innerHTML = "";
          pic.appendChild(img);
          readURL();
        },
        {
          maxWidth: 500,
          maxHeight: 500,
          minWidth: 500,
          minHeight: 500,
          cover: true
        }
    );
  };
}

function readURL(){
  var pic = document.getElementById('picture'),
      box = document.getElementById('imageBox');
      marginH = Math.floor(box.offsetWidth - 500),
      marginV = Math.floor(box.offsetHeight - 500);
  if(marginH){
    box.style.marginLeft = "-" + (marginH / 2) + "px";
  }
  if(marginV){
    box.style.marginLeft = "-" + (marginV / 2) + "px";
  }
  animTime = 60;
  pic.className = "reset";
  pic.style.filter = filter;
  setTimeout(function () {
    pic.className = "anim";
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
function shakeIt(){
  var pic = document.getElementById('picture');
  if(animTime > 10){
    var currFilter = getComputedStyle(pic).getPropertyValue("filter");
    var shake = "shake",
        current = pic.className;
    pic.className = "";
    pic.style.filter = currFilter;

    setTimeout(function () {
        if(animTime <= 20){shake += 10; animTime = 10;} else
        if(animTime <= 30){shake += 20; animTime = 20;}
        else              {shake += 30; animTime = 30;}
        pic.className = shake;
    },250);
  }
}
