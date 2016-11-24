window.onload = function() {

    var test = "The best meat is served cold: sashimi, steak, oysters, carpacio."

    //document.getElementById('results').innerHTML = split(test);
};

function split (text) {
  text = text.split(" ");
  text[0] = "<span>" + text[0];
  text[text.length - 1] = text[text.length -1] + "</span>";
  return text.join(" </span><span>");
}
