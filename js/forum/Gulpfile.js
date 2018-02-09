const gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/telegram': 'src/**/*.js'
    }
});
