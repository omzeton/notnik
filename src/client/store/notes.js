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
    const res = await axios.get("journal/entries");
    if (res.status !== 200 && res.status !== 201) throw new Error("Server error");
    dispatch("UPDATE_NOTES", res.data.entries);
    dispatch("UPDATE_NOTES_ARE_FETCHED");
  },
  async CREATE_NEW_NOTE({ dispatch }) {
    const res = await axios.post("journal/new");
    if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't create new entry");
    const { entries } = res.data;
    dispatch("UPDATE_NOTES", entries);
    const newId = entries[entries.length - 1]._id;
    dispatch("SET_ACTIVE_NOTE_ID", { id: newId });
    router.push({ path: `/notnik/note/${newId}`, query: { new: true } });
  },
  async SYNC_CHANGES({ state, dispatch }, { notification }) {
    const activeNote = state.notes.find(note => note._id === state.activeNoteId);
    if (!activeNote) throw new Error("No active entry found!");
    const res = await axios.post("journal/sync", { entry: activeNote }, { headers: { "Content-Type": "application/json" } });
    if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't sync entry changes");
    if (notification) dispatch("ui/DISPLAY_NOTIFICATION", null, { root: true });
  },
  async DELETE_NOTE({ commit }, { id }) {
    commit("deleteNote", id);
    const res = await axios.post("journal/remove-entry", { id }, { headers: { "Content-Type": "application/json" } });
    if (res.status !== 200 && res.status !== 201) throw new Error("Couldn't delete entry!");
  },
  SET_ACTIVE_NOTE_ID({ commit }, { id }) {
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
  deleteNote(state, id) {
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
