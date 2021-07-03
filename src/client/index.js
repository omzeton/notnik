import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";

import store from "@/store";
import router from "@/routes";
import App from "@/components/App.vue";
import "@/styles/index.scss";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./serviceWorker.js")
        .then(registrationObj => console.log("%cservice worker registered!", "color: green;", registrationObj))
        .catch(err => console.log("%cservice worker NOT registered", "color: red;", err));
}

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
