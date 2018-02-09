import {extend} from 'flarum/extend';
import app from 'flarum/app';
import TelegramSettingsModal from 'flagrow/telegram/components/TelegramSettingsModal';

app.initializers.add('flagrow-telegram', app => {
    app.extensionSettings['flagrow-telegram'] = () => app.modal.show(new TelegramSettingsModal());
});
