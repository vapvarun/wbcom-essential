<?php

namespace WBcomEssentialelementor\Templates\Documents;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly.

class WBcom_Essential_elementor_Pages_Document extends WBcom_Essential_elementor_Document_Base {
	
	/**
	 * Get Elementor Section name.
	 *
	 * @since  1.4.7
	 * @return string
	 */
	public function get_name() {
		return 'wbcom_essential_elementor_sections_page';
	}
	
	/**
	 * Get Elementor Section title.
	 *
	 * @since  1.4.7
	 * @return string
	 */
	public static function get_title() {
		return __( 'Page', 'wbcom-essential' );
	}
	
}