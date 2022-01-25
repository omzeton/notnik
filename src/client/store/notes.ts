import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { NotesModuleState, Note, Store, ActiveNote } from "@/types/store";

const state: NotesModuleState = {
    activeNote: {
        _id: "",
        body: "",
    },
    userNotes: [],
};

const actions: ActionTree<NotesModuleState, Store> = {
    async FETCH_ALL_NOTES_FROM_DB({ dispatch, state }) {
        const notesAlreadyFetched = !!state.userNotes.length;
        if (notesAlreadyFetched) {
            return;
        }
        const res = await axios.get("journal/entries");
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: couldn't fetch all entries!");
        }
        dispatch("UPDATE_NOTES", { notes: res.data.entries });
    },
    async CREATE_NEW_NOTE({ dispatch }) {
        const res = await axios.post("journal/new");
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: couldn't create new entry!");
        }
        const { entries } = res.data;
        dispatch("UPDATE_NOTES", { notes: entries });
        dispatch("MAKE_NOTE_ACTIVE", { id: entries[entries.length - 1]._id });
    },
    async DELETE_NOTE({ commit }, { id }: { id: Note["_id"] }) {
        commit("deleteNote", id);
        const res = await axios.post(
            "journal/remove-entry",
            { id },
            { headers: { "Content-Type": "application/json" } }
        );
        if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't delete entry!");
    },
    async SAVE_CURRENT_CHANGES({ state, dispatch }) {
        const userNote = state.userNotes.find(note => note._id === state.activeNote._id);
        if (!userNote) {
            throw new Error("Couldn't find note with the same id as active note!");
        }
        const noNewChanges = userNote.body === state.activeNote.body;
        if (noNewChanges) {
            return;
        }
        const res = await axios.post(
            "journal/sync",
            { entry: state.activeNote },
            { headers: { "Content-Type": "application/json" } }
        );
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: Can't save changes to current note!");
        }
        dispatch("UPDATE_NOTES", { notes: res.data.entries });
    },
    UPDATE_ACTIVE_NOTE_BODY({ commit }, { body }: { body: Note["body"] }) {
        commit("updateActiveNoteBody", body);
    },
    MAKE_NOTE_ACTIVE({ commit }, { id }: { id: Note["_id"] }) {
        commit("makeNoteActive", id);
    },
    UPDATE_ACTIVE_NOTE({ commit }, { body }: { body: Note["body"] }) {
        commit("updateActiveNote", { body });
    },
    UPDATE_NOTES({ commit }, { notes }: { notes: NotesModuleState["userNotes"] }) {
        commit("updateNotes", notes);
    },
};

const getters: GetterTree<NotesModuleState, Store> = {
    GET_ALL_USER_NOTES: state => state.userNotes || [],
    GET_ACTIVE_NOTE: state => (state.activeNote._id ? state.activeNote : false),
    GET_ACTIVE_NOTE_BODY: state => (state.activeNote ? state.activeNote.body : "Error"),
};

const mutations: MutationTree<NotesModuleState> = {
    updateNotes(state, payload: NotesModuleState["userNotes"]) {
        state.userNotes = payload;
    },
    makeNoteActive(state, payload: ActiveNote["_id"]) {
        const chosenUserNote = state.userNotes.find(note => note._id === payload);
        if (chosenUserNote) {
            state.activeNote._id = chosenUserNote._id;
            state.activeNote.body = chosenUserNote.body;
        }
    },
    updateActiveNote(state, payload: Note) {
        state.userNotes = state.userNotes.map(note => {
            if (note._id === state.activeNote._id) note.body = payload.body;
            return note;
        });
    },
    updateActiveNoteBody(state, payload: Note["body"]) {
        state.activeNote.body = payload;
    },
    deleteNote(state, id: Note["_id"]) {
        state.userNotes = state.userNotes.filter(note => note._id !== id);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
