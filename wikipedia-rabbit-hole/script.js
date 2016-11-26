window.onload = function() {
  //set up space
    var w = document.getElementById("word"), word = w.value;
    word = "";
    //on enter display results
    w.onkeypress = function(e) {
        let event = e || window.event,
            charCode = event.which || event.keyCode;
        if ( charCode == '13' ){
          document.getElementById('T').innerHTML = "";
          wikipedia(w.value);
        }
    }
};

function wikipedia (value){
  let words = "", res = document.getElementById('results');
  $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + value + '&namespace=0&origin=*&limit=5').done(function(wiki) {
    if(wiki[2][0]){
      words = split(wiki[2][0]) + "<br><br>";
      if(wiki[2][0].includes("may refer to")){
        for(i = 1; i < wiki.length; i++){
           if(wiki[2][i])words += split(wiki[2][i]) + " <a href='" + wiki[3][i] + "'>(link)</a>" + "<br><br>";
        }
      }
      else words = words.slice(0,-8) + " <a href='" + wiki[3][0] + "'>(link)</a><br><br>";
    }
    else if(!res.innerHTML.includes("Sorry, there were no matching results"))words += res.innerHTML + "<br><br><div class='red'>Sorry, there were no matching results for \"" + value + "\".</div>" + "<br><br>";
    else words = res.innerHTML + "<br><br>";

    res.innerHTML = words.slice(0,-8);
    let spans = document.getElementsByTagName('span');
    for(i = 0; i < spans.length; i++){
      spans[i].addEventListener('click', addSpans);
    }
   });
}
function addSpans(){
  if(this.innerHTML.toLowerCase().replace(/[^a-z0-9]/g,"")){
      removeEvents(document.getElementsByTagName('span'));
      wikipedia(this.innerHTML.toLowerCase().replace(/[^a-z0-9]/g,""));
    }
}
function removeEvents(item){
  for(a = 0; a < item.length; a++)
    if(item[a]) item[a].removeEventListener('click', addSpans);
}
function split (text) {
  text = text.split(" ");
  text[0] = "<span>" + text[0];
  text[text.length - 1] = text[text.length -1] + "</span>";
  return text.join(" </span><span>");
}
