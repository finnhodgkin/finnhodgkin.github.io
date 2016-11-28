//set base time (equal to transitionDuration for anim in stylesheet)
var filter = "", animTime = 60;
window.onload = function() {
  var pic = document.getElementById('picture');
  filter = getComputedStyle(document.getElementById('picture')).getPropertyValue("filter");
  document.getElementById('imageFile').onchange = function (e) {
    loadImage( //load file using loadimage plugin
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
  //set up variables
  var pic = document.getElementById('picture'),
      box = document.getElementById('imageBox'),
      marginH = Math.floor(box.offsetWidth - 500), //horizontal overflow on pic
      marginV = Math.floor(box.offsetHeight - 500); //vert. overflow on pic
  if(marginH)
    box.style.marginLeft = "-" + (marginH / 2) + "px"; //if overflow set margin
  if(marginV)
    box.style.marginLeft = "-" + (marginV / 2) + "px"; //if overflow set margin

  animTime = 60; //reset animation time if new image loaded.
  pic.className = "reset"; //reset animation time
  pic.style.filter = filter;
  setTimeout(function () { //wait for a bit then add transition
    pic.className = "anim";
  }, 250);
  var timer = setInterval(function () {
    if(animTime <= 0) clearInterval(timer);
    else{animTime--;};
  }, 1000);
  if("ondevicemotion" in window){ //detect if can shake
    var shakeEvent = new Shake({threshold: 15, timeout: 1000});
    shakeEvent.start();
    window.addEventListener('shake', shakeIt, false);
  }
}
function shakeIt(){
  var pic = document.getElementById('picture');
  if(animTime > 10){
    //set to current frame of transition
    var currFilter = getComputedStyle(pic).getPropertyValue("filter");
    //set up variables
    var shake = "shake";
    pic.className = ""; //reset transition
    pic.style.filter = currFilter;

    setTimeout(function () { //add new transition speed
        if(animTime <= 20){shake += 10; animTime = 10;} else
        if(animTime <= 30){shake += 20; animTime = 20;}
        else              {shake += 30; animTime = 30;}
        pic.className = shake;
    },250);
  }
}
