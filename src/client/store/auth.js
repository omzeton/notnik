import axios from "axios";
import router from "@/routes";

import { delayed } from "@/utils";

const state = {
    isAuthenticated: false,
    serverError: "",
};

const actions = {
    async LOGIN({ dispatch }, { email, password }) {
        try {
            const res = await axios.post("auth/login", { email, password }, { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            delayed(() => {
                dispatch("SAVE_RESPONSE_DATA", res.data);
                dispatch("ui/SET_LOADING_STATE", false, { root: true });
                router.push("/list");
            });
        } catch (err) {
            dispatch("ui/SET_LOADING_STATE", false, { root: true });
            dispatch("SET_SERVER_ERROR", err.response.data.message);
            throw err;
        }
    },
    async REGISTER({ dispatch }, { email, password }) {
        try {
            const res = await axios.put("auth/signup", { email, password }, { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            delayed(() => {
                dispatch("ui/TOGGLE_FORM_VIEW", null, { root: true });
                dispatch("ui/SET_LOADING_STATE", false, { root: true });
            });
        } catch (err) {
            dispatch("ui/SET_LOADING_STATE", false, { root: true });
            dispatch("SET_SERVER_ERROR", err.response.data.message);
            throw err;
        }
    },
    SAVE_RESPONSE_DATA({ commit }, payload) {
        commit("updateUserData", payload);
    },
    SET_SERVER_ERROR({ commit }, payload) {
        commit("setServerError", payload);
    },
    RESET_SERVER_ERROR({ commit }) {
        commit("resetServerError");
    },
};

const getters = {
    GET_IS_AUTHENTICATED: state => state.isAuthenticated,
};

const mutations = {
    updateUserData(state, { userId }) {
        state.isAuthenticated = true;
        state.userId = userId;
    },
    setServerError(state, payload) {
        state.serverError = payload;
    },
    resetServerError(state) {
        state.serverError = [];
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
