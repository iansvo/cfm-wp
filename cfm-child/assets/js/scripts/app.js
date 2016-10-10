(function($) {

	$(document).ready(function() {
		// Init Foundation
		$(document).foundation(); 

		// JS Cleanup for WP & Foundation
		wpFoundation();

		// Sets up animated scrolling for fragment links
		scrollLinks(150);

	});


	$(window).load(function() {
		pageLoadAnimation();
	});


	// Manages LazyLoad animation
	function pageLoadAnimation()
	{
		if( typeof TweenMax == 'function' && typeof TimelineMax == 'function' )
		{
			var tl = new TimelineMax({delay: .6 });
			tl.to('.header', .5, {autoAlpha: 1, ease: Power2.easeOut})
			.to('#content', .5, {autoAlpha: 1, ease: Power2.easeOut})
			.to('.footer', .5, {autoAlpha: 1, ease: Power2.easeOut});
			TweenMax.set('#lazyLoader', {autoAlpha: 0});
		}
	}

	// Helper for creating a custom search submit
	function customSearch()
	{
		var $toggle = $('.custom_search .custom_search-submit'),
			$input  = $('.custom_search input[type="search"]'),
			homeUrl = location.protocol + '//' + location.hostname;

		// Bail early if no target present
		if( $toggle.length === 0 ) return false;

		$toggle.click(function(e) {
			e.preventDefault();

			if( $input.val() !== '' )
			{
				var encodedVal = encodeURIComponent( $input.val() );
				location.href = homeUrl + '/?s=' + encodedVal;
			}
		});
	}
	

	// Insures Foundation 6 and WP play nice
	function wpFoundation()
	{
		// Remove empty P tags created by WP inside of Accordion and Orbit
		$('.accordion p:empty, .orbit p:empty').remove();

		 // Makes sure last grid item floats left
		$('.archive-grid .columns').last().addClass( 'end' );

		// Adds Flex Video to YouTube and Vimeo Embeds
		$('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function() {
		if ( $(this).innerWidth() / $(this).innerHeight() > 1.5 ) {
		  $(this).wrap("<div class='widescreen flex-video'/>");
		} else {
		  $(this).wrap("<div class='flex-video'/>");
		}
		});		
	}

	function scrollLinks(offset) {
		var $targets = $('main a[href^="#"].scroll-link').not('.cta-link');

		if( $targets.length === 0 || typeof TweenMax != 'function' ) return false;

		function animateScroll(e, $target) {
			console.log($target);
			var dest   = $target.attr('href'),
			    pos    = $(dest).position().top - offset;

			e.preventDefault();
			//console.log('scrollLink Clicked');

			if( $(dest).length ) 
			{
				TweenMax.to(window, 1, {scrollTo: {y: pos}, ease: Power2.easeOut });
				history.pushState(null, null, e.target.hash);
				$('.scroll-target').removeClass('scroll-target');
				$(dest).addClass('scroll-target');
			}
		}

		$targets.click(function(e) {
			animateScroll( e, $(this) );
		});

		$('.header_nav li a[href^="#"]').each(function() {
			var href = $(this).attr('href');

			if( href.length > 1 )
			{
				$(this).click(function(e) {
					console.log(e);
					animateScroll( e, $(this) );
				});
			}
		});
	}

})(jQuery)