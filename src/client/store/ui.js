const state = {
    loginForm: true,
    isLoading: false,
    settingsModal: false,
};

const actions = {
    TOGGLE_FORM_VIEW({ commit }) {
        commit("toggleFormView");
    },
    SET_LOADING_STATE({ commit }, payload) {
        commit("updateIsLoading", payload);
    },
    TOGGLE_SETTINGS_MODAL({ commit }) {
        commit("toggleSettingsModal");
    },
};

const getters = {
    GET_FORM_VIEW: state => state.loginForm,
    GET_IS_LOADING: state => state.isLoading,
    GET_SETTINGS_MODAL_IS_OPEN: state => state.settingsModal,
};

const mutations = {
    toggleFormView(state) {
        state.loginForm = !state.loginForm;
    },
    updateIsLoading(state, payload) {
        state.isLoading = payload;
    },
    toggleSettingsModal(state) {
        state.settingsModal = !state.settingsModal;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
