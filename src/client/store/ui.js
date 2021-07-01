const state = {
    loginForm: true,
    isLoading: false,
    settingsModal: false,
    markdownMode: false,
};

const actions = {
    TOGGLE_FORM_VIEW({ commit }) {
        commit("toggleFormView");
    },
    TOGGLE_SETTINGS_MODAL({ commit }) {
        commit("toggleSettingsModal");
    },
    TOGGLE_MARKDOWN_MODE({ commit }) {
        commit("toggleMarkdownMode");
    },
    SET_LOADING_STATE({ commit }, payload) {
        commit("updateIsLoading", payload);
    },
};

const getters = {
    GET_FORM_VIEW: state => state.loginForm,
    GET_IS_LOADING: state => state.isLoading,
    GET_SETTINGS_MODAL_IS_OPEN: state => state.settingsModal,
    GET_IS_MARKDOWN_MODE: state => state.markdownMode,
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
    toggleMarkdownMode(state) {
        state.markdownMode = !state.markdownMode;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
