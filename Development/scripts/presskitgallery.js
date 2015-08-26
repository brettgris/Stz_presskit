;(function($, window, document, undefined) {
	var presskitGallery = function(el,options){
		var $el = $(el);
		var plugin = this;
		var settings = $.extend({
        	thumbs: '.thumbs',
			list: '.list',
		    attr: 'n',
		    current: 0,
		    viewcontainer: '.container',
		    viewer: '.view',
		    next: '.next',
		    prev: '.prev',
		    close: '.close', 
		    speed: 1,
		    selected: 'selected',
		    source: '<img src={{path}} />',
		    caption: '.image-desc',
		    captionsource: '{{caption}}',
		    onStart: function(){},
		    onSwitch: function(){},
		    onEnd: function(){}
    	}, options || {});	  
    	var data = {};
    	
    	this.el = $el;
    	this.init = function(){
	    	data.thumbs = $el.find(settings.thumbs);
			data.list = $el.find(settings.list);
		    data.viewcontainer = $el.find(settings.viewcontainer);
		    data.viewer = $el.find(settings.viewer);
		    data.caption = $el.find(settings.caption);
		    data.close = $el.find(settings.close);
		    data.current = 0;
		    
		    addClickEvents();
    	}
    	
    	/******************
		 ADD CLICK EVENTS
		*******************/
    	function addClickEvents(){
	    	//THUMB CLICK
			data.thumbs.click(function(){
				var n = Number( $(this).attr(settings.attr) );
				showViewer( n );	
			});
			
			//NEXT CLICK
			$el.find(settings.next).click(function(){
				var n = data.current;
				n++;
				if(n==data.thumbs.length) n=0; 
				changeTo( n );
			});
			
			//PREV CLICK
			$el.find(settings.prev).click(function(){
				var n = data.current;
				n--;
				if(n<0) n=data.thumbs.length-1; 
				changeTo( n );
			});
			
			//CLOSE CLICK
			data.close.click(function(){
				data.viewcontainer.hide();
				data.list.show();
			});
			
			data.viewcontainer.swipe({
				swipeLeft:function(){
					$el.find(settings.next).trigger("click");
				},
				swipeRight:function(){
					$el.find(settings.prev).trigger("click");
				}
			});	
    	}
    	
    	/******************
		 CHANGE ELEMENT TO
		*******************/
		function changeTo(num){
			settings.onStart.call( undefined, data.thumbs.eq(data.current) );
			
			data.viewer.children().fadeOut(settings.speed*1000,function(){
				$(this).remove();
				
				data.current = num;
				settings.onSwitch.call(undefined, data.thumbs.eq(data.current));
				
				var source = settings.source;
				source = findandreplace(source, data.thumbs.eq(data.current));
				data.viewer.html(source);
				
				var caption = findandreplace(settings.captionsource, data.thumbs.eq(data.current) );
				data.caption.html( caption );
				
				data.viewer.children().hide().fadeIn(settings.speed*1000, function(){
					settings.onEnd.call( undefined, data.thumbs.eq(data.current) );
				});
				
			});
		}
    	
    	/******************
		 SHOW VIEWER
		*******************/
    	function showViewer(num){
	    	data.current = num;
	    	
	    	settings.onStart.call( undefined, data.thumbs.eq(data.current) );
			
			data.list.hide();
			data.viewer.html("");
			data.viewcontainer.show();
			
			var source = settings.source;
			source = findandreplace(source, data.thumbs.eq(data.current));
			data.viewer.html(source);
			
			var caption = findandreplace(settings.captionsource, data.thumbs.eq(data.current) );
			data.caption.html( caption );
			
			data.viewer.children().hide().fadeIn(settings.speed*1000, function(){
				settings.onEnd.call( undefined, data.thumbs.eq(data.current) );
			});
    	}
    	
    	/******************
		 FIND AND REPLACE ATTRs in {attr}
		*******************/
		function findandreplace(source, target){
			var arr = source.split("{{");
			for ( var i=0; i<arr.length; i++ ){
				var s = arr[i].split("}}");
				if(s.length>1) {
					s[0] = target.attr(s[0]);
				}	
				arr[i] = s.join('');
			}
			
			source = arr.join("");
			return source;
		}
	}
    
    /******************
	 INIT
	*******************/
	$.fn.presskitGallery = function(options){
		return this.each(function(){
			var $el = $(this);
			var plugin = new presskitGallery(this, options);
			$el.data('presskitGallery', plugin);
			plugin.init();
		});
	}
    
    
})(jQuery, window, document);

