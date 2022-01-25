import Vue from "vue";
import VueRouter from "vue-router";
import VueQuillEditor from "vue-quill-editor";
import axios from "axios";

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

axios.defaults.baseURL = window.location.origin + "/api";

Vue.use(VueRouter);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Vue.use(VueQuillEditor);

new Vue({
    el: "#root",
    router,
    store,
    render: h => h(App),
});
