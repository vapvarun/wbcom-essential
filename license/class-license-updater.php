<?php
/**
 * License Updater class
 * Handles EDD Software Licensing integration
 */
class WBCOM_ESSENTIAL_License_Updater {
    private static $instance = null;
    private $updater_wrapper;
    
    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->init_updater();
    }
    
    /**
     * Initialize EDD Software Licensing updater
     */
    private function init_updater() {
        // To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
        $doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
        if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
            return;
        }

        // Load our wrapper class
        require_once WBCOM_ESSENTIAL_PLUGIN_DIR . 'license/class-edd-updater-wrapper.php';

        // retrieve our license key from the DB
        $license_key = trim( get_option( 'wbcom_essential_license_key' ) );

        // setup the updater through our wrapper
        $this->updater_wrapper = new WBCOM_ESSENTIAL_EDD_Updater_Wrapper(
            WBCOM_ESSENTIAL_STORE_URL,
            WBCOM_ESSENTIAL_PLUGIN_DIR . 'wbcom-essential.php',
            array(
                'version'   => WBCOM_ESSENTIAL_VERSION,
                'license'   => $license_key,
                'item_id'   => WBCOM_ESSENTIAL_ITEM_ID,
                'item_name' => WBCOM_ESSENTIAL_ITEM_NAME,
                'author'    => 'Wbcom Designs',
                'beta'      => false,
            )
        );
    }
    
    /**
     * Get updater instance
     */
    public function get_updater() {
        if ( $this->updater_wrapper ) {
            return $this->updater_wrapper->get_updater();
        }
        return null;
    }
    
    /**
     * Check if updates are available
     */
    public function has_update() {
        $updater = $this->get_updater();
        if ( ! $updater ) {
            return false;
        }
        
        $update_cache = get_site_transient( 'update_plugins' );
        
        if ( ! isset( $update_cache->response[ WBCOM_ESSENTIAL_PLUGIN_BASENAME ] ) ) {
            return false;
        }
        
        $plugin_data = $update_cache->response[ WBCOM_ESSENTIAL_PLUGIN_BASENAME ];
        
        return version_compare( WBCOM_ESSENTIAL_VERSION, $plugin_data->new_version, '<' );
    }
    
    /**
     * Get update information
     */
    public function get_update_info() {
        if ( ! $this->has_update() ) {
            return false;
        }
        
        $update_cache = get_site_transient( 'update_plugins' );
        return $update_cache->response[ WBCOM_ESSENTIAL_PLUGIN_BASENAME ];
    }
}