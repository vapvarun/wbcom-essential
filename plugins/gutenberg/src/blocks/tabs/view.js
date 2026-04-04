document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wbe-tabs' ).forEach( ( el ) => {
		const tabs = el.querySelectorAll( '.wbe-tabs__tab' );
		const panels = el.querySelectorAll( '.wbe-tabs__panel' );
		const accent = el.dataset.accent || '#6366f1';

		tabs.forEach( ( tab ) => {
			tab.addEventListener( 'click', () => {
				const index = tab.dataset.tab;

				// Deactivate all
				tabs.forEach( ( t ) => {
					t.classList.remove( 'is-active' );
					t.setAttribute( 'aria-selected', 'false' );
					t.style.borderColor = '';
					t.style.color = '';
				} );

				panels.forEach( ( p ) => {
					p.style.display = 'none';
				} );

				// Activate clicked
				tab.classList.add( 'is-active' );
				tab.setAttribute( 'aria-selected', 'true' );
				tab.style.borderColor = accent;
				tab.style.color = accent;

				const panel = el.querySelector(
					'[data-panel="' + index + '"]'
				);
				if ( panel ) {
					panel.style.display = 'block';
				}
			} );
		} );
	} );
} );
