$(document).ready(function(){
  $('#searchBox').click(function(){
        $('#search').focus();
  });

  $('#search').focus(function(){
    $('#searchBox').addClass('hide');
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

  
});
