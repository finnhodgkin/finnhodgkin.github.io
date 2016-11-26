window.onload = function() {
  setTimeout(function () {
  }, 500);

  document.getElementById('imageFile').addEventListener('change', readURL, true);
}



function readURL(){
   var file = document.getElementById("imageFile").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      document.getElementById('picture').style.backgroundImage = "url(" + reader.result + ")";
      document.getElementById('picture').className = "anim";
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}
