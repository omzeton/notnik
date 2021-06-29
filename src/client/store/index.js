import Vue from "vue";
import Vuex from "vuex";

import ui from "./ui";
import auth from "./auth";
import notes from "./notes";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
        auth,
        notes,
    },
});
