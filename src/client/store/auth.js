import axios from "axios";
import router from "@/routes";

import { delayed } from "@/utils";

const state = {
    isAuthenticated: false,
    isLoading: false,
    serverErrors: [],
};

const actions = {
    async LOGIN({ dispatch }, { email, password }) {
        try {
            const res = await axios.post("auth/login", { email, password }, { headers: { "Content-Type": "application/json" } });
            if (res.status === 422) throw new Error("Validation error.");
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            console.log(res);
            delayed(() => {
                dispatch("SAVE_RESPONSE_DATA", res.data);
                dispatch("SET_LOADING_STATE", false);
                router.push("/list");
            });
        } catch (err) {
            dispatch("SET_LOADING_STATE", false);
            throw err;
        }
    },
    async REGISTER({ dispatch }, { email, password }) {},
    SAVE_RESPONSE_DATA({ commit }, payload) {
        commit("updateUserData", payload);
    },
    SET_LOADING_STATE({ commit }, payload) {
        commit("updateIsLoading", payload);
    },
    SET_ERROR({ commit }, payload) {
        commit("setError", payload);
    },
};

const getters = {
    GET_IS_AUTHENTICATED(state) {
        return state.isAuthenticated;
    },
    GET_IS_LOADING(state) {
        return state.isLoading;
    },
};

const mutations = {
    updateIsLoading(state, payload) {
        state.isLoading = payload;
    },
    updateUserData(state, { userId }) {
        state.isAuthenticated = true;
        state.userId = userId;
    },
    setError(state, payload) {
        state.serverErrors.push(payload);
    },
    resetErrors(state) {
        state.serverErrors = [];
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
