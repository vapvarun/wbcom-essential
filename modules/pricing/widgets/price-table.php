<?php
namespace WbcomElementorAddons\Modules\Pricing\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Repeater;
use Elementor\Scheme_Color;
use Elementor\Scheme_Typography;
use WbcomElementorAddons\Base\Base_Widget;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Price_Table extends Base_Widget {

	public function get_name() {
		return 'wbcom-price-table';
	}

	public function get_title() {
		return __( 'Price Table', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN );
	}

	public function get_icon() {
		return 'eicon-price-table';
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'section_header',
			[
				'label' => __( 'Header', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'heading',
			[
				'label' => __( 'Title', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'I am title', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'sub_heading',
			[
				'label' => __( 'Subtitle', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'I am subtitle', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_pricing',
			[
				'label' => __( 'Pricing', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'currency_symbol',
			[
				'label' => __( 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'' => __( 'None', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'dollar' => '&#36; ' . _x( 'Dollar', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'euro' => '&#128; ' . _x( 'Euro', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'baht' => '&#3647; ' . _x( 'Baht', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'franc' => '&#8355; ' . _x( 'Franc', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'guilder' => '&fnof; ' . _x( 'Guilder', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'krona' => 'kr ' . _x( 'Krona', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'lira' => '&#8356; ' . _x( 'Lira', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'peseta' => '&#8359 ' . _x( 'Peseta', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'peso' => '&#8369; ' . _x( 'Peso', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'pound' => '&#163; ' . _x( 'Pound Sterling', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'real' => 'R$ ' . _x( 'Real', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'ruble' => '&#8381; ' . _x( 'Ruble', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'rupee' => '&#8360; ' . _x( 'Rupee', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'indian_rupee' => '&#8377; ' . _x( 'Rupee (Indian)', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'shekel' => '&#8362; ' . _x( 'Shekel', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'yen' => '&#165; ' . _x( 'Yen/Yuan', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'won' => '&#8361; ' . _x( 'Won', 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'custom' => __( 'Custom', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				],
				'default' => 'dollar',
			]
		);

		$this->add_control(
			'currency_symbol_custom',
			[
				'label' => __( 'Custom Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'condition' => [
					'currency_symbol' => 'custom',
				],
			]
		);

		$this->add_control(
			'price',
			[
				'label' => __( 'Price', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => '39.99',
			]
		);

		$this->add_control(
			'sale',
			[
				'label' => __( 'Sale', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'On', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'label_off' => __( 'Off', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'return_value' => 'yes',
				'default' => '',
			]
		);

		$this->add_control(
			'original_price',
			[
				'label' => __( 'Original Price', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::NUMBER,
				'default' => '59',
				'condition' => [
					'sale' => 'yes',
				],
			]
		);

		$this->add_control(
			'period',
			[
				'label' => __( 'Period', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Monthly', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_features',
			[
				'label' => __( 'Features', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$repeater = new Repeater();

		$repeater->add_control(
			'item_text',
			[
				'label' => __( 'Text', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'List Item', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$repeater->add_control(
			'item_icon',
			[
				'label' => __( 'Icon', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::ICON,
				'default' => 'fa fa-check-circle',
			]
		);

		$repeater->add_control(
			'item_icon_color',
			[
				'label' => __( 'Icon Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}} i' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'features_list',
			[
				'type' => Controls_Manager::REPEATER,
				'fields' => array_values( $repeater->get_controls() ),
				'default' => [
					[
						'item_text' => __( 'List Item #1', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'item_icon' => 'fa fa-check-circle',
					],
					[
						'item_text' => __( 'List Item #2', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'item_icon' => 'fa fa-check-circle',
					],
					[
						'item_text' => __( 'List Item #3', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'item_icon' => 'fa fa-check-circle',
					],
				],
				'title_field' => '{{{ item_text }}}',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_footer',
			[
				'label' => __( 'Footer', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'button_text',
			[
				'label' => __( 'Button Text', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Click Here', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'link',
			[
				'label' => __( 'Link', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::URL,
				'placeholder' => 'http://your-link.com',
				'default' => [
					'url' => '#',
				],
			]
		);

		$this->add_control(
			'footer_additional_info',
			[
				'label' => __( 'Additional Info', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXTAREA,
				'default' => __( 'This is text element', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'rows' => 2,
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_ribbon',
			[
				'label' => __( 'Ribbon', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'show_ribbon',
			[
				'label' => __( 'Show', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SWITCHER,
				'return_value' => 'yes',
				'default' => 'yes',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'ribbon_title',
			[
				'label' => __( 'Title', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Popular', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'condition' => [
					'show_ribbon' => 'yes',
				],
			]
		);

		$this->add_control(
			'ribbon_horizontal_position',
			[
				'label' => __( 'Horizontal Position', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'left' => [
						'title' => __( 'Left', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-h-align-left',
					],
					'right' => [
						'title' => __( 'Right', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-h-align-right',
					],
				],
				'condition' => [
					'show_ribbon' => 'yes',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_header_style',
			[
				'label' => __( 'Header', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'header_bg_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__header' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'header_padding',
			[
				'label' => __( 'Padding', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__header' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'heading_heading_style',
			[
				'label' => __( 'Title', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'heading_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__heading' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'heading_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__heading',
				'scheme' => Scheme_Typography::TYPOGRAPHY_1,
			]
		);

		$this->add_control(
			'heading_sub_heading_style',
			[
				'label' => __( 'Sub Title', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'sub_heading_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__subheading' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'sub_heading_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__subheading',
				'scheme' => Scheme_Typography::TYPOGRAPHY_2,
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_pricing_element_style',
			[
				'label' => __( 'Pricing', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'pricing_element_bg_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__price' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'pricing_element_padding',
			[
				'label' => __( 'Padding', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__price' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'price_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__currency, {{WRAPPER}} .elementor-price-table__integer-part, {{WRAPPER}} .elementor-price-table__fractional-part' => 'color: {{VALUE}}',
				],
				'separator' => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'price_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__price',
				'scheme' => Scheme_Typography::TYPOGRAPHY_1,
			]
		);

		$this->add_control(
			'heading_currency_style',
			[
				'label' => __( 'Currency Symbol', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'currency_symbol!' => '',
				],
			]
		);

		$this->add_control(
			'currency_size',
			[
				'label' => __( 'Size', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__currency' => 'font-size: calc({{SIZE}}em/100)',
				],
				'condition' => [
					'currency_symbol!' => '',
				],
			]
		);

		$this->add_control(
			'currency_vertical_position',
			[
				'label' => __( 'Vertical Position', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'top' => [
						'title' => __( 'Top', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-top',
					],
					'middle' => [
						'title' => __( 'Middle', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-middle',
					],
					'bottom' => [
						'title' => __( 'Bottom', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-bottom',
					],
				],
				'default' => 'top',
				'selectors_dictionary' => [
					'top' => 'flex-start',
					'middle' => 'center',
					'bottom' => 'flex-end',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__currency' => 'align-self: {{VALUE}}',
				],
				'condition' => [
					'currency_symbol!' => '',
				],
			]
		);

		$this->add_control(
			'fractional_part_style',
			[
				'label' => __( 'Fractional Part', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'fractional-part_size',
			[
				'label' => __( 'Size', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__fractional-part' => 'font-size: calc({{SIZE}}em/100)',
				],
			]
		);

		$this->add_control(
			'fractional_part_vertical_position',
			[
				'label' => __( 'Vertical Position', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'top' => [
						'title' => __( 'Top', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-top',
					],
					'middle' => [
						'title' => __( 'Middle', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-middle',
					],
					'bottom' => [
						'title' => __( 'Bottom', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-bottom',
					],
				],
				'default' => 'top',
				'selectors_dictionary' => [
					'top' => 'flex-start',
					'middle' => 'center',
					'bottom' => 'flex-end',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__after-price' => 'justify-content: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'heading_original_price_style',
			[
				'label' => __( 'Original Price', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'sale' => 'yes',
					'original_price!' => '',
				],
			]
		);

		$this->add_control(
			'original_price_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__original-price' => 'color: {{VALUE}}',
				],
				'condition' => [
					'sale' => 'yes',
					'original_price!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'original_price_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__original-price',
				'scheme' => Scheme_Typography::TYPOGRAPHY_1,
				'condition' => [
					'sale' => 'yes',
					'original_price!' => '',
				],
			]
		);

		$this->add_control(
			'original_price_vertical_position',
			[
				'label' => __( 'Vertical Position', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'top' => [
						'title' => __( 'Top', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-top',
					],
					'middle' => [
						'title' => __( 'Middle', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-middle',
					],
					'bottom' => [
						'title' => __( 'Bottom', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'eicon-v-align-bottom',
					],
				],
				'selectors_dictionary' => [
					'top' => 'flex-start',
					'middle' => 'center',
					'bottom' => 'flex-end',
				],
				'default' => 'bottom',
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__original-price' => 'align-self: {{VALUE}}',
				],
				'condition' => [
					'sale' => 'yes',
					'original_price!' => '',
				],
			]
		);

		$this->add_control(
			'heading_period_style',
			[
				'label' => __( 'Period', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'period!' => '',
				],
			]
		);

		$this->add_control(
			'period_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__period' => 'color: {{VALUE}}',
				],
				'condition' => [
					'period!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'period_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__period',
				'scheme' => Scheme_Typography::TYPOGRAPHY_2,
				'condition' => [
					'period!' => '',
				],
			]
		);

		$this->add_control(
			'period_position',
			[
				'label' => __( 'Position', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SELECT,
				'label_block' => false,
				'options' => [
					'below' => 'Below',
					'beside' => 'Beside',
				],
				'default' => 'below',
				'condition' => [
					'period!' => '',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_features_list_style',
			[
				'label' => __( 'Features', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'features_list_bg_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'features_list_padding',
			[
				'label' => __( 'Padding', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'features_list_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'features_list_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__features-list li',
				'scheme' => Scheme_Typography::TYPOGRAPHY_3,
			]
		);

		$this->add_control(
			'features_list_alignment',
			[
				'label' => __( 'Alignment', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'left' => [
						'title' => __( 'Left', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon'  => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon'  => 'fa fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon'  => 'fa fa-align-right',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list' => 'text-align: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'item_width',
			[
				'label' => __( 'Width', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'%' => [
						'min' => 25,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__feature-inner' => 'margin-left: calc((100% - {{SIZE}}%)/2); margin-right: calc((100% - {{SIZE}}%)/2)',
				],
			]
		);

		$this->add_control(
			'list_divider',
			[
				'label' => __( 'Divider', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SWITCHER,
				'return_value' => 'yes',
				'default' => 'yes',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'divider_style',
			[
				'label' => __( 'Style', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'solid' => __( 'Solid', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'double' => __( 'Double', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'dotted' => __( 'Dotted', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'dashed' => __( 'Dashed', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				],
				'default' => 'solid',
				'condition' => [
					'list_divider' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list li:before' => 'border-top-style: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'divider_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'default' => '#ddd',
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'condition' => [
					'list_divider' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list li:before' => 'border-top-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'divider_weight',
			[
				'label' => __( 'Weight', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 2,
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 10,
					],
				],
				'condition' => [
					'list_divider' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list li:before' => 'border-top-width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'divider_width',
			[
				'label' => __( 'Width', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'condition' => [
					'list_divider' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list li:before' => 'margin-left: calc((100% - {{SIZE}}%)/2); margin-right: calc((100% - {{SIZE}}%)/2)',
				],
			]
		);

		$this->add_control(
			'divider_gap',
			[
				'label' => __( 'Gap', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 15,
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 50,
					],
				],
				'condition' => [
					'list_divider' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__features-list li:before' => 'margin-top: {{SIZE}}{{UNIT}}; margin-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_footer_style',
			[
				'label' => __( 'Footer', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'footer_bg_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__footer' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'footer_padding',
			[
				'label' => __( 'Padding', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__footer' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'heading_footer_button',
			[
				'label' => __( 'Button', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_size',
			[
				'label' => __( 'Size', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SELECT,
				'default' => 'md',
				'options' => [
					'xs' => __( 'Extra Small', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'sm' => __( 'Small', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'md' => __( 'Medium', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'lg' => __( 'Large', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'xl' => __( 'Extra Large', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_button_style' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => __( 'Normal', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_text_color',
			[
				'label' => __( 'Text Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button' => 'color: {{VALUE}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'button_typography',
				'label' => __( 'Typography', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'scheme' => Scheme_Typography::TYPOGRAPHY_4,
				'selector' => '{{WRAPPER}} .elementor-price-table__button',
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_background_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_4,
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button' => 'background-color: {{VALUE}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(), [
				'name' => 'button_border',
				'label' => __( 'Border', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .elementor-price-table__button',
				'condition' => [
					'button_text!' => '',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'button_border_radius',
			[
				'label' => __( 'Border Radius', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_text_padding',
			[
				'label' => __( 'Text Padding', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => __( 'Hover', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_hover_color',
			[
				'label' => __( 'Text Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button:hover' => 'color: {{VALUE}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_background_hover_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button:hover' => 'background-color: {{VALUE}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_hover_border_color',
			[
				'label' => __( 'Border Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__button:hover' => 'border-color: {{VALUE}};',
				],
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_hover_animation',
			[
				'label' => __( 'Animation', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HOVER_ANIMATION,
				'condition' => [
					'button_text!' => '',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'heading_additional_info',
			[
				'label' => __( 'Additional Info', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'footer_additional_info!' => '',
				],
			]
		);

		$this->add_control(
			'additional_info_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__additional_info' => 'color: {{VALUE}}',
				],
				'condition' => [
					'footer_additional_info!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'additional_info_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__additional_info',
				'scheme' => Scheme_Typography::TYPOGRAPHY_3,
				'condition' => [
					'footer_additional_info!' => '',
				],
			]
		);

		$this->add_control(
			'additional_info_margin',
			[
				'label' => __( 'Margin', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'default' => [
					'top' => 15,
					'right' => 30,
					'bottom' => 0,
					'left' => 30,
					'unit' => 'px',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__additional_info' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
				'condition' => [
					'footer_additional_info!' => '',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_ribbon_style',
			[
				'label' => __( 'Ribbon', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
				'condition' => [
					'show_ribbon' => 'yes',
				],
			]
		);

		$this->add_control(
			'ribbon_bg_color',
			[
				'label' => __( 'Background Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_4,
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__ribbon-inner' => 'background-color: {{VALUE}}',
				],
			]
		);

		$ribbon_distance_transform = is_rtl() ? 'translateY(-50%) translateX({{SIZE}}{{UNIT}}) rotate(-45deg)' : 'translateY(-50%) translateX(-50%) translateX({{SIZE}}{{UNIT}}) rotate(-45deg)';

		$this->add_responsive_control(
			'ribbon_distance',
			[
				'label' => __( 'Distance', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__ribbon-inner' => 'margin-top: {{SIZE}}{{UNIT}}; transform: ' . $ribbon_distance_transform,
				],
			]
		);

		$this->add_control(
			'ribbon_text_color',
			[
				'label' => __( 'Text Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'default' => '#ffffff',
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}} .elementor-price-table__ribbon-inner' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'ribbon_typography',
				'selector' => '{{WRAPPER}} .elementor-price-table__ribbon-inner',
				'scheme' => Scheme_Typography::TYPOGRAPHY_4,
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'box_shadow',
				'selector' => '{{WRAPPER}} .elementor-price-table__ribbon-inner',
			]
		);

		$this->end_controls_section();
	}

	private function get_currency_symbol( $symbol_name ) {
		$symbols = [
			'dollar' => '&#36;',
			'euro' => '&#128;',
			'franc' => '&#8355;',
			'pound' => '&#163;',
			'ruble' => '&#8381;',
			'shekel' => '&#8362;',
			'baht' => '&#3647;',
			'yen' => '&#165;',
			'won' => '&#8361;',
			'guilder' => '&fnof;',
			'peso' => '&#8369;',
			'peseta' => '&#8359',
			'lira' => '&#8356;',
			'rupee' => '&#8360;',
			'indian_rupee' => '&#8377;',
			'real' => 'R$',
			'krona' => 'kr',
		];
		return isset( $symbols[ $symbol_name ] ) ? $symbols[ $symbol_name ] : '';
	}

	protected function render() {
		$settings = $this->get_settings();
		$symbol = '';

		if ( ! empty( $settings['currency_symbol'] ) ) {
			if ( 'custom' !== $settings['currency_symbol'] ) {
				$symbol = $this->get_currency_symbol( $settings['currency_symbol'] );
			} else {
				$symbol = $settings['currency_symbol_custom'];
			}
		}

		$price = explode( '.', $settings['price'] );
		$intpart = $price[0];
		$fraction = '';
		if ( 2 === sizeof( $price ) ) {
			$fraction = $price[1];
		}

		$period_position = $settings['period_position'];
		$period_element = '<span class="elementor-price-table__period elementor-typo-excluded">' . $settings['period'] . '</span>';

		$this->add_render_attribute( 'button', 'class', [
				'elementor-price-table__button',
				'elementor-button',
				'elementor-size-' . $settings['button_size'],
			]
		);

		if ( ! empty( $settings['link']['url'] ) ) {
			$this->add_render_attribute( 'button', 'href', $settings['link']['url'] );

			if ( ! empty( $settings['link']['is_external'] ) ) {
				$this->add_render_attribute( 'button', 'target', '_blank' );
			}
		}

		if ( ! empty( $settings['button_hover_animation'] ) ) {
			$this->add_render_attribute( 'button', 'class', 'elementor-animation-' . $settings['button_hover_animation'] );
		}
		?>
		<div class="elementor-price-table">
			<?php if ( $settings['heading'] || $settings['sub_heading'] ) : ?>
				<div class="elementor-price-table__header">
					<?php if ( ! empty( $settings['heading'] ) ) : ?>
						<h3 class="elementor-price-table__heading"><?php echo $settings['heading']; ?></h3>
					<?php endif; ?>
	
					<?php if ( ! empty( $settings['sub_heading'] ) ) : ?>
						<span class="elementor-price-table__subheading"><?php echo $settings['sub_heading']; ?></span>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<div class="elementor-price-table__price">
				<?php if ( 'yes' === $settings['sale'] && ! empty( $settings['original_price'] ) ) : ?>
					<div class="elementor-price-table__original-price elementor-typo-excluded"><?php echo $symbol . $settings['original_price']; ?></div>
				<?php endif; ?>
				<?php if ( ! empty( $symbol ) && is_numeric( $intpart ) ) : ?>
					<span class="elementor-price-table__currency"><?php echo $symbol; ?></span>
				<?php endif; ?>
				<?php if ( ! empty( $intpart ) || 0 <= $intpart ) : ?>
					<span class="elementor-price-table__integer-part"><?php echo $intpart; ?></span>
				<?php endif; ?>

				<?php if ( 0 < $fraction || ( ! empty( $settings['period'] ) && 'beside' === $period_position ) ) : ?>
					<div class="elementor-price-table__after-price">
						<span class="elementor-price-table__fractional-part"><?php echo $fraction; ?></span>
						<?php if ( ! empty( $settings['period'] ) && 'beside' === $period_position ) : ?>
							<?php echo $period_element; ?>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<?php if ( ! empty( $settings['period'] ) && 'below' === $period_position ) : ?>
					<?php echo $period_element; ?>
				<?php endif; ?>
			</div>

			<?php if ( ! empty( $settings['features_list'] ) ) : ?>
				<ul class="elementor-price-table__features-list">
					<?php foreach ( $settings['features_list'] as $item ) : ?>
						<li class="elementor-repeater-item-<?php echo $item['_id']; ?>">
							<div class="elementor-price-table__feature-inner">
								<?php if ( ! empty( $item['item_icon'] ) ) : ?>
									<i class="<?php echo esc_attr( $item['item_icon'] ); ?>"></i>
								<?php endif; ?>
								<?php if ( ! empty( $item['item_text'] ) ) :
									echo $item['item_text'];
								else :
									echo '&nbsp;';
								endif;
								?>
							</div>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		
			<?php if ( ! empty( $settings['button_text'] ) || ! empty( $settings['footer_additional_info'] ) ) : ?>
			<div class="elementor-price-table__footer">
				<?php if ( ! empty( $settings['button_text'] ) ) : ?>
					<a <?php echo $this->get_render_attribute_string( 'button' ); ?>>
						<?php echo $settings['button_text']; ?>
					</a>
				<?php endif; ?>

				<?php if ( ! empty( $settings['footer_additional_info'] ) ) : ?>
					<div class="elementor-price-table__additional_info"><?php echo $settings['footer_additional_info']; ?></div>
				<?php endif; ?>
			</div>
			<?php endif; ?>
		</div>

		<?php if ( 'yes' === $settings['show_ribbon'] && ! empty( $settings['ribbon_title'] ) ) :
			$this->add_render_attribute( 'ribbon-wrapper', 'class', 'elementor-price-table__ribbon' );

			if ( ! empty( $settings['ribbon_horizontal_position'] ) ) :
				$this->add_render_attribute( 'ribbon-wrapper', 'class', 'elementor-ribbon-' . $settings['ribbon_horizontal_position'] );
			endif;

			?>
			<div <?php echo $this->get_render_attribute_string( 'ribbon-wrapper' ); ?>>
				<div class="elementor-price-table__ribbon-inner"><?php echo $settings['ribbon_title']; ?></div>
			</div>
		<?php endif;
	}

	protected function _content_template() {
		?>
		<#
			var symbols = {
				dollar: '&#36;',
				euro: '&#128;',
				franc: '&#8355;',
				pound: '&#163;',
				ruble: '&#8381;',
				shekel: '&#8362;',
				baht: '&#3647;',
				yen: '&#165;',
				won: '&#8361;',
				guilder: '&fnof;',
				peso: '&#8369;',
				peseta: '&#8359;',
				lira: '&#8356;',
				rupee: '&#8360;',
				indian_rupee: '&#8377;',
				real: 'R$',
				krona: 'kr'
			};

			var symbol = '';

			if ( settings.currency_symbol ) {
				if ( 'custom' !== settings.currency_symbol ) {
					symbol = symbols[ settings.currency_symbol ] || '';
				} else {
					symbol = settings.currency_symbol_custom;
				}
			}

			var price = settings.price.split( '.' ),
				intpart = price[0],
				fraction = price[1],

				periodElement = '<span class="elementor-price-table__period elementor-typo-excluded">' + settings.period + '</span>',

				buttonClasses = 'elementor-price-table__button elementor-button elementor-size-' + settings.button_size;

			if ( settings.button_hover_animation ) {
				buttonClasses += ' elementor-animation-' + settings.button_hover_animation;
			}

		#>
		<div class="elementor-price-table">
			<# if ( settings.heading || settings.sub_heading ) { #>
				<div class="elementor-price-table__header">
					<# if ( settings.heading ) { #>
						<h3 class="elementor-price-table__heading">{{{ settings.heading }}}</h3>
					<# } #>
					<# if ( settings.sub_heading ) { #>
						<span class="elementor-price-table__subheading">{{{ settings.sub_heading }}}</span>
					<# } #>
				</div>
			<# } #>

			<div class="elementor-price-table__price">
				<# if ( settings.sale && settings.original_price ) { #>
					<div class="elementor-price-table__original-price elementor-typo-excluded">{{{ symbol + settings.original_price }}}</div>
				<# } #>

				<# if (  ! _.isEmpty( symbol ) && isFinite( intpart ) ) { #>
					<span class="elementor-price-table__currency">{{{ symbol }}}</span>
				<# } #>
				<# if ( intpart ) { #>
					<span class="elementor-price-table__integer-part">{{{ intpart }}}</span>
				<# } #>
				<div class="elementor-price-table__after-price">
					<# if ( fraction ) { #>
						<span class="elementor-price-table__fractional-part">{{{ fraction }}}</span>
					<# } #>
					<# if ( settings.period && 'beside' === settings.period_position ) { #>
						{{{ periodElement }}}
					<# } #>
				</div>

				<# if ( settings.period && 'below' === settings.period_position ) { #>
					{{{ periodElement }}}
				<# } #>
			</div>

			<# if ( settings.features_list ) { #>
				<ul class="elementor-price-table__features-list">
					<# _.each( settings.features_list, function( item ) { #>
						<li class="elementor-repeater-item-{{ item._id }}">
							<div class="elementor-price-table__feature-inner">
								<# if ( item.item_icon ) { #>
									<i class="{{ item.item_icon }}"></i>
								<# } #>
								<# if ( ! _.isEmpty( item.item_text.trim() ) ) { #>
									{{{ item.item_text }}}
								<# } else { #>
									&nbsp;
								<# } #>

							</div>
						</li>
					<# } ); #>
				</ul>
			<# } #>

			<# if ( settings.button_text || settings.footer_additional_info ) { #>
				<div class="elementor-price-table__footer">
					<# if ( settings.button_text ) { #>
						<a href="#" class="{{ buttonClasses }}">{{{ settings.button_text }}}</a>
					<# } #>
					<# if ( settings.footer_additional_info ) { #>
						<p class="elementor-price-table__additional_info">{{{ settings.footer_additional_info }}}</p>
					<# } #>
				</div>
			<# } #>
		</div>

		<# if ( 'yes' === settings.show_ribbon && settings.ribbon_title ) {
			var ribbonClasses = 'elementor-price-table__ribbon';
			if ( settings.ribbon_horizontal_position ) {
				ribbonClasses += ' elementor-ribbon-' + settings.ribbon_horizontal_position;
			} #>
			<div class="{{ ribbonClasses }}">
				<div class="elementor-price-table__ribbon-inner">{{{ settings.ribbon_title }}}</div>
			</div>
		<# } #>
		<?php
	}
}
