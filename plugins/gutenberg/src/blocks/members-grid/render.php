<?php
/**
 * Server-side render for Members Grid block.
 *
 * @package WBCOM_Essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'buddypress' ) ) {
	return;
}

$unique_id   = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

$total       = absint( $attributes['totalMembers'] ?? 12 );
$sort        = sanitize_text_field( $attributes['sortType'] ?? 'newest' );
$cols        = absint( $attributes['columns'] ?? 4 );
$cols_tab    = absint( $attributes['columnsTablet'] ?? 2 );
$cols_mob    = absint( $attributes['columnsMobile'] ?? 1 );
$gap         = absint( $attributes['gap'] ?? 24 );
$avatar_size = absint( $attributes['avatarSize'] ?? 80 );
$card_bg     = sanitize_hex_color( $attributes['cardBg'] ?? '#ffffff' );
$name_color  = sanitize_hex_color( $attributes['nameColor'] ?? '#1e1e2e' );
$card_radius = absint( $attributes['cardBorderRadius'] ?? 12 );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wbe-members-grid ' . $vis_classes ),
		'style' => sprintf(
			'--wbe-mg-cols: %d; --wbe-mg-cols-tab: %d; --wbe-mg-cols-mob: %d; --wbe-mg-gap: %dpx; --wbe-mg-card-radius: %dpx;',
			$cols,
			$cols_tab,
			$cols_mob,
			$gap,
			$card_radius
		),
	)
);

$members_args = array(
	'user_id'         => 0,
	'type'            => $sort,
	'per_page'        => $total,
	'max'             => $total,
	'populate_extras' => true,
	'search_terms'    => false,
);

$avatar_args = array(
	'type'   => 'full',
	'width'  => $avatar_size,
	'height' => $avatar_size,
	'class'  => 'wbe-members-grid__avatar-img',
);
?>

<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( bp_has_members( $members_args ) ) : ?>
		<div class="wbe-members-grid__list">
			<?php
			while ( bp_members() ) :
				bp_the_member();

				$card_styles = '';
				if ( $card_bg ) {
					$card_styles .= '--wbe-mg-card-bg: ' . esc_attr( $card_bg ) . '; ';
				}
				if ( $name_color ) {
					$card_styles .= '--wbe-mg-name-color: ' . esc_attr( $name_color ) . '; ';
				}
				?>
				<div class="wbe-members-grid__card" style="<?php echo esc_attr( $card_styles ); ?>">
					<div class="wbe-members-grid__avatar">
						<a href="<?php bp_member_permalink(); ?>">
							<?php bp_member_avatar( $avatar_args ); ?>
						</a>
					</div>
					<div class="wbe-members-grid__info">
						<h3 class="wbe-members-grid__name">
							<a href="<?php bp_member_permalink(); ?>"><?php bp_member_name(); ?></a>
						</h3>
						<?php if ( ! empty( $attributes['showLastActive'] ) ) : ?>
							<span class="wbe-members-grid__meta">
								<?php bp_member_last_active(); ?>
							</span>
						<?php endif; ?>
						<?php if ( ! empty( $attributes['showFriendButton'] ) && is_user_logged_in() && bp_is_active( 'friends' ) ) : ?>
							<div class="wbe-members-grid__action">
								<?php bp_add_friend_button( bp_get_member_user_id() ); ?>
							</div>
						<?php endif; ?>
					</div>
				</div>
			<?php endwhile; ?>
		</div>
	<?php else : ?>
		<p class="wbe-members-grid__empty"><?php esc_html_e( 'No members found.', 'wbcom-essential' ); ?></p>
	<?php endif; ?>
</div>
