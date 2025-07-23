# WBcom Shared Wrapper & License Integration Guide

This guide explains how to integrate the WBcom shared admin wrapper and license system into your plugin with minimal code changes.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Shared Admin Wrapper Integration](#shared-admin-wrapper-integration)
3. [License System Integration](#license-system-integration)
4. [Advanced Configuration](#advanced-configuration)
5. [Troubleshooting](#troubleshooting)

## Quick Start

The simplest way to integrate your plugin with the WBcom shared system:

```php
// In your main plugin file
add_action( 'plugins_loaded', function() {
    if ( class_exists( 'Wbcom_Shared_Loader' ) ) {
        Wbcom_Shared_Loader::quick_register( 
            __FILE__,
            array(
                'menu_title' => 'Your Plugin Name',
                'icon'       => 'dashicons-admin-generic',
            )
        );
    }
}, 15 );
```

## Shared Admin Wrapper Integration

### Step 1: Copy Required Files

Copy the `includes/shared-admin/` folder from wbcom-essential to your plugin's `includes/` directory:

```
your-plugin/
├── includes/
│   └── shared-admin/
│       ├── class-wbcom-shared-loader.php
│       ├── class-wbcom-shared-dashboard.php
│       ├── wbcom-easy-setup.php
│       ├── wbcom-shared-admin.css
│       └── wbcom-shared-admin.js
```

### Step 2: Basic Integration

Add this code to your main plugin file:

```php
namespace YOUR_PLUGIN_NAMESPACE;

class Your_Plugin {
    
    public function __construct() {
        add_action( 'plugins_loaded', array( $this, 'init_wbcom_wrapper' ), 5 );
    }
    
    public function init_wbcom_wrapper() {
        // Register with the shared system
        add_action( 'plugins_loaded', array( $this, 'register_with_shared_system' ), 15 );
        
        // Fallback for older systems
        add_action( 'init', array( $this, 'init_fallback_integration' ) );
    }
    
    public function register_with_shared_system() {
        // Try to load the shared loader if not already loaded
        if ( ! class_exists( 'Wbcom_Shared_Loader' ) ) {
            $shared_loader_file = plugin_dir_path( __FILE__ ) . 'includes/shared-admin/class-wbcom-shared-loader.php';
            if ( file_exists( $shared_loader_file ) ) {
                require_once $shared_loader_file;
            }
        }
        
        if ( ! class_exists( 'Wbcom_Shared_Loader' ) ) {
            return;
        }
        
        // Use the advanced quick registration system
        \Wbcom_Shared_Loader::quick_register( 
            __FILE__,
            array(
                'menu_title'    => 'Your Plugin Name',
                'slug'          => 'your-plugin-slug',
                'priority'      => 10,
                'icon'          => 'dashicons-admin-generic', // Will auto-detect if not provided
                'description'   => 'Brief description of your plugin',
                'settings_url'  => admin_url( 'admin.php?page=your-plugin-slug' ),
                'status'        => 'active',
                'version'       => YOUR_PLUGIN_VERSION,
                'callback'      => array( 'YOUR_NAMESPACE\Your_Admin_Class', 'render_admin_page' ),
            )
        );
    }
    
    public function init_fallback_integration() {
        // Only use fallback if the shared loader registration didn't work
        if ( ! class_exists( 'Wbcom_Shared_Loader' ) && function_exists( 'wbcom_integrate_plugin' ) ) {
            wbcom_integrate_plugin( 
                __FILE__,
                array(
                    'menu_title'   => __( 'Your Plugin Name', 'your-text-domain' ),
                    'slug'         => 'your-plugin',
                    'priority'     => 10,
                    'icon'         => 'dashicons-admin-generic',
                    'callback'     => array( 'YOUR_NAMESPACE\Your_Admin_Class', 'render_admin_page' ),
                    'settings_url' => admin_url( 'admin.php?page=your-plugin-slug' ),
                )
            );
        }
    }
}
```

### Step 3: Create Your Admin Page

Create an admin class with a static render method:

```php
namespace YOUR_PLUGIN_NAMESPACE;

class Your_Admin_Class {
    
    public static function render_admin_page() {
        $instance = new self();
        $instance->render_settings_page();
    }
    
    public function render_settings_page() {
        $current_tab = isset( $_GET['tab'] ) ? sanitize_text_field( $_GET['tab'] ) : 'settings';
        ?>
        <div class="wrap your-plugin-admin">
            <h1>
                <span class="dashicons dashicons-admin-generic"></span>
                <?php esc_html_e( 'Your Plugin Name', 'your-text-domain' ); ?>
            </h1>
            
            <div class="tab-content-wrapper">
                <nav class="nav-tab-wrapper" role="tablist">
                    <a href="?page=your-plugin-slug&tab=settings" 
                       class="nav-tab <?php echo $current_tab === 'settings' ? 'nav-tab-active' : ''; ?>">
                        <span class="dashicons dashicons-admin-settings"></span>
                        <?php esc_html_e( 'Settings', 'your-text-domain' ); ?>
                    </a>
                    <?php if ( $this->has_premium_license() ) : ?>
                    <a href="?page=your-plugin-slug&tab=license" 
                       class="nav-tab <?php echo $current_tab === 'license' ? 'nav-tab-active' : ''; ?>">
                        <span class="dashicons dashicons-admin-network"></span>
                        <?php esc_html_e( 'License', 'your-text-domain' ); ?>
                    </a>
                    <?php endif; ?>
                </nav>
                
                <div class="tab-content" role="tabpanel">
                    <?php
                    switch ( $current_tab ) {
                        case 'license':
                            $this->render_license_tab();
                            break;
                        case 'settings':
                        default:
                            $this->render_settings_tab();
                            break;
                    }
                    ?>
                </div>
            </div>
        </div>
        
        <style>
        /* Native WordPress tab styling */
        .your-plugin-admin .nav-tab-wrapper {
            margin: 0;
            padding: 0;
            border-bottom: 1px solid #c3c4c7;
            background: #f8f9fa;
            display: flex;
            align-items: stretch;
        }
        
        .your-plugin-admin .nav-tab {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 12px 16px;
            border: none;
            border-bottom: 2px solid transparent;
            background: transparent;
            color: #646970;
            text-decoration: none;
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .your-plugin-admin .nav-tab:hover {
            background: #fff;
            color: #0073aa;
        }
        
        .your-plugin-admin .nav-tab-active {
            background: #fff;
            color: #0073aa;
            border-bottom-color: #0073aa;
        }
        
        .your-plugin-admin .nav-tab .dashicons {
            font-size: 16px;
            line-height: 1;
        }
        
        .your-plugin-admin .tab-content-wrapper {
            background: #fff;
            border: 1px solid #c3c4c7;
            border-radius: 0 0 4px 4px;
            border-top: none;
            margin-top: 0;
        }
        
        .your-plugin-admin .tab-content {
            padding: 20px;
        }
        </style>
        <?php
    }
}
```

## License System Integration

### For Premium Plugins Only

If your plugin requires license activation:

### Step 1: Copy License Files

Copy the `license/` folder from wbcom-essential (excluding plugin-specific files):

```
your-plugin/
├── license/
│   ├── class-license-manager.php (modify for your plugin)
│   ├── class-license-updater.php (modify for your plugin)
│   ├── class-edd-updater-wrapper.php
│   └── EDD_SL_Plugin_Updater.php
```

### Step 2: Define License Constants

In your main plugin file or loader:

```php
// License constants
define( 'YOUR_PLUGIN_STORE_URL', 'https://wbcomdesigns.com' );
define( 'YOUR_PLUGIN_ITEM_ID', YOUR_ITEM_ID ); // Get from WBcom store
define( 'YOUR_PLUGIN_ITEM_NAME', 'Your Plugin Name' ); // Exact name on store
```

### Step 3: Create Your License Manager

Modify the license manager class:

```php
class YOUR_PLUGIN_License_Manager {
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
        add_action( 'wp_ajax_your_plugin_activate_license', array( $this, 'ajax_activate_license' ) );
        add_action( 'wp_ajax_your_plugin_deactivate_license', array( $this, 'ajax_deactivate_license' ) );
        add_action( 'wp_ajax_your_plugin_check_license', array( $this, 'ajax_check_license' ) );
    }
    
    public function get_license_key() {
        return get_option( 'your_plugin_license_key' );
    }
    
    // ... rest of license methods
}
```

### Step 4: Initialize License System

In your admin class:

```php
private function init_license_components() {
    $license_manager_file = plugin_dir_path( __FILE__ ) . 'license/class-license-manager.php';
    if ( file_exists( $license_manager_file ) ) {
        require_once $license_manager_file;
        $this->license_manager = \YOUR_PLUGIN_License_Manager::get_instance();
    }
}

private function render_license_tab() {
    if ( ! $this->license_manager ) {
        $this->init_license_components();
    }
    
    if ( $this->license_manager ) {
        $this->license_manager->render_license_tab();
    }
}
```

## Advanced Configuration

### Auto-Detection Features

The shared loader can auto-detect many settings:

```php
// Minimal registration - auto-detects icon, admin class, etc.
Wbcom_Shared_Loader::quick_register( __FILE__ );

// With overrides
Wbcom_Shared_Loader::quick_register( __FILE__, array(
    'name'        => 'Custom Name',        // Auto-detected from plugin headers
    'icon'        => 'dashicons-custom',   // Auto-detected based on plugin name
    'priority'    => 5,                    // Default: 10
    'has_premium' => true,                 // Default: false
    'docs_url'    => 'https://...',        // Auto-generated if not provided
));
```

### Icon Auto-Detection

The system automatically selects appropriate icons based on plugin name:
- Contains "activity" → `dashicons-admin-comments`
- Contains "member" → `dashicons-admin-users`
- Contains "group" → `dashicons-groups`
- Contains "message" → `dashicons-email`
- Contains "notification" → `dashicons-bell`
- Contains "media" → `dashicons-admin-media`
- Contains "event" → `dashicons-calendar`
- Contains "poll" → `dashicons-chart-bar`
- Contains "essential" → `dashicons-screenoptions`

### Standalone Mode

If no other WBcom plugin is active, your plugin will create the main WBcom menu:

```php
public function __construct() {
    // Check if we should create standalone menu
    if ( ! $this->should_use_wrapper() ) {
        add_action( 'admin_menu', array( $this, 'add_standalone_menu' ) );
    }
}

private function should_use_wrapper() {
    // Check if shared system is available
    if ( class_exists( 'Wbcom_Shared_Loader' ) ) {
        return true;
    }
    
    // Check for legacy integration
    if ( function_exists( 'wbcom_integrate_plugin' ) ) {
        return true;
    }
    
    return false;
}
```

## Troubleshooting

### Common Issues

1. **Plugin appears twice in menu**
   - Ensure you're not instantiating admin classes multiple times
   - Check that fallback integration only runs if primary fails

2. **License not saving**
   - Verify license constants are defined
   - Check AJAX handlers are registered
   - Ensure nonces match in JS and PHP

3. **Styles not loading**
   - Enqueue styles only on your admin pages
   - Check for hook priority conflicts

### Debug Mode

Enable WordPress debug mode to see integration logs:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
```

### Required Plugin Structure

```
your-plugin/
├── your-plugin.php (main file)
├── includes/
│   └── shared-admin/ (shared system files)
├── license/ (for premium plugins only)
│   ├── class-license-manager.php
│   └── ...
└── admin/
    └── class-your-admin.php
```

## Best Practices

1. **Use Namespaces**: Prevent conflicts with other plugins
2. **Static Callbacks**: Use static methods for admin page callbacks
3. **Lazy Loading**: Initialize components only when needed
4. **Version Checking**: Handle compatibility with older WBcom systems
5. **Consistent Styling**: Use the provided CSS classes for uniform appearance

## Example Implementation

See `wbcom-essential` plugin for a complete implementation example:
- Main plugin file: `wbcom-essential.php`
- Admin class: `admin/class-wbcom-essential-widget-showcase.php`
- License system: `license/` folder

## Support

For questions or issues with integration:
- GitHub: https://github.com/wbcomdesigns/
- Support: https://wbcomdesigns.com/support/