import { ActionTree, GetterTree, MutationTree } from "vuex";

import api from "@/services/apiService";
import router from "@/routes";
import { AuthModuleState, Store } from "@/types";
import { saveAccessToken, deleteAccessToken } from "@/services/tokenService";

const state: AuthModuleState = {
    serverError: "",
    isLoggedIn: false,
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
            } else {
                saveAccessToken(res.data.accessToken);
                router.push("/notnik");
            }
        } catch (e) {
            dispatch("SET_SERVER_ERROR", (<Error>e).message);
        }
    },
    async LOG_OUT({ dispatch }) {
        try {
            const res = await api.post("auth/logout");

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Unable to logout.");
            }

            deleteAccessToken();

            window.location.replace("/");
        } catch (e) {
            dispatch("SET_SERVER_ERROR", (<Error>e).message);
        }
    },
    SET_IS_LOGGED_IN({ commit }, payload: boolean) {
        commit("setIsLoggedIn", payload);
    },
    SET_SERVER_ERROR({ commit }, payload) {
        commit("setServerError", payload);
    },
    RESET_SERVER_ERROR({ commit }) {
        commit("resetServerError");
    },
};

const getters: GetterTree<AuthModuleState, Store> = {
    GET_IS_LOGGED_IN: state => state.isLoggedIn,
};

const mutations: MutationTree<AuthModuleState> = {
    setServerError(state, payload) {
        state.serverError = payload;
    },
    resetServerError(state) {
        state.serverError = "";
    },
    setIsLoggedIn(state, payload: boolean) {
        state.isLoggedIn = payload;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
