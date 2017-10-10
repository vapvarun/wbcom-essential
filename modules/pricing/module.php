<?php
namespace WbcomElementorAddons\Modules\Pricing;

use WbcomElementorAddons\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Module extends Module_Base {

	public function get_name() {
		return 'wbcom-pricing';
	}

	public function get_widgets() {
		return [
			// 'Price_List',
			'Price_Table',
		];
	}
}
