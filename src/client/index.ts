import Vue from "vue";
import VueRouter from "vue-router";
import VueQuillEditor from "vue-quill-editor";
import { Plugin } from "vue-fragment";

import store from "@/store";
import router from "@/routes";
import App from "@/components/App.vue";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "./styles/index.scss";

if (process.env.NODE_ENV !== "production") {
    Vue.config.devtools = true;
    Vue.config.performance = true;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(Plugin);

new Vue({
    el: "#root",
    router,
    store,
    render: h => h(App),
});
