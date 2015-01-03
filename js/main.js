/**
 * transform.js
 *
 * Detect CSS3 Transform support in browsers.
 */
var supports = ( function() {
	var div = document.createElement( 'div' ),
	    vendors = 'Khtml Ms O Moz Webkit'.split( ' ' ),
	    len = vendors.length;

	return function( prop ) {
		if ( prop in div.style ) {
			return true;
		}

		prop = prop.replace( /^[a-z]/, function( val ) {
			return val.toUpperCase();
		} );

		while ( len-- ) {
			if ( vendors[len] + prop in div.style ) {
				return true;
			}
		}
		return false;
	};
} ) ();

if ( supports( 'transform' ) ) {
	// Add a css-transform class to the html element
	document.documentElement.className += ' css-transform';
};

(function($){

	/*
	 * Resize portfolio-wrapper for full width on small screens.
	 */
	function calc(){

		$( '.portfolio-wrapper' ).each( function() {
			if( $( window ).width() < 768 ) {
	    		$( this ).css( 'width', '100%' ).css( 'width', '+=40px' );
	    		if ( $( 'body' ).hasClass( 'rtl' ) ) {
		    		$( this ).css( 'margin-right', '-20px' );
	    		} else {
		    		$( this ).css( 'margin-left', '-20px' );
	    		}
			} else if( $( window ).width() < 960 ) {
	    		$( this ).css( 'width', '100%' ).css( 'width', '+=120px' );
	    		if ( $( 'body' ).hasClass( 'rtl' ) ) {
		    		$( this ).css( 'margin-right', '-60px' );
	    		} else {
		    		$( this ).css( 'margin-left', '-60px' );
	    		}
			} else {
				$( this ).css( {
					'width': '',
					'margin-right': '',
					'margin-left': ''
				} );
			}
		} );

	}

	$(window).load(function(){

		/*
		 * Wrap portfolio-featured-image in a div.
		 */
		$( '.portfolio-featured-image' ).each( function() {
			$( this ).wrap( '<div class="portfolio-thumbnail" />' );
		} );

		calc();

		var portfolio_wrapper = $( '.portfolio-wrapper, .jetpack-portfolio-shortcode' );

		portfolio_wrapper.imagesLoaded(function(){

			portfolio_wrapper.masonry({
				columnWidth: 1,
				itemSelector: '.portfolio-entry',
				transitionDuration: 0
			});

			$('html').removeClass('css-transform');

			$('#spinner').fadeOut( 250, function(){
				$(this).remove();
			});

			$('#primary').delay(500).animate( {
				'opacity': 1
			},250);

			// Show the blocks
			$( '.portfolio-entry' ).animate( {
				'opacity' : 1
			}, 250);
		});

		$(window).resize(function(){
			// Force layout correction after 1500 milliseconds
			setTimeout( function () {
				calc();
				portfolio_wrapper.masonry();
			}, 1500 );
		});
	});

})(jQuery);