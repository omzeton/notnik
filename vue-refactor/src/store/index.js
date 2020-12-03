import Vue from 'vue';
import Vuex from 'vuex';

import ui from './ui/index';

import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
    },
    actions,
    getters,
    mutations,
    state,
    namespaced: true,
});
