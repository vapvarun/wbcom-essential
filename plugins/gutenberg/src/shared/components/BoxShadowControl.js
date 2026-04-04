import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	ColorPalette,
	BaseControl,
	Flex,
	FlexItem,
} from '@wordpress/components';

export default function BoxShadowControl( {
	enabled = false,
	horizontal = 0,
	vertical = 4,
	blur = 8,
	spread = 0,
	color = 'rgba(0, 0, 0, 0.12)',
	onToggle,
	onChangeHorizontal,
	onChangeVertical,
	onChangeBlur,
	onChangeSpread,
	onChangeColor,
} ) {
	return (
		<BaseControl className="wbe-box-shadow-control">
			<ToggleControl
				label={ __( 'Box Shadow', 'wbcom-essential' ) }
				checked={ enabled }
				onChange={ onToggle }
				__nextHasNoMarginBottom
			/>
			{ enabled && (
				<>
					<Flex gap={ 2 }>
						<FlexItem isBlock>
							<NumberControl
								label={ __( 'X', 'wbcom-essential' ) }
								value={ horizontal }
								onChange={ ( val ) => onChangeHorizontal( Number( val ) ) }
								min={ -50 }
								max={ 50 }
							/>
						</FlexItem>
						<FlexItem isBlock>
							<NumberControl
								label={ __( 'Y', 'wbcom-essential' ) }
								value={ vertical }
								onChange={ ( val ) => onChangeVertical( Number( val ) ) }
								min={ -50 }
								max={ 50 }
							/>
						</FlexItem>
					</Flex>
					<Flex gap={ 2 }>
						<FlexItem isBlock>
							<NumberControl
								label={ __( 'Blur', 'wbcom-essential' ) }
								value={ blur }
								onChange={ ( val ) => onChangeBlur( Number( val ) ) }
								min={ 0 }
								max={ 100 }
							/>
						</FlexItem>
						<FlexItem isBlock>
							<NumberControl
								label={ __( 'Spread', 'wbcom-essential' ) }
								value={ spread }
								onChange={ ( val ) => onChangeSpread( Number( val ) ) }
								min={ -50 }
								max={ 50 }
							/>
						</FlexItem>
					</Flex>
					<BaseControl label={ __( 'Shadow Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ color }
							onChange={ onChangeColor }
							clearable={ false }
						/>
					</BaseControl>
				</>
			) }
		</BaseControl>
	);
}
