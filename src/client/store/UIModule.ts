import { ActionTree, GetterTree, MutationTree } from "vuex";

import { UIModuleState, Store } from "@/types";

const state: UIModuleState = {
    isLoading: false,
    loginForm: true,
    deletionModalIsActive: false,
    isSubmenuActive: false,
};

const actions: ActionTree<UIModuleState, Store> = {
    TOGGLE_FORM_VIEW({ commit }) {
        commit("toggleFormView");
    },
    SET_LOADING_STATE({ commit }, { active }: { active: UIModuleState["isLoading"] }) {
        commit("updateIsLoading", { active });
    },
    TOGGLE_DELETION_MODAL({ commit }) {
        commit("toggleDeletionModal");
    },
    TOGGLE_SUBMENU({ commit }) {
        commit("toggleSubmenu");
    },
};

const getters: GetterTree<UIModuleState, Store> = {
    GET_FORM_VIEW: (state) => state.loginForm,
    GET_IS_LOADING: (state) => state.isLoading,
    GET_DELETION_MODAL_IS_ACTIVE: (state) => state.deletionModalIsActive,
    GET_IS_SUBMENU_ACTIVE: (state) => state.isSubmenuActive,
};

const mutations: MutationTree<UIModuleState> = {
    toggleFormView(state) {
        state.loginForm = !state.loginForm;
    },
    updateIsLoading(state, { active }: { active: UIModuleState["isLoading"] }) {
        state.isLoading = active;
    },
    toggleDeletionModal(state) {
        state.deletionModalIsActive = !state.deletionModalIsActive;
    },
    toggleSubmenu(state) {
        state.isSubmenuActive = !state.isSubmenuActive;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
