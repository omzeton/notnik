import VueRouter from "vue-router";

import LoginView from "@/components/LoginView";
import FullNote from "@/components/Authorized/EditView/FullNote";
import NoteList from "@/components/Authorized/ListView/NoteList";

const routes = [
    {
        path: "/",
        component: LoginView,
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
