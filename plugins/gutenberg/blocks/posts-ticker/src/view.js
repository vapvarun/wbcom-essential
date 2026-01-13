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
		let manuallyPaused = false; // Track manual pause separately from hover pause.
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

			typewriter: () => {
				let intervalId;
				let timeoutId;

				// Hide all items.
				items.forEach( ( item ) => {
					item.style.opacity = '0';
					item.style.display = 'none';
				} );

				const typeItem = () => {
					if ( isPaused ) return;

					const currentItem = items[ currentIndex ];
					const link = currentItem.querySelector( '.wbcom-essential-posts-ticker__link' );
					if ( ! link ) return;

					const fullText = link.dataset.fullText || link.textContent;
					if ( ! link.dataset.fullText ) {
						link.dataset.fullText = fullText;
					}

					let charIndex = 0;
					currentItem.style.opacity = '1';
					currentItem.style.display = 'flex';
					currentItem.style.position = 'absolute';
					currentItem.style.top = '0';
					currentItem.style.left = '0';
					currentItem.style.right = '0';

					const typeChar = () => {
						if ( isPaused ) return;

						charIndex++;
						link.textContent = fullText.substring( 0, charIndex );

						if ( charIndex >= fullText.length ) {
							clearInterval( intervalId );
							// Wait then move to next.
							timeoutId = setTimeout( () => {
								currentItem.style.opacity = '0';
								currentItem.style.display = 'none';
								currentIndex = ( currentIndex + 1 ) % items.length;
								typeItem();
							}, speed * 40 ); // Wait time before next item.
						}
					};

					intervalId = setInterval( typeChar, speed );
				};

				list.style.position = 'relative';
				typeItem();

				// Store interval for cleanup.
				ticker.typewriterInterval = intervalId;
				ticker.typewriterTimeout = timeoutId;
			},
		};

		// Navigation controls.
		const goToPrev = () => {
			if ( tickerType === 'vertical' ) {
				currentIndex = ( currentIndex - 1 + items.length ) % items.length;
				const itemHeight = items[ 0 ].offsetHeight;
				list.style.transform = `translateY(-${ currentIndex * itemHeight }px)`;
			} else if ( tickerType === 'typewriter' ) {
				items[ currentIndex ].style.opacity = '0';
				items[ currentIndex ].style.display = 'none';
				currentIndex = ( currentIndex - 1 + items.length ) % items.length;
				const currentItem = items[ currentIndex ];
				const link = currentItem.querySelector( '.wbcom-essential-posts-ticker__link' );
				if ( link && link.dataset.fullText ) {
					link.textContent = link.dataset.fullText;
				}
				currentItem.style.opacity = '1';
				currentItem.style.display = 'flex';
			}
		};

		const goToNext = () => {
			if ( tickerType === 'vertical' ) {
				currentIndex = ( currentIndex + 1 ) % items.length;
				const itemHeight = items[ 0 ].offsetHeight;
				list.style.transform = `translateY(-${ currentIndex * itemHeight }px)`;
			} else if ( tickerType === 'typewriter' ) {
				items[ currentIndex ].style.opacity = '0';
				items[ currentIndex ].style.display = 'none';
				currentIndex = ( currentIndex + 1 ) % items.length;
				const currentItem = items[ currentIndex ];
				const link = currentItem.querySelector( '.wbcom-essential-posts-ticker__link' );
				if ( link && link.dataset.fullText ) {
					link.textContent = link.dataset.fullText;
				}
				currentItem.style.opacity = '1';
				currentItem.style.display = 'flex';
			}
		};

		const togglePause = () => {
			// Toggle manual pause state - this takes precedence over hover.
			manuallyPaused = ! manuallyPaused;
			isPaused = manuallyPaused;

			const pauseIcon = pauseBtn?.querySelector( '.pause-icon' );
			const playIcon = pauseBtn?.querySelector( '.play-icon' );

			if ( pauseIcon && playIcon ) {
				pauseIcon.style.display = manuallyPaused ? 'none' : 'block';
				playIcon.style.display = manuallyPaused ? 'block' : 'none';
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

		// Pause on hover - only when NOT manually paused.
		if ( pauseOnHover ) {
			ticker.addEventListener( 'mouseenter', () => {
				if ( ! manuallyPaused ) {
					isPaused = true;
				}
			} );

			ticker.addEventListener( 'mouseleave', () => {
				if ( ! manuallyPaused ) {
					isPaused = false;
				}
			} );
		}

		// Start animation.
		if ( animations[ tickerType ] ) {
			animations[ tickerType ]();
		}
	} );
} );
