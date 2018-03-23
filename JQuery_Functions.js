var channels = [];
for(var i = 0; i < 32; i++){
	channels.push((i+1)+".gif");
}

//changes the channel value and changes the background image in the screen div
function changeChannel(val) {
	$('#screen').data('info').channel+=val;
	if($('#screen').data('info').channel < 0) 
		$('#screen').data('info').channel = 31;
	else if($('#screen').data('info').channel > 31) 
		$('#screen').data('info').channel = 0;
	channel = "url('img/"+channels[$('#screen').data('info').channel]+"')";
	$('#screen').css('background-image', channel);
	$('#channel').html("<h1>"+($('#screen').data('info').channel+1)+"</h1>");
}

function removeChannel(time){
	time+=200;
	if(time > 1000)
		$('#channel').hide();
}
var num = 0;
function loadingFunction(){
	num = (num > 10) ? 0 : num+1;
	var code = "";
	for(var i = 0; i < num; i++){
		code+='<td></td>';
	}
	$('#loading').html(code);
}

$('document').ready(function(){
	//Initially hide menu
	$('#options').hide();
	$('#menu').hide();
	$('#kick').hide();
	//set inital screen data
	$('#screen').data("info", { channel : 0, power : false});
	setInterval(loadingFunction, 200);
	//power button animation and functionality
	$('#power').click(function(){
		$('#screen').data('info').power = !$('#screen').data('info').power;
		if($('#screen').data('info').power){
			$('#power').addClass('green down');
			$('#channel').show();
			var channel = "url('img/"+channels[$('#screen').data('info').channel]+"')";
			$('#screen').css('background-color', 'none');
			$('#screen').css('background-image', "url('img/"+channels[$('#screen').data('info').channel]+"')");

		}else{
			$('#power').removeClass('green down');
			$('#screen').css('background-image', 'none');
			$('#screen').css('background-color', 'black');
			if($('#menu').is(":visible"))
				$('#menu').hide();
			$('#channel').hide();
		}
	});

	//animate and add functionality to channel buttons
	$('#up').mousedown(function(){
		if($('#screen').data('info').power){
			$( this ).addClass('yellow down');
			changeChannel(1);
		}
	});
	$('#up').mouseup(function(){
		$( this ).removeClass('yellow down');
	});
	$('#down').mousedown(function(){
		if($('#screen').data('info').power){
			$( this ).addClass('yellow down');
			changeChannel(-1);
		}
	});
	$('#down').mouseup(function(){
		$( this ).removeClass('yellow down');
	});
	$('#menubutton').mousedown(function(){
		if($('#screen').data('info').power){
			$( this ).addClass('yellow down');
			if($('#menu').is(":visible"))
				$('#menu').hide();
			else
				$('#menu').slideDown();
		}
	});
	$('#menubutton').mouseup(function(){
		$('#menubutton').removeClass('yellow down');
	});

	$('.menu-option').hover(function(){
		$(this).toggleClass('yellow');
	});

	$('#watch').click(function(){
		if($('#welcome').is(':visible')) 
			$('#welcome').hide();
		if($('#kick').is(':visible')) 
			$('#kick').hide();
		$('#options').fadeIn();
	});

	$('#watch').hover(function(){
		$(this).toggleClass('yellow');
	});

	$('#kickit').hover(function(){
		$(this).toggleClass('yellow');
	});

	$('#kickit').click(function(){
		if($('#welcome').is(':visible')) 
			$('#welcome').hide();
		if($('#options').is(':visible')) 
			$('#options').hide();
		$('#kick').slideDown('slow');	
	});
});

