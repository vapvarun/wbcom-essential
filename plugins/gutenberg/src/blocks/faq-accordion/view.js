document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wbe-faq' ).forEach( ( faq ) => {
		const allowMultiple = faq.dataset.allowMultiple === 'true';
		const iconStyle = faq.dataset.icon || 'plus';
		const iconOpen = iconStyle === 'chevron' ? '\u2039' : '\u2212';
		const iconClosed = iconStyle === 'chevron' ? '\u203A' : '+';

		faq.querySelectorAll( '.wbe-faq__question' ).forEach( ( btn ) => {
			btn.addEventListener( 'click', () => {
				const item = btn.parentElement;
				const answer = item.querySelector( '.wbe-faq__answer' );
				const icon = btn.querySelector( '.wbe-faq__icon' );
				const isOpen = item.classList.contains( 'is-open' );

				if ( ! allowMultiple ) {
					faq.querySelectorAll( '.wbe-faq__item.is-open' ).forEach(
						( openItem ) => {
							if ( openItem !== item ) {
								openItem.classList.remove( 'is-open' );
								openItem.querySelector(
									'.wbe-faq__answer'
								).style.display = 'none';
								openItem.querySelector(
									'.wbe-faq__question'
								).setAttribute( 'aria-expanded', 'false' );
								const otherIcon = openItem.querySelector(
									'.wbe-faq__icon'
								);
								if ( otherIcon ) {
									otherIcon.textContent = iconClosed;
								}
							}
						}
					);
				}

				if ( isOpen ) {
					item.classList.remove( 'is-open' );
					answer.style.display = 'none';
					btn.setAttribute( 'aria-expanded', 'false' );
					if ( icon ) icon.textContent = iconClosed;
				} else {
					item.classList.add( 'is-open' );
					answer.style.display = 'block';
					btn.setAttribute( 'aria-expanded', 'true' );
					if ( icon ) icon.textContent = iconOpen;
				}
			} );
		} );
	} );
} );
