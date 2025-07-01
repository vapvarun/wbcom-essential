(function ($) {
    "use strict";

    // Initialize when document is ready
    $(function () {
        
        const accordionElements = document.getElementsByClassName('wbcom-faq-accordion');

        for (let i = 0; i < accordionElements.length; i++) {
            accordionElements[i].onclick = function () {
                this.classList.toggle('active');
                const panel = this.nextElementSibling;

                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            };
        }
    });


})(jQuery);
