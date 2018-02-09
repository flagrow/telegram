<?php

namespace Flagrow\Telegram\Listeners;

use Flagrow\Telegram\Notifications\TelegramMailer;
use Flarum\Core\Notification\BlueprintInterface;
use Flarum\Core\User;
use Flarum\Event\NotificationWillBeSent;
use Illuminate\Contracts\Events\Dispatcher;

class SendTelegramNotifications
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(NotificationWillBeSent::class, [$this, 'send']);
    }

    public function send(NotificationWillBeSent $event)
    {
        /**
         * @var $mailer TelegramMailer
         */
        $mailer = app(TelegramMailer::class);

        foreach ($event->users as $user) {
            if ($this->shouldSendTelegramToUser($event->blueprint, $user)) {
                $mailer->send($event->blueprint, $user);
            }
        }
    }

    protected function shouldSendTelegramToUser(BlueprintInterface $blueprint, User $user)
    {
        if (!$user->getPreference(User::getNotificationPreferenceKey($blueprint::getType(), 'telegram'))) {
            return false;
        }

        return !is_null($user->flagrow_telegram_id);
    }
}
