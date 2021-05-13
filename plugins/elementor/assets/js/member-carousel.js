(function($) {
  "use strict";
  window.WbcomEssential = {
    init: function() {
      this.MemeberCarousel();
    },

    elementSettings: function() {
      var element = $('.elementor-widget-wbcom-members-carousel');
      var swiperSetting = element.data('settings');
      var swiperOPtions = {
        grabCursor: false,
        slidesPerView: swiperSetting.slides_to_show,
        spaceBetween: 1000,
        loop: 'yes' === swiperSetting.infinite,
        speed: swiperSetting.speed,
        autoplay: {
          delay: swiperSetting.autoplay_speed,
          stopOnLastSlide: !swiperSetting.infinite
        },
        handleElementorBreakpoints: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },


      };

      if ('yes' === swiperSetting.infinite) {
        swiperOPtions.loopedSlides = swiperSetting.slides_to_show;
      }

      return swiperOPtions;


    },

    MemeberCarousel: function() {
      const swiper = new Swiper('.member-carousel-container', this.elementSettings(), );
    },
  };

  $(document).on('ready', function() {
    WbcomEssential.init();
  });

})(jQuery);