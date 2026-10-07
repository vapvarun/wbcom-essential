<?php

/**
 * Wbcom Shared Dashboard - Universal Dashboard for All Plugins
 * 
 * @package Wbcom_Shared_Admin
 * @version 2.0.0
 */

if (!defined('ABSPATH')) { exit;
}

class Wbcom_Shared_Dashboard {


    private $registered_plugins = array();
    private $menu_created = false;

    /**
     * Constructor
     */
    public function __construct($plugins = array())
    {
        $this->registered_plugins = $plugins;
        $this->init();
    }

    /**
     * Initialize dashboard
     */
    private function init()
    {
        add_action('admin_menu', array($this, 'create_main_menu'), 5);
        add_action('admin_menu', array($this, 'add_plugin_submenus'), 10);
    }

    /**
     * Create main Wbcom Designs menu
     */
    public function create_main_menu()
    {
        if ($this->menu_created) { return;
        }

        add_menu_page(
            esc_html__('Wbcom Designs', 'wbcom-essential'),
            esc_html__('Wbcom Designs', 'wbcom-essential'),
            'manage_options',
            'wbcom-designs',
            array($this, 'render_dashboard'),
            $this->get_menu_icon(),
            58.5
        );

        // Add dashboard as first submenu
        add_submenu_page(
            'wbcom-designs',
            esc_html__('Dashboard', 'wbcom-essential'),
            esc_html__('Dashboard', 'wbcom-essential'),
            'manage_options',
            'wbcom-designs',
            array($this, 'render_dashboard')
        );

        $this->menu_created = true;
    }

    /**
     * Add submenu for each registered plugin
     */
    public function add_plugin_submenus()
    {
        foreach ($this->registered_plugins as $plugin) {
            if ($plugin['status'] !== 'active') { continue;
            }

            $menu_slug = $this->extract_menu_slug($plugin['settings_url']);

            if (empty($menu_slug)) { continue;
            }

            add_submenu_page(
                'wbcom-designs',
                $plugin['name'],
                $plugin['name'],
                'manage_options',
                $menu_slug,
                '__return_null' // Plugin handles its own rendering
            );
        }
    }

    /**
     * Render main dashboard
     */
    public function render_dashboard()
    {
        $active_tab = isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : 'overview'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Admin dashboard tab parameter, no state change.
?>
        <div class="wrap wbcom-shared-dashboard">
            <h1>
                🌟
                <?php esc_html_e('Wbcom Designs', 'wbcom-essential'); ?>
                <span class="wbcom-version">v<?php echo esc_html(Wbcom_Shared_Loader::VERSION); ?></span>
            </h1>

            <?php $this->render_admin_notices(); ?>

            <div class="wbcom-dashboard-content">
                <div class="wbcom-dashboard-main">
                    <?php $this->render_dashboard_tabs($active_tab); ?>
                </div>
                <div class="wbcom-dashboard-sidebar">
                    <?php $this->render_sidebar_widgets(); ?>
                </div>
            </div>
        </div>
    <?php
    }

    /**
     * Render dashboard tabs
     */
    private function render_dashboard_tabs($active_tab)
    {
        $tabs = array(
            'overview' => array(
                'title' => esc_html__('Overview', 'wbcom-essential'),
                'icon'  => 'dashicons-dashboard',
            ),
            'plugins' => array(
                'title' => esc_html__('Installed Plugins', 'wbcom-essential'),
                'icon'  => 'dashicons-admin-plugins',
            ),
            'premium' => array(
                'title' => esc_html__('Premium Plugins', 'wbcom-essential'),
                'icon'  => 'dashicons-star-filled',
            ),
            'themes' => array(
                'title' => esc_html__('Premium Themes', 'wbcom-essential'),
                'icon'  => 'dashicons-admin-appearance',
            ),
            'news' => array(
                'title' => esc_html__('News & Updates', 'wbcom-essential'),
                'icon'  => 'dashicons-rss',
            ),
        );
    ?>
        <div class="wbcom-dashboard-tabs">
            <nav class="nav-tab-wrapper">
                <?php foreach ($tabs as $tab_key => $tab_data) : ?>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=wbcom-designs&tab=' . $tab_key)); ?>"
                        class="nav-tab <?php echo esc_attr( $active_tab === $tab_key ? 'nav-tab-active' : '' ); ?>">
                        <span class="dashicons <?php echo esc_attr($tab_data['icon']); ?>"></span>
                        <?php echo esc_html($tab_data['title']); ?>
                    </a>
                <?php endforeach; ?>
            </nav>

            <div class="tab-content">
                <?php
                switch ($active_tab) {
                    case 'plugins':
                        $this->render_plugins_tab();
                        break;
                    case 'premium':
                        $this->render_premium_tab();
                        break;
                    case 'themes':
                        $this->render_themes_tab();
                        break;
                    case 'news':
                        $this->render_news_tab();
                        break;
                    case 'overview':
                    default:
                        $this->render_overview_tab();
                        break;
                }
                ?>
            </div>
        </div>
    <?php
    }

    /**
     * Render overview tab
     */
    private function render_overview_tab()
    {
    ?>
        <div class="wbcom-welcome-panel" style="background: #fff; border: 1px solid #e1e5e9; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
            <h2 style="color: #153045; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;"><?php esc_html_e('Welcome to Wbcom Designs Dashboard', 'wbcom-essential'); ?></h2>
            <p class="about-description" style="color: #515b67; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
                <?php esc_html_e('Your central hub for managing premium WordPress and BuddyPress solutions. At Wbcom Designs, we specialize in creating powerful community plugins, custom development services, and comprehensive support solutions. Our Care Plan ensures your site stays optimized and secure with priority support, regular updates, and expert maintenance.', 'wbcom-essential'); ?>
            </p>
            <div class="wbcom-care-plan-notice" style="background: linear-gradient(135deg, #2c5282 0%, #1e3a5f 100%); color: white; padding: 30px; border-radius: 12px; margin: 25px 0; box-shadow: 0 8px 25px rgba(44, 82, 130, 0.25); border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;">
                <!-- Security Shield Background Pattern -->
                <div style="position: absolute; top: -20px; right: -20px; opacity: 0.1; font-size: 120px; transform: rotate(15deg);">🛡️</div>

                <div style="display: flex; align-items: flex-start; gap: 20px;">
                    <div style="flex-shrink: 0; background: rgba(255,255,255,0.15); border-radius: 50%; padding: 15px; border: 2px solid rgba(255,255,255,0.2);">
                        <span style="font-size: 28px; display: block; line-height: 1;">⚠️</span>
                    </div>

                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            <?php esc_html_e('Don\'t Risk Your Website\'s Success', 'wbcom-essential'); ?>
                        </h3>
                        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.95);">
                            <?php esc_html_e('WordPress updates can break your site, security vulnerabilities expose your data, and performance issues drive visitors away. Our Care Plan ensures all updates are tested before deployment, security is monitored 24/7, and your site stays optimized. Stop worrying about crashes and focus on growing your business.', 'wbcom-essential'); ?>
                        </p>

                        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                            <a href="https://wbcomdesigns.com/start-a-project/" target="_blank"
                                style="background: #fff; color: #2c5282; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; border: none;"
                                onmouseover="this.style.background='#f8f9fa'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.3)'"
                                onmouseout="this.style.background='#fff'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.2)'">
                                <span style="background: linear-gradient(135deg, #2c5282, #1e3a5f); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px;">📞</span>
                                <?php esc_html_e('Schedule Free Consultation', 'wbcom-essential'); ?>
                            </a>

                            <div style="background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.2);">
                                ✓ <?php esc_html_e( 'No Commitment Required', 'wbcom-essential' ); ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="wbcom-welcome-panel-columns" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 24px;">
                <div class="wbcom-welcome-panel-column">
                    <h3 style="color: #153045; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid #f0f0f1;"><?php esc_html_e('Our Services', 'wbcom-essential'); ?></h3>
                    <div class="wbcom-action-list" style="display: flex; flex-direction: column; gap: 12px;">
                        <a href="https://wbcomdesigns.com/downloads/wordpress-care-plans/" target="_blank" style="display: block; background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%); color: #ffffff; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(44, 82, 130, 0.2);" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(44, 82, 130, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(44, 82, 130, 0.2)';"><?php esc_html_e('Get Care Plan', 'wbcom-essential'); ?></a>
                        <a href="https://wbcomdesigns.com/plugins/" target="_blank" style="display: block; background: #fff; border: 1px solid #2c5282; color: #2c5282; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.background='#f0f4ff'; this.style.borderColor='#1e3a5f'; this.style.color='#1e3a5f';" onmouseout="this.style.background='#fff'; this.style.borderColor='#2c5282'; this.style.color='#2c5282';"><?php esc_html_e('Premium Plugins', 'wbcom-essential'); ?></a>
                        <a href="https://wbcomdesigns.com/start-a-project/" target="_blank" style="display: block; background: #fff; border: 1px solid #2c5282; color: #2c5282; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.background='#f0f4ff'; this.style.borderColor='#1e3a5f'; this.style.color='#1e3a5f';" onmouseout="this.style.background='#fff'; this.style.borderColor='#2c5282'; this.style.color='#2c5282';"><?php esc_html_e('Custom Development', 'wbcom-essential'); ?></a>
                        <a href="https://wbcomdesigns.com/support/" target="_blank" style="display: block; background: #fff; border: 1px solid #2c5282; color: #2c5282; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.background='#f0f4ff'; this.style.borderColor='#1e3a5f'; this.style.color='#1e3a5f';" onmouseout="this.style.background='#fff'; this.style.borderColor='#2c5282'; this.style.color='#2c5282';"><?php esc_html_e('Get Support', 'wbcom-essential'); ?></a>
                    </div>
                </div>

                <div class="wbcom-welcome-panel-column">
                    <h3 style="color: #153045; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid #f0f0f1;"><?php esc_html_e('System Status', 'wbcom-essential'); ?></h3>
                    <div class="wbcom-system-status" style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
                            <span class="status-indicator" style="width: 12px; height: 12px; border-radius: 50%; background-color: <?php echo esc_attr( version_compare(get_bloginfo('version'), '5.0', '>=') ? '#2c5282' : '#e74c3c' ); ?>; flex-shrink: 0;"></span>
                            <span style="font-size: 14px; color: #153045; font-weight: 500;"><?php esc_html_e('WordPress Version', 'wbcom-essential'); ?></span>
                            <span style="font-size: 13px; color: #515b67; margin-left: auto;"><?php echo esc_html( get_bloginfo('version') ); ?></span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
                            <span class="status-indicator" style="width: 12px; height: 12px; border-radius: 50%; background-color: <?php echo esc_attr( function_exists('buddypress') ? '#2c5282' : '#e74c3c' ); ?>; flex-shrink: 0;"></span>
                            <span style="font-size: 14px; color: #153045; font-weight: 500;"><?php esc_html_e('BuddyPress', 'wbcom-essential'); ?></span>
                            <span style="font-size: 13px; color: #515b67; margin-left: auto;"><?php echo function_exists('buddypress') ? esc_html__('Active', 'wbcom-essential') : esc_html__('Inactive', 'wbcom-essential'); ?></span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
                            <span class="status-indicator" style="width: 12px; height: 12px; border-radius: 50%; background-color: <?php echo esc_attr( defined('WP_DEBUG') && WP_DEBUG ? '#e74c3c' : '#2c5282' ); ?>; flex-shrink: 0;"></span>
                            <span style="font-size: 14px; color: #153045; font-weight: 500;"><?php esc_html_e('Production Mode', 'wbcom-essential'); ?></span>
                            <span style="font-size: 13px; color: #515b67; margin-left: auto;"><?php echo defined('WP_DEBUG') && WP_DEBUG ? esc_html__('Debug On', 'wbcom-essential') : esc_html__('Active', 'wbcom-essential'); ?></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php
    }

    /**
     * Render plugins tab
     */
    private function render_plugins_tab()
    {
    ?>
        <div class="wbcom-plugins-header" style="background: #fff; border: 1px solid #e1e5e9; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
            <h2 style="color: #153045; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;"><?php esc_html_e('Installed Wbcom Plugins', 'wbcom-essential'); ?></h2>
        </div>

        <div class="wbcom-plugins-grid">
            <?php if (empty($this->registered_plugins)) : ?>
                <div class="wbcom-no-plugins" style="background: #fff; border: 1px solid #e1e5e9; border-radius: 12px; padding: 60px 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
                    <div class="no-plugins-icon">
                        <span class="dashicons dashicons-admin-plugins" style="font-size: 64px; color: #2c5282; margin-bottom: 20px;"></span>
                    </div>
                    <h3 style="color: #153045; font-size: 20px; font-weight: 600; margin: 0 0 12px 0;"><?php esc_html_e('No Wbcom Plugins Found', 'wbcom-essential'); ?></h3>
                    <p style="color: #515b67; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;"><?php esc_html_e('Looks like you haven\'t installed any Wbcom Designs plugins yet.', 'wbcom-essential'); ?></p>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=wbcom-designs&tab=premium')); ?>" style="display: inline-block; background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);" onmouseover="this.style.background='linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44, 82, 130, 0.4)';" onmouseout="this.style.background='linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(44, 82, 130, 0.3)';">
                        <?php esc_html_e('Browse Premium Plugins', 'wbcom-essential'); ?>
                    </a>
                </div>
            <?php else : ?>
                <?php foreach ($this->registered_plugins as $plugin) : ?>
                    <div class="wbcom-plugin-card plugin-status-<?php echo esc_attr($plugin['status']); ?>">
                        <div class="plugin-card-top">
                            <div class="plugin-card-header">
                                <h3><?php echo esc_html($plugin['name']); ?></h3>
                                <div class="plugin-status-badge <?php echo esc_attr($plugin['status']); ?>">
                                    <?php echo esc_html(ucfirst($plugin['status'])); ?>
                                </div>
                            </div>
                            <p class="plugin-description"><?php echo esc_html($plugin['description']); ?></p>
                            <div class="plugin-version">
                                <span class="version-label"><?php esc_html_e('Version:', 'wbcom-essential'); ?></span>
                                <span class="version-number"><?php echo esc_html($plugin['version']); ?></span>
                            </div>
                        </div>
                        <div class="plugin-card-bottom">
                            <div class="plugin-actions">
                                <?php if ($plugin['status'] === 'active' && !empty($plugin['settings_url'])) : ?>
                                    <a href="<?php echo esc_url($plugin['settings_url']); ?>" class="button button-primary">
                                        <span class="dashicons dashicons-admin-generic"></span>
                                        <?php esc_html_e('Settings', 'wbcom-essential'); ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    <?php
    }

    /**
     * Render premium plugins tab
     */
    private function render_premium_tab()
    {
        $premium_plugins = $this->get_premium_plugins();

    ?>
        <div class="wbcom-premium-section">
            <div class="wbcom-premium-header">
                <h2><?php esc_html_e('Premium BuddyPress Plugins', 'wbcom-essential'); ?></h2>
                <p><?php esc_html_e('Enhance your community with these powerful premium plugins designed specifically for BuddyPress.', 'wbcom-essential'); ?></p>
            </div>

            <div class="premium-plugins-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 30px; margin-top: 30px;">
                <?php foreach ($premium_plugins as $plugin) : ?>
                    <div class="premium-plugin-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.3s ease; position: relative;">


                        <div class="plugin-card-content" style="background: #fff; margin: 3px; border-radius: 13px; padding: 30px;">

                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                                <div style="flex: 1;">
                                    <h3 style="font-size: 22px; font-weight: 700; color: #153045; margin: 0 0 6px 0; line-height: 1.2;">
                                        <?php echo esc_html($plugin['name']); ?>
                                    </h3>
                                    <?php if (isset($plugin['tagline'])) : ?>
                                        <p class="plugin-tagline" style="color: #515b67; font-weight: 400; font-size: 14px; margin: 0; line-height: 1.4;">
                                            <?php echo esc_html($plugin['tagline']); ?>
                                        </p>
                                    <?php endif; ?>
                                </div>
                                <div style="flex-shrink: 0; margin-left: 20px;">
                                    <span class="price-amount" style="font-size: 24px; font-weight: 800; color: #2c5282; background: linear-gradient(135deg, #faf9ff 0%, #f0f4ff 100%); padding: 8px 16px; border-radius: 8px; border: 2px solid #2c5282; display: inline-block; min-width: 80px; text-align: center;">
                                        <?php echo esc_html($plugin['price']); ?>
                                    </span>
                                </div>
                            </div>

                            <div class="plugin-description" style="margin-bottom: 20px;">
                                <p style="color: #515b67; font-size: 15px; line-height: 1.6; margin: 0;">
                                    <?php echo esc_html($plugin['description']); ?>
                                </p>
                            </div>

                            <div class="plugin-features" style="margin-bottom: 24px;">
                                <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 8px;">
                                    <?php foreach ($plugin['features'] as $feature) : ?>
                                        <li style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #153045; padding: 6px 0;">
                                            <span class="dashicons dashicons-yes" style="color: #2c5282; font-size: 16px; flex-shrink: 0;"></span>
                                            <span><?php echo esc_html($feature); ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>

                            <?php if (isset($plugin['highlight'])) : ?>
                                <div class="plugin-highlight" style="background: linear-gradient(135deg, #faf9ff 0%, #f0f4ff 100%); color: #153045; padding: 16px; border-radius: 10px; margin-bottom: 20px; text-align: center; border: 2px solid #2c5282;">
                                    <p style="margin: 0; font-size: 14px; font-weight: 600; line-height: 1.4;">
                                        ⭐ <?php echo esc_html($plugin['highlight']); ?>
                                    </p>
                                </div>
                            <?php endif; ?>

                            <div class="plugin-actions" style="margin-top: 20px;">
                                <a href="<?php echo esc_url($plugin['url']); ?>" target="_blank" rel="noopener"
                                    style="display: block; width: 100%; background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%); color: #ffffff; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; text-align: center; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);"
                                    onmouseover="this.style.background='linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44, 82, 130, 0.4)';"
                                    onmouseout="this.style.background='linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(44, 82, 130, 0.3)';">
                                    <?php
                                    /* translators: %s: premium plugin name. */
                                    echo esc_html( sprintf( __( 'Get %s', 'wbcom-essential' ), $plugin['name'] ) );
                                    ?>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="premium-footer">
                <p class="center-text">
                    <a href="https://wbcomdesigns.com/plugins/" target="_blank" rel="noopener"
                        style="display: inline-block; background: linear-gradient(135deg, rgb(29, 118, 218) 0%, rgb(60, 140, 230) 100%); color: rgb(255, 255, 255); padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s ease; box-shadow: rgba(44, 82, 130, 0.3) 0px 4px 12px; transform: translateY(0px);"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44, 82, 130, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(44, 82, 130, 0.3)'">
                        <?php esc_html_e('Browse All Premium Plugins', 'wbcom-essential'); ?>
                        <span class="dashicons dashicons-external" style="vertical-align: middle; margin-left: 5px;"></span>
                    </a>
                </p>
            </div>
        </div>
    <?php
    }

    /**
     * Render themes tab
     */
    private function render_themes_tab()
    {
        $premium_themes = $this->get_premium_themes();

    ?>
        <div class="wbcom-themes-section">
            <div class="wbcom-themes-header">
                <h2><?php esc_html_e('Premium Community Themes', 'wbcom-essential'); ?></h2>
                <p><?php esc_html_e('Transform your vision with these powerful multi-purpose themes designed to create any type of community platform.', 'wbcom-essential'); ?></p>
            </div>

            <div class="premium-themes-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; margin-top: 30px;">
                <?php foreach ($premium_themes as $theme) : ?>
                    <div class="premium-theme-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 16px; padding: 0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.3s ease; position: relative;">

                        <div class="theme-card-content" style="background: #fff; margin: 3px; border-radius: 13px; padding: 30px;">

                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                                <div style="flex: 1;">
                                    <h3 style="font-size: 22px; font-weight: 700; color: #153045; margin: 0 0 6px 0; line-height: 1.2;">
                                        <?php echo esc_html($theme['name']); ?>
                                    </h3>
                                    <?php if (isset($theme['tagline'])) : ?>
                                        <p class="theme-tagline" style="color: #515b67; font-weight: 400; font-size: 14px; margin: 0; line-height: 1.4;">
                                            <?php echo esc_html($theme['tagline']); ?>
                                        </p>
                                    <?php endif; ?>
                                </div>

                                <div style="flex-shrink: 0; margin-left: 20px;">
                                    <span class="price-amount" style="font-size: 24px; font-weight: 800; color: #2c5282; background: linear-gradient(135deg, #faf9ff 0%, #f0f4ff 100%); padding: 8px 16px; border-radius: 8px; border: 2px solid #2c5282; display: inline-block; min-width: 80px; text-align: center;">
                                        <?php echo esc_html($theme['price']); ?>
                                    </span>
                                </div>
                            </div>

                            <div class="theme-description" style="margin-bottom: 24px;">
                                <p style="color: #5a6c7d; font-size: 15px; line-height: 1.6; margin: 0;">
                                    <?php echo esc_html($theme['description']); ?>
                                </p>
                            </div>

                            <div class="theme-features" style="margin-bottom: 24px;">
                                <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 8px;">
                                    <?php foreach ($theme['features'] as $feature) : ?>
                                        <li style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #153045; padding: 6px 0;">
                                            <span class="dashicons dashicons-yes" style="color: #2c5282; font-size: 16px; flex-shrink: 0;"></span>
                                            <span><?php echo esc_html($feature); ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>

                            <div class="theme-actions" style="display: flex; flex-direction: column; gap: 8px; margin-top: 20px;">
                                <a href="<?php echo esc_url($theme['url']); ?>" target="_blank" rel="noopener"
                                    style="width: 100%; background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%); color: white; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; text-align: center; transition: all 0.3s ease; box-sizing: border-box;"
                                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44, 82, 130, 0.4)';"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                                    <?php esc_html_e( 'View Theme', 'wbcom-essential' ); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="themes-footer">
                <p class="center-text">
                    <a href="https://wbcomdesigns.com/downloads/category/themes/" target="_blank" rel="noopener"
                        style="display: inline-block; background: linear-gradient(135deg, rgb(29, 118, 218) 0%, rgb(60, 140, 230) 100%); color: rgb(255, 255, 255); padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s ease; box-shadow: rgba(44, 82, 130, 0.3) 0px 4px 12px; transform: translateY(0px);"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44, 82, 130, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(44, 82, 130, 0.3)'">
                        <?php esc_html_e('Browse All Premium Themes', 'wbcom-essential'); ?>
                        <span class="dashicons dashicons-external" style="vertical-align: middle; margin-left: 5px;"></span>
                    </a>
                </p>
            </div>
        </div>
    <?php
    }

    /**
     * Render news tab
     */
    private function render_news_tab()
    {
    ?>
        <div class="wbcom-news-section" style="background: #fff; border: 1px solid #e1e5e9; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
            <div class="wbcom-news-header" style="margin-bottom: 24px;">
                <h2 style="color: #153045; font-size: 24px; font-weight: 700; margin: 0 0 12px 0;"><?php esc_html_e('Latest News from Wbcom Designs', 'wbcom-essential'); ?></h2>
                <p style="color: #515b67; font-size: 15px; line-height: 1.6; margin: 0;"><?php esc_html_e('Stay updated with the latest plugin releases, updates, and WordPress community news.', 'wbcom-essential'); ?></p>
            </div>

            <div id="wbcom-news-feed" class="wbcom-news-feed" style="border: 1px solid #f0f0f1; border-radius: 8px; padding: 20px; background: #faf9ff;">
                <div class="news-loading" style="text-align: center; padding: 40px; color: #515b67;">
                    <span class="spinner is-active" style="margin-bottom: 15px;"></span>
                    <p style="margin: 0; font-size: 14px;"><?php esc_html_e('Loading latest news...', 'wbcom-essential'); ?></p>
                </div>
            </div>

            <div class="news-footer">
                <p class="center-text">
                    <a href="https://wbcomdesigns.com/blog/" target="_blank" rel="noopener"
                        style="display: inline-block; background: linear-gradient(135deg, rgb(29, 118, 218) 0%, rgb(60, 140, 230) 100%); color: rgb(255, 255, 255); padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s ease; box-shadow: rgba(44, 82, 130, 0.3) 0px 4px 12px; transform: translateY(0px);"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44, 82, 130, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(44, 82, 130, 0.3)'">
                        <?php esc_html_e('Visit Our Blog', 'wbcom-essential'); ?>
                        <span class="dashicons dashicons-external" style="vertical-align: middle; margin-left: 5px;"></span>
                    </a>
                </p>
            </div>
        </div>
    <?php
    }

    /**
     * Render sidebar widgets
     */
    private function render_sidebar_widgets()
    {
    ?>
        <!-- Care Plan Block -->
        <div class="wbcom-sidebar-widget wbcom-care-plan-widget">
            <div class="service-header">
                <h3>🛡️ <?php esc_html_e( 'WordPress Care Plan', 'wbcom-essential' ); ?></h3>
                <div class="service-badge"><?php esc_html_e( 'Essential', 'wbcom-essential' ); ?></div>
            </div>

            <div class="service-pricing">
                <span class="price">$149</span>
                <span class="period"><?php esc_html_e( '/month per site', 'wbcom-essential' ); ?></span>
            </div>

            <div class="service-description">
                <p><strong><?php esc_html_e( 'WordPress updates breaking your site?', 'wbcom-essential' ); ?></strong> <?php esc_html_e( 'We test everything before deployment.', 'wbcom-essential' ); ?> <strong><?php esc_html_e( 'Worried about security breaches?', 'wbcom-essential' ); ?></strong> <?php esc_html_e( 'We monitor and protect 24/7.', 'wbcom-essential' ); ?> <strong><?php esc_html_e( 'Site running slow?', 'wbcom-essential' ); ?></strong> <?php esc_html_e( 'We optimize performance continuously.', 'wbcom-essential' ); ?></p>
            </div>

            <div class="service-features">
                <ul>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'No More Broken Sites from Updates', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Protected from Security Threats', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Always Fast & Optimized Performance', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Automatic Daily Backups', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Expert Support When You Need It', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Peace of Mind - Focus on Business', 'wbcom-essential' ); ?></li>
                </ul>
            </div>

            <div class="service-actions">
                <a href="https://wbcomdesigns.com/downloads/wordpress-care-plans/" target="_blank" class="service-btn primary" style="margin-bottom: 8px;">
                    <?php esc_html_e( 'Get Care Plan', 'wbcom-essential' ); ?>
                </a>
                <a href="https://wbcomdesigns.com/start-a-project/" target="_blank" class="service-btn outline">
                    <?php esc_html_e( 'Schedule Free Call', 'wbcom-essential' ); ?>
                </a>
            </div>
        </div>

        <!-- Custom Development Block -->
        <div class="wbcom-sidebar-widget wbcom-development-widget">
            <div class="service-header">
                <h3>⚙️ <?php esc_html_e( 'Custom Development', 'wbcom-essential' ); ?></h3>
                <div class="service-badge"><?php esc_html_e( 'Pay-as-you-go', 'wbcom-essential' ); ?></div>
            </div>

            <div class="service-pricing">
                <span class="price"><?php esc_html_e( 'Flexible', 'wbcom-essential' ); ?></span>
                <span class="period"><?php esc_html_e( 'Hours', 'wbcom-essential' ); ?></span>
            </div>

            <div class="service-description">
                <p><?php esc_html_e( 'Professional WordPress development services with flexible engagement model. Expert developers available for custom projects with transparent pricing and no hidden costs.', 'wbcom-essential' ); ?></p>
            </div>

            <div class="service-features">
                <ul>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Fully Customizable Project Scope', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Flexible Development Hours', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Transparent Pay-Per-Need Pricing', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'No Hidden Costs or Surprises', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Direct Developer Consultation', 'wbcom-essential' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span> <?php esc_html_e( 'Specialized Custom Solutions', 'wbcom-essential' ); ?></li>
                </ul>
            </div>

            <div class="service-actions">
                <a href="https://wbcomdesigns.com/start-a-project/" target="_blank" class="service-btn primary" style="margin-bottom: 8px;">
                    <?php esc_html_e( 'Start Project', 'wbcom-essential' ); ?>
                </a>
                <a href="https://wbcomdesigns.com/support/" target="_blank" class="service-btn outline">
                    <?php esc_html_e( 'Book Consultation', 'wbcom-essential' ); ?>
                </a>
            </div>
        </div>

        <style>
            /* Sidebar Service Blocks */
            .wbcom-sidebar-widget {
                background: #fff;
                border-radius: 6px;
                padding: 20px;
                margin-bottom: 20px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                border: 1px solid #c3c4c7;
                transition: all 0.2s ease;
            }

            .wbcom-sidebar-widget:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transform: translateY(-2px);
                border-color: #2c5282;
            }

            .service-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f1;
            }

            .service-header h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 600;
                color: #153045;
                line-height: 1.3;
                flex: 1;
            }

            .service-badge {
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                padding: 3px 8px;
                border-radius: 12px;
                letter-spacing: 0.5px;
                background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%);
                color: #ffffff;
                border: 1px solid #2c5282;
                flex-shrink: 0;
                margin-left: 15px;
            }

            .service-pricing {
                margin-bottom: 20px;
                text-align: center;
                padding: 15px;
                background: linear-gradient(135deg, #faf9ff 0%, #f0f4ff 100%);
                border-radius: 8px;
                border: 2px solid #2c5282;
            }

            .service-pricing .price {
                font-size: 24px;
                font-weight: 700;
                color: #2c5282;
                display: block;
                min-width: 80px;
            }

            .service-pricing .period {
                font-size: 13px;
                color: #646970;
                font-weight: 500;
            }

            .service-description {
                margin-bottom: 20px;
            }

            .service-description p {
                margin: 0;
                color: #515b67;
                line-height: 1.6;
                font-size: 14px;
            }

            .service-features ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .service-features li {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #153045;
                padding: 4px 0;
            }

            .service-actions {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-top: 15px;
                border-top: 1px solid #f0f0f1;
                margin-top: 20px;
            }

            .service-btn {
                display: block;
                width: 100% !important;
                text-decoration: none;
                font-weight: 500;
                padding: 12px 16px;
                border-radius: 6px;
                font-size: 14px;
                border: 1px solid;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
                box-sizing: border-box;
            }

            .service-btn.primary {
                background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%);
                border-color: #2c5282;
                color: #fff;
            }

            .service-btn.primary:hover {
                background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
                border-color: #1e3a5f;
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(44, 82, 130, 0.3);
            }

            .service-btn.secondary {
                background: linear-gradient(135deg, #2c5282 0%, #4a6fa1 100%);
                border-color: #2c5282;
                color: #fff;
            }

            .service-btn.secondary:hover {
                background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
                border-color: #1e3a5f;
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(44, 82, 130, 0.3);
            }

            .service-btn.outline {
                background: #fff;
                border-color: #c3c4c7;
                color: #646970;
            }

            .service-btn.outline:hover {
                background: #f6f7f7;
                border-color: #8c8f94;
                color: #23282d;
            }

            @media (max-width: 782px) {
                .wbcom-sidebar-widget {
                    padding: 15px;
                    margin-bottom: 15px;
                }

                .service-header h3 {
                    font-size: 18px;
                }

                .service-pricing .price {
                    font-size: 20px;
                }

                .service-actions {
                    flex-direction: column;
                }

                .service-btn {
                    width: 100%;
                }
            }
        </style>
        <?php
    }

    /**
     * Helper methods
     */
    private function get_dashboard_stats()
    {
        return array(
            'total_plugins'  => count($this->registered_plugins),
            'active_plugins' => count($this->get_active_plugins()),
            'wp_version'     => get_bloginfo('version'),
            'bp_version'     => function_exists('buddypress') ? buddypress()->version : __('Not Active', 'wbcom-essential'),
        );
    }

    private function get_active_plugins()
    {
        return array_filter($this->registered_plugins, function ($plugin) {
            return $plugin['status'] === 'active';
        });
    }

    private function extract_menu_slug($settings_url)
    {
        $parsed = wp_parse_url($settings_url);
        if (isset($parsed['query'])) {
            parse_str($parsed['query'], $params);
            return isset($params['page']) ? $params['page'] : '';
        }
        return '';
    }

    private function get_menu_icon()
    {
        $svg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L13.09 8.26L20 9L14 12L15 20L10 17L5 20L6 12L0 9L6.91 8.26L10 2Z" fill="#a7aaad"/>
        </svg>';

        return 'data:image/svg+xml;base64,' . base64_encode($svg);
    }

    private function render_admin_notices()
    {
        $active_count = count($this->get_active_plugins());

        if ($active_count === 0) {
        ?>
            <div class="notice notice-warning">
                <p>
                    <strong><?php esc_html_e('Welcome to Wbcom Designs!', 'wbcom-essential'); ?></strong>
                    <?php esc_html_e('No Wbcom plugins are currently active. Activate plugins to see them here.', 'wbcom-essential'); ?>
                </p>
            </div>
<?php
        }
    }

    private function get_premium_plugins()
    {
        return array(
            array(
                'name'        => 'Community Bundle',
                'tagline'     => __( 'Complete BuddyPress Community Solution - 25+ Plugins', 'wbcom-essential' ),
                'description' => __( 'Complete BuddyPress community solution with over 25 essential plugins for building a thriving online community.', 'wbcom-essential' ),
                'price'       => '$249',
                'url'         => 'https://wbcomdesigns.com/downloads/buddypress-community-bundle/',
                'features'    => array(
                    __( 'All BuddyPress premium plugins included', 'wbcom-essential' ),
                    __( 'Activity feeds enhancement', 'wbcom-essential' ),
                    __( 'Advanced member management', 'wbcom-essential' ),
                    __( 'Community engagement tools', 'wbcom-essential' ),
                    __( 'Professional support included', 'wbcom-essential' ),
                    __( 'Regular updates and new features', 'wbcom-essential' )
                ),
            ),
            array(
                'name'        => 'Woo Sell Services',
                'tagline'     => __( 'Service Booking & Management Platform', 'wbcom-essential' ),
                'description' => __( 'Transform your WooCommerce store to sell services with booking, appointments, and service management features.', 'wbcom-essential' ),
                'price'       => '$59',
                'url'         => 'https://wbcomdesigns.com/downloads/woo-sell-services/',
                'demo_url'    => 'https://app.instawp.io/launch?t=woo-sell-services&d=v1',
                'features'    => array(
                    __( 'Service booking and appointments', 'wbcom-essential' ),
                    __( 'Staff and resource management', 'wbcom-essential' ),
                    __( 'Service packages and pricing', 'wbcom-essential' ),
                    __( 'Calendar integration', 'wbcom-essential' ),
                    __( 'Customer booking management', 'wbcom-essential' ),
                    __( 'Payment and invoice handling', 'wbcom-essential' )
                ),
            ),
            array(
                'name'        => 'LearnDash Dashboard',
                'tagline'     => __( 'Advanced Learning Analytics & Management', 'wbcom-essential' ),
                'description' => __( 'Advanced dashboard for LearnDash with comprehensive analytics, reporting, and student management tools.', 'wbcom-essential' ),
                'price'       => '$79',
                'url'         => 'https://wbcomdesigns.com/downloads/learndash-dashboard/',
                'demo_url'    => 'https://app.instawp.io/launch?t=learndash-dashboard&d=v1',
                'features'    => array(
                    __( 'Advanced course analytics', 'wbcom-essential' ),
                    __( 'Student progress tracking', 'wbcom-essential' ),
                    __( 'Custom reporting system', 'wbcom-essential' ),
                    __( 'Instructor dashboard', 'wbcom-essential' ),
                    __( 'Revenue and enrollment insights', 'wbcom-essential' ),
                    __( 'Export and data visualization', 'wbcom-essential' )
                ),
            ),
        );
    }

    private function get_premium_themes()
    {
        return array(
            array(
                'name'        => 'Reign Bundle',
                'tagline'     => __( 'Reign Theme + All Reign Addons', 'wbcom-essential' ),
                'description' => __( 'The ultimate all-in-one package. Get Reign theme plus all premium addons for building any type of community - social networks, learning platforms, marketplaces, or directories.', 'wbcom-essential' ),
                'price'       => '$179',
                'url'         => 'https://wbcomdesigns.com/downloads/reign-addons-bundle/',
                'features'    => array(
                    __( 'Complete multi-purpose solution for any community type', 'wbcom-essential' ),
                    __( 'Works seamlessly with BuddyPress & BuddyBoss', 'wbcom-essential' ),
                    __( 'Built-in monetization & membership capabilities', 'wbcom-essential' ),
                    __( 'Professional templates for every industry', 'wbcom-essential' ),
                    __( 'Advanced branding & white-label options', 'wbcom-essential' ),
                    __( 'Priority support with lifetime updates', 'wbcom-essential' )
                ),
            ),
            array(
                'name'        => 'Reign Theme',
                'tagline'     => __( 'Multi-Purpose Community Powerhouse', 'wbcom-essential' ),
                'description' => __( 'One theme, unlimited possibilities. Transform your site into any type of community - social networks, learning platforms, marketplaces, or professional directories with BuddyPress & BuddyBoss compatibility.', 'wbcom-essential' ),
                'price'       => '$99',
                'url'         => 'https://wbcomdesigns.com/downloads/reign-buddypress-theme/',
                'features'    => array(
                    __( 'Multi-platform support (BuddyPress, BuddyBoss, PeepSo)', 'wbcom-essential' ),
                    __( 'Transform into social network, LMS, or marketplace', 'wbcom-essential' ),
                    __( 'Advanced customization without coding', 'wbcom-essential' ),
                    __( 'Mobile-first responsive design', 'wbcom-essential' ),
                    __( 'Built-in SEO optimization & performance', 'wbcom-essential' ),
                    __( 'Integrates with all major plugins', 'wbcom-essential' )
                ),
            ),
            array(
                'name'        => 'BuddyX Pro',
                'tagline'     => __( 'Trusted by 6000+ Successful Communities', 'wbcom-essential' ),
                'description' => __( 'Join thousands of thriving communities worldwide. Create Facebook-like social experiences, integrate learning platforms, build marketplaces, or launch membership sites with complete customization.', 'wbcom-essential' ),
                'price'       => '$79',
                'url'         => 'https://wbcomdesigns.com/downloads/buddyx-pro-theme/',
                'features'    => array(
                    __( 'Facebook-style social networking experience', 'wbcom-essential' ),
                    __( 'Multi-LMS support (LearnDash, LearnPress, LifterLMS)', 'wbcom-essential' ),
                    __( 'WooCommerce multi-vendor marketplace ready', 'wbcom-essential' ),
                    __( 'Membership & subscription monetization', 'wbcom-essential' ),
                    __( 'Elementor page builder integration', 'wbcom-essential' ),
                    __( 'Dark/light modes with custom branding', 'wbcom-essential' )
                ),
            ),
            array(
                'name'        => 'BuddyX Free',
                'tagline'     => __( 'Professional Community Foundation', 'wbcom-essential' ),
                'description' => __( 'Start building your community with our powerful free foundation. Perfect for testing and small communities, with a clear upgrade path to Pro features when ready to scale.', 'wbcom-essential' ),
                'price'       => __( 'Free', 'wbcom-essential' ),
                'url'         => 'https://wbcomdesigns.com/downloads/buddyx-theme/',
                'features'    => array(
                    __( 'Complete community foundation at zero cost', 'wbcom-essential' ),
                    __( 'Modern, mobile-responsive design', 'wbcom-essential' ),
                    __( 'Essential social networking features', 'wbcom-essential' ),
                    __( 'Compatible with popular plugins', 'wbcom-essential' ),
                    __( 'Upgrade path to Pro when ready', 'wbcom-essential' ),
                    __( 'Active community support', 'wbcom-essential' )
                ),
            ),
        );
    }
}
