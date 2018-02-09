import {extend} from 'flarum/extend';
import app from 'flarum/app';
import NotificationGrid from 'flarum/components/NotificationGrid';
import SettingsPage from 'flarum/components/SettingsPage';

export default function () {
    // Given there's currently no way to extend the list of methods and that the list needs to be complete at the end of init()
    // We tap into notificationTypes() that is run between the creation of this.methods and the loop that reads them at the end of init()
    extend(NotificationGrid.prototype, 'notificationTypes', function () {
        if (!app.forum.attribute('flagrow-telegram.enableNotifications')) {
            return;
        }

        const user = app.session.user;

        if (!user || !user.canReceiveTelegramNotifications()) {
            return;
        }

        this.methods.push({
            name: 'telegram',
            icon: 'telegram',
            label: app.translator.trans('flagrow-telegram.forum.settings.notify_by_telegram_heading'),
        });
    });

    extend(SettingsPage.prototype, 'notificationsItems', function (items) {
        if (!app.forum.attribute('flagrow-telegram.enableNotifications')) {
            return;
        }

        const user = app.session.user;

        if (!user || !user.flagrowTelegramError()) {
            return;
        }

        const botUsername = app.forum.attribute('flagrow-telegram.botUsername');

        items.add('flagrowTelegramError', {
            view() {
                return m('.Alert', m('p', app.translator.trans('flagrow-telegram.forum.settings.unblock_telegram_bot', {
                    a: m('a', {href: 'https://t.me/' + botUsername}),
                    username: '@' + botUsername,
                })))
            },
        });
    });
}
