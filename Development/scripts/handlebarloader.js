;(function($, Handlebars, window, document, undefined) {
    /*****************
    HandleBar Template Loader Plugin
    ******************/
    $.loadTemplates = function(options) {
	    var defaults = {
		    //REQUIRED
			url: 'data/loads.json',
			onEnded: function(){}
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
		    plugin.loadJSON();
	    }
	    
	    /******************
		 Load the Main JSON
		*******************/
	    plugin.loadJSON = function(){
		    $.getJSON(plugin.settings.url, function(data) {
			    plugin.loads = data.loads.length;
			    plugin.count = 0;
		    	for (var i in data.loads){
			    	plugin.loadData(data.loads[i]);
			    }
			});
	    }
	    
	    /******************
		 Load All the JSON files
		*******************/
		plugin.loadData = function(info){
			$.ajax({
				url: info.data,
				dataType: 'json',
				success: function (data){
					plugin.loadTemplate(data, info)
				}
			});
		}
		
		/******************
		 Load the data in HTML templates
		*******************/
		plugin.loadTemplate = function(data, info){
			var source = $(info.template).html();
			var template = Handlebars.compile(source);
			var html = template(data);
			$(info.parent).html(html);
			
			plugin.count++;
			if(plugin.count==plugin.length) plugin.ended();
		}	
		
		/******************
		 Plugin Ended
		*******************/
		plugin.ended = function(){
			setTimeout( function(){
				plugin.settings.onEnded.call()
			}, 100);
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
})(jQuery, Handlebars, window, document);

