import Vue from "vue";
import Vuex from "vuex";

import ui from "./UIModule";
import auth from "./authModule";
import notes from "./notesModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
        auth,
        notes,
    },
});
