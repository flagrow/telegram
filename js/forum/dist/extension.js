'use strict';

System.register('flagrow/telegram/addLoginButton', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton'], function (_export, _context) {
    "use strict";

    var extend, app, LogInButtons, LogInButton;

    _export('default', function () {
        extend(LogInButtons.prototype, 'items', function (items) {
            items.add('twitch', LogInButton.component({
                className: 'Button LogInButton--telegram',
                icon: 'telegram',
                path: '/auth/telegram',
                children: app.translator.trans('flagrow-telegram.forum.log_in_with_telegram_button')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsLogInButtons) {
            LogInButtons = _flarumComponentsLogInButtons.default;
        }, function (_flarumComponentsLogInButton) {
            LogInButton = _flarumComponentsLogInButton.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/telegram/addNotificationMethod', ['flarum/extend', 'flarum/app', 'flarum/components/NotificationGrid', 'flarum/components/SettingsPage'], function (_export, _context) {
    "use strict";

    var extend, app, NotificationGrid, SettingsPage;

    _export('default', function () {
        // Given there's currently no way to extend the list of methods and that the list needs to be complete at the end of init()
        // We tap into notificationTypes() that is run between the creation of this.methods and the loop that reads them at the end of init()
        extend(NotificationGrid.prototype, 'notificationTypes', function () {
            if (!app.forum.attribute('flagrow-telegram.enableNotifications')) {
                return;
            }

            var user = app.session.user;

            if (!user || !user.canReceiveTelegramNotifications()) {
                return;
            }

            this.methods.push({
                name: 'telegram',
                icon: 'telegram',
                label: app.translator.trans('flagrow-telegram.forum.settings.notify_by_telegram_heading')
            });
        });

        extend(SettingsPage.prototype, 'notificationsItems', function (items) {
            if (!app.forum.attribute('flagrow-telegram.enableNotifications')) {
                return;
            }

            var user = app.session.user;

            if (!user || !user.flagrowTelegramError()) {
                return;
            }

            var botUsername = app.forum.attribute('flagrow-telegram.botUsername');

            items.add('flagrowTelegramError', {
                view: function view() {
                    return m('.Alert', m('p', app.translator.trans('flagrow-telegram.forum.settings.unblock_telegram_bot', {
                        a: m('a', { href: 'https://t.me/' + botUsername }),
                        username: '@' + botUsername
                    })));
                }
            });
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsNotificationGrid) {
            NotificationGrid = _flarumComponentsNotificationGrid.default;
        }, function (_flarumComponentsSettingsPage) {
            SettingsPage = _flarumComponentsSettingsPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/telegram/main', ['flarum/app', 'flarum/models/User', 'flarum/Model', 'flagrow/telegram/addLoginButton', 'flagrow/telegram/addNotificationMethod'], function (_export, _context) {
    "use strict";

    var app, User, Model, addLoginButton, addNotificationMethod;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flagrowTelegramAddLoginButton) {
            addLoginButton = _flagrowTelegramAddLoginButton.default;
        }, function (_flagrowTelegramAddNotificationMethod) {
            addNotificationMethod = _flagrowTelegramAddNotificationMethod.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-telegram', function () {
                User.prototype.canReceiveTelegramNotifications = Model.attribute('canReceiveTelegramNotifications');
                User.prototype.flagrowTelegramError = Model.attribute('flagrowTelegramError');

                addLoginButton();
                addNotificationMethod();
            });
        }
    };
});