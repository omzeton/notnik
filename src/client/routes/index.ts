import VueRouter from "vue-router";

import FrontPage from "@components/FrontPage.vue";
import NotnikMainView from "@components/NotnikMainView.vue";

const routes = [
    {
        path: "/",
        component: FrontPage,
    },
    {
        path: "/notnik",
        component: NotnikMainView,
    },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
