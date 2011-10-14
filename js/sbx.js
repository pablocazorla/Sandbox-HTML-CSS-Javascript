/* Sandbox CSS/HTML v0.1
 * By Pablo Cazorla (pablo.cazorla@mercadoLibre.com) - Copyleft 2011.
 * Sandbox CSS/HTML v0.1 is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
 */ 
$(document).ready(function(){
	
	//VARIABLES:
	var cssSandbox_minimize = false
	var cssSandbox_dragging = false;
	var offX;
	var offY;
	var cssSandbox_reset_content = "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}";
	var intervalSandbox = null;
	
	//STORE ELEMENTS:
	var $cssSandbox_container = $('#cssSandbox-container');
	var $cssSandbox_html = $('#cssSandbox-html');
	var $cssSandbox_style_reset = $('#cssSandbox-style-reset');
	var $cssSandbox_style = $('#cssSandbox-style');
	var $cssSandbox_css = $('#cssSandbox-css');
	var $cssSandbox_content = $('#cssSandbox-content');
	var $cssSandbox_min = $('#cssSandbox-min');
	var $cssSandbox_board = $('#cssSandbox-board');
	var $cssSandbox_reset = $('#cssSandbox-reset');
	
	//REDRAW SANDBOX:	
	var redrawSandbox = function(){
		$cssSandbox_container.html($cssSandbox_html.val());
		$cssSandbox_style.html($cssSandbox_css.val());
	};	
	var getRedraw = function(cond){
		if(cond){			
			intervalSandbox = setInterval(redrawSandbox,20);			
		}else{			
			clearTimeout(intervalSandbox);			
		}
	};
	redrawSandbox();
	
	//EVENTS:
	$cssSandbox_html.focus(function(){
		getRedraw(true);		
	}).blur(function(){
		getRedraw(false);		
	});
	
	$cssSandbox_css.focus(function(){
		getRedraw(true);		
	}).blur(function(){
		getRedraw(false);		
	});
	
			
	//Drag and Drop #cssSandbox-board
	$('#cssSandbox-header-touch').mousedown(function(ev){
		offX = ev.pageX - $cssSandbox_board.offset().left;
		offY = ev.pageY - $cssSandbox_board.offset().top;
		cssSandbox_dragging = true;
		return false;
	});	
	$('body').mouseup(function(){
		cssSandbox_dragging = false;		
	}).mousemove(function(ev){
		if(cssSandbox_dragging){
			$cssSandbox_board.css({
				top : ev.pageY - offY,
				left : ev.pageX - offX
			});
		}		
	});
	
	//Minimize and Maximize #cssSandbox-board
	$cssSandbox_min.click(function(){
		if(cssSandbox_minimize){
			cssSandbox_minimize = false;
			$cssSandbox_min.attr('title','Minimize').html('-');
			$cssSandbox_content.slideDown(200);
		}else{
			cssSandbox_minimize = true;
			$cssSandbox_min.attr('title', 'Maximize').html('+');
			$cssSandbox_content.slideUp(200);
		}		
	});
	
	//Clear textareas
	$('#cssSandbox-clear-html').click(function(){
		$cssSandbox_html.val('');
		redrawSandbox();		
	});
	$('#cssSandbox-clear-css').click(function(){
		$cssSandbox_css.val('');
		redrawSandbox();		
	});
	
	//Reset CSS option	
	$cssSandbox_reset.change(function(){
		if($cssSandbox_reset.attr('checked')){
			$cssSandbox_style_reset.html(cssSandbox_reset_content);			
		}else{
			$cssSandbox_style_reset.html('');
		}
	});
	
	
	
})