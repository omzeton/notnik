import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";

// axios.defaults.baseURL = "https://notnik-api.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:2828/api/";

import store from "@/store";
import router from "@/routes";
import App from "@/components/App.vue";
import "@/styles/index.scss";

if (process.env.NODE_ENV !== "production") {
    Vue.config.debug = true;
    Vue.config.devtools = true;
    Vue.config.performance = true;
}

Vue.use(VueRouter);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
    el: "#root",
    router,
    store,
    render: h => h(App),
});
