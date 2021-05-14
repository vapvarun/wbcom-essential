class MemberCarousel extends elementorModules.frontend.handlers.Base {

  getDefaultSettings() {
    return {
      selectors: {
        carousel: '.member-carousel-container',
        slideContent: '.swiper-slide'
      },
    };
  }

  getDefaultElements() {
    var selectors = this.getSettings('selectors');
    var elements = {
      $slider: this.$element.find(selectors.carousel)
    };
    elements.$mainSwiperSlides = elements.$slider.find(selectors.slideContent);
    return elements;
  }

  getSwiperSettings() {
    var elementSettings = this.getElementSettings(),
      slidesToShow = +elementSettings.slides_to_show || 3,
      isSingleSlide = 1 === slidesToShow,
      defaultLGDevicesSlidesCount = isSingleSlide ? 1 : 2,
      elementorBreakpoints = elementorFrontend.config.responsive.activeBreakpoints;

    console.log(elementSettings);
    var swiperOptions = {
      slidesPerView: slidesToShow,
      loop: 'yes' === elementSettings.infinite,
      speed: elementSettings.speed,
      handleElementorBreakpoints: true
    };
    swiperOptions.breakpoints = {};
    swiperOptions.breakpoints[elementorBreakpoints.mobile.value] = {
      slidesPerView: +elementSettings.slides_to_show_mobile || 1,
      slidesPerGroup: +elementSettings.slides_to_scroll_mobile || 1
    };
    swiperOptions.breakpoints[elementorBreakpoints.tablet.value] = {
      slidesPerView: +elementSettings.slides_to_show_tablet || defaultLGDevicesSlidesCount,
      slidesPerGroup: +elementSettings.slides_to_scroll_tablet || 1
    };

    if ('yes' === elementSettings.autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.autoplay_speed,
        disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
      };
    }

    if (isSingleSlide) {
      swiperOptions.effect = elementSettings.effect;

      if ('fade' === elementSettings.effect) {
        swiperOptions.fadeEffect = {
          crossFade: true
        };
      }
    } else {
      swiperOptions.slidesPerGroup = +elementSettings.slides_to_scroll || 1;
    }

    if (elementSettings.image_spacing_custom) {
      swiperOptions.spaceBetween = elementSettings.image_spacing_custom.size;
    }

    var showArrows = 'arrows' === elementSettings.navigation || 'both' === elementSettings.navigation,
      showDots = 'dots' === elementSettings.navigation || 'both' === elementSettings.navigation;

    if (showArrows) {
      swiperOptions.navigation = {
        prevEl: '.elementor-swiper-button-prev',
        nextEl: '.elementor-swiper-button-next'
      };
    }

    if (showDots) {
      swiperOptions.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      };
    }

    return swiperOptions;
  }

}

jQuery(window).on('elementor/frontend/init', () => {
  const _memberCarousel = ($element) => {
    elementorFrontend.elementsHandler.addHandler(MemberCarousel, {
      $element,
    });
  };
  elementorFrontend.hooks.addAction('frontend/element_ready/wbcom-members-carousel.default', _memberCarousel);
});