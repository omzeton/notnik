import axios from "axios";
import { Dispatch, Commit } from "vuex";

import { NotesModuleState, Note } from "@/types/store";

const state = {
    activeNoteId: "",
    notes: [],
};

const actions = {
    async FETCH_ALL_NOTES({ dispatch }: { dispatch: Dispatch }) {
        const res = await axios.get("journal/entries");
        if (res.status !== 200 && res.status !== 201) throw new Error("Server error");
        dispatch("UPDATE_NOTES", { notes: res.data.entries });
    },
    async CREATE_NEW_NOTE({ dispatch }: { dispatch: Dispatch }) {
        const res = await axios.post("journal/new");
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't create new entry");
        const { entries } = res.data;
        dispatch("UPDATE_NOTES", { notes: entries });
        const newId = entries[entries.length - 1]._id;
        dispatch("SET_ACTIVE_NOTE_ID", { id: newId });
    },
    async SYNC_CHANGES({ state, dispatch }: { state: NotesModuleState; dispatch: Dispatch }, { notification }: { notification: string }) {
        const activeNote = state.notes.find(note => note._id === state.activeNoteId);
        if (!activeNote) throw new Error("No active entry found!");
        const res = await axios.post("journal/sync", { entry: activeNote }, { headers: { "Content-Type": "application/json" } });
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't sync entry changes");
        if (notification) dispatch("ui/DISPLAY_NOTIFICATION", null, { root: true });
    },
    async DELETE_NOTE({ commit }: { commit: Commit }, { id }: { id: string }) {
        commit("deleteNote", id);
        const res = await axios.post("journal/remove-entry", { id }, { headers: { "Content-Type": "application/json" } });
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't delete entry!");
    },
    SET_ACTIVE_NOTE_ID({ commit }: { commit: Commit }, { id }: { id: string }) {
        commit("setActiveNoteId", id);
    },
    UPDATE_ACTIVE_NOTE({ commit }: { commit: Commit }, { body }: { body: string }) {
        commit("updateActiveNote", { body });
    },
    UPDATE_NOTES({ commit }: { commit: Commit }, { notes }: { notes: Array<Note> }) {
        commit("updateNotes", notes);
    },
};

const getters = {
    GET_NOTES: (state: NotesModuleState) => state.notes,
    GET_NOTES_LENGTH: (state: NotesModuleState) => state.notes.length,
};

const mutations = {
    updateNotes(state: NotesModuleState, payload: Array<Note>) {
        state.notes = payload;
    },
    updateActiveNote(state: NotesModuleState, payload: { body: string }) {
        state.notes = state.notes.map(note => {
            if (note._id === state.activeNoteId) note.body = payload.body;
            return note;
        });
    },
    setActiveNoteId(state: NotesModuleState, payload: string) {
        state.activeNoteId = payload;
    },
    deleteNote(state: NotesModuleState, id: string) {
        state.notes = state.notes.filter(note => note._id !== id);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
