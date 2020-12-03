export default {
    setAppStatus(state, payload) {
        state.appLoaded = payload;
    },
    saveEntries(state, payload) {
        state.entries = payload;
    },
};
