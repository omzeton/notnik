import axios from "axios";

const state = {
    error: null,
    isLoading: false,
    token: null,
    userId: null,
    userSettings: {
        fontSize: null,
        menuPosition: "left",
    },
};

const actions = {
    async LOGIN({ dispatch }, { email, password }) {
        try {
            dispatch("SET_LOADING_STATE", true);
            const res = await axios.post(
                "auth/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 422) throw new Error("Validation error.");
            if (res.status !== 200 && res.status !== 201) throw new Error("Unable to authenticate user.");
            console.log(res.data);
            dispatch("SAVE_RESPONSE_DATA", res.data);
            dispatch("SET_LOADING_STATE", false);
        } catch (err) {
            dispatch("SET_LOADING_STATE", false);
            throw err;
        }
    },
    SAVE_RESPONSE_DATA({ commit }, payload) {
        commit("updateUserData", payload);
    },
    SET_LOADING_STATE({ commit }, payload) {
        commit("updateIsLoading", payload);
    },
};

const getters = {
    GET_IS_AUTHENTICATED(state) {
        return token;
    },
};

const mutations = {
    updateIsLoading(state, payload) {
        state.isLoading = payload;
    },
    updateUserData(state, { token, userId, userSettings }) {
        state.isAuth = true;
        state.token = token;
        state.userId = userId;
        state.userSettings = {
            fontSize: userSettings.fontSize,
            menuPosition: userSettings.menuPosition,
        };
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
