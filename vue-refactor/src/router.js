import Vue from 'vue';
import Router from 'vue-router';

import Home from './containers/Views/Home';
import Settings from './containers/Views/Settings';
import Writing from './containers/Views/Writing';
import Music from './containers/Views/Music';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/entry',
            component: Settings,
        },
        {
            path: '/list',
            component: Writing,
        },
        {
            path: '/music',
            component: Music,
        },
    ],
});
