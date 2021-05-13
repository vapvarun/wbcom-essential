class MemeberCarousel extends elementorModules.frontend.handlers.Base {
  var elementorOptions = this.getElementSettings();
  console.log(elementorOptions);

}

jQuery(window).on('elementor/frontend/init', () => {
  const addHandler = ($element) => {
    elementorFrontend.elementsHandler.addHandler(MemeberCarousel, {
      $element,
    });
  };

  elementorFrontend.hooks.addAction('frontend/element_ready/MemeberCarousel.default', addHandler);
});