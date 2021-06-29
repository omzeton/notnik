import axios from "axios";

const state = {
    notes: [],
};

const actions = {
    async FETCH_ALL_NOTES({ rootState, dispatch }) {
        try {
            setTimeout(async () => {
                const { token } = rootState.auth;
                console.log(rootState);
                const res = await axios.get("journal/entries", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                if (res.status === 401) throw new Error("Unauthorized");
                if (res.status !== 200 && res.status !== 201) throw new Error("Failed to get all entries");
                dispatch("UPDATE_NOTES", res.data.entries);
            }, 1000);
        } catch (err) {
            throw err;
        }
    },
    UPDATE_NOTES({ commit }, notes) {
        commit("updateNotes", notes);
    },
};

const getters = {
    GET_NOTES(state) {
        return state.notes;
    },
};

const mutations = {
    updateNotes(state, payload) {
        state.notes = payload;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
