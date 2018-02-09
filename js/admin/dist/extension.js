'use strict';

System.register('flagrow/telegram/components/TelegramSettingsModal', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export, _context) {
    "use strict";

    var app, SettingsModal, Switch, settingsPrefix, translationPrefix, TelegramSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            settingsPrefix = 'flagrow-telegram.';
            translationPrefix = 'flagrow-telegram.admin.settings.';

            TelegramSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(TelegramSettingsModal, _SettingsModal);

                function TelegramSettingsModal() {
                    babelHelpers.classCallCheck(this, TelegramSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, (TelegramSettingsModal.__proto__ || Object.getPrototypeOf(TelegramSettingsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(TelegramSettingsModal, [{
                    key: 'title',
                    value: function title() {
                        return app.translator.trans(translationPrefix + 'title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.botUsername')), m('input.FormControl', {
                            bidi: this.setting(settingsPrefix + 'botUsername'),
                            placeholder: 'SampleBot'
                        })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.botToken')), m('input.FormControl', {
                            bidi: this.setting(settingsPrefix + 'botToken'),
                            placeholder: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
                        })]), m('.Form-group', [m('label', Switch.component({
                            state: [true, '1'].indexOf(this.setting(settingsPrefix + 'enableNotifications')()) !== -1,
                            onchange: this.setting(settingsPrefix + 'enableNotifications'),
                            children: app.translator.trans(translationPrefix + 'field.enableNotifications')
                        }))])];
                    }
                }]);
                return TelegramSettingsModal;
            }(SettingsModal);

            _export('default', TelegramSettingsModal);
        }
    };
});;
'use strict';

System.register('flagrow/telegram/main', ['flarum/extend', 'flarum/app', 'flagrow/telegram/components/TelegramSettingsModal'], function (_export, _context) {
    "use strict";

    var extend, app, TelegramSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowTelegramComponentsTelegramSettingsModal) {
            TelegramSettingsModal = _flagrowTelegramComponentsTelegramSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-telegram', function (app) {
                app.extensionSettings['flagrow-telegram'] = function () {
                    return app.modal.show(new TelegramSettingsModal());
                };
            });
        }
    };
});