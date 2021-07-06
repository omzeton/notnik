const state = {
    loginForm: true,
    isLoading: false,
    loadingMessage: "",
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
    SET_LOADING_STATE({ commit }, { active, message }) {
        commit("updateIsLoading", { active, message });
    },
};

const getters = {
    GET_FORM_VIEW: state => state.loginForm,
    GET_IS_LOADING: state => state.isLoading,
    GET_LOADING_MESSAGE: state => state.loadingMessage,
    GET_SETTINGS_MODAL_IS_OPEN: state => state.settingsModal,
    GET_IS_MARKDOWN_MODE: state => state.markdownMode,
};

const mutations = {
    toggleFormView(state) {
        state.loginForm = !state.loginForm;
    },
    updateIsLoading(state, { active, message }) {
        state.isLoading = active;
        state.loadingMessage = message;
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
