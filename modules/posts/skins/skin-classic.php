<?php
namespace WbcomElementorAddons\Modules\Posts\Skins;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Skin_Classic extends Skin_Base {

	public function get_id() {
		return 'wbcom-classic';
	}

	public function get_title() {
		return __( 'Classic', 'wbcom-elementor-addons' );
	}

	public function render_amp() {

	}
}
