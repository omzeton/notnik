import { ActionTree, GetterTree, MutationTree } from "vuex";

import api from "@/services/apiService";
import { NotesModuleState, Note, Store, ActiveNote } from "@/types";
import { sleep } from "@/utils";

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
        const res = await api.get("journal/entries");
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: couldn't fetch all entries!");
        }
        dispatch("UPDATE_NOTES", { notes: res.data.entries });
    },
    async CREATE_NEW_NOTE({ dispatch }) {
        const res = await api.post("journal/new");
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: couldn't create new entry!");
        }
        const { entries } = res.data;
        dispatch("UPDATE_NOTES", { notes: entries });
        dispatch("MAKE_NOTE_ACTIVE", { id: entries[entries.length - 1]._id });
    },
    async DELETE_CURRENT_NOTE({ commit, state }) {
        const currentActiveNoteID = state.activeNote._id;
        const res = await api.post("journal/remove-entry", { id: currentActiveNoteID });
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: Can't delete current entry!");
        }
        await sleep(300);
        commit("deleteNote", currentActiveNoteID);
        commit("deactivateNote");
    },
    async SAVE_CURRENT_CHANGES({ state, dispatch }) {
        const userNote = state.userNotes.find((note) => note._id === state.activeNote._id);
        if (!userNote) {
            throw new Error("Couldn't find note with the same id as active note!");
        }
        const noNewChanges = userNote.body === state.activeNote.body;
        if (noNewChanges) {
            return;
        }
        const res = await api.post("journal/sync", { entry: state.activeNote });
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server error: Can't save changes to current note!");
        }
        dispatch("UPDATE_NOTES", { notes: res.data.entries });
    },
    CONFIRM_NOTE_DELETION({ dispatch }) {
        dispatch("ui/TOGGLE_DELETION_MODAL", null, { root: true });
        dispatch("DELETE_CURRENT_NOTE");
    },
    UPDATE_ACTIVE_NOTE_BODY({ commit }, { body }: { body: Note["body"] }) {
        commit("updateActiveNoteBody", body);
    },
    MAKE_NOTE_ACTIVE({ commit, dispatch }, { id }: { id: Note["_id"] }) {
        commit("makeNoteActive", id);
        dispatch("ui/TOGGLE_SUBMENU", null, { root: true });
    },
    DEACTIVATE_NOTE({ commit }) {
        commit("deactivateNote");
    },
    UPDATE_ACTIVE_NOTE({ commit }, { body }: { body: Note["body"] }) {
        commit("updateActiveNote", { body });
    },
    UPDATE_NOTES({ commit }, { notes }: { notes: NotesModuleState["userNotes"] }) {
        commit("updateNotes", notes);
    },
};

const getters: GetterTree<NotesModuleState, Store> = {
    GET_ALL_USER_NOTES: (state) => state.userNotes || [],
    GET_ACTIVE_NOTE: (state) => (state.activeNote._id ? state.activeNote : false),
    GET_ACTIVE_NOTE_BODY: (state) => state.activeNote.body,
    IS_EDITING_A_NOTE: (state) => !!state.activeNote._id,
};

const mutations: MutationTree<NotesModuleState> = {
    updateNotes(state, payload: NotesModuleState["userNotes"]) {
        state.userNotes = payload;
    },
    makeNoteActive(state, payload: ActiveNote["_id"]) {
        const chosenUserNote = state.userNotes.find((note) => note._id === payload);
        if (chosenUserNote) {
            state.activeNote._id = chosenUserNote._id;
            state.activeNote.body = chosenUserNote.body;
        }
    },
    updateActiveNote(state, payload: Note) {
        state.userNotes = state.userNotes.map((note) => {
            if (note._id === state.activeNote._id) note.body = payload.body;
            return note;
        });
    },
    updateActiveNoteBody(state, payload: Note["body"]) {
        state.activeNote.body = payload;
    },
    deleteNote(state, id: Note["_id"]) {
        state.userNotes = state.userNotes.filter((note) => note._id !== id);
    },
    deactivateNote(state) {
        state.activeNote = {
            _id: "",
            body: "",
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
