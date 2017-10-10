<?php
namespace WbcomElementorAddons\Modules\Posts\Skins;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Skin_Classic extends Skin_Base {

	public function get_id() {
		return 'wbcom-classic';
	}

	public function get_title() {
		return __( 'Classic', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN );
	}

	public function render_amp() {

	}
}
