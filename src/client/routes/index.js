import VueRouter from "vue-router";

import FrontPage from "@/components/FrontPage";
import FullNote from "@/components/EditView/FullNote";
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
    {
        path: "/notnik/note/:id",
        component: FullNote,
    },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
