/**
 * Login Form Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const loginForms = document.querySelectorAll( '.wbcom-essential-login-form__form[data-ajax="true"]' );

	loginForms.forEach( ( form ) => {
		form.addEventListener( 'submit', async ( e ) => {
			e.preventDefault();

			const messageEl = form.querySelector( '.wbcom-essential-login-form__message' );
			const submitBtn = form.querySelector( '.wbcom-essential-login-form__button' );
			const buttonText = submitBtn.querySelector( '.wbcom-essential-login-form__button-text' );
			const buttonLoading = submitBtn.querySelector( '.wbcom-essential-login-form__button-loading' );

			// Get form data.
			const formData = new FormData( form );
			formData.append( 'action', 'wbcom_essential_ajax_login' );

			// Show loading state.
			submitBtn.disabled = true;
			buttonText.hidden = true;
			buttonLoading.hidden = false;
			messageEl.hidden = true;
			messageEl.classList.remove( 'is-error', 'is-success' );

			try {
				const response = await fetch( wbcomEssentialLogin.ajaxUrl, {
					method: 'POST',
					body: formData,
					credentials: 'same-origin',
				} );

				const result = await response.json();

				if ( result.success ) {
					// Show success message.
					messageEl.textContent = result.data.message;
					messageEl.classList.add( 'is-success' );
					messageEl.hidden = false;

					// Redirect after a short delay.
					setTimeout( () => {
						window.location.href = result.data.redirect;
					}, 500 );
				} else {
					// Show error message.
					messageEl.textContent = result.data.message || 'An error occurred. Please try again.';
					messageEl.classList.add( 'is-error' );
					messageEl.hidden = false;

					// Reset button state.
					submitBtn.disabled = false;
					buttonText.hidden = false;
					buttonLoading.hidden = true;
				}
			} catch ( error ) {
				// Network or parsing error.
				messageEl.textContent = 'An error occurred. Please try again.';
				messageEl.classList.add( 'is-error' );
				messageEl.hidden = false;

				// Reset button state.
				submitBtn.disabled = false;
				buttonText.hidden = false;
				buttonLoading.hidden = true;
			}
		} );
	} );
} );
