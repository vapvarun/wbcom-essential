<?php

namespace WBCOM_ESSENTIAL\ELEMENTOR\Helper\QueryControl;

use Elementor\Control_Select2;
use  WBCOM_ESSENTIAL\ELEMENTOR\Helper\QueryControl\Query_Control_Module;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Query extends Control_Select2 {

	public function get_type() {
		return Query_Control_Module::QUERY_CONTROL_ID;
	}
}
