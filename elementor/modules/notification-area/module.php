<?php
namespace WBCOMESSENTIAL\Modules\NotificationArea;

use WBCOMESSENTIAL\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Module extends Module_Base {

	public function get_widgets() {
		return [
			'NotificationArea',
		];
	}

	public function get_name() {
		return 'wbcom-notification-area';
	}
}
