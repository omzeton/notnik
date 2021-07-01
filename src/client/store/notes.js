import axios from "axios";

const state = {
    notes: [],
};

const actions = {
    async FETCH_ALL_NOTES({ dispatch }) {
        try {
            const res = await axios.get("journal/entries");
            if (res.status !== 200 && res.status !== 201) throw new Error("Server error");
            dispatch("UPDATE_NOTES", res.data.entries);
        } catch (err) {
            throw err;
        }
    },
    UPDATE_NOTES({ commit }, notes) {
        commit("updateNotes", notes);
    },
};

const getters = {
    GET_NOTES: state => state.notes,
    GET_NOTES_LENGTH: state => state.notes.length,
    GET_NOTE_WITH_ID: (state, id) => state.find(note => note._id === id),
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
