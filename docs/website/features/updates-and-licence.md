# Updates and Licence

Wbcom Essential is free. It still has a licence key behind the scenes, but only so WordPress can download updates. No block, widget or setting depends on it.

## How updates work

- Update checks and downloads go to `updates.wbcomdesigns.com`. If that server cannot be reached, the plugin falls back to `wbcomdesigns.com`.
- Updates appear under **Dashboard > Updates** like any other plugin update.
- Each update package carries a release signature. The plugin checks the package against it. The result is logged, and in the current setting a package that fails the check is reported rather than blocked.

## What is sent, and when

Shortly after you activate the plugin, it contacts the Wbcom Designs update server once in the background to authorise updates. It sends:

- the plugin's licence key
- the product id
- your site address (home URL)

It sends nothing else, and no visitor or user data. The same list is in the plugin's External Services section in `readme.txt`. See the [privacy policy](https://wbcomdesigns.com/privacy-policy/).

If the server cannot be reached, the plugin tries again every hour, up to 24 times. If the server answers no, it stops.

## The activation notice and the Retry button

If activation does not succeed, an admin notice appears with a **Retry activation now** button. It has two forms:

- "Wbcom Essential could not reach wbcomdesigns.com to authorise plugin updates ... If this host blocks outgoing connections, allow requests to wbcomdesigns.com, then retry." The server did not answer. Allow outgoing requests to `wbcomdesigns.com` (and `updates.wbcomdesigns.com`) on your host or firewall, then click **Retry activation now**.
- "wbcomdesigns.com did not authorise plugin updates for Wbcom Essential on this site (reason: ...). Every feature works, but updates will not download until this is resolved." The server answered no. Update Wbcom Essential to the latest version, which usually fixes it. If it does not, contact Wbcom Designs support.

After a successful retry you see "Wbcom Essential is now authorised to download plugin updates." If the retry fails again the notice says the retry just failed.

![The activation notice in its two wordings, each with the Retry activation now button, and the success notice](../images/licence-activation-notices.webp)

If your site has WP-Cron turned off, the plugin cannot schedule the background request. It tries once during a page load instead and, if that fails, shows the notice straight away so you can use the button.

## If the update library is incomplete

If the bundled licensing and update files are missing from the plugin folder, you see "Wbcom Essential: the bundled licensing and update SDK is incomplete, so automatic updates are turned off. Reinstall the plugin from a complete package to restore them. Every other feature works normally." Download the latest ZIP from [wbcomdesigns.com/downloads/wbcom-essential](https://wbcomdesigns.com/downloads/wbcom-essential/) and reinstall it.

## For developers

The helper `wbcom_essential_licence_request( array $params )` makes one licence request (activate, deactivate or check) through the bundled update library. It uses the same host and fallback as update checks, and returns the decoded reply or `false` when no host answered. See [Hooks and Filters](../developer-guide/hooks-and-filters.md).

## Related

- [Installation Guide](../installation/installation-guide.md)
- [Troubleshooting](../troubleshooting/troubleshooting.md)
