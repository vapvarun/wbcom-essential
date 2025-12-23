/**
 * Group Carousel Block - Editor Component
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
import ServerSideRender from '@wordpress/server-side-render';
import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		sortType,
		totalGroups,
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
		showMeta,
		cardBgColor,
		cardBorderRadius,
		cardShadow,
		nameColor,
		metaColor,
		arrowColor,
		dotColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-group-carousel-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Sort By', 'wbcom-essential' ) }
						value={ sortType }
						options={ [
							{ label: __( 'Most Active', 'wbcom-essential' ), value: 'active' },
							{ label: __( 'Newest', 'wbcom-essential' ), value: 'newest' },
							{ label: __( 'Most Popular', 'wbcom-essential' ), value: 'popular' },
						] }
						onChange={ ( value ) => setAttributes( { sortType: value } ) }
					/>

					<RangeControl
						label={ __( 'Total Groups', 'wbcom-essential' ) }
						value={ totalGroups }
						onChange={ ( value ) => setAttributes( { totalGroups: value } ) }
						min={ 1 }
						max={ 50 }
					/>

					<ToggleControl
						label={ __( 'Show Meta (Last Active)', 'wbcom-essential' ) }
						checked={ showMeta }
						onChange={ ( value ) => setAttributes( { showMeta: value } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Carousel Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Groups to Show (Desktop)', 'wbcom-essential' ) }
						value={ slidesToShow }
						onChange={ ( value ) => setAttributes( { slidesToShow: value } ) }
						min={ 1 }
						max={ 10 }
					/>

					<RangeControl
						label={ __( 'Groups to Show (Tablet)', 'wbcom-essential' ) }
						value={ slidesToShowTablet }
						onChange={ ( value ) => setAttributes( { slidesToShowTablet: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<RangeControl
						label={ __( 'Groups to Show (Mobile)', 'wbcom-essential' ) }
						value={ slidesToShowMobile }
						onChange={ ( value ) => setAttributes( { slidesToShowMobile: value } ) }
						min={ 1 }
						max={ 3 }
					/>

					<RangeControl
						label={ __( 'Groups to Scroll', 'wbcom-essential' ) }
						value={ slidesToScroll }
						onChange={ ( value ) => setAttributes( { slidesToScroll: value } ) }
						min={ 1 }
						max={ 5 }
					/>

					<RangeControl
						label={ __( 'Space Between (px)', 'wbcom-essential' ) }
						value={ spaceBetween }
						onChange={ ( value ) => setAttributes( { spaceBetween: value } ) }
						min={ 0 }
						max={ 100 }
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
				</PanelBody>

				<PanelBody
					title={ __( 'Autoplay Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: value } ) }
					/>

					{ autoplay && (
						<>
							<RangeControl
								label={ __( 'Autoplay Speed (ms)', 'wbcom-essential' ) }
								value={ autoplaySpeed }
								onChange={ ( value ) => setAttributes( { autoplaySpeed: value } ) }
								min={ 1000 }
								max={ 10000 }
								step={ 500 }
							/>

							<ToggleControl
								label={ __( 'Pause on Hover', 'wbcom-essential' ) }
								checked={ pauseOnHover }
								onChange={ ( value ) => setAttributes( { pauseOnHover: value } ) }
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

				<PanelBody
					title={ __( 'Card Styling', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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
				<ServerSideRender
					block="wbcom-essential/group-carousel"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
