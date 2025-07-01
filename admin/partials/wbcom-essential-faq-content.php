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
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/admin/partials
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
				<!-- Basic Requirements -->
				<div class="wbcom-faq-section-row">
					<div class="wbcom-faq-admin-row">
						<button class="wbcom-faq-accordion">
							<span class="faq-icon">🛒</span>
							<?php esc_html_e( 'What are the requirements for this plugin?', 'wbcom-essential' ); ?>
						</button>
						<div class="wbcom-faq-panel">
							<p><?php esc_html_e( 'This plugin requires Elementor to be installed and activated.', 'wbcom-essential' ); ?></p>
						</div>
					</div>
				</div>
				<!-- Posts Layout -->
				<div class="wbcom-faq-section-row">
					<div class="wbcom-faq-admin-row">
						<button class="wbcom-faq-accordion">
							<span class="faq-icon">📄</span>
							<?php esc_html_e( 'How can I display posts in creative layouts?', 'wbcom-essential' ); ?>
						</button>
						<div class="wbcom-faq-panel">
							<p><?php esc_html_e( 'You have several widgets for post presentation:', 'wbcom-essential' ); ?></p>
							<ol>
								<li><strong><?php esc_html_e( 'Posts: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Classic post display with multiple layout options.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Posts Carousel: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Show posts in a scrolling carousel.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Posts Ticker: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Animate posts in a ticker format (vertical, horizontal, typewriter).', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Post Timeline: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Display posts chronologically.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Posts Revolution: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Advanced layout options for custom post types.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Posts Slider: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Showcase posts or pages in an eye-catching slider.', 'wbcom-essential' ); ?></li>
							</ol>
						</div>
					</div>
				</div>
				<!-- Members Layout -->
				<div class="wbcom-faq-section-row">
					<div class="wbcom-faq-admin-row">
						<button class="wbcom-faq-accordion">
							<span class="faq-icon">👥</span>
							<?php esc_html_e( 'How can I display member information on my site?', 'wbcom-essential' ); ?>
						</button>
						<div class="wbcom-faq-panel">
							<p><?php esc_html_e( 'You can use the following widgets:', 'wbcom-essential' ); ?></p>
							<ol>
								<li><strong><?php esc_html_e( 'Member Lists: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Displays members with filters like Newest, Active, or Popular.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Member Grid: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Showcases members in a customizable grid layout.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Member Carousel: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Presents members in an interactive carousel.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Dashboard Intro: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Offers a personalized dashboard experience with greetings and descriptions.', 'wbcom-essential' ); ?></li>
								<li><strong><?php esc_html_e( 'Profile Completion: ', 'wbcom-essential' ); ?></strong><?php esc_html_e( 'Shows user profile progress with completed field data.', 'wbcom-essential' ); ?></li>
							</ol>
						</div>
					</div>
				</div>
				<!-- Navigation -->
				<div class="wbcom-faq-section-row">
					<div class="wbcom-faq-admin-row">
						<button class="wbcom-faq-accordion">
							<span class="faq-icon">☰</span>
							<?php esc_html_e( 'Can I show the site header or navigation menu anywhere on a page?', 'wbcom-essential' ); ?>
						</button>
						<div class="wbcom-faq-panel">
							<p><?php esc_html_e( 'Yes! The Header Bar and Nav Menu widgets allow you to display the website\'s header and menus at any position on your Elementor page.', 'wbcom-essential' ); ?></p>
						</div>
					</div>
				</div>
				<!-- Interactive navigation -->
				<div class="wbcom-faq-section-row">
					<div class="wbcom-faq-admin-row">
						<button class="wbcom-faq-accordion">
							<span class="faq-icon">☰</span>
							<?php esc_html_e( 'Does the plugin support interactive navigation and content organization?', 'wbcom-essential' ); ?>
						</button>
						<div class="wbcom-faq-panel">
							<p><?php esc_html_e( 'Absolutely. You can organize your content with:', 'wbcom-essential' ); ?></p>
							<ol>
								<li><?php esc_html_e( 'Tabs and Accordion widgets', 'wbcom-essential' ); ?></li>
								<li><?php esc_html_e( 'Smart Menu for vertical/horizontal navigation', 'wbcom-essential' ); ?></li>
								<li><?php esc_html_e( 'Dropdown Button for toggling additional content.', 'wbcom-essential' ); ?></li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>