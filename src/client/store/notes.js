import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
            const newNoteId = uuidv4();
            const res = await axios.post("journal/new");
            if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't create new entry");
            dispatch("UPDATE_NOTES", res.data.entries);
            router.push({ path: `/notnik/note/${newNoteId}`, query: { new: true } });
        } catch (err) {
            throw err;
        }
    },
    async SYNC_CHANGES({ state }) {
        try {
            const activeNote = state.notes.find(note => note._id === state.activeNoteId);
            const res = await axios.post("journal/sync", { entry: activeNote }, { headers: { "Content-Type": "application/json" } });
            console.log({ res });
            if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't sync entry changes");
        } catch (err) {
            throw err;
        }
    },
    SET_ACTIVE_NOTE_ID({ commit }, id) {
        commit("setActiveNoteId", id);
    },
    UPDATE_ACTIVE_NOTE({ commit }, { body, title }) {
        commit("updateActiveNote", { body, title });
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
    updateActiveNote(state, { body, title }) {
        state.notes = state.notes.map(note => {
            if (note._id === state.activeNoteId) {
                note.body = body;
                note.title = title;
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
