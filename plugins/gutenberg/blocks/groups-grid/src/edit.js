/**
 * Groups Grid Block - Editor Component
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
		useThemeColors,
		sortType,
		totalGroups,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		showAvatar,
		showName,
		showDescription,
		showMeta,
		showMemberCount,
		showJoinButton,
		cardBgColor,
		cardBorderRadius,
		cardShadow,
		cardPadding,
		nameColor,
		metaColor,
		buttonBgColor,
		buttonTextColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-groups-grid-editor${ useThemeColors ? ' use-theme-colors' : '' }`,
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
							{ label: __( 'Random', 'wbcom-essential' ), value: 'random' },
							{ label: __( 'Alphabetical', 'wbcom-essential' ), value: 'alphabetical' },
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
				</PanelBody>

				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Columns (Desktop)', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<RangeControl
						label={ __( 'Columns (Tablet)', 'wbcom-essential' ) }
						value={ columnsTablet }
						onChange={ ( value ) => setAttributes( { columnsTablet: value } ) }
						min={ 1 }
						max={ 4 }
					/>

					<RangeControl
						label={ __( 'Columns (Mobile)', 'wbcom-essential' ) }
						value={ columnsMobile }
						onChange={ ( value ) => setAttributes( { columnsMobile: value } ) }
						min={ 1 }
						max={ 2 }
					/>

					<RangeControl
						label={ __( 'Gap', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 60 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Display Options', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( value ) => setAttributes( { showAvatar: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Group Name', 'wbcom-essential' ) }
						checked={ showName }
						onChange={ ( value ) => setAttributes( { showName: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Description', 'wbcom-essential' ) }
						checked={ showDescription }
						onChange={ ( value ) => setAttributes( { showDescription: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Meta (Last Active)', 'wbcom-essential' ) }
						checked={ showMeta }
						onChange={ ( value ) => setAttributes( { showMeta: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Member Count', 'wbcom-essential' ) }
						checked={ showMemberCount }
						onChange={ ( value ) => setAttributes( { showMemberCount: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Join Button', 'wbcom-essential' ) }
						checked={ showJoinButton }
						onChange={ ( value ) => setAttributes( { showJoinButton: value } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Card Styling', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						value={ cardPadding }
						onChange={ ( value ) => setAttributes( { cardPadding: value } ) }
						min={ 0 }
						max={ 60 }
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
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ ! useThemeColors && (
						<>
							<ColorControl
								label={ __( 'Card Background', 'wbcom-essential' ) }
								value={ cardBgColor }
								onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
							/>

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
								label={ __( 'Button Background', 'wbcom-essential' ) }
								value={ buttonBgColor }
								onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
							/>

							<ColorControl
								label={ __( 'Button Text Color', 'wbcom-essential' ) }
								value={ buttonTextColor }
								onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/groups-grid"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
