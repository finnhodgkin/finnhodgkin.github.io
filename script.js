window.onload = function() {
	//gallery image fadeIN
	var ti = document.getElementById("ti"),
	b = function(event) {
		event.preventDefault();
		if(this.id === "i1"){
			ti.className = "active b";
			setTimeout(function(){ti.className = "active b display";}, 30);
		}
		else{
			ti.className = "active a";
			setTimeout(function(){ti.className = "active a display";}, 30);
		}
	};
	document.getElementById('i1').addEventListener('click', b);
	document.getElementById('i2').addEventListener('click', b);
	//gallery image fadeOUT
	ti.addEventListener('click', function(e){
		ti.className = ti.className.slice(0, -8);
		setTimeout(function(){ti.className = " ";}, 300);
	});

	//mobile hover links
	var a = "", c = "", mob = document.getElementById('hiddenMobileTest'),
	links = document.getElementsByTagName('a');
	for(i = 0; i < links.length; i++)
    links[i].addEventListener('click', function(e){
			if(getComputedStyle(mob).float === 'left'){
				c = this;
				if(a !== c){
					e.preventDefault();
					a = this;
				}}
		})

	boxSizing();
	setTimeout(boxSizing, 100); //Force IE not to be an idiot
	window.addEventListener("resize", boxSizing);
}

var boxSizing = function (){
	var box = document.getElementsByClassName('box'),
			bBox = document.getElementsByClassName('bigBox'),
			tBox = document.getElementsByClassName('tinyBox'),
  		bH = parseInt(getComputedStyle(box[0]).width),
			m  = (getComputedStyle(document.getElementById('wrapper'))
					 .marginLeft.replace("px", "") / 4) + "px",
			boxM = getComputedStyle(box[0]).marginLeft.replace("px", "") * 1;

	document.getElementById('wrapper').style.marginBottom = m;
	document.getElementById('wrapper').style.marginTop = m;

	for(i = 0; i < box.length; i++)
		box[i].style.height = bH + "px";
	for(i = 0; i < bBox.length; i++)
		bBox[i].style.height = bH + "px";
	for(i = 0; i < tBox.length; i++)
		tBox[i].style.height = getComputedStyle(tBox[0]).width;

	bH = (bH + boxM) * 2;
	document.getElementById("ti").style.width = bH + "px";
	document.getElementById("ti").style.height = bH + "px";
	document.getElementById("ti").style.margin = boxM + "px";
}
