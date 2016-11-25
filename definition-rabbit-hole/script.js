window.onload = function() {
  //set up space
    var w = document.getElementById("word"), word = w.value;
    w.value = "";
    document.getElementById('new').addEventListener('click', function(){
      search();
      results();
    });
    //on enter display results
    w.onkeypress = function(e) {
        let event = e || window.event,
            charCode = event.which || event.keyCode
        if ( charCode == '13' ) {
          word = w.value.toLowerCase();
          if(word.length > 0){
            word = word.split(" ");
            //if first word in search is a word then call api
            if(word[0].replace(/[^a-z]/g,""))
              wordnik(word[0].replace(/[^a-z]/g,""));
          }
        }
    }
};

function wordnik (wordN){
  $.getJSON('http://api.wordnik.com:80/v4/word.json/' + wordN + '/definitions?limit=1&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').done(function(definition){
    if(definition[0]){
      //display results
      document.getElementById('results').innerHTML =
      "<h2>" + definition[0].word + "</h2>" + "<i><b>" +    definition[0].partOfSpeech + "</b></i><br><br>" + split(definition[0].text);
      results(true);
      //split results into clickable spans
      let words = document.getElementsByTagName('span');
      for(i = 0; i < words.length; i++){
        words[i].addEventListener('click', function(e){
          wordnik(this.innerHTML.toLowerCase().replace(/[^a-z]/g,""))
        });
      }
      //hide search
      search(true)
    }
    else{
      //display error message in "results"
      document.getElementById('results').innerHTML = "Sorry, couldn't find a definition for \"" + wordN + "\". Try again.";
      results(true);
      search()
    }
  });
}

function search(d){
  let s = document.getElementById("word")
  if(!d) s.className = "", s.value = ""
  else s.className = "hide"
}

function results(d){
  let s = document.getElementById("results"),
  n = document.getElementById('new')
  if(!d) s.className = "", n.className = "";
  else s.className = "on", n.className = "on";
}

function split (text) {
  text = text.split(" ");
  text[0] = "<span>" + text[0];
  text[text.length - 1] = text[text.length -1] + "</span>";
  return text.join(" </span><span>");
}
