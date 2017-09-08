


// image count
var total = 17;
var wind=$(window);
var wind_w = wind.width();
var wind_h = wind.height();
$(function(){
	var str = '';
	var scrollW = 10;
	var picScale = Math.floor((wind_w-(scrollW*4))/4);

	for(var i=1;i<=total;i++){
		$("#gallery").append('<li id="pic_'+i+'" data-id='+i+' class="animated bounceIn pic_block"><img src="./images/'+i+'.jpg"></img></li>');
	}
	$('.pic_block>img').each(function(){
		$(this).attr({
			width:picScale,
			height:picScale
		});
	});

	$('#gallery').delegate('li','tap',function(){
		var _id = cid = $(this).attr('data-id');
		loadPic(_id);
	});

});

// show large image
var largePic = $('#large_img');
var doPic = largePic[0];
function loadPic(id,callback){
	var largeSrc = './images/'+id+'.large.jpg';
	largePic.attr("src",largeSrc).addClass('animated bounceIn');
	$('#large_div').show().addClass('fadeIn');

	var ImageObj = new Image();
	ImageObj.src=largeSrc;
	ImageObj.onload=function(){
		var w = this.width;
		var h = this.height;
		var largeW = parseInt((wind_w-wind_h*w/h)/2);
		var largeH = parseInt((wind_h-wind_w*h/w)/2);

		largePic.css('width','auto').css('height','auto');
		largePic.css('padding-left','0px').css('padding-top','0px');

		if(h/w>1.2){
			 largePic.attr('src',largeSrc).css('height',wind_h).css('padding-left',largeW+'px');;
		}else{	
			 largePic.attr('src',largeSrc).css('width',wind_w).css('padding-top',largeH+'px');
		}
		callback&&callback();
	}
}

$('#large_div').tap(function(){
	$(this).hide();
});

$('#large_div').swipeRight(function(){
	
	if(cid>1){
		cid--;
	}else{
		cid=total;
	}

	loadPic(cid,function(){
		largePic.removeClass('bounceIn');
		doPic.addEventListener('webkitAnimationEnd',function(){
			largePic.removeClass('bounceInLeft');
			doPic.removeEventListener('webkitAnimationEnd');
		},false);
		largePic.addClass('bounceInLeft');
	});
});
$('#large_div').swipeLeft(function(){
	if(cid<total){
		cid++
	}else{
		cid=1;
	}

	loadPic(cid,function(){
		largePic.removeClass('bounceIn');
		doPic.addEventListener('webkitAnimationEnd',function(){
			largePic.removeClass('bounceInRight');
			doPic.removeEventListener('webkitAnimationEnd');
		},false);
		largePic.addClass('bounceInRight');
	});

});
