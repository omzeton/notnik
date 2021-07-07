import axios from "axios";

import router from "@/routes";
import { sleep } from "@/utils";

const state = {
    isAuthenticated: false,
    serverError: "",
};

const actions = {
    async LOGIN({ dispatch }, { email, password }) {
        try {
            const res = await axios.post("auth/login", { email, password }, { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            await sleep(2000);
            dispatch("SAVE_USER_AUTH_STATUS", true);
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            router.push("/notnik");
        } catch (err) {
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            dispatch("SET_SERVER_ERROR", err.response.data.message);
            throw err;
        }
    },
    async REGISTER({ dispatch }, { email, password }) {
        try {
            const res = await axios.put("auth/signup", { email, password }, { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            await sleep(2000);
            dispatch("ui/TOGGLE_FORM_VIEW", null, { root: true });
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
        } catch (err) {
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            dispatch("SET_SERVER_ERROR", err.response.data.message);
            throw err;
        }
    },
    async CHECK_AUTH_STATUS({ dispatch }) {
        try {
            const res = await axios.get("auth/authenticate", { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error();
            dispatch("SAVE_USER_AUTH_STATUS", res.data.tokenIsValid);
            if (res.data.tokenIsValid && router.history.current.path !== "/notnik") router.push("/notnik");
        } catch (err) {
            console.log("%cSession token expired or not found. Login to authenticate.", "color: #ec4e20;");
            throw err;
        }
    },
    async LOG_OUT({ dispatch }) {
        try {
            dispatch("ui/SET_LOADING_STATE", { active: true, message: "Logging out" }, { root: true });
            const res = await axios.post("auth/logout", null, { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to logout.");
            await sleep(1000);
            window.location.replace("/");
        } catch (err) {
            dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
            throw err;
        }
    },
    ROUTE_GUARD({ state }) {
        if (!state.isAuthenticated) router.push("/");
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

const getters = {
    GET_IS_AUTHENTICATED: state => state.isAuthenticated,
};

const mutations = {
    updateUserAuthStatus(state, payload) {
        state.isAuthenticated = payload;
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
