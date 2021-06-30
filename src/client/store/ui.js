const state = {
    loginForm: true,
    isLoading: false,
};

const actions = {
    TOGGLE_FORM_VIEW({ commit }) {
        commit("toggleFormView");
    },
    SET_LOADING_STATE({ commit }, payload) {
        commit("updateIsLoading", payload);
    },
};

const getters = {
    GET_FORM_VIEW: state => state.loginForm,
    GET_IS_LOADING: state => state.isLoading,
};

const mutations = {
    toggleFormView(state) {
        state.loginForm = !state.loginForm;
    },
    updateIsLoading(state, payload) {
        state.isLoading = payload;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
