<?php
/**
 * Provide a admin area view for the plugin FAQ section
 *
 * This file is used to markup the admin-facing FAQ section of the plugin.
 * All styles have been moved to admin/css/wbcom-essential-admin.css
 *
 * @link       https://wbcomdesigns.com
 * @since      1.0.0
 *
 * @package    wbcom-essential
 * @subpackage wbcom-essential/admin/partials
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<div class="wbcom-tab-content">      
	<div class="wbcom-faq-admin-setting">
		<div class="wbcom-admin-title-section">
			<h3><?php esc_html_e( 'Frequently Asked Questions', 'wbcom-essential' ); ?></h3>
			<p class="description">
				<?php esc_html_e( 'Find answers to the most common questions about the Wbcom Essential plugin.', 'wbcom-essential' ); ?>
			</p>
		</div>

		<div class="wbcom-faq-admin-settings-block">
			<div id="wbcom-faq-settings-section" class="wbcom-faq-table">


			</div>
		</div>
	</div>
</div>