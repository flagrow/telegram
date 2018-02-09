<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->unsignedInteger('flagrow_telegram_id')->nullable()->unique();
            $table->string('flagrow_telegram_error', 50)->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('flagrow_telegram_id');
            $table->dropColumn('flagrow_telegram_error');
        });
    },
];
