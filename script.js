$(document).ready(function(){
	var a = "", c = "";

	$('.image1').click(function(event) {
		event.preventDefault();
		$(".timage").fadeIn(300).addClass('active-slide').addClass('timagec');
  });
	$('.image2').click(function(event) {
		event.preventDefault();
		$(".timage").fadeIn(300).addClass('active-slide').removeClass('timageb').removeClass('timagec').addClass('timagea');
  });
	$('.image3').click(function(event) {
		event.preventDefault();
		$(".timage").fadeIn(300).addClass('active-slide').removeClass('timagec').addClass('timageb');
  });
	$('.timage').on('click', function(){
		$(".timage").fadeOut(300).removeClass('active-slide');
  });

	$('#wrapper a').bind('click', function(e){
		c = $(this).attr("href");
		if($('#hiddenMobileTest').css('float') === 'left'){
			if(a !== c){
				e.preventDefault();
				a = $(this).attr("href");
			}
		}
		});
	});



  $(window).on('load resize', function () {
    var bH = $('.box').width(),
        tH = $('.tinyBox').width(),
        m = ($('#wrapper').css('margin-left').replace("px", "") / 2) + "px",
        boxM = $('.box').css('margin-left').replace("px", "") * 1;

  	$('#wrapper').css('marginTop', m).css('marginBottom', m);
    $('.box').css('height', bH);
  	$('.bigBox').css('height', bH);
    $('.tinyBox').css('height', tH);
  	$('.timage').css('margin', boxM + "px")
                .height((bH + boxM) *2)
                .width((bH + boxM) *2);
});
