<?php
namespace WBCOMESSENTIAL\Modules\Branding;

use WBCOMESSENTIAL\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Module extends Module_Base {

	public function get_name() {
		return 'wbcom-branding';
	}

	public function get_widgets() {
		return array(
			'Branding',
		);
	}
}
