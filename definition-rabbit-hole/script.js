window.onload = function() {
    var w = document.getElementById("word"),
    word = w.value,
    words;
    w.value = "";
    w.addEventListener("keyup", function(){
      word = w.value.toLowerCase();
      if(word.indexOf(" ") >= 0){
        word = word.split(" ");
        wordnik(word[0]);
      }
    });
};
function wordnik (wordN){
  $.getJSON('http://api.wordnik.com:80/v4/word.json/' + wordN + '/definitions?limit=1&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').done(function(definition){
    if(definition[0]){
      document.getElementById('results').innerHTML =
      "<h2>" + definition[0].word + "</h2>" + "<i><b>" +    definition[0].partOfSpeech + "</b></i><br><br>" + split(definition[0].text);
      document.getElementById('results').className = "on";
      words = document.getElementsByTagName('span');
      for(i = 0; i < words.length; i++){
        words[i].addEventListener('click', function(e){
          wordnik(this.innerHTML.toLowerCase().replace(/[^a-z]/g,""))
        });
      }
      document.getElementById("word").className = "hide"
    }
    else{
      document.getElementById('results').innerHTML = "Sorry, couldn't find a definition for that word. Try again.";
      document.getElementById('results').className = "on";
      document.getElementById("word").className = "show";
      document.getElementById("word").value = "";
    }

  });
}
function split (text) {
  text = text.split(" ");
  text[0] = "<span>" + text[0];
  text[text.length - 1] = text[text.length -1] + "</span>";
  return text.join(" </span><span>");
}
