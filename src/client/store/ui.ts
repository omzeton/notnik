import { ActionTree, GetterTree, MutationTree } from "vuex";

import { UIModuleState, Store } from "@/types/store";

const state: UIModuleState = {
    loadingMessage: "",
    isLoading: false,
    loginForm: true,
    settingsModal: false,
    markdownMode: false,
    notificationIsVisible: false,
    deletionModalIsActive: false,
};

const actions: ActionTree<UIModuleState, Store> = {
    TOGGLE_FORM_VIEW({ commit }) {
        commit("toggleFormView");
    },
    TOGGLE_SETTINGS_MODAL({ commit }) {
        commit("toggleSettingsModal");
    },
    TOGGLE_MARKDOWN_MODE({ commit }) {
        commit("toggleMarkdownMode");
    },
    SET_LOADING_STATE(
        { commit },
        { active, message }: { active: UIModuleState["isLoading"]; message: UIModuleState["loadingMessage"] }
    ) {
        commit("updateIsLoading", { active, message });
    },
    DISPLAY_NOTIFICATION({ commit }) {
        commit("updateNotificationVisibility", true);
        setTimeout(() => commit("updateNotificationVisibility", false), 2000);
    },
    TOGGLE_DELETION_MODAL({ commit }) {
        commit("toggleDeletionModal");
    },
};

const getters: GetterTree<UIModuleState, Store> = {
    GET_FORM_VIEW: state => state.loginForm,
    GET_IS_LOADING: state => state.isLoading,
    GET_LOADING_MESSAGE: state => state.loadingMessage,
    GET_SETTINGS_MODAL_IS_OPEN: state => state.settingsModal,
    GET_IS_MARKDOWN_MODE: state => state.markdownMode,
    GET_NOTIFICATION_IS_VISIBLE: state => state.notificationIsVisible,
    GET_DELETION_MODAL_IS_ACTIVE: state => state.deletionModalIsActive,
};

const mutations: MutationTree<UIModuleState> = {
    toggleFormView(state) {
        state.loginForm = !state.loginForm;
    },
    updateIsLoading(
        state,
        { active, message }: { active: UIModuleState["isLoading"]; message: UIModuleState["loadingMessage"] }
    ) {
        state.isLoading = active;
        state.loadingMessage = message;
    },
    toggleSettingsModal(state) {
        state.settingsModal = !state.settingsModal;
    },
    toggleMarkdownMode(state) {
        state.markdownMode = !state.markdownMode;
    },
    updateNotificationVisibility(state, payload) {
        state.notificationIsVisible = payload;
    },
    toggleDeletionModal(state) {
        state.deletionModalIsActive = !state.deletionModalIsActive;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
