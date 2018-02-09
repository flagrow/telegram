<?php

namespace Flagrow\Telegram\Listeners;

use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserAttributes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
    }

    public function addAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(CurrentUserSerializer::class)) {
            $event->attributes['canReceiveTelegramNotifications'] = !is_null($event->model->flagrow_telegram_id);
            $event->attributes['flagrowTelegramError'] = $event->model->flagrow_telegram_error;
        }
    }
}
