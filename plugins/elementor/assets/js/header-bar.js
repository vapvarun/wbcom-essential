( function( $ ) {
	"use strict";
	
	
	var wbcom_headerbar = function() {
		
		$('.site-header--elementor .header-search-link').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('search-visible-el');
			if ( ! navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
				setTimeout(function () {
					$('body').find('.header-search-wrap--elementor .search-field-top').focus();
				}, 90);
			}
		});
		
		$('.site-header--elementor .close-search').on('click', function (e) {
			e.preventDefault();
			$('body').removeClass('search-visible-el');
			$('.header-search-wrap--elementor input.search-field-top').val('');
		});
		
		$(document).click(function (e) {
			var container = $('.header-search-wrap--elementor, .site-header--elementor .header-search-link');
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$('body').removeClass('search-visible-el');
			}
		});

		$(document).keyup(function (e) {
			if (e.keyCode === 27) {
				$('body').removeClass('search-visible-el');
			}
		});
		
		$( document ).on(
			'click',
			'.header-aside div.menu-item-has-children > a',
			function ( e ) {
				e.preventDefault();
				var current = $( this ).closest( 'div.menu-item-has-children' );
				current.siblings( '.selected' ).removeClass( 'selected' );
				current.toggleClass( 'selected' );
			}
		);
			
		$( 'body' ).mouseup(
			function ( e ) {
				var container = $( '.header-aside div.menu-item-has-children *' );
				if ( !container.is( e.target ) ) {
					$( '.header-aside div.menu-item-has-children' ).removeClass( 'selected' );
				}
			}
		);
		
	}	
	
	
	
	jQuery(window).on('elementor/frontend/init', () => {	 
		elementorFrontend.hooks.addAction('frontend/element_ready/wbcom-header-bar.default', wbcom_headerbar);
	});

})( jQuery );