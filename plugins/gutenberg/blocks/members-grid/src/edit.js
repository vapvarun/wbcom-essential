/**
 * Members Grid Block - Editor Component
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
		useThemeColors,
		sortType,
		totalMembers,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		showAvatar,
		showName,
		showLastActive,
		showFriendButton,
		avatarSize,
		cardBgColor,
		cardBorderRadius,
		cardPadding,
		cardShadow,
		nameColor,
		metaColor,
	} = attributes;

	// Container classes.
	const containerClasses = [
		'wbcom-members-grid-preview',
		useThemeColors ? 'use-theme-colors' : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( {
		className: useThemeColors ? 'use-theme-colors' : '',
	} );

	// Build inline styles - layout always applied, colors only when not using theme colors.
	const containerStyle = {
		// Layout styles - always applied.
		'--grid-columns': columns,
		'--grid-gap': `${ gap }px`,
		'--card-radius': `${ cardBorderRadius }px`,
		'--card-padding': `${ cardPadding }px`,
		'--avatar-size': `${ avatarSize }px`,
		// Color styles - only when not using theme colors.
		...( ! useThemeColors && {
			'--card-bg': cardBgColor,
			'--name-color': nameColor,
			'--meta-color': metaColor,
		} ),
	};

	// Demo members for preview.
	const demoMembers = [
		{ id: 1, name: 'John Doe', avatar: 'JD', lastActive: '2 hours ago' },
		{ id: 2, name: 'Jane Smith', avatar: 'JS', lastActive: '1 day ago' },
		{ id: 3, name: 'Mike Johnson', avatar: 'MJ', lastActive: 'Active now' },
		{ id: 4, name: 'Sarah Williams', avatar: 'SW', lastActive: '3 days ago' },
		{ id: 5, name: 'Chris Brown', avatar: 'CB', lastActive: '1 hour ago' },
		{ id: 6, name: 'Emily Davis', avatar: 'ED', lastActive: '5 hours ago' },
		{ id: 7, name: 'David Wilson', avatar: 'DW', lastActive: '2 days ago' },
		{ id: 8, name: 'Lisa Anderson', avatar: 'LA', lastActive: 'Active now' },
		{ id: 9, name: 'Robert Taylor', avatar: 'RT', lastActive: '4 hours ago' },
		{ id: 10, name: 'Amanda Martinez', avatar: 'AM', lastActive: '1 week ago' },
		{ id: 11, name: 'James Thomas', avatar: 'JT', lastActive: 'Active now' },
		{ id: 12, name: 'Michelle Garcia', avatar: 'MG', lastActive: '6 hours ago' },
	];

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

				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( value ) => setAttributes( { showAvatar: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Name', 'wbcom-essential' ) }
						checked={ showName }
						onChange={ ( value ) => setAttributes( { showName: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Last Active', 'wbcom-essential' ) }
						checked={ showLastActive }
						onChange={ ( value ) => setAttributes( { showLastActive: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Friend Button', 'wbcom-essential' ) }
						checked={ showFriendButton }
						onChange={ ( value ) => setAttributes( { showFriendButton: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Card Style', 'wbcom-essential' ) } initialOpen={ false }>
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
						max={ 50 }
					/>

					<ToggleControl
						label={ __( 'Card Shadow', 'wbcom-essential' ) }
						checked={ cardShadow }
						onChange={ ( value ) => setAttributes( { cardShadow: value } ) }
					/>

					{ showAvatar && (
						<RangeControl
							label={ __( 'Avatar Size', 'wbcom-essential' ) }
							value={ avatarSize }
							onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
							min={ 50 }
							max={ 200 }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
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
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ containerClasses } style={ containerStyle }>
					<div className={ `wbcom-members-grid ${ cardShadow ? 'has-shadow' : '' }` }>
						{ demoMembers.slice( 0, Math.min( totalMembers, 6 ) ).map( ( member ) => (
							<div key={ member.id } className="wbcom-member-card">
								{ showAvatar && (
									<div className="wbcom-member-card__avatar">
										<span className="wbcom-avatar-placeholder">
											{ member.avatar }
										</span>
									</div>
								) }
								<div className="wbcom-member-card__content">
									{ showName && (
										<h4 className="wbcom-member-card__name">
											{ member.name }
										</h4>
									) }
									{ showLastActive && (
										<p className="wbcom-member-card__meta">
											{ member.lastActive }
										</p>
									) }
									{ showFriendButton && (
										<button className="wbcom-member-card__button">
											{ __( 'Add Friend', 'wbcom-essential' ) }
										</button>
									) }
								</div>
							</div>
						) ) }
					</div>
					{ totalMembers > 6 && (
						<p className="wbcom-preview-note">
							{ __( 'Showing 6 of', 'wbcom-essential' ) } { totalMembers } { __( 'members in preview', 'wbcom-essential' ) }
						</p>
					) }
				</div>
			</div>
		</>
	);
}
