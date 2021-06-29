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
        path: "/list",
        component: NoteList,
    },
    {
        path: "/:id",
        component: FullNote,
    },
];

export default new VueRouter({ routes, mode: "history" });
