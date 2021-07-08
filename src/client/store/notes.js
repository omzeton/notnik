import axios from "axios";

import router from "@/routes";

const state = {
    fetched: false,
    activeNoteId: "",
    notes: [],
};

const actions = {
    async FETCH_ALL_NOTES({ dispatch, state }) {
        if (state.fetched) return;
        try {
            const res = await axios.get("journal/entries");
            if (res.status !== 200 && res.status !== 201) throw new Error("Server error");
            dispatch("UPDATE_NOTES", res.data.entries);
            dispatch("UPDATE_NOTES_ARE_FETCHED");
        } catch (err) {
            throw err;
        }
    },
    async CREATE_NEW_NOTE({ dispatch }) {
        try {
            const res = await axios.post("journal/new");
            if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't create new entry");
            const { entries } = res.data;
            dispatch("UPDATE_NOTES", entries);
            const newId = entries[entries.length - 1]._id;
            dispatch("SET_ACTIVE_NOTE_ID", newId);
            router.push({ path: `/notnik/note/${newId}`, query: { new: true } });
        } catch (err) {
            throw err;
        }
    },
    async SYNC_CHANGES({ state, dispatch }, { notification }) {
        try {
            const activeNote = state.notes.find(note => note._id === state.activeNoteId);
            const res = await axios.post("journal/sync", { entry: activeNote }, { headers: { "Content-Type": "application/json" } });
            if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't sync entry changes");
            console.log("%cSynced notes with database 🐱‍🐉", "color: #3fc577;");
            if (notification) dispatch("ui/DISPLAY_NOTIFICATION", null, { root: true });
        } catch (err) {
            throw err;
        }
    },
    SET_ACTIVE_NOTE_ID({ commit }, id) {
        commit("setActiveNoteId", id);
    },
    UPDATE_ACTIVE_NOTE({ commit }, { body }) {
        commit("updateActiveNote", { body });
    },
    UPDATE_NOTES({ commit }, notes) {
        commit("updateNotes", notes);
    },
    UPDATE_NOTES_ARE_FETCHED({ commit }) {
        commit("notesAreFetched");
    },
};

const getters = {
    GET_NOTES: state => state.notes,
    GET_NOTES_LENGTH: state => state.notes.length,
    GET_NOTES_ARE_FETCHED: state => state.fetched,
};

const mutations = {
    updateNotes(state, payload) {
        state.notes = payload;
    },
    updateActiveNote(state, { body }) {
        state.notes = state.notes.map(note => {
            if (note._id === state.activeNoteId) {
                note.body = body;
            }
            return note;
        });
    },
    setActiveNoteId(state, payload) {
        state.activeNoteId = payload;
    },
    notesAreFetched(state) {
        state.fetched = true;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
