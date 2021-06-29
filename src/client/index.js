import Vue from "vue";
import axios from "axios";
// axios.defaults.baseURL = "https://notnik-api.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:3000/";

import store from "@/store";
import App from "@/components/App.vue";
import "@/styles/index.scss";

new Vue({
    el: "#root",
    store,
    render: h => h(App),
});
