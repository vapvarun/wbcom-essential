# Login Security

Wbcom Essential protects the sign-in forms it provides. The protection is on by default and needs no setup. It stops bots that fill in hidden fields and slows down anyone guessing passwords.

## What it does

| Protection | How it works |
|------------|--------------|
| Lockout | After 5 failed sign-ins from the same IP address, that address is locked out for 15 minutes. A successful sign-in clears the count. |
| Spam trap (honeypot) | The Elementor Login Form widget and the EDD Account Dashboard login form include a hidden field that people never see. A sign-in that fills it in is rejected with "Login attempt rejected." |
| Same message for every wrong login | The AJAX login on the Elementor Login Form widget says "The username or password is incorrect. Please try again." for an unknown username and for a wrong password, so it does not reveal which usernames exist. |

The lockout applies to any sign-in that goes through WordPress's own login check. That includes `wp-login.php`, the Elementor Login Form widget, the Login Form block and the EDD Account Dashboard login.

While locked out, a visitor sees "Too many login attempts. Try again in N minutes." The lockout is per IP address, so other visitors are not affected.

![The sign-in screen after too many failed attempts, showing the lockout message](../images/login-lockout-message.webp)

## Sites behind a proxy or CDN

By default the lockout uses the visitor's own IP address as the server sees it. Headers such as `X-Forwarded-For` are ignored, because a visitor can fake them.

If your site sits behind Cloudflare or a load balancer, every visitor appears to come from the proxy. List the proxy's addresses so the lockout can read the real visitor address from the forwarded headers. Add this to a small plugin or your child theme's `functions.php`:

```php
add_filter( 'wbcom_essential_login_security_trusted_proxies', function () {
	return array( '203.0.113.10', '198.51.100.0/24', '2001:db8::/32' );
} );
```

Each entry is an IP address or a range in CIDR form, IPv4 or IPv6. Only requests that arrive from a listed proxy are resolved from the forwarded headers (`CF-Connecting-IP`, `X-Forwarded-For`, then `X-Real-IP`). Use the address ranges your proxy publishes.

## Change the limits

The defaults are 5 failed attempts and a 15-minute lockout. To change them, add these lines to `wp-config.php` above the line that says "That's all, stop editing":

```php
define( 'WBCOM_ESSENTIAL_LOGIN_MAX_ATTEMPTS', 10 );
define( 'WBCOM_ESSENTIAL_LOGIN_LOCKOUT_MINUTES', 30 );
```

## Turn the protection off

If you run a dedicated security plugin such as Wordfence or Solid Security, you can switch this protection off:

```php
add_filter( 'wbcom_essential_login_security_enabled', '__return_false' );
```

To change how the IP address is worked out, filter `wbcom_essential_login_security_client_ip`. See [Hooks and Filters](../developer-guide/hooks-and-filters.md).

## If you are locked out

Wait for the time shown in the message. The lockout also ends on its own after 15 minutes. If you manage a site where every visitor shares one address and the lockout hits many people at once, add your proxy as described above.

## Related

- [Hooks and Filters](../developer-guide/hooks-and-filters.md)
- [General Widgets](../widgets/general-widgets.md) for the Login Form widget
- [Content Blocks](../blocks/content-blocks.md) for the Login Form block
- [Troubleshooting](../troubleshooting/troubleshooting.md)
