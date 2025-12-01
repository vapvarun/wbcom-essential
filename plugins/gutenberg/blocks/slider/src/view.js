/**
 * Frontend JavaScript for the Slider block
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
		const transition = slider.dataset.transition || 'slide';

		// Initialize slider
		function initSlider() {
			// Apply transition class
			if (transition === 'fade') {
				inner.classList.add('fade-transition');
			} else {
				inner.classList.add('slide-transition');
			}

			showSlide(currentSlide);

			// Set up autoplay if enabled
			const autoplay = slider.dataset.autoplay === 'true';
			const autoplayDuration = parseInt(slider.dataset.autoplayDuration) || 5;

			if (autoplay) {
				startAutoplay(autoplayDuration);
			}
		}

		// Show specific slide
		function showSlide(index) {
			if (index < 0) index = slides.length - 1;
			if (index >= slides.length) index = 0;

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
		}

		// Next slide
		function nextSlide() {
			showSlide(currentSlide + 1);
		}

		// Previous slide
		function prevSlide() {
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

		// Pause autoplay on hover
		slider.addEventListener('mouseenter', stopAutoplay);
		slider.addEventListener('mouseleave', function() {
			const autoplay = slider.dataset.autoplay === 'true';
			const autoplayDuration = parseInt(slider.dataset.autoplayDuration) || 5;
			if (autoplay) {
				startAutoplay(autoplayDuration);
			}
		});

		// Initialize
		initSlider();
	});
});