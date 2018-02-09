<?php

namespace Flagrow\Telegram;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddUserAttributes::class);
    $events->subscribe(Listeners\Assets::class);
    $events->subscribe(Listeners\EnableTelegramNotifications::class);
    $events->subscribe(Listeners\InjectSettings::class);
    $events->subscribe(Listeners\RegisterAuthRoute::class);
    $events->subscribe(Listeners\SendTelegramNotifications::class);
};
