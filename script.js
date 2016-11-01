$(document).ready(function(){
	var b = function(event) {
		event.preventDefault();
		$(this).hasClass("i1") ? $(".ti").fadeIn(300).addClass('active').addClass('b').removeClass('a'):
		$(".ti").fadeIn(300).addClass('active').addClass('a').removeClass('b')
	}
	$('.i1').click(b);$('.i2').click(b);
	$('.ti').on('click', function(){$(".ti").fadeOut(300).removeClass('active')})

	var a = "", c = "";
	$('#wrapper a').bind('click', function(e){
		c = $(this).attr("href");
		if($('#hiddenMobileTest').css('float') === 'left')
			if(a !== c){
				e.preventDefault();
				a = $(this).attr("href");
			}
	});
});

$('#wrapper a').bind('click', function(e){
		current = $(this).attr("href");

		if($('#hiddenMobileTest').css('float') === 'left'){
			if(active === current){
				console.log(active, current);
			}
			else{
				e.preventDefault();
				console.log(active, current);
				active = $(this).attr("href");
			}
		}
});

$(window).on('load resize', function () {
  var bH = $('.box').width(),
      tH = $('.tinyBox').width(),
      m = ($('#wrapper').css('margin-left').replace("px", "") / 4) + "px",
      boxM = $('.box').css('margin-left').replace("px", "") * 1;

	$('#wrapper').css('marginTop', m).css('marginBottom', m);
  $('.box').css('height', bH);
	$('.bigBox').css('height', bH);
  $('.tinyBox').css('height', tH);
	$('.ti').css('margin', boxM + "px")
          .height((bH + boxM) *2)
          .width((bH + boxM) *2);
});
