import VueRouter from "vue-router";

import Splash from "@/components/Splash";
import FullNote from "@/components/Authorized/EditView/FullNote";
import NoteList from "@/components/Authorized/ListView/NoteList";

const routes = [
    {
        path: "/",
        component: Splash,
    },
    {
        path: "/notnik",
        component: NoteList,
    },
    {
        path: "/notnik/note/:id",
        component: FullNote,
    },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
