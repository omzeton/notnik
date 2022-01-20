import VueRouter from "vue-router";

import FrontPage from "@/components/FrontPage.vue";
import NoteGrid from "@/components/NoteGrid/index.vue";

const routes = [
    {
        path: "/",
        component: FrontPage,
    },
    {
        path: "/notnik",
        component: NoteGrid,
    },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
