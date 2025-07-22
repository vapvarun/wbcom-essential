<?php
/**
 * WBCOM_ESSENTIAL_License_Updater Class.
 * 
 * This class acts as a bridge to the new standardized license updater system
 * while maintaining backward compatibility with the existing license system.
 */
class WBCOM_ESSENTIAL_License_Updater {
    private static $instance = null;
    private $updater_instance;
    
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
     * Initialize the license updater system
     */
    private function init_updater() {
        add_action( 'admin_init', array( $this, 'setup_updater' ), 0 );
    }
    
    /**
     * Set up the plugin updater using the new standardized system
     */
    public function setup_updater() {
        // To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
        $doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
        if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
            return;
        }

        // Get license key from the new standardized license system
        if ( class_exists( '\WBCOM_ESSENTIAL\WBCOM_ESSENTIAL_License_Manager' ) ) {
            $license_manager = \WBCOM_ESSENTIAL\WBCOM_ESSENTIAL_License_Manager::get_instance();
            $license_key = $license_manager->get_license_key();
        } else {
            // Fallback to old option names for backward compatibility
            $license_key = trim( get_option( 'wbcom_essential_license_key' ) );
            if ( empty( $license_key ) ) {
                $license_key = trim( get_option( 'edd-wbcom-essential-license-key' ) );
            }
        }

        if ( ! empty( $license_key ) ) {
            // Use the EDD updater wrapper directly
            $updater_wrapper_file = WBCOM_ESSENTIAL_PATH . '/license/class-edd-updater-wrapper.php';
            if ( file_exists( $updater_wrapper_file ) ) {
                require_once $updater_wrapper_file;
                
                if ( class_exists( 'WBCOM_ESSENTIAL_EDD_Updater_Wrapper' ) ) {
                    $this->updater_instance = new WBCOM_ESSENTIAL_EDD_Updater_Wrapper(
                        'https://wbcomdesigns.com',
                        WBCOM_ESSENTIAL_FILE,
                        array(
                            'version'   => WBCOM_ESSENTIAL_VERSION,
                            'license'   => $license_key,
                            'item_id'   => 1545975,
                            'item_name' => 'Wbcom Essential',
                            'author'    => 'WBcom Designs',
                            'beta'      => false,
                        )
                    );
                }
            }
        }
    }
    
    /**
     * Get updater instance
     */
    public function get_updater() {
        if ( $this->updater_instance && method_exists( $this->updater_instance, 'get_updater' ) ) {
            return $this->updater_instance->get_updater();
        }
        return $this->updater_instance;
    }
    
    /**
     * Check if updates are available
     */
    public function has_update() {
        if ( ! $this->updater_instance ) {
            return false;
        }
        
        $update_cache = get_site_transient( 'update_plugins' );
        $plugin_basename = plugin_basename( WBCOM_ESSENTIAL_FILE );
        
        if ( ! isset( $update_cache->response[ $plugin_basename ] ) ) {
            return false;
        }
        
        $plugin_data = $update_cache->response[ $plugin_basename ];
        
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
        $plugin_basename = plugin_basename( WBCOM_ESSENTIAL_FILE );
        
        return $update_cache->response[ $plugin_basename ];
    }
}