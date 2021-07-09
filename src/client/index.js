import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import store from "@/store";
import router from "@/routes";
import App from "@/components/App.vue";
import "@/styles/index.scss";

axios.defaults.baseURL = window.location.origin + "/api/";

if (process.env.NODE_ENV !== "production") {
    Vue.config.debug = true;
    Vue.config.devtools = true;
    Vue.config.performance = true;
}

Vue.use(VueRouter);

new Vue({
    el: "#root",
    router,
    store,
    render: h => h(App),
});
