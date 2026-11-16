<?php
/**
 * Runnable check for wbcom_essential_login_security_get_ip(): spoofed proxy headers are ignored unless the
 * request comes from a trusted proxy. Run: php scripts/check-login-security-ip.php includes/edd-account-login-security.php
 */
define( 'ABSPATH', '/' );
$GLOBALS['proxies'] = array();
function apply_filters( $tag, $v ) {
 return 'wbcom_essential_login_security_trusted_proxies' === $tag ? $GLOBALS['proxies'] : $v; }
function sanitize_text_field( $s ) {
 return trim( strip_tags( $s ) ); }
function wp_unslash( $s ) {
 return $s; }
function add_action() {} function add_filter() {} function __( $s ) {
 return $s; }
require $argv[1];
$cases = array(
	array( 'no proxy, spoofed XFF ignored', array( 'REMOTE_ADDR' => '203.0.113.9', 'HTTP_X_FORWARDED_FOR' => '1.2.3.4' ), array(), '203.0.113.9' ),
	array( 'trusted v4 range uses CF header', array( 'REMOTE_ADDR' => '173.245.48.10', 'HTTP_CF_CONNECTING_IP' => '198.51.100.7' ), array( '173.245.48.0/20' ), '198.51.100.7' ),
	array( 'trusted exact IP uses first XFF', array( 'REMOTE_ADDR' => '10.0.0.5', 'HTTP_X_FORWARDED_FOR' => '198.51.100.8, 10.0.0.5' ), array( '10.0.0.5' ), '198.51.100.8' ),
	array( 'untrusted sender with headers', array( 'REMOTE_ADDR' => '203.0.113.50', 'HTTP_CF_CONNECTING_IP' => '9.9.9.9' ), array( '173.245.48.0/20' ), '203.0.113.50' ),
	array( 'trusted v6 range', array( 'REMOTE_ADDR' => '2400:cb00::1', 'HTTP_CF_CONNECTING_IP' => '2001:db8::42' ), array( '2400:cb00::/32' ), '2001:db8::42' ),
	array( 'trusted proxy, junk header falls back', array( 'REMOTE_ADDR' => '10.0.0.5', 'HTTP_X_FORWARDED_FOR' => 'not-an-ip' ), array( '10.0.0.5' ), '10.0.0.5' ),
	array( 'v4 /31 boundary outside', array( 'REMOTE_ADDR' => '10.0.0.6', 'HTTP_X_REAL_IP' => '1.1.1.1' ), array( '10.0.0.4/31' ), '10.0.0.6' ),
);
$fail = 0;
foreach ( $cases as list( $name, $server, $proxies, $want ) ) {
	$_SERVER = $server;
	$GLOBALS['proxies'] = $proxies;
	$got = wbcom_essential_login_security_get_ip();
	printf( "%s %-40s got %s\n", $got === $want ? 'PASS' : 'FAIL', $name, $got ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- CLI output.
	$fail += $got !== $want;
}
exit( $fail ? 1 : 0 );
