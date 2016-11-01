var rotateButton = 0;
var rotateWheel = 0;

var quote = null;
var author = null;

function start(){
  rotateButton+=10;
  rotateWheel+=45;

  $('.glow').addClass('glowing');
  rotate(".button", rotateButton);
  rotate(".wheel", rotateWheel);
  quote = null;
  author = null;

  $('.text').html("...");

  setTimeout(function(){
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(quotes){
      quote = quotes.quoteText.slice(0,-1);
      author = quotes.quoteAuthor;
      $('.text').html("\"" + quote + "\"<p class='right'>" + author + "</p><p class='small'>Quote provided by Forismatic.com</p>");
    }).fail(function() {
      $('.text').html("ERROR 323: QUOTE NOT FOUND.");
    });
    $('.glow').removeClass('glowing');
  }, 500);
}

function tweet(){
  if(author){quote += " - " + author;}
  if(quote){
    if(quote.length <= 140){
      window.open("http://twitter.com/share?text=" + quote);
    }else{
      $('.text').html("ERROR 185: QUOTE TOO LONG FOR TWITTER.");
    }
  }
}

function rotate(element, degrees){
    $(element).css({WebkitTransform: 'rotate(' + degrees + 'deg)'});
    $(element).css({'-moz-transform': 'rotate(' + degrees + 'deg)'});
}
