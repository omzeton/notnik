const state = {
    loginForm: true,
};

const actions = {
    TOGGLE_FORM_VIEW({ commit }) {
        commit("toggleFormView");
    },
};

const getters = {
    GET_FORM_VIEW: state => state.loginForm,
};

const mutations = {
    toggleFormView(state) {
        state.loginForm = !state.loginForm;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
