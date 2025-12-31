/**
 * Frontend JavaScript for the Slider block
 *
 * @package wbcom-essential
 */
document.addEventListener('DOMContentLoaded', function() {
	const sliders = document.querySelectorAll('.wp-block-wbcom-essential-slider');

	sliders.forEach(function(slider) {
		const inner = slider.querySelector('.wbcom-slider-inner');
		const slides = slider.querySelectorAll('.wbcom-slider-slide');
		const prevBtn = slider.querySelector('.wbcom-slider-prev');
		const nextBtn = slider.querySelector('.wbcom-slider-next');
		const dots = slider.querySelectorAll('.wbcom-slider-dot');

		if (!slides.length) return;

		let currentSlide = 0;
		let autoplayInterval = null;
		let isAnimating = false;

		// Get settings from data attributes
		const transition = slider.dataset.transition || 'slide';
		const transitionDuration = parseInt(slider.dataset.transitionDuration) || 300;
		const keyboardNav = slider.dataset.keyboardNav === 'true';
		const pauseOnHover = slider.dataset.pauseOnHover === 'true';
		const infiniteLoop = slider.dataset.infiniteLoop === 'true';
		const enableParallax = slider.dataset.parallax === 'true';
		const parallaxSpeed = parseFloat(slider.dataset.parallaxSpeed) || 0.5;

		// Initialize slider
		function initSlider() {
			// Set transition duration via CSS variable
			slider.style.setProperty('--slider-transition-duration', transitionDuration + 'ms');

			// Apply transition class
			if (transition === 'fade') {
				inner.classList.add('fade-transition');
			} else {
				inner.classList.add('slide-transition');
			}

			showSlide(currentSlide, false);

			// Set up autoplay if enabled
			const autoplay = slider.dataset.autoplay === 'true';
			const autoplayDuration = parseInt(slider.dataset.autoplayDuration) || 5;

			if (autoplay) {
				startAutoplay(autoplayDuration);
			}

			// Initialize parallax if enabled
			if (enableParallax) {
				initParallax();
			}

			// Set up keyboard navigation if enabled
			if (keyboardNav) {
				initKeyboardNavigation();
			}
		}

		// Show specific slide
		function showSlide(index, animate = true) {
			if (isAnimating) return;

			// Handle infinite loop
			if (infiniteLoop) {
				if (index < 0) index = slides.length - 1;
				if (index >= slides.length) index = 0;
			} else {
				if (index < 0) index = 0;
				if (index >= slides.length) index = slides.length - 1;
			}

			if (index === currentSlide && animate) return;

			if (animate) {
				isAnimating = true;
				setTimeout(() => {
					isAnimating = false;
				}, transitionDuration);
			}

			currentSlide = index;

			if (transition === 'fade') {
				// Fade transition: update opacity classes
				slides.forEach((slide, i) => {
					slide.classList.toggle('active', i === index);
				});
			} else {
				// Slide transition: update position
				const translateX = -index * 100;
				inner.style.transform = `translateX(${translateX}%)`;
			}

			// Update dots
			dots.forEach((dot, i) => {
				dot.classList.toggle('active', i === index);
			});

			// Update arrow button states for non-infinite mode
			if (!infiniteLoop) {
				if (prevBtn) {
					prevBtn.classList.toggle('disabled', index === 0);
					prevBtn.disabled = index === 0;
				}
				if (nextBtn) {
					nextBtn.classList.toggle('disabled', index === slides.length - 1);
					nextBtn.disabled = index === slides.length - 1;
				}
			}
		}

		// Next slide
		function nextSlide() {
			if (!infiniteLoop && currentSlide >= slides.length - 1) return;
			showSlide(currentSlide + 1);
		}

		// Previous slide
		function prevSlide() {
			if (!infiniteLoop && currentSlide <= 0) return;
			showSlide(currentSlide - 1);
		}

		// Go to specific slide
		function goToSlide(index) {
			showSlide(index);
		}

		// Start autoplay
		function startAutoplay(duration) {
			if (autoplayInterval) clearInterval(autoplayInterval);
			autoplayInterval = setInterval(nextSlide, duration * 1000);
		}

		// Stop autoplay
		function stopAutoplay() {
			if (autoplayInterval) {
				clearInterval(autoplayInterval);
				autoplayInterval = null;
			}
		}

		// Initialize keyboard navigation
		function initKeyboardNavigation() {
			// Focus the slider when clicked to enable keyboard navigation
			slider.setAttribute('tabindex', '0');
			slider.setAttribute('role', 'region');
			slider.setAttribute('aria-label', 'Image slider');

			slider.addEventListener('keydown', function(e) {
				if (e.key === 'ArrowLeft') {
					e.preventDefault();
					prevSlide();
					stopAutoplay();
				} else if (e.key === 'ArrowRight') {
					e.preventDefault();
					nextSlide();
					stopAutoplay();
				} else if (e.key === 'Home') {
					e.preventDefault();
					goToSlide(0);
					stopAutoplay();
				} else if (e.key === 'End') {
					e.preventDefault();
					goToSlide(slides.length - 1);
					stopAutoplay();
				}
			});
		}

		// Initialize parallax effect
		function initParallax() {
			const slideBgs = slider.querySelectorAll('.wbcom-slider-bg');

			function updateParallax() {
				const sliderRect = slider.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				// Only apply parallax when slider is visible
				if (sliderRect.bottom < 0 || sliderRect.top > windowHeight) return;

				// Calculate parallax offset
				const scrollProgress = (windowHeight - sliderRect.top) / (windowHeight + sliderRect.height);
				const parallaxOffset = (scrollProgress - 0.5) * 100 * parallaxSpeed;

				slideBgs.forEach(bg => {
					bg.style.transform = `translateY(${parallaxOffset}px)`;
				});
			}

			// Debounced scroll handler
			let ticking = false;
			window.addEventListener('scroll', function() {
				if (!ticking) {
					window.requestAnimationFrame(function() {
						updateParallax();
						ticking = false;
					});
					ticking = true;
				}
			}, { passive: true });

			// Initial update
			updateParallax();
		}

		// Event listeners
		if (prevBtn) {
			prevBtn.addEventListener('click', function() {
				prevSlide();
				stopAutoplay();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', function() {
				nextSlide();
				stopAutoplay();
			});
		}

		dots.forEach((dot, index) => {
			dot.addEventListener('click', function() {
				goToSlide(index);
				stopAutoplay();
			});
		});

		// Pause autoplay on hover if enabled
		if (pauseOnHover) {
			slider.addEventListener('mouseenter', stopAutoplay);
			slider.addEventListener('mouseleave', function() {
				const autoplay = slider.dataset.autoplay === 'true';
				const autoplayDuration = parseInt(slider.dataset.autoplayDuration) || 5;
				if (autoplay) {
					startAutoplay(autoplayDuration);
				}
			});
		}

		// Touch/swipe support
		let touchStartX = 0;
		let touchEndX = 0;

		slider.addEventListener('touchstart', function(e) {
			touchStartX = e.changedTouches[0].screenX;
		}, { passive: true });

		slider.addEventListener('touchend', function(e) {
			touchEndX = e.changedTouches[0].screenX;
			handleSwipe();
		}, { passive: true });

		function handleSwipe() {
			const swipeThreshold = 50;
			const diff = touchStartX - touchEndX;

			if (Math.abs(diff) > swipeThreshold) {
				if (diff > 0) {
					// Swipe left - next slide
					nextSlide();
				} else {
					// Swipe right - previous slide
					prevSlide();
				}
				stopAutoplay();
			}
		}

		// Initialize
		initSlider();
	});
});
