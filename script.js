$(document).ready(()=>{
	var b = function(event) {
		event.preventDefault();
		$(this).hasClass("i1") ?
		$(".ti").fadeIn(300).addClass('active b').removeClass('a'):
		$(".ti").fadeIn(300).addClass('active a').removeClass('b')
	}
	$('.i1, .i2').click(b);
	$('.ti').on('click', ()=>{$(".ti").fadeOut(300).removeClass('active')})
	var a = "", c = "";
	$('#wrapper a').bind('click', (e)=>{
		c = $(this).attr("href")
		if($('#hiddenMobileTest').css('float') === 'left')
			if(a !== c){
				e.preventDefault();
				a = $(this).attr("href")
			}
	});
});

$(window).on('load resize', ()=>{
  var bH = $('.box').width(),
      m = ($('#wrapper').css('margin-left').replace("px", "") / 4) + "px",
      boxM = $('.box').css('margin-left').replace("px", "") * 1;

	$('#wrapper').css('marginTop', m).css('marginBottom', m);
  $('.box, .bigBox').height(bH);
  $('.tinyBox').height($('.tinyBox').width());
	bH = (bH + boxM) * 2;
	$('.ti').css('margin', boxM + "px")
          .height(bH)
          .width(bH);
});
