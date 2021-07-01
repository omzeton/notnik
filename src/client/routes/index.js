import VueRouter from "vue-router";

import LoginView from "@/components/LoginView";
import FullNote from "@/components/Authorized/EditView/FullNote";
import NoteList from "@/components/Authorized/ListView/NoteList";

import store from "@/store";

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

const router = new VueRouter({ routes, mode: "history" });

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters["auth/GET_IS_AUTHENTICATED"];
    if (!isAuthenticated && to.path !== "/") {
        next("/");
    } else if (isAuthenticated && to.path === "/") {
        next("/list");
    } else {
        next();
    }
});

export default router;
