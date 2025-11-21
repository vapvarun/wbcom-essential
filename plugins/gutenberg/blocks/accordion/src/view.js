document.addEventListener( 'DOMContentLoaded', function () {
	const accordions = document.querySelectorAll(
		'.wp-block-wbcom-essential-accordion'
	);

	accordions.forEach( function ( accordion ) {
		const items = accordion.querySelectorAll( '.accordion-item' );
		const settings = {
			openSingle: accordion.dataset.opensingle === 'true',
			selfClose: accordion.dataset.selfclose === 'true',
			autoScroll: accordion.dataset.autoscroll === 'true',
			scrollOffset: parseInt( accordion.dataset.scrolloffset ) || 0,
			scrollSpeed: parseInt( accordion.dataset.scrollspeed ) || 400,
			openSpeed: parseInt( accordion.dataset.openspeed ) || 200,
			closeSpeed: parseInt( accordion.dataset.closespeed ) || 200,
		};

		// Set initial states
		items.forEach( function ( item ) {
			const content = item.querySelector( '.accordion-content' );
			const transitionSpeed = item.classList.contains( 'is-open' )
				? settings.openSpeed
				: settings.closeSpeed;
			content.style.transition = `all ${ transitionSpeed }ms ease`;
			if ( item.classList.contains( 'is-open' ) ) {
				content.style.maxHeight = content.scrollHeight + 'px';
				content.style.opacity = '1';
				content.style.visibility = 'visible';
			} else {
				content.style.maxHeight = '0';
				content.style.opacity = '0';
				content.style.visibility = 'hidden';
			}
		} );

		items.forEach( function ( item ) {
			const header = item.querySelector( '.accordion-header' );
			const content = item.querySelector( '.accordion-content' );

			if ( ! header || ! content ) {
				return;
			}

			header.addEventListener( 'click', function ( e ) {
				e.preventDefault();

				const isOpen = item.classList.contains( 'is-open' );

				if ( settings.openSingle ) {
					items.forEach( function ( otherItem ) {
						if (
							otherItem !== item &&
							otherItem.classList.contains( 'is-open' )
						) {
							closeItem( otherItem, settings );
						}
					} );
				}

				if ( isOpen ) {
					closeItem( item, settings );
				} else {
					openItem( item, settings );

					if ( settings.autoScroll ) {
						setTimeout( function () {
							const offset = settings.scrollOffset;
							const elementPosition =
								item.getBoundingClientRect().top +
								window.pageYOffset -
								offset;

							window.scrollTo( {
								top: elementPosition,
								behavior: 'smooth',
							} );
						}, settings.openSpeed );
					}
				}
			} );
		} );

		if ( settings.selfClose ) {
			document.addEventListener( 'click', function ( e ) {
				if ( ! accordion.contains( e.target ) ) {
					items.forEach( function ( item ) {
						if ( item.classList.contains( 'is-open' ) ) {
							closeItem( item, settings );
						}
					} );
				}
			} );
		}
	} );

	function openItem( item, settings ) {
		const content = item.querySelector( '.accordion-content' );
		item.classList.add( 'is-open' );
		content.style.transition = `all ${ settings.openSpeed }ms ease`;
		content.style.visibility = 'visible';
		content.style.opacity = '1';
		content.style.maxHeight = content.scrollHeight + 40 + 'px';
	}

	function closeItem( item, settings ) {
		const content = item.querySelector( '.accordion-content' );
		item.classList.remove( 'is-open' );
		content.style.transition = `all ${ settings.closeSpeed }ms ease`;
		content.style.opacity = '0';
		content.style.maxHeight = '0';
		// Delay visibility hidden to allow transition
		setTimeout( function () {
			content.style.visibility = 'hidden';
		}, settings.closeSpeed );
	}
} );
