//Template
$(document).ready(function(){
	var $window = $(window),
		$edTools = $('#ed-tools'),
		$edBody = $('#ed-body'),
		$edStyle = $('#ed-style'),
		$edToolsInner = $('#ed-tools-inner'),
		$edResize = $('#ed-resize'),
		$htmlInput = $('#html-input'),
		$cssInput = $('#css-input'),
		$htmlOutput = $('#html-output'),
		$cssOutput = $('#css-output');
	
	//close-open
	var openClose = true;
	var actualWidth = $edTools.width();
	$('#ed-close-open').click(function(){
		var $this = $(this);
		if(openClose){
			actualWidth = $edTools.width();
			$edResize.hide();
			$edToolsInner.hide();
			$this.css('left', '5px').html('+');
			$edTools.animate({'width':'24px'},100);
			$edBody.animate({'right':'24px'},100);		
			openClose = false;
		}else{
			$edTools.animate({'width':actualWidth+'px'},100,function(){
				$edToolsInner.show();
				$edResize.show();
				$this.css('left', '12px').html('-');
			});
			$edBody.animate({'right':actualWidth+'px'},100);
			openClose = true;
		}
		return false;
	});
		
	//resize
	var resize = false;
	$edResize.mousedown(function(){
		resize = true;
		return false;
	});
	$(document).mousemove(function(ev){
		if(resize){
			var posX = $window.width() - ev.pageX;
			if(posX < 200){
				posX = 200;
			}
			$edTools.width(posX+'px');
			$('#ed-body').css('right',posX + 'px');
			return false;		
		}			
	}).mouseup(function(){
		if(resize){
			resize = false;
			return false;
		}
	});	
	
	//tabs
	var currentTab = '#ed-HTML-palet',
	$edTab = $('.ed-tab')	
	.click(function(){		
		var newTab = '#' + $(this).attr('rel');
		if(newTab != currentTab){			
			$(currentTab).hide();
			$(newTab).show();
			$edTab.removeClass('ed-current');
			$(this).addClass('ed-current');			
			currentTab = newTab;
		}
		return false;		
	});
	
	//REDRAW SANDBOX:	
	var drawing = function(){
		$edBody.html($htmlInput.val());
		$edStyle.html($cssInput.val());
	};	
	var draw = function(cond){
		if(cond){			
			intervalSandbox = setInterval(drawing,20);			
		}else{			
			clearTimeout(intervalSandbox);			
		}
	};
	drawing();	
	
	
	//Render Code
	var renderCode = function(code){
		var text = $('#'+code+'-input').val().replace(/</g,'&lt;').replace(/>/g,'&gt;');
		$('#'+code+'-output').html(text);		
	};
	renderCode('html');
	renderCode('css');
	
	//HTML
	$htmlOutput.click(function(){
		$(this).hide();
		$htmlInput.show().focus();
		draw(true);		
	});
	$htmlInput.blur(function(){
		$(this).hide();
		renderCode('html');
		$htmlOutput.show();
		draw(false);
	});
	//CSS
	$cssOutput.click(function(){
		$(this).hide();
		$cssInput.show().focus();
		draw(true);		
	});
	$cssInput.blur(function(){
		$(this).hide();
		renderCode('css');
		$cssOutput.show();
		draw(false);
	});	
});