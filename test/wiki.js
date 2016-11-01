$(document).ready(function(){
  $('#searchBox').click(function(){
        $('#search').focus();
  });

  $('#search').focus(function(){
    $('#searchBox').addClass('hide');
    $('#searchBox').fadeOut();
    $('#searchBar').addClass('searchBarActive');
    $('.searchWrapper').addClass('searchWrapperActive');
    $('#random').fadeIn();
  });

  $('#search').focusout(function(){
    $('#searchBox').fadeIn();
    $('#searchBox').removeClass('hide');
    $('#searchBar').removeClass('searchBarActive');
    $('.searchWrapper').removeClass('searchWrapperActive');
    $('#random').fadeOut();
  });

  $('#search').keyup(function(event) {
      if (event.keyCode) {
        if( $("#search").val()){
         $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + $("#search").val() + '&namespace=0&origin=*&limit=10').done(function(wiki) {
            $("#resultsWrapper").html("");
            for(i = 0; i < wiki[1].length; i++){
              $("#resultsWrapper").append('<a href="' + wiki[3][i] + '"><div class="results"><h2>' + wiki[1][i] + '</h2>' + wiki[2][i] + "</div>");
            }
          });}else{
            $("#resultsWrapper").html("");
          }
       }
  });
});
