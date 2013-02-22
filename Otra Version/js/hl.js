(function(){
	var iSpn = 'I__NI_T_SP_A_N';
	var	iSpnb = 'I_SPA_NB';
	var	fSpn = 'I_SSP_AN';
	
	h = {
		elemString : '',
		custCss : false,
		set : function(st){
			this.elemString = st;
			return this;			
		},
		result : function(){
			return this.elemString;	
		},
		paint : function(st,cl){
			this.elemString = st;
			this.saveHtmlTags();
			//
			if(cl === 'css'){
				this.brushCss();
			}
			if(cl === 'js'||cl === 'javascript'){
				this.brushJs();
			}
			if(cl === 'html'||cl === 'xml'){
				this.brushHtml();
			}
			if(cl === 'php'){
				this.brushHtml().brushPhp();
			}			
			this.releaseSpan();
			this.replaceWord(/\n$/,'');
			return this.elemString;			
		},
		//Utilities
		
		matchString1 : /\"[^\"\n]*\"/g,
		matchString2 : /\'[^\'\n]*\'/g,
		//'
		saveHtmlTags : function(){ //Replace "<" and ">" with "&lt;" and "&gt;"
			this.replaceWord('<','&lt;').replaceWord('>','&gt;');
			return this;
		},		
		replaceWord : function(arg,str){
			if(typeof arg === 'string'){
				var re = new RegExp(arg, "g");
			}else{
				var re = arg;
			}			
			this.elemString = this.elemString.replace(re,str);
			return this;
		},
		high : function(arg,cl,param,bord){
			this.wrap(arg,iSpn+cl+iSpnb,fSpn,param,bord);
			return this;
		},
		highKeys : function(listKeys,cl,param,bord){
				function compar(a,b){// reverse alphabetical order					if (a > b){return -1;}else if (b > a){return 1;}else{return 0;}
				}
				listKeys.sort(compar);
				for(var ik=0;ik<listKeys.length;ik++){
					this.high(listKeys[ik],cl,param,bord);
				}
				return this;
		},
		wrap : function(arg,st1,st2,param,bord){
			if(typeof arg === 'string'){
				if(param === undefined){
					param = 'g';
				}
				if(bord === undefined){
					bord = '\\b';
				}
				var re = new RegExp(bord+arg+bord, param);
			}else{
				var re = arg;
				
			}
			this.elemString = this.elemString.replace(re,st1+'$&'+st2);
			return this;
		},
		saveTabs : function(){
			this.replaceWord(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');
			return this;
		},
		//Brushes
		brushCss : function(){
			var cssKeys = ['azimuth', 'background', 'background-attachment', 'background-color', 'background-image', 'background-position', 'background-repeat', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-style', 'border-bottom-width', 'border-radius', 'box-shadow', 'word-wrap','border-collapse', 'border-color', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'caption-side', 'clear', 'clip', 'color', 'content', 'counter-increment', 'counter-reset', 'cue', 'cue-after', 'cue-before', 'cursor', 'direction', 'display', 'elevation', 'empty-cells', 'float', 'font', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'height', 'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'marker-offset', 'marks', 'max-height', 'max-width', 'min-height', 'min-width', 'orphans', 'outline', 'outline-color', 'outline-style', 'outline-width', 'overflow', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page', 'page-break-after', 'page-break-before', 'page-break-inside', 'pause', 'pause-after', 'pause-before', 'pitch', 'pitch-range', 'play-during', 'position', 'quotes', 'richness', 'right', 'size', 'speak', 'speak-header', 'speak-numeral', 'speak-ponctuation', 'speech-rate', 'stress', 'table-layout', 'text-align', 'text-decoration', 'text-indent', 'text-shadow', 'text-transform', 'top', 'unicode-bidi', 'vertical-align', 'visibility', 'voice-family', 'volume', 'white-space', 'widows', 'width', 'word-spacing', 'z-index'];			
			
			this.highKeys(cssKeys,'K','gi')
			.high(/:.*;/g,'S')
			.replaceWord(/\/\*/g,iSpn+'C'+iSpnb+'/*')
			.replaceWord(/\*\//g,'*/'+fSpn);			
			return this;
		},
		brushJs : function(){
			var jsKeys = ['abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'enum', 'export', 'extends', 'final', 'finally', 'float', 'goto', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'typeof', 'var', 'void', 'volatile', 'with', 'prototype'];
			var jsKeysBold = ['true','false', 'function', 'while', 'if', 'else', 'for', 'in', 'return'];
			
			this.high(this.matchString1,'S')
			.high(this.matchString2,'S')
			.highKeys(jsKeys,'K')
			.highKeys(jsKeysBold,'K')
			.high(/\b\d+\b/g,'N')
			.high(/\/\/.*/g,'C')
			.replaceWord(/\/\*/g,iSpn+'C'+iSpnb+'/*')
			.replaceWord(/\*\//g,'*/'+fSpn);	
			
			return this;
		},
		brushHtml : function(){
			this.high(this.matchString1,'S')
			.high(this.matchString2,'S')
			this.elemString = iSpn+'E'+iSpnb + this.elemString + fSpn;
			this.replaceWord(/&lt;\?[php]*/gi,fSpn+iSpn+'A'+iSpnb+iSpn+'N'+iSpnb+'$&'+fSpn)
			.replaceWord(/\?&gt;/g,iSpn+'N'+iSpnb+'$&'+fSpn+fSpn+iSpn+'E'+iSpnb)
			.replaceWord(/&lt;[\/\\\w]+/g,fSpn+iSpn+'A'+iSpnb+iSpn+'K'+iSpnb+'$&'+fSpn)		
			
			.replaceWord(/[^\?]&gt;/g,iSpn+'K'+iSpnb+'&gt;'+fSpn+fSpn+iSpn+'E'+iSpnb)
			.replaceWord(/&lt;!\-\-/g,fSpn+iSpn+'C'+iSpnb+'$&');
			return this;
		},
		brushPhp : function(){
			var phpKeys = ['and', 'or', 'xor', 'file', 'line', 'array', 'as', 'break', 'case', 'cfunction', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'for', 'foreach', 'function', 'global', 'if', 'include', 'include_once', 'isset', 'list', 'new', 'old_function', 'print', 'require', 'require_once', 'return', 'static', 'switch', 'unset', 'use', 'var', 'while', 'function', 'php_version', 'php_os', 'default_include_path', 'pear_install_dir', 'pear_extension_dir', 'php_extension_dir', 'php_bindir', 'php_libdir', 'php_datadir', 'php_sysconfdir', 'php_localstatedir', 'php_config_file_path', 'php_output_handler_start', 'php_output_handler_cont', 'php_output_handler_end', 'e_error', 'e_warning', 'e_parse', 'e_notice', 'e_core_error', 'e_core_warning', 'e_compile_error', 'e_compile_warning', 'e_user_error', 'e_user_warning', 'e_user_notice', 'e_all', 'true', 'false', 'bool', 'boolean', 'int', 'integer', 'float', 'double', 'real', 'string', 'array', 'object', 'resource', 'null',  'extends', 'parent', 'stdclass', 'directory', 'sleep', 'wakeup', 'interface', 'implements', 'abstract', 'public', 'protected', 'private'];
			
			this.highKeys(phpKeys,'KB')
			.high(/\/\/.*/g,'C')
			.replaceWord(/\/\*/g,iSpn+'C'+iSpnb+'/*')
			.replaceWord(/\*\//g,'*/'+fSpn);
			
		},
		releaseSpan : function(){
			if(this.custCss){
				this.replaceWord(fSpn,'</span>')
				.replaceWord('I_SSP_A','</span>')
				.replaceWord(iSpn+'C'+iSpnb,'<span class="comment">')
				.replaceWord(iSpn+'S'+iSpnb,'<span class="string">')
				.replaceWord(iSpn+'K'+iSpnb,'<span class="keyword">')
				.replaceWord(iSpn+'KB'+iSpnb,'<span class="keyword bold">')
				.replaceWord(iSpn+'N'+iSpnb,'<span class="number">')
				.replaceWord(iSpn+'E'+iSpnb,'<span class="neutral">')
				.replaceWord(iSpn+'A'+iSpnb,'<span class="attribute">');				
				return this;
			}else{
				this.replaceWord(fSpn,'</span>')
				.replaceWord('I_SSP_A','</span>')
				.replaceWord(iSpn+'C'+iSpnb,'<span style="color:#00AF00 !important;font-weight:normal !important;">')
				.replaceWord(iSpn+'S'+iSpnb,'<span style="color:#d3d;font-weight:normal;">')
				.replaceWord(iSpn+'K'+iSpnb,'<span style="color:#77f;">')
				.replaceWord(iSpn+'KB'+iSpnb,'<span style="color:#77f;font-weight:bold;">')
				.replaceWord(iSpn+'N'+iSpnb,'<span style="color:#f00;">')
				.replaceWord(iSpn+'E'+iSpnb,'<span style="color:#333 !important;font-weight:normal !important;">')
				.replaceWord(iSpn+'A'+iSpnb,'<span style="color:#7F7F33;">');				
				return this;
			}
		}
		
		
	}
	if(!window.$$hl){
	window.$$hl = h;
	}
	
})();