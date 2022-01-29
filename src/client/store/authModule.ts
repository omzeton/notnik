import { ActionTree, GetterTree, MutationTree } from "vuex";

import api from "@/services/api";
import { AuthModuleState, ServerError, Store } from "@/types";
import router from "@/routes";

const state: AuthModuleState = {
    isLoggedIn: false,
    serverError: "",
    user: {
        _id: "",
        email: "",
    },
};

const actions: ActionTree<AuthModuleState, Store> = {
    async LOGIN({ dispatch }, { email, password }) {
        try {
            const res = await api.post("auth/login", { email, password });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user!");
            dispatch("SAVE_USER_AUTH_STATUS", true);
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            router.push("/notnik");
        } catch (err) {
            const errorMessage = (err as ServerError).response?.data?.message;
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            dispatch("SET_SERVER_ERROR", errorMessage);
            throw err;
        }
    },
    async REGISTER({ dispatch }, { email, password }) {
        try {
            const res = await api.put("auth/register", { email, password });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            dispatch("ui/TOGGLE_FORM_VIEW", null, { root: true });
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
        } catch (err) {
            const errorMessage = (err as ServerError).response?.data?.message;
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            dispatch("SET_SERVER_ERROR", errorMessage);
            throw err;
        }
    },
    async LOG_OUT({ dispatch }) {
        try {
            dispatch("ui/SET_LOADING_STATE", { active: true, message: "Logging out" }, { root: true });
            const res = await api.post("auth/logout");
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to logout.");
            window.location.replace("/");
        } catch (err) {
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            throw err;
        }
    },
    SAVE_USER_AUTH_STATUS({ commit }, payload) {
        commit("updateUserAuthStatus", payload);
    },
    SET_SERVER_ERROR({ commit }, payload) {
        commit("setServerError", payload);
    },
    RESET_SERVER_ERROR({ commit }) {
        commit("resetServerError");
    },
};

const getters: GetterTree<AuthModuleState, Store> = {
    GET_IS_AUTHENTICATED: state => state.isLoggedIn,
};

const mutations: MutationTree<AuthModuleState> = {
    updateUserAuthStatus(state, payload) {
        state.isLoggedIn = payload;
    },
    setServerError(state, payload) {
        state.serverError = payload;
    },
    resetServerError(state) {
        state.serverError = "";
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
