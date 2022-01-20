<template>
    <aside class="submenu">
        <Entry v-for="note in notes" :name="note.body" :key="note._id" :id="note._id" />
    </aside>
</template>

<script>
import Entry from "./Entry";

export default {
    components: {
        Entry,
    },
    mounted() {
        if (!this.notes.length) this.$store.dispatch("notes/FETCH_ALL_NOTES");
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_NOTES"];
        },
    },
};
</script>
