<?php

defined( 'ABSPATH' ) || die();

global $buddyboss_platform_plugin_file;
if ( isset( $buddyboss_platform_plugin_file ) ) {
	require_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/compat/platform.php';
}
