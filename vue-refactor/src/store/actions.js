import axios from 'axios';

export default {
    INIT_APP({ commit }) {
        commit('setAppStatus', true);
    },
    async FETCH_ENTRIES({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/get-all-entries');
            commit('saveEntries', response.data.entries);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
