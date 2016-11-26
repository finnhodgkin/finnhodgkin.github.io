window.onload = function() {
  //set up space
    var w = document.getElementById("word"), word = w.value;
    word = "";
    //on enter display results
    w.onkeypress = function(e) {
        let event = e || window.event,
            charCode = event.which || event.keyCode;
        if ( charCode == '13' ){
          wikipedia(w.value);
          w.value = "";
        }
    }
};

function wikipedia (value){
  let words = "";
  $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + value + '&namespace=0&origin=*&limit=5').done(function(wiki) {
    if(wiki[2][0]){
      words = split(wiki[2][0]) + "<br><br>";
      if(wiki[2][0].includes("may refer to")){
        for(i = 1; i < wiki.length; i++){
           if(wiki[2][i])words += split(wiki[2][i]) + " <a href='" + wiki[3][i] + "'>(link)</a>" + "<br><br>";
        }
      }
      else {
        words = words.slice(0,-8) + " <a href='" + wiki[3][0] + "'>(link)</a><br><br>";
      }
    }
    else words = "Sorry, there were no matching results for \"" + value + "\"." + "<br><br>";

    document.getElementById('results').innerHTML = words.slice(0,-8);
    let spans = document.getElementsByTagName('span');
    for(i = 0; i < spans.length; i++){
      spans[i].addEventListener('click', function(e){
        wikipedia(this.innerHTML.toLowerCase().replace(/[^a-z]/g,""))
      });
    }
   });
}

function split (text) {
  text = text.split(" ");
  text[0] = "<span>" + text[0];
  text[text.length - 1] = text[text.length -1] + "</span>";
  return text.join(" </span><span>");
}
