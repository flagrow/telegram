<?php

namespace Flagrow\Telegram\Listeners;

use Flagrow\Telegram\Controllers\TelegramAuthController;
use Flarum\Event\ConfigureForumRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class RegisterAuthRoute
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureForumRoutes::class, [$this, 'add']);
    }

    public function add(ConfigureForumRoutes $event)
    {
        $event->get('/auth/telegram', 'auth.telegram', TelegramAuthController::class);
    }
}
