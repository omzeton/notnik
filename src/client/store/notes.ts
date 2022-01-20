import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { NotesModuleState, Note, Store } from "@/types/store";

const state: NotesModuleState = {
    activeNoteId: "",
    notes: [],
};

const actions: ActionTree<NotesModuleState, Store> = {
    async FETCH_ALL_NOTES({ dispatch }) {
        const res = await axios.get("journal/entries");
        if (res.status !== 200 && res.status !== 201) throw new Error("Server error");
        dispatch("UPDATE_NOTES", { notes: res.data.entries });
    },
    async CREATE_NEW_NOTE({ dispatch }) {
        const res = await axios.post("journal/new");
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't create new entry");
        const { entries } = res.data;
        dispatch("UPDATE_NOTES", { notes: entries });
        const newId = entries[entries.length - 1]._id;
        dispatch("SET_ACTIVE_NOTE_ID", { id: newId });
    },
    async SYNC_CHANGES({ state }) {
        const activeNote = state.notes.find(note => note._id === state.activeNoteId);
        if (!activeNote) throw new Error("No active entry found!");
        const res = await axios.post("journal/sync", { entry: activeNote }, { headers: { "Content-Type": "application/json" } });
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't sync entry changes");
    },
    async DELETE_NOTE({ commit }, { id }: { id: Note["_id"] }) {
        commit("deleteNote", id);
        const res = await axios.post("journal/remove-entry", { id }, { headers: { "Content-Type": "application/json" } });
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't delete entry!");
    },
    SET_ACTIVE_NOTE_ID({ commit }, { id }: { id: Note["_id"] }) {
        commit("setActiveNoteId", id);
    },
    UPDATE_ACTIVE_NOTE({ commit }, { body }: { body: Note["body"] }) {
        commit("updateActiveNote", { body });
    },
    UPDATE_NOTES({ commit }, { notes }: { notes: NotesModuleState["notes"] }) {
        commit("updateNotes", notes);
    },
};

const getters: GetterTree<NotesModuleState, Store> = {
    GET_NOTES: state => state.notes,
    GET_NOTES_LENGTH: state => state.notes.length,
};

const mutations: MutationTree<NotesModuleState> = {
    updateNotes(state, payload: NotesModuleState["notes"]) {
        state.notes = payload;
    },
    setActiveNoteId(state, payload: NotesModuleState["activeNoteId"]) {
        state.activeNoteId = payload;
    },
    updateActiveNote(state, payload: Note) {
        state.notes = state.notes.map(note => {
            if (note._id === state.activeNoteId) note.body = payload.body;
            return note;
        });
    },
    deleteNote(state, id: Note["_id"]) {
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
