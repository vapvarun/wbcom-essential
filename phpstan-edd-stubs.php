<?php
/**
 * EDD 3 symbols PHPStan cannot see. EDD is an optional integration and is not
 * installed for analysis; this file declares only the members our code uses.
 *
 * Scanned for symbols only (phpstan.neon.dist scanFiles), never loaded by
 * WordPress, and kept out of the release zip by the .distignore phpstan* rule.
 *
 * @package Wbcom_Essential
 */

namespace EDD\Orders;

/**
 * Subset of EDD\Orders\Order (easy-digital-downloads/src/Orders/Order.php).
 */
class Order {

	/**
	 * Purchase key of the order (EDD reads it through __get(); public here for analysis).
	 *
	 * @var string
	 */
	public $payment_key = '';

	/**
	 * Whether a receipt link hash belongs to this order.
	 *
	 * @param string $hash Hash from the receipt link.
	 * @return bool
	 */
	public function is_receipt_hash_valid( $hash ): bool {
		return false;
	}
}
