import VueRouter from "vue-router";

import FrontPage from "@/components/FrontPage";
import NoteGrid from "@/components/NoteGrid";

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
