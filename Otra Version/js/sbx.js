/* Sandbox CSS/HTML v0.1
 * By Pablo Cazorla (pablo.cazorla@mercadoLibre.com) - Copyleft 2011.
 * Sandbox CSS/HTML v0.1 is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
 */ 
$(document).ready(function(){
	
	//General
	var $sbxControl = $('#sbxControl');
	var $sbxContainer = $('#sbxContainer');
	var $window = $(window);
	var moving = false;
	var moviment = function(arg){
		moving = arg;
	}
	
	//Tabs
	var $tabs = $('#sbxMenu');	
	$tabs.find('li').click(function(){
		if(!moving){
			var $current = $tabs.find('.current');
			var $this = $(this);		
			if(!$this.hasClass('current')){
				$current.removeClass('current');
				$this.addClass('current');		
				$('#'+ $current.attr('rel')).removeClass('currentSbxDeskTable');
				$('#'+ $this.attr('rel')).addClass('currentSbxDeskTable');
				return false;
			}
		}
	});
	
	//Open and Close
	var $sbxCloser = $('#sbxCloser');
	var $sbxOpener = $('#sbxOpener');
	var duration = 300;
	
	$sbxCloser.click(function(){
		if(!moving){
			var widthSbxControl = $sbxControl.width()+2;
			moviment(true);
			$sbxControl.animate({'left': '-'+ widthSbxControl+'px'},duration,function(){
				$sbxOpener.fadeIn(100);
				moviment(false);			
			});	
			$sbxContainer.animate({'margin-left':'0px'},duration);				
		}		
	});
	$sbxOpener.click(function(){
		if(!moving){
			var widthSbxControl = $sbxControl.width();
			$sbxControl.animate({'left': '0px'},duration,moviment(false));	
			$sbxContainer.animate({'margin-left': widthSbxControl+'px'},duration);
			$sbxOpener.fadeOut(duration);			
		}		
	});
	
	//Sizer
	var sizing = false;
	$('#sbxSizer').mousedown(function(ev){
		//offX = ev.pageX - $cssSandbox_board.offset().left;
		sizing = true;
		return false;
	});	
	$('html').mouseup(function(){
		sizing = false;				
	}).mousemove(function(ev){
		if(sizing){
			var posXmouse = ev.pageX+5;			
			if(posXmouse<270){
				posXmouse = 270;
			}			
			$sbxControl.css({
				width : posXmouse
			});
			$sbxContainer.css({
				'margin-left': posXmouse
			});
		}		
	});
	
	//textarea height
	var $textarea = $sbxControl.find('textarea');
	var $pre = $sbxControl.find('pre');
	var resizeTextarea = function(){
		var heightPre = $window.height() - $pre.eq(0).offset().top - 30;
		for(i=0;i<$textarea.length;i++){			
			$textarea.eq(i).css({'height': heightPre + 'px'});
			$pre.eq(i).css({'height': heightPre + 'px'});
		}
	}
	resizeTextarea();
	$window.resize(function() {
	  resizeTextarea();
	});
	
	/*******************************************************************/
	//REDRAW SANDBOX
	var intervalSandbox = null;
	var $sbxHtmlTextarea = $('#sbxHtmlTextarea');
	var $sbxHtmlPre = $('#sbxHtmlPre');
	var $sbxCssTextarea = $('#sbxCssTextarea');
	var $sbxCssPre = $('#sbxCssPre');
	var $sbxContainer = $('#sbxContainer');
	var $sbxStyle = $('#sbxStyle');
		
	var redrawHtml = function(){
		$sbxContainer.html($sbxHtmlTextarea.val());
	};
	var redrawCss = function(){
		$sbxStyle.html($sbxCssTextarea.val());
	};
	var getRedraw = function(condition,redrawType){
		if(condition){
			if(redrawType === 'html'){	
				intervalSandbox = setInterval(redrawHtml,20);
			}else{
				intervalSandbox = setInterval(redrawCss,20);
			}		
		}else{			
			clearTimeout(intervalSandbox);			
		}
	};
	redrawHtml();
	redrawCss();
	
	var textareaToPre = function(textareaType){
		if(textareaType === 'html'){
			var st = $$hl.paint($sbxHtmlTextarea.val(),'html');			
			$sbxHtmlPre.html(st);
		}else if(textareaType === 'css'){
			var st = $$hl.paint($sbxCssTextarea.val(),'css');			
			$sbxCssPre.html(st);
		}else{
			//
		}		
	};
	textareaToPre('html');
	textareaToPre('css');
	
	$sbxHtmlPre.click(function(){
		$sbxHtmlPre.hide();
		$sbxHtmlTextarea.show().focus();		
		getRedraw(true,'html');		
	});
	$sbxHtmlTextarea.blur(function(){
		$sbxHtmlTextarea.hide();
		textareaToPre('html');
		$sbxHtmlPre.show();
		getRedraw(false);		
	});
	
	$sbxCssPre.click(function(){
		$sbxCssPre.hide();
		$sbxCssTextarea.show().focus();
		getRedraw(true,'css');		
	})
	$sbxCssTextarea.blur(function(){
		$sbxCssTextarea.hide();
		textareaToPre('css');
		$sbxCssPre.show();
		getRedraw(false);		
	});
	
	//CLEAR
	//Clear textareas
	$('.sbxClear').click(function(ev){
		ev.preventDefault();
		var typeClear = $(this).attr('rel');
		if(typeClear === 'html'){
			$sbxHtmlTextarea.val('');
			$sbxHtmlPre.html('');
			redrawHtml();
		}else if(typeClear === 'css'){
			$sbxCssTextarea.val('');
			$sbxCssPre.html('');
			redrawCss();
		}else{
			//
		}		
	});
	
	//Reset CSS option
	var $sbxResetCSS = $('#sbxResetCSS');
	var resetContent = "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}";
	$sbxResetCSS.change(function(){
		if($sbxResetCSS.attr('checked')){
			$('#sbxResetStyle').html(resetContent);			
		}else{
			$('#sbxResetStyle').html('');
		}
	});
	
	//FontSize
	var $sbxFontSizeDown = $('.sbxFontSizeDown');
	var $sbxFontSizeUp = $('.sbxFontSizeUp');
	var FontSizeGraduate = 1;
	var changeFontSize = function(fact){		
		$sbxHtmlTextarea.css({'fontSize': fact+'='+FontSizeGraduate+'px'});
		$sbxHtmlPre.css({'fontSize':fact+'='+FontSizeGraduate+'px'});		
		$sbxCssTextarea.css({'fontSize':fact+'='+FontSizeGraduate+'px'});
		$sbxCssPre.css({'fontSize':fact+'='+FontSizeGraduate+'px'});			
	}
	
	$sbxFontSizeDown.click(function(ev){
		ev.preventDefault();
		changeFontSize('-');		
	});
	$sbxFontSizeUp.click(function(ev){
		ev.preventDefault();
		changeFontSize('+');		
	});
	
	
	
	
	
	
	
	
	
	
});