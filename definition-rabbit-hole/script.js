window.onload = function() {

    var w = document.getElementById("word"),
    word = w.value;

    w.addEventListener("keyup", function(){
      word = w.value.toLowerCase();
      if(word.indexOf(" ") >= 0){
        word = word.split(" ");
        $.getJSON('http://api.wordnik.com:80/v4/word.json/' + word[0] + '/definitions?limit=200&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').done(function(definition){
          document.getElementById('results').innerHTML =
          "<h2>" + definition[0].word + "</h2>" + "<i><b>" + definition[0].partOfSpeech + "</b></i><br><br>" + split(definition[0].text);
          document.getElementById('results').className = "on";
        });
      }
    });
};




function split (text) {
  text = text.split(" ");
  text[0] = "<span>" + text[0];
  text[text.length - 1] = text[text.length -1] + "</span>";
  return text.join(" </span><span>");
}
