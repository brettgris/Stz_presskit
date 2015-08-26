;(function($, window, document, undefined) {
    /*****************
    HandleBar Template Loader Plugin
    ******************/
    $.pageswitcher = function(options) {
	    var defaults = {
		    //REQUIRED
			links: '.plink',
			mobile: '.mplink',
			pages: '.section',
			bgtarget: 'body',
			bgattr: 'bg',
			bgsize: 'cover',
			attr: 'path',
			speed: 500,
			current: 'home',
			mobilebtn: '.mobilelink',
			mobilecontainer: '.mobile-list',
			backgrounds: true,
			onChange: function(){}
	    }
	    
	    /******************
		 VARS
		*******************/
	    var plugin = this;
	    plugin.settings = {};
	    
	    /******************
		 CONSTRUCTOR
		*******************/
	    plugin.init = function(){
		    plugin.settings = $.extend(defaults, options || {});
		    plugin.links = $( plugin.settings.links );
		    plugin.mobile = $( plugin.settings.mobile );
		    plugin.pages = $( plugin.settings.pages );
		    plugin.target =  $( plugin.settings.bgtarget );
		    plugin.current = plugin.settings.current;
		    plugin.setupPages();
			plugin.addClicks();
	    }
	    
	    /******************
		 SET UP PAGES
		*******************/
	    plugin.setupPages = function(){
		    plugin.pages.hide();
		    
		    $('.'+plugin.current).show();
		    plugin.settings.onChange.call(plugin,  plugin.pages.attr('id') );
		    
		    if ( $('.l'+plugin.current ).length>0 ) {
			    plugin.target.css('background', $('.l'+plugin.current ).attr(plugin.settings.bgattr) );
				plugin.target.css('background-size', plugin.settings.bgsize);
			}
		    else plugin.target.attr( 'style', '' );
		}
	    
	    /******************
		 ADD CLICK EVENTS
		*******************/
	    plugin.addClicks = function(){
			$( plugin.settings.links ).click(function(){
				plugin.loadPage( $(this).attr(plugin.settings.attr) );
			});  
			$( plugin.settings.mobile ).click(function(){
				plugin.loadPage( $(this).attr(plugin.settings.attr) );
			});
			$( plugin.settings.mobilebtn ).click(function(){
				var c = $( plugin.settings.mobilecontainer );
				if(c.css('display')!='none'){
					c.hide();
				}else {
					c.slideDown(plugin.settings.speed);
				}
			});
			
			$(plugin.settings.logo).click(function(){
				plugin.loadPage( $(this).attr('path') );
			});
		}
		
		/******************
		 LOAD PAGE
		*******************/
		plugin.loadPage = function( t ){
			$( plugin.settings.mobilecontainer ).hide();
			
			if ( plugin.current != t ){
				$('.'+plugin.current ).fadeOut(plugin.settings.speed, function(){
					var n = $('.'+t).fadeIn(plugin.settings.speed);
					
					plugin.settings.onChange.call(plugin,  $('.'+t).attr('id') );
					plugin.current = t;
					if( plugin.settings.backgrounds ) {
						plugin.target.css('background', $('.l'+plugin.current ).attr(plugin.settings.bgattr));
						plugin.target.css('background-size', plugin.settings.bgsize);
					}
				});
			}
		} 
	   
	    /******************
		 START THE PARTY
		*******************/
	    plugin.init(options);
	    
		/******************
		 RETURN
		*******************/
	    return plugin;
    }
})(jQuery, window, document);

