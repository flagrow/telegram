# Telegram login and notifications by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/telegram/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/telegram.svg)](https://packagist.org/packages/flagrow/telegram) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/telegram.svg)](https://packagist.org/packages/flagrow/telegram) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

This extension adds a "Log in with Telegram" button that uses the new [Telegram Login widget](https://telegram.org/blog/login) and add an option to receive notifications via Telegram as well.

## Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually:

```bash
composer require flagrow/telegram
```

## Updating

```bash
composer update flagrow/telegram
php flarum migrate
php flarum cache:clear
```

## Configuration

Follow [Telegram instructions](https://core.telegram.org/widgets/login#setting-up-a-bot) to create a bot for the login widget.

Then copy the **Bot Username** and **Bot Token** to the extension settings. The username and token must belong to the same bot.

If you check **Enable Notifications**, the login widget will ask for permission for the bot to message the user and an additional Telegram column will appear in the user's notification settings.

## Support our work

We prefer to keep our work available to everyone.
In order to do so we rely on voluntary contributions on [Patreon](https://www.patreon.com/flagrow).

## Security

If you discover a security vulnerability within Telegram login and notifications, please send an email to the Gravure team at security@gravure.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/9033-telegram-login-and-notifications-by-flagrow)
- [Source code on GitHub](https://github.com/flagrow/telegram)
- [Report an issue](https://github.com/flagrow/telegram/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/telegram)

An extension by [Flagrow](https://flagrow.io/), a project of [Gravure](https://gravure.io/).
