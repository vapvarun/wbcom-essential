<?php
/**
 * License Manager class
 */
class WBCOM_ESSENTIAL_License_Manager {
    private static $instance = null;
    
    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->init_hooks();
    }
    
    private function init_hooks() {
        // License AJAX handlers
        add_action( 'wp_ajax_wbcom_essential_activate_license', array( $this, 'ajax_activate_license' ) );
        add_action( 'wp_ajax_wbcom_essential_deactivate_license', array( $this, 'ajax_deactivate_license' ) );
        add_action( 'wp_ajax_wbcom_essential_check_license', array( $this, 'ajax_check_license' ) );
        add_action( 'wp_ajax_save_license_key', array( $this, 'ajax_save_license_key' ) );
        
        // Handle form submissions
        add_action( 'admin_init', array( $this, 'handle_license_actions' ) );
        
        // License asset enqueuing (handled by widget showcase, but method needed for hook compatibility)
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_license_assets' ) );
    }
    
    /**
     * Enqueue license assets only when needed
     * This method is required by the admin_enqueue_scripts hook but assets are handled by widget showcase
     */
    public function enqueue_license_assets() {
        // Assets are handled by the widget showcase class, so this method is empty
        // but exists to prevent fatal errors from the hook
    }
    
    /**
     * Get license key
     */
    public function get_license_key() {
        return get_option( 'wbcom_essential_license_key' );
    }
    
    /**
     * Get license status information
     */
    public function get_license_status() {
        $license_key = get_option( 'wbcom_essential_license_key' );
        $license_status = get_option( 'wbcom_essential_license_status' );
        $license_data = get_option( 'wbcom_essential_license_data' );
        
        return array(
            'key' => $license_key,
            'status' => $license_status,
            'data' => $license_data,
            'is_valid' => $license_status === 'valid',
            'has_key' => ! empty( $license_key )
        );
    }
    
    /**
     * Get status display HTML
     */
    public function get_status_display( $license_status ) {
        switch ( $license_status['status'] ) {
            case 'valid':
                return '<span class="wbcom-essential-status-success">✓ Active</span>';
            case 'expired':
                return '<span class="wbcom-essential-status-warning">⚠ Expired</span>';
            case 'invalid':
                return '<span class="wbcom-essential-status-error">✗ Invalid</span>';
            default:
                return '<span class="wbcom-essential-status-inactive">- Not activated</span>';
        }
    }
    
    /**
     * Render license tab content
     */
    public function render_license_tab() {
        $license_status = $this->get_license_status();
        ?>
        <div class="wbcom-essential-license-section">
            <div class="wbcom-essential-license-info">
                <h3><?php _e( 'Plugin License', 'wbcom-essential' ); ?></h3>
                <p><?php _e( 'Enter your license key to receive automatic updates and premium support.', 'wbcom-essential' ); ?></p>
            </div>
            
            <form method="post" action="" id="wbcom-essential-license-form">
                <?php wp_nonce_field( 'wbcom_essential_license_nonce', 'wbcom_essential_license_nonce' ); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="wbcom_essential_license_key"><?php _e( 'License Key', 'wbcom-essential' ); ?></label>
                        </th>
                        <td>
                            <?php 
                            $has_key = ! empty( $license_status['key'] );
                            $display_key = '';
                            $actual_key = $license_status['key'];
                            
                            if ( $has_key ) {
                                // Show first 5 characters and mask the rest for display
                                $key_length = strlen( $actual_key );
                                if ( $key_length > 5 ) {
                                    $display_key = substr( $actual_key, 0, 5 ) . str_repeat( '*', min( $key_length - 5, 20 ) );
                                } else {
                                    $display_key = $actual_key;
                                }
                            }
                            ?>
                            <?php if ( $has_key ) : ?>
                                <div id="wbcom-essential-license-display" class="wbcom-license-key-display">
                                    <code><?php echo esc_html( $display_key ); ?></code>
                                    <button type="button" id="wbcom-essential-change-license" class="button button-small">
                                        <?php esc_html_e( 'Change License Key', 'wbcom-essential' ); ?>
                                    </button>
                                </div>
                                <div id="wbcom-essential-license-input-wrapper" style="display: none;">
                            <?php else : ?>
                                <div id="wbcom-essential-license-input-wrapper">
                            <?php endif; ?>
                                    <input type="text" 
                                           id="wbcom_essential_license_key" 
                                           name="wbcom_essential_license_key" 
                                           value="" 
                                           class="regular-text" 
                                           placeholder="<?php esc_attr_e( 'Enter your license key', 'wbcom-essential' ); ?>" />
                                    <button type="button" id="wbcom-essential-save-change" class="button button-primary button-small" <?php echo $has_key ? 'style="margin-left: 10px;"' : 'style="display:none;"'; ?>>
                                        <?php esc_html_e( 'Save', 'wbcom-essential' ); ?>
                                    </button>
                                    <button type="button" id="wbcom-essential-cancel-change" class="button button-small" <?php echo $has_key ? 'style="margin-left: 5px;"' : 'style="display:none;"'; ?>>
                                        <?php esc_html_e( 'Cancel', 'wbcom-essential' ); ?>
                                    </button>
                                </div>
                                
                                <!-- Hidden field to store actual key for AJAX operations -->
                                <input type="hidden" 
                                       id="wbcom_essential_license_key_hidden"
                                       name="wbcom_essential_license_key_hidden" 
                                       value="<?php echo esc_attr( $actual_key ); ?>" />
                                
                            <p class="description">
                                <?php _e( 'Enter the license key you received when purchasing the plugin.', 'wbcom-essential' ); ?>
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">
                            <?php _e( 'License Status', 'wbcom-essential' ); ?>
                        </th>
                        <td>
                            <div id="wbcom-essential-license-status">
                                <?php echo $this->render_license_status_display( $license_status ); ?>
                            </div>
                        </td>
                    </tr>
                </table>
                
                <div class="wbcom-essential-license-actions" id="wbcom-essential-license-actions">
                    <?php if ( $license_status['status'] === 'valid' ) : ?>
                        <button type="button" id="wbcom-essential-deactivate-license" class="button button-secondary">
                            <?php _e( 'Deactivate License', 'wbcom-essential' ); ?>
                        </button>
                    <?php else : ?>
                        <button type="button" id="wbcom-essential-activate-license" class="button button-primary">
                            <?php _e( 'Activate License', 'wbcom-essential' ); ?>
                        </button>
                    <?php endif; ?>
                    
                    <button type="button" id="wbcom-essential-check-license" class="button">
                        <?php _e( 'Check License', 'wbcom-essential' ); ?>
                    </button>
                    
                    <?php if ( ! $has_key ) : ?>
                        <button type="submit" name="wbcom_essential_save_license" class="button button-primary">
                            <?php _e( 'Save License Key', 'wbcom-essential' ); ?>
                        </button>
                    <?php endif; ?>
                </div>
                
                <div id="wbcom-essential-license-message" class="wbcom-essential-license-message"></div>
            </form>
            
            <!-- License Information -->
            <div class="wbcom-essential-license-info-box">
                <h4><?php _e( 'License Benefits', 'wbcom-essential' ); ?></h4>
                <ul>
                    <li><span class="dashicons dashicons-update"></span> <?php _e( 'Automatic plugin updates', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-sos"></span> <?php _e( 'Premium support', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-shield"></span> <?php _e( 'Security updates', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-star-filled"></span> <?php _e( 'New features and improvements', 'wbcom-essential' ); ?></li>
                </ul>
                
                <p>
                    <a href="<?php echo esc_url( WBCOM_ESSENTIAL_STORE_URL ); ?>" target="_blank" class="button button-secondary">
                        <?php _e( 'Get License Key', 'wbcom-essential' ); ?>
                    </a>
                </p>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render license status display
     */
    private function render_license_status_display( $license_status ) {
        ob_start();
        
        if ( $license_status['status'] === 'valid' ) : ?>
            <span class="wbcom-essential-license-status wbcom-essential-license-valid">
                <span class="dashicons dashicons-yes-alt"></span>
                <?php _e( 'Active', 'wbcom-essential' ); ?>
            </span>
            
            <?php if ( $license_status['data'] && isset( $license_status['data']->expires ) ) : ?>
                <p class="description">
                    <?php 
                    if ( $license_status['data']->expires === 'lifetime' ) {
                        _e( 'License never expires', 'wbcom-essential' );
                    } else {
                        printf( 
                            __( 'License expires: %s', 'wbcom-essential' ), 
                            date_i18n( get_option( 'date_format' ), strtotime( $license_status['data']->expires ) )
                        );
                    }
                    ?>
                </p>
            <?php endif; ?>
            
        <?php elseif ( $license_status['status'] === 'expired' ) : ?>
            <span class="wbcom-essential-license-status wbcom-essential-license-expired">
                <span class="dashicons dashicons-warning"></span>
                <?php _e( 'Expired', 'wbcom-essential' ); ?>
            </span>
            <p class="description">
                <?php _e( 'Your license has expired. Please renew to continue receiving updates.', 'wbcom-essential' ); ?>
            </p>
            
        <?php elseif ( $license_status['status'] === 'invalid' || $license_status['status'] === 'site_inactive' ) : ?>
            <span class="wbcom-essential-license-status wbcom-essential-license-invalid">
                <span class="dashicons dashicons-dismiss"></span>
                <?php _e( 'Invalid', 'wbcom-essential' ); ?>
            </span>
            <p class="description">
                <?php _e( 'This license is not valid for this site. Please check your license key.', 'wbcom-essential' ); ?>
            </p>
            
        <?php else : ?>
            <span class="wbcom-essential-license-status wbcom-essential-license-inactive">
                <span class="dashicons dashicons-minus"></span>
                <?php _e( 'Inactive', 'wbcom-essential' ); ?>
            </span>
            <p class="description">
                <?php _e( 'Please enter and activate your license key.', 'wbcom-essential' ); ?>
            </p>
        <?php endif;
        
        return ob_get_clean();
    }
    
    /**
     * Handle license actions from form submissions
     */
    public function handle_license_actions() {
        // Listen for our activate button to be clicked
        if ( isset( $_POST['wbcom_essential_license_activate'] ) ) {
            $this->activate_license();
        }
        
        // Listen for our deactivate button to be clicked
        if ( isset( $_POST['wbcom_essential_license_deactivate'] ) ) {
            $this->deactivate_license();
        }
        
        // Handle license key save
        if ( isset( $_POST['wbcom_essential_save_license'] ) ) {
            // Check if we're on the right page
            if ( ! isset( $_GET['page'] ) || $_GET['page'] !== 'wbcom-widgets' ) {
                return;
            }
            
            // Verify nonce
            if ( ! isset( $_POST['wbcom_essential_license_nonce'] ) || ! wp_verify_nonce( $_POST['wbcom_essential_license_nonce'], 'wbcom_essential_license_nonce' ) ) {
                wp_die( __( 'Security check failed', 'wbcom-essential' ) );
            }
            
            // Check permissions
            if ( ! current_user_can( 'manage_options' ) ) {
                wp_die( __( 'You do not have permission to manage licenses', 'wbcom-essential' ) );
            }
            
            try {
                $visible_key = isset( $_POST['wbcom_essential_license_key'] ) ? trim( sanitize_text_field( $_POST['wbcom_essential_license_key'] ) ) : '';
                $hidden_key = isset( $_POST['wbcom_essential_license_key_hidden'] ) ? trim( sanitize_text_field( $_POST['wbcom_essential_license_key_hidden'] ) ) : '';
                $is_new_key = isset( $_POST['wbcom_essential_new_license_key'] ) && $_POST['wbcom_essential_new_license_key'] === 'true';
                
                // Determine which key to save
                $license_key = '';
                
                // If explicitly marked as new key, always use visible field
                if ( $is_new_key && ! empty( $visible_key ) ) {
                    $license_key = $visible_key;
                }
                // Otherwise follow normal priority
                elseif ( ! empty( $visible_key ) && strpos( $visible_key, '*' ) === false ) {
                    $license_key = $visible_key;
                } 
                elseif ( ! empty( $hidden_key ) && strpos( $hidden_key, '*' ) === false ) {
                    $license_key = $hidden_key;
                }
                
                $old_license = get_option( 'wbcom_essential_license_key', '' );
                
                // Always clear status when explicitly updating with new key
                if ( $is_new_key || $old_license !== $license_key ) {
                    delete_option( 'wbcom_essential_license_status' );
                    delete_option( 'wbcom_essential_license_data' );
                }
                
                // Force update the option
                delete_option( 'wbcom_essential_license_key' );
                add_option( 'wbcom_essential_license_key', $license_key, '', 'no' );
                
                // Redirect after save
                $redirect_url = add_query_arg( array(
                    'page' => 'wbcom-widgets',
                    'tab' => 'license',
                    'updated' => 'true'
                ), admin_url( 'admin.php' ) );
                
                wp_safe_redirect( $redirect_url );
                exit();
            } catch ( Exception $e ) {
                wp_die( sprintf( __( 'Error saving license: %s', 'wbcom-essential' ), $e->getMessage() ) );
            }
        }
    }
    
    /**
     * AJAX handler for saving license key
     */
    public function ajax_save_license_key() {
        check_ajax_referer( 'wbcom_essential_license_nonce', 'nonce' );
        
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => __( 'Insufficient permissions', 'wbcom-essential' ) ) );
        }
        
        $license_key = isset( $_POST['wbcom_essential_license_key'] ) ? trim( sanitize_text_field( $_POST['wbcom_essential_license_key'] ) ) : '';
        $old_license = get_option( 'wbcom_essential_license_key', '' );
        
        // Always update when using AJAX save
        if ( $old_license !== $license_key ) {
            delete_option( 'wbcom_essential_license_status' );
            delete_option( 'wbcom_essential_license_data' );
        }
        
        // Force update the option
        delete_option( 'wbcom_essential_license_key' );
        add_option( 'wbcom_essential_license_key', $license_key, '', 'no' );
        
        wp_send_json_success( array( 'message' => __( 'License key saved successfully', 'wbcom-essential' ) ) );
    }
    
    /**
     * AJAX activate license
     */
    public function ajax_activate_license() {
        check_ajax_referer( 'wbcom_essential_license_nonce', 'nonce' );
        
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => __( 'Insufficient permissions', 'wbcom-essential' ) ) );
        }
        
        $license = trim( $_POST['license_key'] ?? '' );
        
        if ( empty( $license ) ) {
            wp_send_json_error( array( 'message' => __( 'Please enter a license key', 'wbcom-essential' ) ) );
        }
        
        $result = $this->activate_license_api( $license );
        
        if ( is_wp_error( $result ) ) {
            wp_send_json_error( array( 'message' => $result->get_error_message() ) );
        }
        
        wp_send_json_success( array( 
            'message' => __( 'License activated successfully!', 'wbcom-essential' ),
            'status_html' => $this->render_license_status_display( $this->get_license_status() )
        ) );
    }
    
    /**
     * AJAX deactivate license
     */
    public function ajax_deactivate_license() {
        check_ajax_referer( 'wbcom_essential_license_nonce', 'nonce' );
        
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => __( 'Insufficient permissions', 'wbcom-essential' ) ) );
        }
        
        $result = $this->deactivate_license_api();
        
        if ( is_wp_error( $result ) ) {
            wp_send_json_error( array( 'message' => $result->get_error_message() ) );
        }
        
        wp_send_json_success( array( 
            'message' => __( 'License deactivated successfully!', 'wbcom-essential' ),
            'status_html' => $this->render_license_status_display( $this->get_license_status() )
        ) );
    }
    
    /**
     * AJAX check license
     */
    public function ajax_check_license() {
        check_ajax_referer( 'wbcom_essential_license_nonce', 'nonce' );
        
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => __( 'Insufficient permissions', 'wbcom-essential' ) ) );
        }
        
        $license = trim( get_option( 'wbcom_essential_license_key' ) );
        
        if ( empty( $license ) ) {
            wp_send_json_error( array( 'message' => __( 'No license key found', 'wbcom-essential' ) ) );
        }
        
        $result = $this->check_license_api( $license );
        
        if ( is_wp_error( $result ) ) {
            wp_send_json_error( array( 'message' => $result->get_error_message() ) );
        }
        
        $license_data = $result;
        
        if ( 'valid' === $license_data->license ) {
            wp_send_json_success( array( 
                'message' => __( 'License is valid!', 'wbcom-essential' ),
                'status_html' => $this->render_license_status_display( $this->get_license_status() )
            ) );
        } else {
            wp_send_json_success( array( 
                'message' => __( 'License is not valid.', 'wbcom-essential' ),
                'status_html' => $this->render_license_status_display( $this->get_license_status() )
            ) );
        }
    }
    
    /**
     * Activate license via API
     */
    private function activate_license_api( $license ) {
        // data to send in our API request
        $api_params = array(
            'edd_action' => 'activate_license',
            'license'    => $license,
            'item_id'    => WBCOM_ESSENTIAL_ITEM_ID,
            'item_name'  => rawurlencode( WBCOM_ESSENTIAL_ITEM_NAME ),
            'url'        => home_url(),
            'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
        );
        
        // Call the custom API.
        $response = wp_remote_post(
            WBCOM_ESSENTIAL_STORE_URL,
            array(
                'timeout'   => 15,
                'sslverify' => false,
                'body'      => $api_params,
            )
        );
        
        if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
            $message = is_wp_error( $response ) ? $response->get_error_message() : __( 'An error occurred, please try again.', 'wbcom-essential' );
            return new WP_Error( 'api_error', $message );
        }
        
        $license_data = json_decode( wp_remote_retrieve_body( $response ) );
        
        if ( false === $license_data->success ) {
            switch ( $license_data->error ) {
                case 'expired':
                    $message = sprintf(
                        __( 'Your license key expired on %s.', 'wbcom-essential' ),
                        date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
                    );
                    break;
                case 'disabled':
                case 'revoked':
                    $message = __( 'Your license key has been disabled.', 'wbcom-essential' );
                    break;
                case 'missing':
                    $message = __( 'Invalid license.', 'wbcom-essential' );
                    break;
                case 'invalid':
                case 'site_inactive':
                    $message = __( 'Your license is not active for this URL.', 'wbcom-essential' );
                    break;
                case 'item_name_mismatch':
                    $message = sprintf( __( 'This appears to be an invalid license key for %s.', 'wbcom-essential' ), WBCOM_ESSENTIAL_ITEM_NAME );
                    break;
                case 'no_activations_left':
                    $message = __( 'Your license key has reached its activation limit.', 'wbcom-essential' );
                    break;
                default:
                    $message = __( 'An error occurred, please try again.', 'wbcom-essential' );
                    break;
            }
            return new WP_Error( 'license_error', $message );
        }
        
        // $license_data->license will be either "valid" or "invalid"
        if ( 'valid' === $license_data->license ) {
            update_option( 'wbcom_essential_license_key', $license );
            update_option( 'wbcom_essential_license_status', $license_data->license );
            update_option( 'wbcom_essential_license_data', $license_data );
            return true;
        } else {
            return new WP_Error( 'license_invalid', __( 'License activation failed.', 'wbcom-essential' ) );
        }
    }
    
    /**
     * Deactivate license via API
     */
    private function deactivate_license_api() {
        $license = trim( get_option( 'wbcom_essential_license_key' ) );
        
        // data to send in our API request
        $api_params = array(
            'edd_action' => 'deactivate_license',
            'license'    => $license,
            'item_id'    => WBCOM_ESSENTIAL_ITEM_ID,
            'item_name'  => rawurlencode( WBCOM_ESSENTIAL_ITEM_NAME ),
            'url'        => home_url(),
            'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
        );
        
        // Call the custom API.
        $response = wp_remote_post(
            WBCOM_ESSENTIAL_STORE_URL,
            array(
                'timeout'   => 15,
                'sslverify' => false,
                'body'      => $api_params,
            )
        );
        
        if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
            $message = is_wp_error( $response ) ? $response->get_error_message() : __( 'An error occurred, please try again.', 'wbcom-essential' );
            return new WP_Error( 'api_error', $message );
        }
        
        // decode the license data
        $license_data = json_decode( wp_remote_retrieve_body( $response ) );
        
        // $license_data->license will be either "deactivated" or "failed"
        if ( 'deactivated' === $license_data->license ) {
            delete_option( 'wbcom_essential_license_status' );
            delete_option( 'wbcom_essential_license_data' );
            return true;
        } else {
            return new WP_Error( 'license_error', __( 'License deactivation failed.', 'wbcom-essential' ) );
        }
    }
    
    /**
     * Check license via API
     */
    private function check_license_api( $license ) {
        $api_params = array(
            'edd_action' => 'check_license',
            'license'    => $license,
            'item_id'    => WBCOM_ESSENTIAL_ITEM_ID,
            'item_name'  => rawurlencode( WBCOM_ESSENTIAL_ITEM_NAME ),
            'url'        => home_url(),
            'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
        );
        
        // Call the custom API.
        $response = wp_remote_post(
            WBCOM_ESSENTIAL_STORE_URL,
            array(
                'timeout'   => 15,
                'sslverify' => false,
                'body'      => $api_params,
            )
        );
        
        if ( is_wp_error( $response ) ) {
            return $response;
        }
        
        $license_data = json_decode( wp_remote_retrieve_body( $response ) );
        
        update_option( 'wbcom_essential_license_status', $license_data->license );
        update_option( 'wbcom_essential_license_data', $license_data );
        
        return $license_data;
    }
    
    /**
     * Activate license (form submission)
     */
    private function activate_license() {
        // Run a quick security check
        if ( ! check_admin_referer( 'wbcom_essential_license_nonce', 'wbcom_essential_license_nonce' ) ) {
            return;
        }
        
        // Retrieve the license from the database
        $license = trim( get_option( 'wbcom_essential_license_key' ) );
        if ( ! $license ) {
            $license = ! empty( $_POST['wbcom_essential_license_key'] ) ? sanitize_text_field( $_POST['wbcom_essential_license_key'] ) : '';
        }
        if ( ! $license ) {
            return;
        }
        
        $result = $this->activate_license_api( $license );
        
        if ( is_wp_error( $result ) ) {
            $redirect = add_query_arg(
                array(
                    'page'          => 'wbcom-widgets',
                    'tab'           => 'license',
                    'sl_activation' => 'false',
                    'message'       => rawurlencode( $result->get_error_message() ),
                ),
                admin_url( 'admin.php' )
            );
            
            wp_safe_redirect( $redirect );
            exit();
        }
        
        wp_safe_redirect( admin_url( 'admin.php?page=wbcom-widgets&tab=license&sl_activation=true' ) );
        exit();
    }
    
    /**
     * Deactivate license (form submission)
     */
    private function deactivate_license() {
        // Run a quick security check
        if ( ! check_admin_referer( 'wbcom_essential_license_nonce', 'wbcom_essential_license_nonce' ) ) {
            return;
        }
        
        $result = $this->deactivate_license_api();
        
        if ( is_wp_error( $result ) ) {
            $redirect = add_query_arg(
                array(
                    'page'          => 'wbcom-widgets',
                    'tab'           => 'license',
                    'sl_activation' => 'false',
                    'message'       => rawurlencode( $result->get_error_message() ),
                ),
                admin_url( 'admin.php' )
            );
            
            wp_safe_redirect( $redirect );
            exit();
        }
        
        wp_safe_redirect( admin_url( 'admin.php?page=wbcom-widgets&tab=license&sl_deactivation=true' ) );
        exit();
    }
}