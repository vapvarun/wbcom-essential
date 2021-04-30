<?php
namespace WBCOMESSENTIAL\Modules\WooCart;

use WBCOMESSENTIAL\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Module extends Module_Base {

	public function get_widgets() {
		return [
			'WooCart',
		];
	}

	public function get_name() {
		return 'wbcom-woo-cart';
	}
}
