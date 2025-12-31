/**
 * Members Carousel Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		sortType,
		totalMembers,
		showLastActive,
		slidesToShow,
		slidesToShowTablet,
		slidesToShowMobile,
		slidesToScroll,
		navigation,
		autoplay,
		pauseOnHover,
		autoplaySpeed,
		infiniteLoop,
		animationSpeed,
		spaceBetween,
		cardBgColor,
		cardBorderRadius,
		cardShadow,
		nameColor,
		metaColor,
		arrowColor,
		dotColor,
		pauseOnInteraction,
		direction,
		effect,
		enableKeyboard,
		grabCursor,
	} = attributes;

	const blockProps = useBlockProps();

	// Build inline styles.
	const containerStyle = {
		'--card-bg': cardBgColor,
		'--card-radius': `${ cardBorderRadius }px`,
		'--name-color': nameColor,
		'--meta-color': metaColor,
		'--arrow-color': arrowColor,
		'--dot-color': dotColor,
		'--space-between': `${ spaceBetween }px`,
	};

	// Demo members for preview.
	const demoMembers = [
		{ id: 1, name: 'John Doe', avatar: 'JD', lastActive: '2 hours ago' },
		{ id: 2, name: 'Jane Smith', avatar: 'JS', lastActive: '1 day ago' },
		{ id: 3, name: 'Mike Johnson', avatar: 'MJ', lastActive: 'Active now' },
		{ id: 4, name: 'Sarah Williams', avatar: 'SW', lastActive: '3 days ago' },
		{ id: 5, name: 'Chris Brown', avatar: 'CB', lastActive: '1 hour ago' },
	];

	const showArrows = navigation === 'arrows' || navigation === 'both';
	const showDots = navigation === 'dots' || navigation === 'both';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Sort', 'wbcom-essential' ) }
						value={ sortType }
						options={ [
							{ label: __( 'Newest', 'wbcom-essential' ), value: 'newest' },
							{ label: __( 'Most Active', 'wbcom-essential' ), value: 'active' },
							{ label: __( 'Most Popular', 'wbcom-essential' ), value: 'popular' },
						] }
						onChange={ ( value ) => setAttributes( { sortType: value } ) }
					/>

					<RangeControl
						label={ __( 'Total Members', 'wbcom-essential' ) }
						value={ totalMembers }
						onChange={ ( value ) => setAttributes( { totalMembers: value } ) }
						min={ 1 }
						max={ 50 }
					/>

					<ToggleControl
						label={ __( 'Show Last Active', 'wbcom-essential' ) }
						checked={ showLastActive }
						onChange={ ( value ) => setAttributes( { showLastActive: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Carousel Options', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Slides to Show (Desktop)', 'wbcom-essential' ) }
						value={ slidesToShow }
						onChange={ ( value ) => setAttributes( { slidesToShow: value } ) }
						min={ 1 }
						max={ 10 }
					/>

					<RangeControl
						label={ __( 'Slides to Show (Tablet)', 'wbcom-essential' ) }
						value={ slidesToShowTablet }
						onChange={ ( value ) => setAttributes( { slidesToShowTablet: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<RangeControl
						label={ __( 'Slides to Show (Mobile)', 'wbcom-essential' ) }
						value={ slidesToShowMobile }
						onChange={ ( value ) => setAttributes( { slidesToShowMobile: value } ) }
						min={ 1 }
						max={ 3 }
					/>

					<RangeControl
						label={ __( 'Slides to Scroll', 'wbcom-essential' ) }
						value={ slidesToScroll }
						onChange={ ( value ) => setAttributes( { slidesToScroll: value } ) }
						min={ 1 }
						max={ 5 }
					/>

					<RangeControl
						label={ __( 'Space Between', 'wbcom-essential' ) }
						value={ spaceBetween }
						onChange={ ( value ) => setAttributes( { spaceBetween: value } ) }
						min={ 0 }
						max={ 60 }
					/>

					<SelectControl
						label={ __( 'Navigation', 'wbcom-essential' ) }
						value={ navigation }
						options={ [
							{ label: __( 'Arrows and Dots', 'wbcom-essential' ), value: 'both' },
							{ label: __( 'Arrows Only', 'wbcom-essential' ), value: 'arrows' },
							{ label: __( 'Dots Only', 'wbcom-essential' ), value: 'dots' },
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
						] }
						onChange={ ( value ) => setAttributes( { navigation: value } ) }
					/>

					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: value } ) }
					/>

					{ autoplay && (
						<>
							<ToggleControl
								label={ __( 'Pause on Hover', 'wbcom-essential' ) }
								checked={ pauseOnHover }
								onChange={ ( value ) => setAttributes( { pauseOnHover: value } ) }
							/>

							<ToggleControl
								label={ __( 'Pause on Interaction', 'wbcom-essential' ) }
								help={ __( 'Pause autoplay when user interacts with carousel', 'wbcom-essential' ) }
								checked={ pauseOnInteraction }
								onChange={ ( value ) => setAttributes( { pauseOnInteraction: value } ) }
							/>

							<RangeControl
								label={ __( 'Autoplay Speed (ms)', 'wbcom-essential' ) }
								value={ autoplaySpeed }
								onChange={ ( value ) => setAttributes( { autoplaySpeed: value } ) }
								min={ 1000 }
								max={ 10000 }
								step={ 500 }
							/>
						</>
					) }

					<ToggleControl
						label={ __( 'Infinite Loop', 'wbcom-essential' ) }
						checked={ infiniteLoop }
						onChange={ ( value ) => setAttributes( { infiniteLoop: value } ) }
					/>

					<RangeControl
						label={ __( 'Animation Speed (ms)', 'wbcom-essential' ) }
						value={ animationSpeed }
						onChange={ ( value ) => setAttributes( { animationSpeed: value } ) }
						min={ 100 }
						max={ 2000 }
						step={ 100 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Advanced Options', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Direction', 'wbcom-essential' ) }
						value={ direction }
						options={ [
							{ label: __( 'Horizontal', 'wbcom-essential' ), value: 'horizontal' },
							{ label: __( 'Vertical', 'wbcom-essential' ), value: 'vertical' },
						] }
						onChange={ ( value ) => setAttributes( { direction: value } ) }
					/>

					<SelectControl
						label={ __( 'Effect', 'wbcom-essential' ) }
						value={ effect }
						options={ [
							{ label: __( 'Slide', 'wbcom-essential' ), value: 'slide' },
							{ label: __( 'Fade', 'wbcom-essential' ), value: 'fade' },
							{ label: __( 'Cube', 'wbcom-essential' ), value: 'cube' },
							{ label: __( 'Coverflow', 'wbcom-essential' ), value: 'coverflow' },
						] }
						onChange={ ( value ) => setAttributes( { effect: value } ) }
						help={ __( 'Note: Some effects work best with 1 slide visible', 'wbcom-essential' ) }
					/>

					<ToggleControl
						label={ __( 'Keyboard Navigation', 'wbcom-essential' ) }
						help={ __( 'Allow navigation using arrow keys', 'wbcom-essential' ) }
						checked={ enableKeyboard }
						onChange={ ( value ) => setAttributes( { enableKeyboard: value } ) }
					/>

					<ToggleControl
						label={ __( 'Grab Cursor', 'wbcom-essential' ) }
						help={ __( 'Show grab cursor when hovering over carousel', 'wbcom-essential' ) }
						checked={ grabCursor }
						onChange={ ( value ) => setAttributes( { grabCursor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Card Style', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ cardBgColor }
						onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<ToggleControl
						label={ __( 'Card Shadow', 'wbcom-essential' ) }
						checked={ cardShadow }
						onChange={ ( value ) => setAttributes( { cardShadow: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Name Color', 'wbcom-essential' ) }
						value={ nameColor }
						onChange={ ( value ) => setAttributes( { nameColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Meta Color', 'wbcom-essential' ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Arrow Color', 'wbcom-essential' ) }
						value={ arrowColor }
						onChange={ ( value ) => setAttributes( { arrowColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Dot Color', 'wbcom-essential' ) }
						value={ dotColor }
						onChange={ ( value ) => setAttributes( { dotColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-members-carousel-preview" style={ containerStyle }>
					<div className={ `wbcom-carousel-container ${ cardShadow ? 'has-shadow' : '' }` }>
						<div className="wbcom-carousel-track">
							{ demoMembers.slice( 0, Math.min( totalMembers, slidesToShow ) ).map( ( member ) => (
								<div key={ member.id } className="wbcom-carousel-slide">
									<div className="wbcom-member-carousel-card">
										<div className="wbcom-member-carousel-avatar">
											<span className="wbcom-avatar-placeholder">
												{ member.avatar }
											</span>
										</div>
										<div className="wbcom-member-carousel-content">
											<h4 className="wbcom-member-carousel-name">
												{ member.name }
											</h4>
											{ showLastActive && (
												<p className="wbcom-member-carousel-meta">
													{ member.lastActive }
												</p>
											) }
										</div>
									</div>
								</div>
							) ) }
						</div>

						{ showArrows && (
							<>
								<button className="wbcom-carousel-arrow wbcom-carousel-prev">
									<svg viewBox="0 0 24 24" width="24" height="24">
										<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
									</svg>
								</button>
								<button className="wbcom-carousel-arrow wbcom-carousel-next">
									<svg viewBox="0 0 24 24" width="24" height="24">
										<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
									</svg>
								</button>
							</>
						) }

						{ showDots && (
							<div className="wbcom-carousel-dots">
								<span className="wbcom-dot active"></span>
								<span className="wbcom-dot"></span>
								<span className="wbcom-dot"></span>
							</div>
						) }
					</div>

					<p className="wbcom-preview-note">
						{ __( 'Carousel preview - actual slides will use Swiper.js', 'wbcom-essential' ) }
					</p>
				</div>
			</div>
		</>
	);
}
