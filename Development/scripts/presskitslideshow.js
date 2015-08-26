;(function($, TweenLite, window, document, undefined) {
	var presskitSlideShow = function(el,options){
		var $el = $(el);
		var plugin = this;
		var settings = $.extend({
        	'thumbs': '.thumbs',
		    'attr': 'n',
		    'current':0,
		    'items': '.items',
		    'next': '.next',
		    'prev': '.prev', 
		    'speed': 1,
		    'selected': 'selected',
		    'directional': true,
		    onStart: function(){},
		    onSwitch: function(){},
		    onEnd: function(){}
    	}, options || {});	  
    	var data = {};
    	
    	this.el = $el;
    	this.init = function(){
	    	data.current = settings.current;
		    data.items = $el.find(settings.items);
		    data.thumbs = $el.find(settings.thumbs);
		    data.thumbs.eq( data.current ).addClass(settings.selected);
		    
		    addClickEvents();
    	}
    	
    	/******************
		 ADD CLICK EVENTS
		*******************/
		function addClickEvents(){
			//THUMB CLICK
			data.thumbs.click(function(){
				var n = Number( $(this).attr(settings.attr) );
				if (n!=data.current) {
					var d = (n>data.current) ? 1 : 0;
					changeTo( n, d );	
				}
			});
			
			//NEXT CLICK
			$el.find(settings.next).click(function(){
				var n = data.current;
				n++;
				if(n==data.items.length) n=0; 
				changeTo( n, 1 );
			});
			
			//PREV CLICK
			$el.find(settings.prev).click(function(){
				var n = data.current;
				n--;
				if(n<0) n=data.items.length-1; 
				changeTo( n, -1 );
			});
			
			data.items.swipe({
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
		function changeTo(num, d){
			var s,e;
			if (d==1 || !settings.directional) {
				s = "-100%";
				e = "200%";
			} else {
				s = "200%";
				e = "-100%";
			}
			
			settings.onStart.call( undefined, data.items.eq(data.current) );
			
			TweenLite.to( data.items.eq(data.current), settings.speed, {
				'left':s,
				onComplete: function(){
					data.items.eq(data.current).attr("style","").hide();
					
					
					
					settings.onSwitch.call(undefined, data.items.eq(data.current));
					
					TweenLite.from( data.items.eq(data.current), settings.speed, {
						'left':e,
						onComplete:function(){
							settings.onEnd.call(undefined, data.items.eq(data.current));
							data.items.eq(data.current).attr("style","").show();
						}
					});
					data.items.eq(data.current).show();
					
				}	
			});
			
			data.thumbs.eq( data.current ).removeClass(settings.selected);
			data.current = num;
			data.thumbs.eq( data.current ).addClass(settings.selected);
		}
	}
    
    /******************
	 INIT
	*******************/
	$.fn.presskitSlideShow = function(options){
		return this.each(function(){
			var $el = $(this);
			var plugin = new presskitSlideShow(this, options);
			$el.data('presskitSlideShow', plugin);
			plugin.init();
		});
	}
    
    
})(jQuery, TweenLite, window, document);

