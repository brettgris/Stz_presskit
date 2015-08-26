(function ($, Presskit) {
	Presskit.Controller = (function(){
		var SPEED = .5;
		var art = {};
		/***************
		INIT
		****************/
		function init(){
			loadTemplates();
			$(window).resize(resize);
			resize();
		}
		
		/***************
		Load The Templates
		****************/
		function loadTemplates(){
			$.loadTemplates({
				url: "data/loads.json",
				onEnded: templatesDone
			});
		}
		
		/***************
		Templates All Loaded. 
		HAVE FULL HTML NOW
		****************/
		function templatesDone(){			
			//SET UP MENU
			$.pageswitcher({
				links: '.plink',
				mobile: '.mplink',
				pages: '.section',
				attr: 'path',
				bgtarget: 'body',
				bgattr: 'bg',
				speed: 250,
				mobilebtn: '.mobile-link',
				mobilecontainer: '.mobile-menu',
				logo: '.logo',
				backgrounds: true
			});
			
			loadSlideShows();
			loadGalleries();
		}
		
		/***************
		Load Slideshows
		****************/
		function loadSlideShows(){
			//CAST
			$('.cast').presskitSlideShow({
				thumbs:'.t-cast',
				items:'.character',
				next: '.cast-next',
				prev: '.cast-prev',
				speed: .5,
				selected: 'selected',
				directional: true
			});
			
			//PROD
			$('.production').presskitSlideShow({
				thumbs:'.t-prod',
				items:'.prod',
				next: '.prod-next',
				prev: '.prod-prev',
				speed: .5,
				selected: 'selected',
				directional: true,
				onSwitch: function( next ){
					if(next.attr("image")=="true") $('.prod-arrows').addClass("withimage");
					else $('.prod-arrows').removeClass("withimage");
				}
			});
		}
		
		/***************
		Load GALLERIES
		****************/
		function loadGalleries(){
			//PHOTO GALLERY
			$('.gallery').presskitGallery({
				thumbs:'.gallery-item',
				list: '.gallery-list',
				viewcontainer: '.gallery-view',
				viewer:'.image-view',
				next: '.g-next',
				prev: '.g-prev',
				close: '.g-close',
				speed: .5,
				selected: 'selected',
				source: '<img src="{{path}}" />',
				caption: '.image-desc',
				captionsource: '{{caption}}'
			});
			
			//VIDEOS
			$('.videos').presskitGallery({
				thumbs:'.video-item',
				list: '.video-items',
				viewcontainer: '.video-container',
				viewer:'.videoplayer-content',
				close: '.closevideo',
				speed: .5,
				selected: 'selected',
				source: '<iframe src="{{path}}?footer=false&amp;cid=010815ots1tr1" width="100%" height="100%" frameborder="0"></iframe>',
				path: 'path',
				caption: '.player-copy',
				captionsource: '<div class="video-name">{{name}}</div><div class="video-desc">{{desc}}</div>'
			});
		}
		
		function resize(){
			var ww = $(window).width();
			var wh = $(window).height();
			var fh = $('.footer').height();
			var ct = Number( $('.content').css('top').slice(0,-2) );
			
			var ah = wh-fh-ct;
			
			$('.keyart').height(ah);
		}
		
		/***************
		PUBLIC
		****************/
		return {
			init:init
		}
	})();
})($,Presskit);