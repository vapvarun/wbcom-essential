/**
 * Posts Ticker Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const tickers = document.querySelectorAll( '.wbcom-essential-posts-ticker' );

	tickers.forEach( ( ticker ) => {
		const tickerType = ticker.dataset.tickerType || 'horizontal';
		const speed = parseInt( ticker.dataset.speed, 10 ) || 50;
		const pauseOnHover = ticker.dataset.pauseOnHover === 'true';

		const track = ticker.querySelector( '.wbcom-essential-posts-ticker__track' );
		const list = ticker.querySelector( '.wbcom-essential-posts-ticker__list' );
		const items = ticker.querySelectorAll( '.wbcom-essential-posts-ticker__item' );

		if ( ! track || ! list || items.length === 0 ) {
			return;
		}

		const prevBtn = ticker.querySelector( '.wbcom-essential-posts-ticker__prev' );
		const nextBtn = ticker.querySelector( '.wbcom-essential-posts-ticker__next' );
		const pauseBtn = ticker.querySelector( '.wbcom-essential-posts-ticker__pause' );

		let isPaused = false;
		let currentIndex = 0;
		let animationId = null;
		let position = 0;

		// Clone items for seamless loop (horizontal/marquee).
		if ( tickerType === 'horizontal' || tickerType === 'marquee' ) {
			const clone = list.cloneNode( true );
			clone.classList.add( 'wbcom-essential-posts-ticker__list--clone' );
			track.appendChild( clone );
		}

		// Animation functions for different types.
		const animations = {
			horizontal: () => {
				const listWidth = list.offsetWidth;

				const animate = () => {
					if ( isPaused ) {
						animationId = requestAnimationFrame( animate );
						return;
					}

					position -= 1;
					if ( Math.abs( position ) >= listWidth ) {
						position = 0;
					}

					track.style.transform = `translateX(${ position }px)`;
					animationId = requestAnimationFrame( animate );
				};

				// Delay based on speed (higher speed value = slower animation).
				const startAnimation = () => {
					if ( animationId ) return;
					animate();
				};

				startAnimation();
			},

			marquee: () => {
				const listWidth = list.offsetWidth;
				const speedMultiplier = ( 200 - speed ) / 100;

				const animate = () => {
					if ( isPaused ) {
						animationId = requestAnimationFrame( animate );
						return;
					}

					position -= speedMultiplier;
					if ( Math.abs( position ) >= listWidth ) {
						position = 0;
					}

					track.style.transform = `translateX(${ position }px)`;
					animationId = requestAnimationFrame( animate );
				};

				animate();
			},

			vertical: () => {
				const itemHeight = items[ 0 ].offsetHeight;
				let intervalId;

				const showNext = () => {
					if ( isPaused ) return;

					currentIndex = ( currentIndex + 1 ) % items.length;
					list.style.transform = `translateY(-${ currentIndex * itemHeight }px)`;
				};

				intervalId = setInterval( showNext, speed * 50 );

				// Store interval for cleanup.
				ticker.verticalInterval = intervalId;
			},

			fade: () => {
				let intervalId;

				// Hide all items except first.
				items.forEach( ( item, index ) => {
					item.style.opacity = index === 0 ? '1' : '0';
					item.style.position = 'absolute';
					item.style.top = '0';
					item.style.left = '0';
					item.style.right = '0';
				} );
				list.style.position = 'relative';

				const showNext = () => {
					if ( isPaused ) return;

					items[ currentIndex ].style.opacity = '0';
					currentIndex = ( currentIndex + 1 ) % items.length;
					items[ currentIndex ].style.opacity = '1';
				};

				intervalId = setInterval( showNext, speed * 50 );

				// Store interval for cleanup.
				ticker.fadeInterval = intervalId;
			},
		};

		// Navigation controls.
		const goToPrev = () => {
			if ( tickerType === 'vertical' ) {
				currentIndex = ( currentIndex - 1 + items.length ) % items.length;
				const itemHeight = items[ 0 ].offsetHeight;
				list.style.transform = `translateY(-${ currentIndex * itemHeight }px)`;
			} else if ( tickerType === 'fade' ) {
				items[ currentIndex ].style.opacity = '0';
				currentIndex = ( currentIndex - 1 + items.length ) % items.length;
				items[ currentIndex ].style.opacity = '1';
			}
		};

		const goToNext = () => {
			if ( tickerType === 'vertical' ) {
				currentIndex = ( currentIndex + 1 ) % items.length;
				const itemHeight = items[ 0 ].offsetHeight;
				list.style.transform = `translateY(-${ currentIndex * itemHeight }px)`;
			} else if ( tickerType === 'fade' ) {
				items[ currentIndex ].style.opacity = '0';
				currentIndex = ( currentIndex + 1 ) % items.length;
				items[ currentIndex ].style.opacity = '1';
			}
		};

		const togglePause = () => {
			isPaused = ! isPaused;

			const pauseIcon = pauseBtn?.querySelector( '.pause-icon' );
			const playIcon = pauseBtn?.querySelector( '.play-icon' );

			if ( pauseIcon && playIcon ) {
				pauseIcon.style.display = isPaused ? 'none' : 'block';
				playIcon.style.display = isPaused ? 'block' : 'none';
			}
		};

		// Event listeners.
		if ( prevBtn ) {
			prevBtn.addEventListener( 'click', goToPrev );
		}

		if ( nextBtn ) {
			nextBtn.addEventListener( 'click', goToNext );
		}

		if ( pauseBtn ) {
			pauseBtn.addEventListener( 'click', togglePause );
		}

		// Pause on hover.
		if ( pauseOnHover ) {
			ticker.addEventListener( 'mouseenter', () => {
				isPaused = true;
			} );

			ticker.addEventListener( 'mouseleave', () => {
				isPaused = false;
			} );
		}

		// Start animation.
		if ( animations[ tickerType ] ) {
			animations[ tickerType ]();
		}
	} );
} );
