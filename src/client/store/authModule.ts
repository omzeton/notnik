import { ActionTree, GetterTree, MutationTree } from "vuex";

import api from "@/services/apiService";
import { saveRefreshToken, saveAccessToken } from "@/services/tokenService";
import { AuthModuleState, Store } from "@/types";

const state: AuthModuleState = {
    serverError: "",
};

const actions: ActionTree<AuthModuleState, Store> = {
    async AUTHENTICATE_USER({ dispatch }, { email, password, type }) {
        try {
            const res = await api.post(`auth/${type}`, { email, password });

            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Unable to authenticate user!");
            }

            if (type === "register") {
                dispatch("ui/TOGGLE_FORM_VIEW", null, { root: true });
            }
        } catch (e) {
            dispatch("SET_SERVER_ERROR", (<Error>e).message);
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
    SET_SERVER_ERROR({ commit }, payload) {
        commit("setServerError", payload);
    },
    RESET_SERVER_ERROR({ commit }) {
        commit("resetServerError");
    },
};

const getters: GetterTree<AuthModuleState, Store> = {};

const mutations: MutationTree<AuthModuleState> = {
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
